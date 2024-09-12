## Gradebook

**Overall grade:** {{ page.grade.letter }} ({{ page.grade.actual }}/{{ page.grade.total }})

<table data-toggle="table" data-classes="table table-hover table-sm">
  <thead>
    <tr>
      <th>Item</th>
      <!-- Assign to -1 because the later loop needs (n_cols - 1) for indexing-->
      {% assign n_cols = -1 %}
      {% for colname in page.gradebook_cols %}
        <th>{{ colname }}</th>
        {% assign n_cols = n_cols | plus: 1 %}
      {% endfor %}
    </tr>
  </thead>
  <tbody>
    {% for data in page.gradebook %}
      <tr>
        <td>{{ data[0] }}</td>
        {% for i in (0..n_cols) %}
          <td>{{ data[1][i] }}</td>
        {% endfor %}
      </tr>
    {% endfor %}
  </tbody>
</table>

<p></p>
