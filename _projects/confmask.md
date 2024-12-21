---
layout: page
title: ConfMask
description: Privacy-Preserving Configuration Sharing (SIGCOMM'24)
img: assets/img/projects/confmask.png
importance: 1
category: Research and Academic
toc:
  beginning: true

shortcuts:
  - name: Paper
    icon: fa-solid fa-file
    link: https://doi.org/10.1145/3651890.3672217
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/Confmask/Confmask
  - name: Video
    icon: fa-solid fa-video
    link: https://youtu.be/xIbgbZtuO7Q
---

Real-world network configurations play a critical role in network management and research tasks. While valuable, data holders often hesitate to share them due to business and privacy concerns. Existing methods are deficient in concealing the implicit information that can be inferred from configurations, such as topology and routing paths. To address this, we present ConfMask, a novel framework designed to systematically anonymize network topology and routing paths in configurations. Our approach tackles key privacy, utility, and scalability challenges, which arise from the strong dependency between different datasets and complex routing protocols. Our anonymization algorithm is scalable to large networks and effectively mitigates de-anonymization risk. Moreover, it maintains essential network properties such as reachability, waypointing and multi-path consistency, making it suitable for a wide range of downstream tasks. Compared to existing dataplane anonymization algorithm (i.e., NetHide), ConfMask reduces ~75% specification differences between the original and the anonymized networks.

This work was accepted to [SIGCOMM 2024](https://conferences.sigcomm.org/sigcomm/2024/). Check out our [full paper](https://doi.org/10.1145/3651890.3672217) for more details and [artifacts](https://github.com/Confmask/Confmask) for reproduction of experiment results.
