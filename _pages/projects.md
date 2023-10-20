---
layout: page
title: Projects
permalink: /projects/
description: Collection of my projects, including dumb ones 🙃.
nav: true
nav_order: 2
display_categories: [Open Source Development, Academic, Work, Course Projects]
---

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
    <h2 class="category">{{ category }}</h2>
    {%- assign categorized_projects = site.projects | where: "category", category -%}
    {%- assign sorted_projects = categorized_projects | sort: "importance" %}
    <!-- Generate container for each project -->
    <ol class="container">
      {%- for project in sorted_projects -%}
        <li><div class="row">{% include projects.html %}</div></li>
      {%- endfor %}
    </ol>
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate container for each project -->
  <ol class="container">
    {%- for project in sorted_projects -%}
      <li><div class="row">{% include projects.html %}</div></li>
    {%- endfor %}
  </ol>
{%- endif -%}

</div>
