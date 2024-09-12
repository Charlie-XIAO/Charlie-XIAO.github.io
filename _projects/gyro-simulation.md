---
layout: page
title: Gyro-Tower Simulation
description: Math Modeling
img: assets/img/projects/gyro-simulation.jpg
importance: 1000
category: Other Projects
toc:
  beginning: true

shortcuts:
  - name: Paper
    icon: fa-solid fa-file
    link: /assets/pdf/projects/gyro-simulation.pdf
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/Charlie-XIAO/Gyro-simulation
  - name: Demo
    icon: fa-solid fa-video
    link: https://drive.google.com/drive/u/0/folders/1UpQE-VyRK9DaUnWq8wOW_s7JVZEpMOUg
---

## Overview

The question we want to explore in this project is whether stacking up gyroscopes will remain a stable structure given each of them can spin stably. The simulation is done by numerical approximations implemented using MATLAB, involving the implementation of spring networks and rigid body systems.

## Results

You may access our GitHub source code [here](https://github.com/Charlie-XIAO/Gyro-simulation). Our presentation slides and experimental results can be found [here](https://drive.google.com/drive/u/0/folders/1UpQE-VyRK9DaUnWq8wOW_s7JVZEpMOUg). Our technical report is titled [Simulation of a Tower of Gyroscopes](/assets/pdf/projects/gyro-simulation.pdf).

## Conclusions

The major discovery is that gyrotowers of arbitrary height can always stand given radius and/or angular velocity sufficiently large. This is because in our simulation, the axles of the gyroscopes are not necessarily aligned, so extra angular momentum can be produced to maintain the gyroscopic property. If the axles of the gyroscopes are aligned using a rigid body, then the gyrotower will fall.
