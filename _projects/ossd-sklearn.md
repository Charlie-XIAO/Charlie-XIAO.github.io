---
layout: distill
title: scikit-learn
description: "Top #49 Contributor"
img: assets/img/sklearn-logo.jpg
importance: 10
category: Open Source Development

authors:
  - name: Yao Xiao
    url: "https://charlie-xiao.github.io/"
    affiliations:
      name: NYU Shanghai

bibliography: projects-ossd-sklearn.bib

shortcuts:
  - name: Rank
    link: https://github.com/scikit-learn/scikit-learn/graphs/contributors
  - name: Contributions
    link: https://github.com/scikit-learn/scikit-learn/commits?author=Charlie-XIAO

toc:
  - name: Code Contributions
    subsections:
      - name: Cross Decomposition
      - name: Decomposition
      - name: Ensemble
      - name: Feature Selection
      - name: Metrics
      - name: Preprocessing
      - name: Tree
  - name: Maintenance Contributions
  - name: Documentation Contributions
---

This is the collection of my open source contributions to [scikit-learn](https://scikit-learn.org/stable/), a Python module for machine learning.<d-cite key="scikit-learn"></d-cite> It has its code base maintained on [GitHub](https://github.com/scikit-learn/scikit-learn), with over 2500 contributors.

I have contributed [68 merged pull requests](https://github.com/scikit-learn/scikit-learn/commits?author=Charlie-XIAO) to scikit-learn, and I am currently its [Top #49 contributor](https://github.com/scikit-learn/scikit-learn/graphs/contributors) to scikit-learn.


## Code Contributions

Items in each section are sorted in reverse chronological order by the time of merge.

### Cross Decomposition

{% capture projects_ossd_sklearn_description_26602 %}
Previously, <code>PLSRegression</code> always predicts 2D result no matter if the input is 1D or 2D.
This is somehow inconsistent with other regressors such as <code>LinearRegression</code> and <code>Ridge</code>.
I implemented automatic raveling when input is 1D, so that the regressors now behave consistently.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26602
  title="ENH ravel prediction of PLSRegression when fitted on 1d y"
  description=projects_ossd_sklearn_description_26602
%}

<!-- ====================================================================== -->

### Datasets

{% capture projects_ossd_sklearn_description_27438 %}
Previously, the function <code>make_sparse_spd_matrix</code> returns numpy dense arrays and uses dense array methods,
even though the output matrix is sparse regarding its Cholesky factor.
To achieve better memory efficiency, I used sparse memory layout from the very beginning to reimplement this function,
and outputs a scipy sparse matrix based on the new keyword <code>sparse_format</code>.
For backward compatibility, however, <code>sparse_format</code> is default to <code>None</code>,
meaning that the sparse matrix will still be converted to a dense numpy array in the end in this case.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=27438
  title="ENH make_sparse_spd_matrix use sparse memory layout"
  description=projects_ossd_sklearn_description_27438
%}

<!-- ====================================================================== -->

### Decomposition

{% capture projects_ossd_sklearn_description_26337 %}
Originally, <code>KernelPCA</code> may produce incorrect results through <code>inverse_transform</code> if <code>gamma=None</code>.
This was because <code>gamma</code> would be automatically set to <code>1 / n_features</code> when the kernel is called.
However, when using <code>inverse_transform</code>, <code>n_features</code> is not that of the data that the model is fitted on.
I modified the logic so that now <code>gamma</code> will be chosen correctly in the very beginning of the fitting process.
I also provided a new attribute <code>gamma_</code> is provided for revealing the actual value of <code>gamma</code> used each time the kernel is called.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26337
  title="FIX KernelPCA inverse transform when gamma is not given"
  description=projects_ossd_sklearn_description_26337
%}

<!-- ====================================================================== -->

### Ensemble

{% capture projects_ossd_sklearn_description_25931 %}
When fitting an <code>IsolationForest</code> on a pandas dataframe with <code>contamination != auto</code>,
the feature names were removed and a spurious warning was raised,
saying that <code>X</code> does not have valid feature names, but <code>IsolationForest</code> was fitted with feature names.
This is because input data was validated when scoring the samples.
To fix this, I created a private version of scoring function without input validation,
and make the original public version validate the input and call this private one.
Then when fitting, I used the private version so that feature names will not be removed and no warnings will be raised.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=25931
  title="FIX Remove spurious feature names warning in IsolationForest"
  description=projects_ossd_sklearn_description_25931
%}

<!-- ====================================================================== -->

### Feature Selection

{% capture projects_ossd_sklearn_description_26748 %}
Previously, <code>mutual_info_regression</code> would return inaccurate or incorrect result when <code>X</code> is of integer dtype.
This is because after scaling the data, it was directly assigned back to <code>X</code>, causing the values to be rounded to integers.
Converting <code>X</code> to float dtype after that would already be too late.
I made a simple fix to convert <code>X</code> to float dtype in the first place, thus avoiding this problem.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26748
  title="FIX mutual_info_regression when X is of integer dtype"
  description=projects_ossd_sklearn_description_26748
%}

<!-- ====================================================================== -->

{% capture projects_ossd_sklearn_description_25973 %}
When fitting a <code>SequentialFeatureSelector</code>, the optional parameter <code>cv</code> would accept any iterable according to the documentation.
However, a strange IndexError will occur when passing <code>cv</code> as a generator, complaining list index out of range.
This is because <code>cv</code> need to be reused during the fitting process, so I called <code>check_cv</code> to make sure that we have an iterator.
Yet a conversion from a generator to an iterator is inefficient, so personally I still do not recommend using <code>cv</code> as generators.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=25973
  title="FIX SequentialFeatureSelector throws IndexError when cv is a generator"
  description=projects_ossd_sklearn_description_25973
%}

<!-- ====================================================================== -->

### Metrics

{% capture projects_ossd_sklearn_description_26019 %}
<code>PrecisionRecallDisplay</code> plots the Precision-Recall (PR) curve.
The PR curve is constructed by plotting the precision against recall,
where precision is the proportion of true positives among all actual positives,
and recall is the proportion of true positives among all predicted positives.
The baseline is called chance level, which is the PR curve of a predictor that predicts all examples as positive.
Therefore, I added a keyword <code>plot_chance_level</code> for plotting the chance level.
I also provided a keyword <code>chance_level_kw</code> that supports a dictionary of matplotlib keywords for customizing the rendering of the chance level line.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26019
  title="ENH PrecisionRecallDisplay add option to plot chance level"
  description=projects_ossd_sklearn_description_26019
%}

<!-- ====================================================================== -->

{% capture projects_ossd_sklearn_description_25987 %}
<code>RocCurveDisplay</code> plots the Receiver Operating Characteristic (ROC) curve.
The ROC curve is constructed by plotting the true positive rate against the false positive rate,
which measures the diagnostic ability of binary classifiers.
The baseline is called chance level, which is the diagonal, and the farther the ROC curve is from the baseline, the better performance the classifier has.
Therefore, I added a keyword <code>plot_chance_level</code> for plotting the chance level.
I also provided a keyword <code>chance_level_kw</code> that supports a dictionary of matplotlib keywords for customizing the rendering of the chance level line.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=25987
  title="ENH RocCurveDisplay add option to plot chance level"
  description=projects_ossd_sklearn_description_25987
%}

<!-- ====================================================================== -->

### Preprocessing

{% capture projects_ossd_sklearn_description_26400 %}
Box-Cox transformation is a statistical technique that transforms data to resemble a normal distribution.
However, missing values in the data can affect the computation we must get rid of them in advance.
Yet there are corner cases where a whole column is nan, causing an empty array to be passed to <code>stats.boxcox</code> and raising a non-informative error.
Since box-cox transformation should not work for constant columns and nan column can be considered "constant",
the proposed solution is to raise an informative error saying "column must not be all nan".
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26400
  title="FIX PowerTransformer raise when \"box-cox\" has nan column"
  description=projects_ossd_sklearn_description_26400
%}

<!-- ====================================================================== -->

### Tree

{% capture projects_ossd_sklearn_description_26289 %}
<code>export_text</code> and <code>export_graphviz</code> previously only accept <code>feature_names</code> and <code>class_names</code> as lists of strings.
However, under many circumstances users get feature names and class names from numpy arrays or pandas dataframes, etc.
I made these methods to support all array-like inputs for feature names and class names, so that users do not need to convert in advance.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26289
  title="FIX export_text and export_graphviz accepts feature and class names as array-like"
  description=projects_ossd_sklearn_description_26289
%}

<!-- ====================================================================== -->


## Maintenance Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/sklearn-item.html
  pr=27969
  title="MNT Work-around sphinx-gallery UnicodeDecodeError in recommender system"
%}

{% include projects/ossd/sklearn-item.html
  pr=27954
  title="CLN avoid nested conftests"
%}

{% include projects/ossd/sklearn-item.html
  pr=27723
  title="TST Extend tests for scipy.sparse.*array in sklearn/svm/tests/test_sparse"
%}

{% include projects/ossd/sklearn-item.html
  pr=27240
  title="TST Extend tests for scipy.sparse/*array in sklearn/manifold/tests/test_spectral_embedding"
%}

{% include projects/ossd/sklearn-item.html
  pr=27468
  title="FIX make dataset fetchers accept os.Pathlike for data_home"
%}

{% include projects/ossd/sklearn-item.html
  pr=27250
  title="TST Extend tests for scipy.sparse/*array in sklearn/neighbors/tests/test_neighbors"
%}

{% include projects/ossd/sklearn-item.html
  pr=27277
  title="TST Extend tests for scipy.sparse/*array in sklearn/impute/tests/test_common"
%}

{% include projects/ossd/sklearn-item.html
  pr=27219
  title="TST Extend tests for scipy.sparse/*array in sklearn/feature_extraction/tests/test_text"
%}

{% include projects/ossd/sklearn-item.html
  pr=27216
  title="TST Extend tests for scipy.sparse/*array in sklearn/ensemble/tests/test_forest"
%}

{% include projects/ossd/sklearn-item.html
  pr=27217
  title="TST Extend tests for scipy.sparse/*array in sklearn/ensemble/tests/test_gradient_boosting"
%}

{% include projects/ossd/sklearn-item.html
  pr=27218
  title="TST Extend tests for scipy.sparse/*array in sklearn/ensemble/tests/test_iforest"
%}


{% include projects/ossd/sklearn-item.html
  pr=27261
  title="TST Extend tests for scipy.sparse/*array in sklearn/tree/tests/test_tree"
%}

{% include projects/ossd/sklearn-item.html
  pr=27253
  title="TST Extend tests for scipy.sparse/*array in sklearn/preprocessing/tests/test_data"
%}

{% include projects/ossd/sklearn-item.html
  pr=27225
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_base"
%}

{% include projects/ossd/sklearn-item.html
  pr=27226
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_coordinate_descent"
%}

{% include projects/ossd/sklearn-item.html
  pr=27237
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_sparse_coordinate_descent"
%}

{% include projects/ossd/sklearn-item.html
  pr=27222
  title="TST Extend tests for scipy.sparse/*array in sklearn/feature_selection/tests/test_variance_threshold"
%}

{% include projects/ossd/sklearn-item.html
  pr=27235
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_ridge"
%}

{% include projects/ossd/sklearn-item.html
  pr=27228
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_quantile"
%}

{% include projects/ossd/sklearn-item.html
  pr=27233
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_ransac"
%}

{% include projects/ossd/sklearn-item.html
  pr=27254
  title="TST Extend tests for scipy.sparse/*array in sklearn/preprocessing/tests/test_function_transformer"
%}

{% include projects/ossd/sklearn-item.html
  pr=27252
  title="TST Extend tests for scipy.sparse/*array in sklearn/neural_network/tests/test_rbm"
%}

{% include projects/ossd/sklearn-item.html
  pr=27241
  title="TST Extend tests for scipy.sparse/*array in sklearn/metrics/cluster/tests/test_unsupervised"
%}

{% include projects/ossd/sklearn-item.html
  pr=27246
  title="TST Extend tests for scipy.sparse/*array in sklearn/model_selection/tests/test_split"
%}

{% include projects/ossd/sklearn-item.html
  pr=27262
  title="TST Extend tests for scipy.sparse/*array in sklearn/utils/tests/test_extmath"
%}

{% include projects/ossd/sklearn-item.html
  pr=27276
  title="TST Extend tests for scipy.sparse/*array in sklearn/utils/tests/test_testing"
%}

{% include projects/ossd/sklearn-item.html
  pr=27274
  title="TST Extend tests for scipy.sparse/*array in sklearn/utils/tests/test_multiclass"
%}

{% include projects/ossd/sklearn-item.html
  pr=26759
  title="CLN v1.4.rst entries are not sorted"
%}

{% include projects/ossd/sklearn-item.html
  pr=26682
  title="MAINT Parameters validation for sklearn.utils.gen_even_slices"
%}

{% include projects/ossd/sklearn-item.html
  pr=26250
  title="MAINT Parameters validation for sklearn.linear_model.ridge_regression"
%}

{% include projects/ossd/sklearn-item.html
  pr=26125
  title="MAINT Parameters validation for sklearn.metrics.pairwise_distances_chunked"
%}

{% include projects/ossd/sklearn-item.html
  pr=26124
  title="MAINT Parameters validation for sklearn.metrics.pairwise_distances_argmin"
%}

{% include projects/ossd/sklearn-item.html
  pr=26122
  title="MAINT Parameters validation for sklearn.metrics.pairwise.manhattan_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26227
  title="MAINT Parameters validation for sklearn.model_selection.learning_curve"
%}

{% include projects/ossd/sklearn-item.html
  pr=26229
  title="MAINT Parameters validation for sklearn.model_selection.validation_curve"
%}

{% include projects/ossd/sklearn-item.html
  pr=26230
  title="MAINT Parameters validation for sklearn.model_selection.permutation_test_score"
%}

{% include projects/ossd/sklearn-item.html
  pr=26161
  title="MAINT Parameters validation for sklearn.datasets.fetch_species_distributions"
%}

{% include projects/ossd/sklearn-item.html
  pr=26165
  title="MAINT Parameters validation for sklearn.datasets.load_breast_cancer"
%}

{% include projects/ossd/sklearn-item.html
  pr=26166
  title="MAINT Parameters validation for sklearn.datasets.load_diabetes"
%}

{% include projects/ossd/sklearn-item.html
  pr=26126
  title="MAINT Parameters validation for sklearn.datasets.fetch_rcv1"
%}

{% include projects/ossd/sklearn-item.html
  pr=26072
  title="MAINT Parameters validation for sklearn.metrics.pairwise.sigmoid_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26071
  title="MAINT Parameters validation for sklearn.metrics.pairwise.rbf_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26070
  title="MAINT Parameters validation for sklearn.metrics.pairwise.polynomial_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26075
  title="MAINT Parameters validation for sklearn.metrics.pairwise.paired_cosine_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26074
  title="MAINT Parameters validation for sklearn.metrics.pairwise.paired_manhattan_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26073
  title="MAINT Parameters validation for sklearn.metrics.pairwise.paired_euclidean_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26046
  title="MAINT Parameters validation for sklearn.metrics.pairwise.cosine_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26049
  title="MAINT Parameters validation for sklearn.metrics.pairwise.linear_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26048
  title="MAINT Parameters validation for sklearn.metrics.pairwise.laplacian_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26047
  title="MAINT Parameters validation for sklearn.metrics.pairwise.haversine_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26036
  title="MAINT Parameters validation for sklearn.preprocessing.scale"
%}

{% include projects/ossd/sklearn-item.html
  pr=26034
  title="MAINT Parameters validation for sklearn.tree.export_graphviz"
%}


## Documentation Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/sklearn-item.html
  pr=27970
  title="DOC update doc build sphinx link to by matching regex in lock file"
%}

{% include projects/ossd/sklearn-item.html
  pr=27790
  title="DOC minor fixes of splitter docstrings (from #26423)"
%}

{% include projects/ossd/sklearn-item.html
  pr=27472
  title="DOC fix return type of make_sparse_spd_matrix"
%}

{% include projects/ossd/sklearn-item.html
  pr=26661
  title="DOC show usage of __ in Pipeline and FeatureUnion"
%}

{% include projects/ossd/sklearn-item.html
  pr=26610
  title="DOC search link to sphinx version"
%}

{% include projects/ossd/sklearn-item.html
  pr=26018
  title="DOC fix SplineTransformer include_bias docstring"
%}


<!-- Include some additional scripts for item folding/unfolding -->
{% include projects/ossd/scripts.html %}
