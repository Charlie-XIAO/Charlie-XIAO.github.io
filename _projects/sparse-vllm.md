---
layout: page
title: SpvLLM
description: Efficient KV Cache Sparsification in vLLM
img: assets/img/projects/sparse-vllm.png
importance: 4
category: Research and Academic
toc:
  beginning: true

shortcuts:
  - name: Report
    icon: fa-solid fa-paper
    link: /assets/pdf/projects/sparse-vllm.pdf
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/Charlie-XIAO/sparse-vllm
---

The accelerated scaling of large language models (LLMs) requires efficient memory management techniques. vLLM
reduces memory fragmentation in LLM inference by proposing a PagedAttention mechanism whereby a virtual memory similar to the ones used in operating systems memory paging is used. However, as LLMs handle longer contexts and generate longer sequences, the KV cache still occupies a substantial amount of memory. To optimize memory usage, KV cache sparsification techniques are employed to evict less important tokens based on attention scores. The eviction leads to internal fragmentation which negatively impacts performance. Freeing blocks whose slots are all evicted alleviates the problem but still suffers from internal fragmentation. Copying non-evicted KV cache to newly allocated memory blocks solves the fragmentation issue, but incurs copying overhead that further leads to preemption, degrading its performance. In this paper, we propose SpvLLM that not only frees fully deactivated blocks, but also reuses freed slots of partially deactivated blocks, reducing internal fragmentation by up to 55.7% and achieving up to 2.21x higher end-to-end throughput and 48.9% lower latency.

This project is still under construction. Check out the [partial report](/assets/pdf/projects/sparse-vllm.pdf) as of the [Harvard CS243 (Fall 2024)](https://github.com/minlanyu/cs243-site/tree/fall2024) course and the [code repository](https://github.com/Charlie-XIAO/sparse-vllm) for mode details.
