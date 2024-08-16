## Course information

{% for data in page.course_information %}

- **{{ data[0] }}:** {{ data[1] }}
  {% endfor %}
