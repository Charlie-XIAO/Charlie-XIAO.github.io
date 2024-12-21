---
layout: page
title: Symmetric Tridiagonal Eigensolvers
description: A Comparative Analysis of Different LAPACK STEV* Routines
img: assets/img/projects/eigensolvers.png
importance: 2
category: Applied Math
toc:
  beginning: true

shortcuts:
  - name: Report
    icon: fa-solid fa-file
    link: /assets/pdf/projects/eigensolvers.pdf
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/Charlie-XIAO/eigensolvers
---

Eigenproblems on symmetric tridiagonal matrices are a cornerstone of numerical linear algebra, with applications spanning physics, engineering, and data science. LAPACK, a widely adopted library for linear algebra computations, offers multiple routines for solving these eigenproblems, each leveraging distinct algorithms with varying computational complexities and performance characteristics. This report provides a comparative analysis of the LAPACK routines STEV, STEVD, STEVX, and STEVR. Through synthetic and real-world matrices, we evaluate their performance and accuracy under different scenarios.

Check out the [full report](/assets/pdf/projects/eigensolvers.pdf) for more details and the [repository](https://github.com/Charlie-XIAO/eigensolvers) for reproducing the experiment results.
