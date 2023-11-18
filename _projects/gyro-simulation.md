---
layout: distill
title: Gyro-Tower Simulation
description: Modeling of a Tower of Gyroscopes
img: assets/img/gyro-simulation.jpg
importance: 10
category: Course Projects

shortcuts:
  - name: Paper
    link: /assets/pdf/projects/gyro-simulation.pdf
  - name: Code
    link: https://github.com/Charlie-XIAO/Gyro-simulation
  - name: Demo
    link: https://drive.google.com/drive/u/0/folders/1UpQE-VyRK9DaUnWq8wOW_s7JVZEpMOUg

authors:
  - name: Yao Xiao
    url: "https://charlie-xiao.github.io/"
    affiliations:
      name: NYU Shanghai
  - name: Feiyang Lu
    affiliations:
      name: NYU Shanghai

toc:
  - name: Overview
  - name: Results
  - name: Conclusions
---

## Overview

The question we want to explore in this project is whether stacking up gyroscopes will remain a stable structure given each of them can spin stably. The simulation is done by numerical approximations implemented using MATLAB, involving the implementation of spring networks and rigid body systems.

## Results

You may access our GitHub source code [here](https://github.com/Charlie-XIAO/Gyro-simulation). Our presentation slides and experimental results can be found [here](https://drive.google.com/drive/u/0/folders/1UpQE-VyRK9DaUnWq8wOW_s7JVZEpMOUg). Our technical report is titled [Simulation of a Tower of Gyroscopes](/assets/pdf/projects/gyro-simulation.pdf).

## Conclusions

The major discovery is that gyrotowers of arbitrary height can always stand given radius and/or angular velocity sufficiently large. This is because in our simulation, the axles of the gyroscopes are not necessarily aligned, so extra angular momentum can be produced to maintain the gyroscopic property. If the axles of the gyroscopes are aligned using a rigid body, then the gyrotower will fall.
