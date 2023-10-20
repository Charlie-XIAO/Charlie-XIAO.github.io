---
layout: distill
title: pandas
description: Open Source Contributions
img: assets/img/pandas-logo.jpg
importance: 10
category: Open Source Development

authors:
  - name: Yao Xiao
    url: "https://charlie-xiao.github.io/"
    affiliations:
      name: NYU Shanghai

bibliography: projects-ossd-pandas.bib

shortcuts:
  - name: Rank
    link: https://github.com/pandas-dev/pandas/graphs/contributors
  - name: Contributions
    link: https://github.com/pandas-dev/pandas/commits?author=Charlie-XIAO

toc:
  - name: Code Contributions
    subsections:
      - name: Groupby
      - name: IO
      - name: Missing Data
      - name: Numeric
      - name: Resample
      - name: Reshaping
  - name: Maintenance Contributions
  - name: Documentation Contributions
---

{% include shortcuts.html %}

This is the collection of my open source contributions to [pandas](https://pandas.pydata.org/), a powerful data analysis toolkit in Python.<d-cite key="pandas"></d-cite> It has its code base maintained on [GitHub](https://github.com/pandas-dev/pandas), with nearly 3000 contributors.

I have made [24 pull requests](https://github.com/pandas-dev/pandas/commits?author=Charlie-XIAO) that have been merged into the code base of pandas. Currently I am the [Top #78 contributor](https://github.com/pandas-dev/pandas/graphs/contributors) to pandas, with **1297** lines of addition and **295** lines of deletion.

## Code Contributions

Items in each section are sorted in reverse chronological order by the time of merge.

### Groupby

{% capture projects_ossd_pandas_description_53623 %}
Previously when calling <code>sum</code> on a GroupBy object, it summed <code>inf+inf</code> and <code>(-inf)+(-inf)</code> to <code>nan</code>, which is undesired.
Moreover, this behavior was inconsistent with calling <code>apply</code> on a standard summation function.
The problem was caused by the Cython function <code>group_sum</code>, which implements <a href="https://en.wikipedia.org/wiki/Kahan_summation_algorithm">Kahan's summation</a> to reduce numerical error caused by finite-precision floating-point operations.
It maintains a compensation for low-order bits, and fix the excess in further rounds, which can be interpreted as follows.
{% highlight plaintext %}
var y = input[i] - c
var t = sum + y
c = (t - sum) - y    // c is initialized to zero before the loop
sum = t              // sum is initialized to zero before the loop
next i
{% endhighlight %}
In the case where input is <code>inf</code>, then <code>y</code> and <code>t</code> would become <code>inf</code>,
and thus when computing <code>c</code>, <i>i.e.</i>, the compentation, we would be performing <code>inf-inf</code> which gives <code>nan</code>.
To fix this, we can set the compensation back to zero whenever it becomes <code>nan</code>.
Also note that for efficiency, this Cython function is written with nogil so that we cannot use <code>util.is_nan</code>.
Instead, we can use <code>c != c</code> to represent <code>util.is_nan(c)</code>.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53623
  title="BUG: groupby sum turning inf+inf and (-inf)+(-inf) into nan"
  description=projects_ossd_pandas_description_53623
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53517 %}
When we traverse a GroupBy object like <code>for k, v in df.groupby(["a"])</code>,
even though <code>["a"]</code> is a list of a single element, the returned keys are tuples.
However, after column selection such as <code>for k, v in df.groupby(["a"])["a"]</code> or <code>for k, v in df.groupby(["a"])[["a"]]</code>,
the returned keys <code>k</code> were no longer tuples.
This is undesired, and caused by keys getting lost from the very beginning when creating the GroupBy objects.
With <a href="https://github.com/rhshadrach">@rhshadrach</a>'s help, I fixed this by passing keys explicitly instead of using groupers to imply keys.
Now the behaviors with and without column selection are consistent.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53517
  title="FIX groupby with column selection not returning tuple when grouping by list of a single element"
  description=projects_ossd_pandas_description_53517
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53237 %}
When <code>groupby</code> is called with <code>as_index=False</code>,
the group labels of the aggregated output should be columns rather than index, which is effectively SQL-style.
However, if the aggregation functions are passed in as a list, <code>as_index</code> is not respected.
I modified the logic of result processing so that this bug is fixed.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53237
  title="BUG DataFrameGroupBy.agg with list not respecting as_index=False"
  description=projects_ossd_pandas_description_53237
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53049 %}
Previously, even if <code>groupby</code> is called with <code>sort=False</code>, the indices may get sorted. For instance,
{% highlight python %}
>>> ind = pd.MultiIndex.from_tuples(
...     [(0, "B"), (0, "A"), (1, "B"), (1, "A")],
...     names=["sample", "category"],
... )
>>> ser = pd.Series(range(4), index=ind)
>>> ser  # Here, we shall see that the B's are all before the A's
sample  category
0       B           0
        A           1
1       B           2
        A           3
dtype: int64
>>> grp = ser.groupby(level="category", sort=False).quantile([0.2, 0.8])
>>> grp.unstack()  # Here, we can see that A and B are sorted though sort=False
          0.2  0.8
category
A         1.4  2.6
B         0.4  1.6
{% endhighlight %}
After investigating, this is caused by <code>index.levels</code> being sorted, and some methods are using those levels.
This does not happen for <code>MultiIndex</code> since the index levels are manually created, so we manually create for non-multi <code>Index</code> as well.
Then we found an approximately 50% performance regression due to always using 64-bit indices.
We then called <code>coerce_indexer_dtype</code> to avoid this regression.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53049
  title="BUG: GroupBy.quantile implicitly sorts index.levels"
  description=projects_ossd_pandas_description_53049
%}

<!-- ====================================================================== -->

### IO

{% capture projects_ossd_pandas_description_53844 %}
This is related to <a href="https://github.com/pandas-dev/pandas/pull/53764">pandas-dev/pandas#53764</a>.
Previously in that PR (also made by me), I considered nan of complex dtype simply as <code>nan+0.0j</code>, but this is incorrect.
Both the real and imaginary part can be nan, and either of these parts being nan will lead to <code>util.is_nan</code> returning True.
Therefore, the previous PR led to all types of complex nans being displayed as <code>NaN+0.0j</code>, though the underlying data is stored correctly.
In this PR, I split real and imaginary parts, format them separately, and concatenate them (hopefully) properly.
Since the imaginary part can also be <code>NaN</code>, it also has to be padded manually to the maximum length.
For instance, we may have
{% highlight plaintext %}
0      NaN-1.2345j
1      NaN+   NaNj
2  -1.2345+   NaNj
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53844
  title="BUG: complex Series/DataFrame display all complex nans as nan+0j"
  description=projects_ossd_pandas_description_53844
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53764 %}
This is related to <a href="https://github.com/pandas-dev/pandas/pull/53682">pandas-dev/pandas#53862</a>.
Though <code>complex("nan")</code> no longer raises in series and dataframe, it is not displayed correctly, for instance <code>N000a000N</code>.
This is also because pandas not considering that complex numbers can have nans,
thus splitting by <code>+</code>, <code>-</code>, and <code>j</code> and maunally adding zeros for padding, causing this issue to happen.
I applied some tricks here: if dtype is complex then I do not display nans as <code>NaN</code> but as <code>NaN+0.0j</code>.
Then I split the real and imaginary parts with some regex and pad both the real and imaginary parts of a single number,
but also all real (resp. imaginary) parts of all the numbers using some existing helper function.
Now <code>complex("nan")</code> can be displayed properly, for instance, <code>pd.Series([1.23, complex("nan"), -1.2j])</code> will print
{% highlight python %}
0   1.23+0.00j
1    NaN+0.00j
2   0.00-1.20j
dtype: complex128
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53764
  title="BUG: bad display for complex series with nan #53764"
  description=projects_ossd_pandas_description_53764
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53044 %}
I/O formatting was failing to display <code>MultiIndex</code> objects with a long elements, such as
{% highlight python %}
print(pd.MultiIndex.from_tuples([("c" * 62,)]))  # Raises an error
{% endhighlight %}
This is because an important variable during I/O formatting was set only when breaking out of a for loop.
It did not consider cases where the for loop terminates naturally, causing further errors.
I fixed this bug so that such objects can be displayed correctly.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53044
  title="BUG: MultiIndex displays incorrectly with a long element"
  description=projects_ossd_pandas_description_53044
%}

<!-- ====================================================================== -->

### Missing Data

{% capture projects_ossd_pandas_description_53962 %}
Previously, interpolating will <code>fillna</code> methods such as <code>"ffill"</code> could not fill across blocks.
For instance, we make a multi-block DataFrame and interpolate it.
{% highlight python %}
df = pd.DataFrame(np.random.randn(3, 3), columns=["A", "B", "C"])
df["D"] = np.nan
df["E"] = 1.0
df.interpolate(method="ffill", axis=1)
{% endhighlight %}
This, previously would give the follows.
{% highlight python %}
          A         B         C   D    E
0 -0.656239  0.898067  0.842284 NaN  1.0
1 -0.914892 -0.018121 -0.382542 NaN  1.0
2  1.818251 -0.148962  0.550328 NaN  1.0
{% endhighlight %}
Though interpolating with <code>fillna</code> methods have been deprecated, it would still be meaningful to fix this bug.
The reason is that, when dealing with multi-block DataFrames, one would have to transpose it before passing it to the block manager and then transpose the result back.
I reorganized the code a bit and fixed this issue.
Now despite raising a deprecation warning, the functionality works correctly.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53962
  title="BUG: interpolate with fillna methods fail to fill across multiblocks"
  description=projects_ossd_pandas_description_53962
%}

<!-- ====================================================================== -->

### Numeric

{% capture projects_ossd_pandas_description_53682 %}
Previously, series and dataframe with <code>complex("nan")</code> will raise an error.
This is caused by a hard conversion from complex nan into float dtype in the Cython code.
When designing the constructor, pandas considered all objects that <code>util.is_nan</code> evaluate to True as float nans.
I added a check for complex nans to avoid this invalid conversion.
<code>complex("nan")</code> is now allowed in series and dataframe, displayed as <code>NaN+0.0j</code>.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53682
  title="BUG: series with complex nan"
  description=projects_ossd_pandas_description_53682
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53288 %}
Previously, negative <code>RangeIndex</code> correctly set the step size to the opposite of the original,
but constant minus <code>RangeIndex</code> did not.
This was because the former would call <code>__neg__</code> while the latter would undergo some more complex numeric operations.
I made a small modification so that now the latter case also reverts the step size correctly.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53288
  title="FIX RangeIndex rsub by constant"
  description=projects_ossd_pandas_description_53288
%}

<!-- ====================================================================== -->

### Resample

{% capture projects_ossd_pandas_description_53736 %}
For instance, look at the following code snippet.
{% highlight python %}
>>> df = pd.DataFrame({"ts": [], "values": []}).astype({"ts": "datetime64[ns, Atlantic/Faroe]"})
>>> result = df.resample("2MS", on="ts", closed="left", label="left", origin="start")["values"].sum()
>>> result.index
DatetimeIndex([], dtype='datetime64[ns]', name='ts', freq='2MS')
{% endhighlight %}
Clearly the timezone information is lost, but this does not happen if the constructing series is not empty.
The reason for this bug is that, the case of empty series is dealt with separately and dtype is not explicitly provided.
Therefore, pandas tried to provide a minimum compatible time for the empty index, causing the loss of timezone.
I made an easy fix that takes dtype into consideration.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53736
  title="BUG: resampling empty series loses time zone from dtype"
  description=projects_ossd_pandas_description_53736
%}

<!-- ====================================================================== -->

### Reshaping

{% capture projects_ossd_pandas_description_53215 %}
Suppose that we have two dataframes as follows.
{% highlight python %}
>>> df = pd.DataFrame({"col1": ["A"]})
>>> df
col1
0    A
>>> df2 = pd.DataFrame(
...     data={"col2": [100]},
...     index=pd.MultiIndex.from_tuples([("A",)], names=["col1"]),
... )
      col2
col1
A      100
>>> df2
{% endhighlight %}
Then when we write
{% highlight python %}
df.merge(df2, left_on=["col1"], right_index=True, how="left")
{% endhighlight %}
we would expect a single-row dataframe with column <code>col1</code> as <code>A</code> and column <code>col2</code> as <code>100</code>.
But previously, the column <code>col2</code> would be the missing value <code>NaN</code>, which is undesired.
This is because when there is a single join key, pandas would treat as indices as single index, thus <code>"A"</code> and <code>("A",)</code> were treated as different keys.
I modified this part of logic to treat <code>MultiIndex</code> correctly and simplified the code.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53215
  title="BUG Merge not behaving correctly when having MultiIndex with a single level"
  description=projects_ossd_pandas_description_53215
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_51947 %}
<code>DataFrame.merge</code> raises an error when there are imcompatible keys,
but there was no information provided in the error message that indicate which keys are incompatible.
I improved the error message by displaying the first imcompatible key.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=51947
  title="ENH include the first incompatible key in error message when merging"
  description=projects_ossd_pandas_description_51947
%}

<!-- ====================================================================== -->

## Maintenance Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/pandas-item.html
  pr=54855
  title="CI: add empty line in no-bool-in-generic to avoid black complaining"
%}

{% include projects/ossd/pandas-item.html
  pr=53958
  title="API: add NaTType and NAType to pandas.api.typing"
%}

{% include projects/ossd/pandas-item.html
  pr=53901
  title="CI: linting check to ensure lib.NoDefault is only used for typing"
%}

{% include projects/ossd/pandas-item.html
  pr=53877
  title="CLN: use lib.no_default instead of lib.NoDefault in .pivot"
%}

{% include projects/ossd/pandas-item.html
  pr=53520
  title="DEPR fill_method and limit keywords in pct_change"
%}

{% include projects/ossd/pandas-item.html
  pr=53216
  title="DEPR Rename keyword \"quantile\" to \"q\" in Rolling.quantile"
%}

{% include projects/ossd/pandas-item.html
  pr=53218
  title="FIX typo in deprecation message of deprecate_kwarg decorator"
%}

## Documentation Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/pandas-item.html
  pr=53957
  title="DOC: EX01 (part of ExtensionArray)"
%}

{% include projects/ossd/pandas-item.html
  pr=53925
  title="DOC: EX01 ({Categorical, Interval, Multi, Datetime, Timedelta}-Index)"
%}

{% include projects/ossd/pandas-item.html
  pr=53920
  title="DOC: EX01 (Index and RangeIndex)"
%}

{% include projects/ossd/pandas-item.html
  pr=53902
  title="DOC: fix asv test results link in contributors doc"
%}

<!-- Include some additional scripts for item folding/unfolding -->
{% include projects/ossd/scripts.html %}
