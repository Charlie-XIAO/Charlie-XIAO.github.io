---
layout: distill
title: YouTube Inferface Customizer
description: Firefox Extension
img: assets/img/projects/youtube-interface-customizer.jpg
importance: 1000
category: Softwares

shortcuts:
  - name: <img src="https://img.shields.io/badge/Firefox-141e24.svg?&style=for-the-badge&logo=firefox-browser&logoColor=white" alt="youtube-interface-customizer">
    link: https://addons.mozilla.org/firefox/downloads/file/4069744/438bf7e9f2714ba58ac1-1.0.xpi
  - name: Code
    icon: fa-brands fa-github
    link: https://github.com/ossd-s23/YouTube-Customizer/

toc:
  - name: Installation
  - name: Features
    subsections:
      - name: General
      - name: Homepage
      - name: Navigation Bar
      - name: Video Player
  - name: Support
  - name: Contribution
  - name: License
---

This is an [open source](https://github.com/ossd-s23/YouTube-Customizer) Firefox extension that allows you to customize a wide variety of elements of the YouTube interface in your favor.

## Installation

{% include projects/youtube-interface-customizer/installation.md %}

## Features

The outline of the features of YouTube Interface Customizer is as follows:

{% include projects/youtube-interface-customizer/feature-list.md %}

### General

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/general-sky.png"
      class="img-fluid rounded z-depth-1"
      caption="Bright Sky theme."
      zoomable=true
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/general-earth.png"
      class="img-fluid rounded z-depth-1"
      caption="Cute Earth theme."
      zoomable=true
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/general-valentine.png"
      class="img-fluid rounded z-depth-1"
      caption="Petite Valentine theme."
      zoomable=true
    %}
  </div>
</div>

### Homepage

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-all.png"
      class="img-fluid rounded z-depth-1"
      caption="You can hide all video suggestions on the homepage to focus."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-ad.png"
      class="img-fluid rounded z-depth-1"
      caption="Instead, you can hide only advertisements on the homepage."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-specialsecs.png"
      class="img-fluid rounded z-depth-1"
      caption="You may also hide specific sections. For instance, if you choose to hide Free Primitive movies, then the whole section in the red box will disappear. Supported special sections to hide include but are not limited to news, shorts, and Primetime suggestions. The listed special sections can be individually hidden while other special sections can only be hidden globally."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-rows.png"
      class="img-fluid rounded z-depth-1"
      caption="One other common usage of this functionality is to show only a specified number of rows of video recommendations on the homepage. Note that this example is showing only one row of video suggestions, applied together with hide special sections. Otherwise, the special sections will not be counted in the number of rows and will be displayed."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-header.png"
      class="img-fluid rounded z-depth-1"
      caption="Now we can customize the homepage layout. For instance, we can hide the header that shows the areas you may be interested in."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-thumbnail.png"
      class="img-fluid rounded z-depth-1"
      caption="Also, to make the homepage cleaner and avoid distractions, we can hide the video thumbnails. However, note that the video thumbnails of the advertisements cannot be hidden by this functionality. You may, however, simply hide the advertisements completely."
      zoomable=true
    %}
  </div>
</div>

### Navigation Bar

- **Customize color - Text and icons:** This changes the color of all the text and icons in the left navigation bar, except for the footer and the profile images. Only a limited choices of colors are supported currently.

- **Redirect YouTube Logo:** This redirects the YouTube logo on the top left corner of the YouTube website. We currently support redirection to Home (default), Shorts, Subscriptions, History, Library, Watch Later, and Liked Videos.

- **Hide buttons and sections:** You can hide the entire navigation bar. We also support hiding each button and section individually. This includes the Home/Explore/Shorts/Subscriptions buttons, the Library and quicklinks/Subscriptions/Explore/More from YouTube/Settings and more sections, and the footer.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/homepage-hide-navbar.png"
      class="img-fluid rounded z-depth-1"
      caption="In this example, we hide the entire navigation bar."
      zoomable=true
    %}
  </div>
</div>

### Video Player

- **Customize the srubber:** The scrubbers can be customized as GIF images. We currently support Pusheen, Pikachu, and Capoo.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/pusheen.gif"
      class="img-fluid rounded z-depth-1"
      caption="Pusheen scrubber."
      zoomable=false
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/pikachu.gif"
      class="img-fluid rounded z-depth-1"
      caption="Pikachu scrubber."
      zoomable=false
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/capoo.gif"
      class="img-fluid rounded z-depth-1"
      caption="Capoo scrubber."
      zoomable=false
    %}
  </div>
</div>

- **Customize the progress bar:** We currently support Cherry (best fit with Pusheen), Poké Ball (best fit with Pikachu), and Light Blue (best fit with Capoo). However, users are free to customize their own combinations.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/vidplayer-pusheen.png"
      class="img-fluid rounded z-depth-1"
      caption="Cherry with Pusheen."
      zoomable=true
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/vidplayer-pikachu.png"
      class="img-fluid rounded z-depth-1"
      caption="Poké Ball with Pikachu."
      zoomable=true
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/vidplayer-capoo.png"
      class="img-fluid rounded z-depth-1"
      caption="Light Blue with Capoo."
      zoomable=true
    %}
  </div>
</div>

- **Hide the end-of-video suggestions:** This blocks the end-of-video suggestions from generating in order to focus.

- **Hide the Like button and more:** This supports hiding the Like/Dislike button, the Share button, the Clip button, and the More button.

- **Hide the merch shelf:** YouTube video player sometimes generates a merch shelf below the video meta information. This functionality would prevent the entire merch shelf from appearing.

- **Hide video comments:** This supports hiding all video comments, hiding comment actions, and hiding comment replies.

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/vidplayer-hide-comments.png"
      class="img-fluid rounded z-depth-1"
      caption="We can hide all the comments, since comments are sometimes distracting."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/vidplayer-hide-actions.png"
      class="img-fluid rounded z-depth-1"
      caption="Alternatively, we can keep the comments but hide the actions. Note that this hides all comment actions including liking (and like count), disliking, and replying."
      zoomable=true
    %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid
      path="assets/img/projects/youtube-interface-customizer/vidplayer-hide-replies.png"
      class="img-fluid rounded z-depth-1"
      caption="Finally, we can hide the replies to the comments. This can in fact be used together with hiding the actions, so that only the original comment texts are displayed."
      zoomable=true
    %}
  </div>
</div>

## Support

If you encounter any issues while using the extension, feel free to submit an issue on the [GitHub issue tracker](https://github.com/ossd-s23/YouTube-Customizer/issues). If you want to provide any suggestion or feedback, or report any bug, you can also fill out [this form](https://forms.gle/gPhK9o5SXBqGF5qB9). We will read your feedback and do our best to resolve your issues as soon as possible.

## Contribution

This is an open source project and we welcome your contributions. For details, please visit the [contribution document](https://github.com/ossd-s23/YouTube-Customizer/blob/main/CONTRIBUTING.md). Also see the [Code of Conduct](https://github.com/ossd-s23/YouTube-Customizer/blob/main/CODE_OF_CONDUCT.md) for community behavior. Here are some brief contributing guidelines:

- **Code of Conduct:** This project adheres to the [Code of Conduct](https://github.com/ossd-s23/YouTube-Customizer/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

- **Bugs and feature requests:** To report a bug or request a new feature, please use the [GitHub issue tracker](https://github.com/ossd-s23/YouTube-Customizer/issues). When reporting a bug, please include as much information as possible, such as the version of the extension you are using, the browser version, and steps to reproduce the issue. The above also applies to bugs reporting and feature requests via submitting .

- **Submitting changes:** We use the GitFlow branching model for our development process. To contribute, follow these steps:

  1. Fork the repository.
  2. Create a new branch from the develop branch.
  3. Make your changes.
  4. Run the tests to make sure your changes do not introduce any new bug.
  5. Commit your changes with a descriptive message.
  6. Push the branch to your fork.
  7. Create a pull request to the develop branch of the original repository.

- **Styleguides:** For JavaScript, we use the [JavaScript Standard Style](https://standardjs.com/). For HTML and CSS, we use the [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html).

## License

**Youtube Interface Customizer** is licensed under the [Mozilla Public License 2.0](https://github.com/ossd-s23/YouTube-Customizer/blob/main/LICENSE).
