---
layout: page
permalink: /education/
title: Education
description: A partial collection of the courses I have taken.
nav: true
nav_order: 1
display_categories: [Computer Science, Honors Mathematics]
---

<!-- pages/education.md -->
<div class="education">
{%- if site.enable_education_categories and page.display_categories %}
  <!-- Display categorized education -->
  {%- for category in page.display_categories %}
    <h2 class="category">{{ category }}</h2>
    {%- assign categorized_education = site.education | where: "category", category -%}
    {%- assign sorted_education = categorized_education | sort: "importance" %}
    <!-- Generate cards for each education -->
    <div class="container">
      <div class="row row-cols-2">
      {%- for education in sorted_education -%}
        {% include education.html %}
      {%- endfor %}
      </div>
    </div>
  {% endfor %}

{%- else -%}
<!-- Display education without categories -->
  {%- assign sorted_education = site.education | sort: "importance" -%}
  <!-- Generate cards for each education -->
  <div class="container">
    <div class="row row-cols-2">
    {%- for education in sorted_education -%}
      {% include education.html %}
    {%- endfor %}
    </div>
  </div>
{%- endif -%}

</div>
