---
layout: post
title: Fixing KernelDensity's handling of data variance in scikit-learn
description: A deep dive into addressing the abnormal behavior of KernelDensity on non-unit variance data.
tags: scikit-learn
categories: open-source
date: 2024-09-11
giscus_comments: true
related_posts: false
toc:
  beginning: true
---

Scikit-learn has a tree-based implementation of kernel density estimation in [`KernelDensity`](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KernelDensity.html). You may checkout [this post](https://jakevdp.github.io/blog/2013/12/01/kernel-density-estimation/) by the original author. The tree-based implementation outperforms the naive implementation [`gaussian_kde`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.gaussian_kde.html) in scipy, thus being suitable for large datasets.

Yet as revealed in [#25623](https://github.com/scikit-learn/scikit-learn/issues/25623) and [#26658](https://github.com/scikit-learn/scikit-learn/issues/25623), `KernelDensity` consistently gave incorrect results on data with non-unit variance. In this blog post we will go through the underlying issues and the corresponding fix.

## Problem Reproduction

Let us begin with a simple example to reveal the problem. Here we draw samples from the normal distribution, but with different scales (i.e., standard deviations) 1, 0.1, and 10, and perform kernel density estimation respectively.

{::nomarkdown}
{% assign incorrect_results_noteboook = "assets/jupyter/posts/scikit-learn-kde/incorrect-results.ipynb" | relative_url %}
{% jupyter_notebook incorrect_results_noteboook %}
{:/nomarkdown}

As we can see from the plots, scikit-learn's results were far from the underlying distribution for `scale=0.1` and `scale=10` while scipy gave reasonable estimations.

## Problem Analysis

We will start with the univariate case. By definition, let $$ (x_1,\ldots,x_n) $$ be independent and identially distributed samples drawn from some univariate distribution, its kernel density estimator at a given point $$ x $$ is

$$
\hat{f}_h(x)=\frac{1}{n}\sum_{i=1}^nK_h(x-x_i)=\frac{1}{nh}\sum_{i=1}^nK\left(\frac{x-x_i}{h}\right),
$$

where $$ K $$ is the kernel function and $$ h $$ is the **bandwidth**. _This is exactly how scikit-learn implemented kernel density estimation,_ but a good bandwidth should be chosen proportional to the standard deviation of data. If we use Scott's or Silverman's rule of thumb (as in the example above) for automatic bandwidth selection, it does not take into account data variance. Thus for `scale=0.1`, the chosen bandwidth would be too large and over-smoothens the estimation, and for `scale=10`, the chosen bandwidth would be too small causing the estimation to be too sensitive to noise.

Moreover in scipy's context, the `bw_method` parameter (equivalent to scikit-learn's `bandwidth` parameter) does not directly give the $$ h $$ as in the formula. It is scaled to adapt to the variance of data, or equivalently, the data is scaled to unit variance before applying the formula above, which aligns with the analysis above.

What about multivariate data? The formula is similar, such that

$$
\hat{f}_H(\mathbf{x})=\frac{1}{n}\sum_{i=1}^nK_H(\mathbf{x}-\mathbf{x}_i)=\frac{1}{n|H|}\sum_{i=1}^nK\left(H^{-1}(\mathbf{x}-\mathbf{x}_i)\right),
$$

except that this time we have a bandwidth matrix. Also similar to the univariate case, a good bandwidth matrix should be chosen proportional to $$ \Sigma^{1/2} $$ where $$ \Sigma $$ is the covariance matrix of data. In other words, the bandwidth in each dimension should have unit variance. Otherwise, the same thing as in the univariate case will happen per dimension.

## Proposed Solution

The issue is not hard to solve, but to first summarize our analysis, we want the `bandwidth` parameter to be properly scaled before estimation because:

- We want to respect the rules of thumb, e.g., Scott's rule and Silverman's rule.
- We want to be consistent with other scientific Python libraries like `scipy` and `statsmodels` to avoid confusion of users.
- We want to make the API easy-to-use. In particular, there is no clear reason to let users manually handle data variance when choosing bandwidth, especially in the multivariate case where users would even need to choose a bandwidth vector if the scaling is not performed internally.

Let $$ h $$ now be the `bandwidth` parameter (i.e., before scaling), then we can rewrite the formula into

$$
\hat{f}_h(\mathbf{x})=\frac{1}{nh|\Sigma^{-1/2}|}\sum_{i=1}^nK\left(\frac{\Sigma^{-1}(\mathbf{x}-\mathbf{x}_i)}{h}\right).
$$

Compared with the previous (incorrect) implementation

$$
\hat{f}_h(\mathbf{x})=\frac{1}{nh}\sum_{i=1}^nK\left(\frac{\mathbf{x}-\mathbf{x}_i}{h}\right),
$$

it suffices to (1) input $$ \Sigma^{-1/2}\mathbf{x} $$ instead of $$ \mathbf{x} $$, and (2) divide by $$ \Sigma^{-1/2} $$ for the output. Note that $$ \Sigma^{1/2} $$ can be computed from the covariance matrix (`np.cov`) with Cholesky decomposition (`scipy.linalg.cholesky`), so $$ \mathbf{v}=\Sigma^{-1/2}\mathbf{x} $$ can be obtained by simply solving $$ \Sigma^{1/2}\cdot\mathbf{v}=\mathbf{x} $$ (`scipy.linalg.solve_triangular`).

You may want to check out the actual fix in [#27971](https://github.com/scikit-learn/scikit-learn/pull/27971) as well.

## Future Work

- There is another potential issue [#27186](https://github.com/scikit-learn/scikit-learn/issues/27186) in the scikit-learn tree-based implementation, which is not yet confirmed as it has not revealed any unexpected behavior in practice.

- The `sample_weight` support (originally implemented in [#10803](https://github.com/scikit-learn/scikit-learn/pull/10803)) in kernel density estimation is unexpectedly slow. The tree-based implementation of scikit-learn was meant to be faster than the naive implementation of `scipy`, but with `sample_weight` it is several or tens of times slower, even if we allow some tolerance.
