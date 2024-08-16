---
layout: distill
title: Scikit-learn website rework
description: A brief walk-through of some significant changes in the new theme
tags: scikit-learn
categories: open-source
date: 2024-08-15

authors:
  - name: Yao Xiao
    url: "https://charlie-xiao.github.io/"
    affiliations:
      name: NYU Shanghai

toc:
  - name: Dark Theme
  - name: Reworked API Pages
  - name: Reworked Dropdowns
  - name: Reworked Installation Guide
  - name: Conclusion
---

The [scikit-learn main website](https://scikit-learn.org/1.5/) has got a brand-new appearance since version 1.5, with migration to the [PyData Sphinx theme](https://pydata-sphinx-theme.readthedocs.io/en/stable/) along with other UI/UX improvements. Thanks for the theme developers and whoever involved in the conversations. You may want to check out [#28084](https://github.com/scikit-learn/scikit-learn/issues/28084) that tracked the migration progress and [#29038](https://github.com/scikit-learn/scikit-learn/pull/29038) that did the final merge.

## Dark Theme

PyData theme has built-in support for [light and dark themes](https://pydata-sphinx-theme.readthedocs.io/en/stable/user_guide/light-dark.html) as well as the theme switcher. In particular we adapted dark theme support for our customized landing page as well, while retaining the old appearance as much as possible. See [#28331](https://github.com/scikit-learn/scikit-learn/pull/28331) for technical details.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/posts/sklearn-pydata-theme/index-light-mode.png"
      class="img-fluid rounded z-depth-1"
      caption="Light Theme."
      zoomable=true
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/posts/sklearn-pydata-theme/index-dark-mode.png"
      class="img-fluid rounded z-depth-1"
      caption="Dark Theme."
      zoomable=true
    %}
  </div>
</div>

## Reworked API Pages

The [API pages](https://scikit-learn.org/1.5/api/index.html) are reworked. In particular, the index page now contains a search-as-you-type table of all APIs powered by [DataTables](https://datatables.net/), and the primary sidebar now lists APIs in hierarchy. Moreover within each API page, the secondary sidebar now has links to all methods and gallery examples (if any). All these UI/UX changes are meant to provide better navigation experience. See [#28428](https://github.com/scikit-learn/scikit-learn/pull/28428) for technical details.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/posts/sklearn-pydata-theme/api-index.png"
      class="img-fluid rounded z-depth-1"
      caption="API index page with the searchable table."
      zoomable=true
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/posts/sklearn-pydata-theme/api-page.png"
      class="img-fluid rounded z-depth-1"
      caption="Enhanced sidebar navigation per API page."
      zoomable=true
    %}
  </div>
</div>

## Reworked Dropdowns

The dropdowns (i.e., folded sections) were redesigned based on the dropdown feature of [Sphinx Design](https://sphinx-design.readthedocs.io/en/pydata-theme/). Except for all its built-in features, we implemented permalink anchor for each dropdowns and the *toggle all dropdowns* functionality. The latter is because certain browsers (e.g., Firefox) does not search into collapsed dropdowns, so we provide the ability to unfold all with one click. See [#28401](https://github.com/scikit-learn/scikit-learn/pull/28401) for technical details.

## Reworked Installation Guide

The [installation guide](https://scikit-learn.org/1.5/install.html) is reworked. In particular, the previous implementation for switching between instructions for different operating systems and package managers was minimal and unpolished. With the tabs feature of [Sphinx Design](https://sphinx-design.readthedocs.io/en/pydata-theme/) along with some customizations, we worked out the new more native-looking and powerful installation guide. See [#28336](https://github.com/scikit-learn/scikit-learn/pull/28336) for technical details.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/posts/sklearn-pydata-theme/install.png"
      class="img-fluid rounded z-depth-1"
      caption="The reworked installation guide."
      zoomable=true
    %}
  </div>
</div>

## Enhanced Gallery UI

Previously the badge links to JupyterLite and Binder launchers as well as the download links of Python source code and Jupyter notebooks lived at the bottom of each page, with a hint at the top of the page linking to the bottom. With the three-column layout of the PyData theme, these information are all  moved to the secondary sidebar (on the right side) for better UI/UX. See [#28512](https://github.com/scikit-learn/scikit-learn/pull/28512) for technical details of our temporary workaround and [sphinx-gallery/sphinx-gallery#1312](https://github.com/sphinx-gallery/sphinx-gallery/pull/1312) for my better solution upstream.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/posts/sklearn-pydata-theme/gallery-page.png"
      class="img-fluid rounded z-depth-1"
      caption="A gallery page with badges and download links in the sidebar."
      zoomable=true
    %}
  </div>
</div>

## Conclusion

There are many more small improvements in the website and technical details that I want to share, but due to the limited space, I encourage you to visit the [scikit-learn website](https://scikit-learn.org/) and explore the new theme yourself. We are still continuously making improvements to our docs, and new versions of dependencies sometimes break out customizations. Feel free to report in the [scikit-learn issue tracker](https://github.com/scikit-learn/scikit-learn/issues) if you have nice ideas for improvements or if you have found anything broken. Many thanks again to the theme developers and people involved!
