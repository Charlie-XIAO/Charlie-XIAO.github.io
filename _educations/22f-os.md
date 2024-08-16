---
layout: distill
title: Operating Systems
description: CSCI-UA.0202
importance: 102  # Undergraduate courses are 1xx, important major courses 102
category: Computer Science (NYU)

shortcuts:
  - name: Notes
    icon: fa-solid fa-file
    link: /assets/pdf/educations/22f-os-notes.pdf
  - name: Lab 2
    icon: fa-brands fa-github
    link: https://gitfront.io/r/Charlie-XIAO/jwtwvd6UYbWL/Shell-nyush/
  - name: Lab 3
    icon: fa-brands fa-github
    link: https://gitfront.io/r/Charlie-XIAO/ftboF2oUd5yt/Encoder-nyuenc/
  - name: Lab 4
    icon: fa-brands fa-github
    link: https://gitfront.io/r/Charlie-XIAO/j2q46W3w8FUF/FileRecovery-nyufile/

toc:
  - name: Course Information
  - name: Gradebook
  - name: Labs
    subsections:
      - name: "Lab 2: nyush"
      - name: "Lab 3: nyuenc"
      - name: "Lab 4: nyufile"

course_information:
  Instructor: <a href="https://ytang.com/">Yang Tang</a>.
  Semester: Fall 2022.
  Outline: >
    High-level design of key operating system concepts using Linux as an example;
    Process scheduling, process synchronization;
    Deadlocks and their prevention;
    I/O, file systems;
    Memory management, paging, segmentation;
    Security and protection.
  Programming Language: C.

grade:
  letter: "A"
  actual: "4.00"
  total: "4.00"

gradebook_cols:
  - Grade
  - Letter

gradebook:
  Assignments: ["10/10", "A"]
  Labs: ["48.5/50", "A"]
  Midterm: ["89.5/101", "A"]
  Final: ["82/100", "A"]
---

{% include educations/course_information.md %}
{% include educations/gradebook.md %}

## Labs

### Lab 2: nyush

[Shell-nyush](https://gitfront.io/r/Charlie-XIAO/jwtwvd6UYbWL/Shell-nyush/), a.k.a. **N**ew **Y**et **U**sable **Sh**ell, is an implementation of a simple version of the Linux shell. It is an interactive command-line program, involving process creation, destruction, and management, signal handling, and I/O redirection. Basic functionality include:

- Program locating and execution.
- Process termination and suspension.
- Signal handling.
- I/O redirection (including piping).
- Built-in commands (including `cd`, `exit`, `jobs`, and `fg`).

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/educations/22f-os-lab2.png"
      class="img-fluid rounded z-depth-1"
      caption="Example usages of <code>nyush</code>."
      zoomable=true
    %}
  </div>
</div>

You may access the source code [here](https://gitfront.io/r/Charlie-XIAO/jwtwvd6UYbWL/Shell-nyush/), and note that you should run it in a Linux environment.

### Lab 3: nyuenc

[Encoder-nyuenc](https://gitfront.io/r/Charlie-XIAO/ftboF2oUd5yt/Encoder-nyuenc/), a.k.a. **N**ot **Y**our **U**sual **Enc**oder, is an implementation of a parallelized [run-length encoding](https://en.wikipedia.org/wiki/Run-length_encoding) (RLE). Multiple threads are created to encode in parallel, leading to better performance. In order to avoid frequent creation and destruction of threads, a [thread pool](https://en.wikipedia.org/wiki/Thread_pool) is implemented to maintain a certain number of threads, specified by a flag. [POSIX threads](https://en.wikipedia.org/wiki/Pthreads) is used in this lab, and mutual exclusions and conditional variables are used for elimination of race conditions. Basic functionality include:

- Supports a `-j` flag. If specified, the corresponding number of threads will be initialized in a thread pool. Otherwise, the encoding will be done sequentially.

- Implements [run-length encoding](https://en.wikipedia.org/wiki/Run-length_encoding) (RLE).

- Free of race conditions or busy waiting among threads to achieve high and stable parallelization.

Some benchmarking statistics are shown as follows:

<div class="table-responsive">
  <table data-toggle="table">
    <thead>
      <tr>
        <th>Size (MB)</th>
        <th>Threads</th>
        <th>Time (s)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>100</td>
        <td>1</td>
        <td>2.982</td>
      </tr>
      <tr>
        <td>100</td>
        <td>3</td>
        <td>1.026</td>
      </tr>
      <tr>
        <td>1000</td>
        <td>3</td>
        <td>5.206</td>
      </tr>
    </tbody>
  </table>
</div>

You may access the source code [here](https://gitfront.io/r/Charlie-XIAO/ftboF2oUd5yt/Encoder-nyuenc/), and note that you should run it in a Linux environment.

### Lab 4: nyufile

[FileRecovery-nyufile](https://gitfront.io/r/Charlie-XIAO/j2q46W3w8FUF/FileRecovery-nyufile/), a.k.a, **N**eed **Y**ou to **U**ndelete My **File**, is a program for recovering deleted files in a FAT32 file system. Its usage is as follows:

{% highlight plaintext %}
Usage: ./nyufile disk <options>
    -i                          Print the file system information.
    -l                          List the root directory.
    -r filename [-s sha1]       Recover a contiguous file.
    -R filename -s sha1         Recover a possibly non-contiguous file.
{% endhighlight %}

Basic functionality include:

- Adapts to different configurations of FAT32 disks.

- Provides reliable file recovery as long as the file contents are not rewritten.

- Searches by file size for contiguously allocated fata blocks and recovers the file.

- Searches by brute force permutation for non-contiguously allocated data blocks given the SHA1 hash of the file contents and recovers the file.

You may access the source code [here](https://gitfront.io/r/Charlie-XIAO/j2q46W3w8FUF/FileRecovery-nyufile/), and note that you should run it in a Linux environment.
