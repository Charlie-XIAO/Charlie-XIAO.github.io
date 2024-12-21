---
layout: page
title: Column-Store DBMS
description: A Main-Memory Optimized Column-Store Database System
img: assets/img/projects/165-dbms.png
importance: 4
category: Research and Academic
toc:
  beginning: true

shortcuts:
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/Charlie-XIAO/165-dbms
---

This is the course project for [Harvard CS165 (Fall 2024)](http://daslab.seas.harvard.edu/classes/cs165/index.html). It is a main-memory optimized column-store database system built in C (also with partial reimplementation in Rust). Check out the [repository](https://github.com/Charlie-XIAO/165-dbms) for more details.

The system supports all queries specified in the [CS165 domain-specific language](http://daslab.seas.harvard.edu/classes/cs165/project.html). Essentially most basic SQL queries (create, load, insert, delete, update, select, aggregate, join, etc.) are supported with proper translation into the CS165 DSL. Some highlights include:

- Streamlined CSV parsing cache-aware chunked loading, achieving over **4x** speedup than the non-optimized version for 100M rows and 4 columns of data.
- Cache-aware shared scan for batchable queries and parallelized processing between chunks (supported for select and aggregate), achieving over **20x** speedup for 100M rows of data and 100 batchable select queries.
- Column indexes (sorted and B+ tree, clustered and unclustered). B+ tree index creation has minimal overhead (less than 20ms on column with 100M rows of data) by presorting and bulk loading. Select queries with can achieve over **25x** speedup when low selectivity (~5%) on 100M rows of data.
- Parallelized radix hash join, achieving over **8x** speedup over naive hash join on 100M x 100M data with 80% selectivity. Note that the naive hash join is already nearly **200x** faster than nested loop join with just 10% selectivity (the latter takes too long with 80% selectivity and is not measured).
- SIMD/AVX2 optimizations.
