---
layout: page
title: Scikit-learn
description: Python Library for Machine Learning
img: assets/img/projects/scikit-learn.jpg
importance: 1
category: Open Source
toc:
  beginning: true

shortcuts:
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/scikit-learn/scikit-learn
  - name: Contributions
    icon: fa-brands fa-github
    link: https://github.com/scikit-learn/scikit-learn/pulls?q=is%3Apr+is%3Amerged+author%3ACharlie-XIAO

_styles: >
  div.sklearn-prs ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style-position: inside;
    padding-left: 10px;
  }

  div.sklearn-prs ul > li {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
---

This is the collection of my open source contributions to [scikit-learn](https://scikit-learn.org/stable/), a Python module for machine learning. It has its code base maintained on [GitHub](https://github.com/scikit-learn/scikit-learn), with over 2500 contributors.

I am currently a core developer of scikit-learn and also a member of its documentation team. You may check out [the people behind scikit-learn](https://scikit-learn.org/dev/about.html#the-people-behind-scikit-learn), my [blog interview on board](https://blog.scikit-learn.org/team/yao-interview/), and my current [contributor ranking](https://github.com/scikit-learn/scikit-learn/graphs/contributors).

## Partial Contributions

Here I will list some of my non-trivial contributions and experiences that I want to share.

- `neighbors.KernelDensity` may change its behavior in a future version! Check out [this blog post](/blog/2024/scikit-learn-kde/) to see why.
- I led the rework of the scikit-learn main website, deployed since version 1.5. Check out [this blog post](/blog/2024/scikit-learn-website-rework/) for more details.

## List of Merged PRs

You may also check my [merged PRs](https://github.com/scikit-learn/scikit-learn/pulls?q=is%3Apr+is%3Amerged+author%3ACharlie-XIAO) and [conversations involved](https://github.com/scikit-learn/scikit-learn/pulls?q=involves%3ACharlie-XIAO) on GitHub.

<div class="sklearn-prs">

{% capture sklearn_prs %}
{% include projects/scikit-learn-prs.md %}
{% endcapture %}

{{ sklearn_prs | markdownify }}

</div>
