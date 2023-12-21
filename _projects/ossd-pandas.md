---
layout: distill
title: pandas
description: "Top #68 Contributor"
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
      - name: Others
  - name: Maintenance Contributions
  - name: Documentation Contributions
---

This is the collection of my open source contributions to [pandas](https://pandas.pydata.org/),
a powerful data analysis toolkit in Python.<d-cite key="mckinney2010data"></d-cite> It
has its code base maintained on [GitHub](https://github.com/pandas-dev/pandas), with
nearly 3000 contributors.

I have contributed [27 merge pull requests](https://github.com/pandas-dev/pandas/commits?author=Charlie-XIAO)
to pandas, and I am currently its [Top #68 contributor](https://github.com/pandas-dev/pandas/graphs/contributors).<d-footnote>Note
that throughout this post, when saying a bug existed in pandas a.b.c, it does not take
into consideration backporting. For instance, "a bug existed in pandas 2.1.3" and "fixed
in pandas 2.1.4" only implies that the bug was fixed after the release of pandas 2.1.3,
but does not gurantee that one would see the bug with pandas 2.1.3 now since the fix for
pandas 2.1.4 may be backported to all 2.1.x.</d-footnote>

## Code Contributions

Items in each section are sorted in reverse chronological order by the time of merge.

### Groupby

{% capture projects_ossd_pandas_description_53623 %}
In pandas 2.0.3, the <code>sum</code> method of <code>GroupBy</code> objected summed
<code>inf + inf</code> and <code>(-inf) + (-inf)</code> to <code>nan</code> instead of
<code>inf</code> and <code>-inf</code> respectively, which is incorrect. For instance,

{% highlight python %}
>>> import numpy as np
>>> import pandas as pd
>>> ser = pd.Series([np.inf, np.inf, np.inf])
>>> ser.groupby([0, 1, 1]).sum()
0    inf
1    NaN
dtype: float64
{% endhighlight %}

Moreover, this behavior was inconsistent with calling the <code>apply</code> with a
standard summation function, which returns the correct result.

{% highlight python %}
>>> ser.groupby([0, 1, 1]).apply(lambda _grp: _grp.sum())
0    inf
1    inf
dtype: float64
{% endhighlight %}

The problem was caused by the Cython function <code>group_sum</code> which implements
<a href="https://en.wikipedia.org/wiki/Kahan_summation_algorithm">Kahan's summation</a>
to reduce numerical error caused by finite-precision floating-point operations. It
maintains a compensation for low-order bits, and fix the excess in further rounds, which
can be interpreted as follows.

{% highlight plaintext %}
var y = input[i] - c
var t = sum + y
c = (t - sum) - y    // c is initialized to zero before the loop
sum = t              // sum is initialized to zero before the loop
next i
{% endhighlight %}

In the case where input is <code>inf</code>, <code>y</code> and <code>t</code> would
become <code>inf</code>. Thus when computing <code>c</code>, i.e., the compensation, we
would be performing <code>inf-inf</code> which gives <code>nan</code>. To fix this, I
manually set the compensation back to zero whenever it becomes <code>nan</code>. Also
note that for efficiency, this <code>group_sum</code> function is written with
<code>cython.nogil</code>, so the safe way to do <code>utils.is_nan(c)</code> is by
comparing <code>c</code> with itself, i.e., <code>c != c</code>. From pandas 2.1.0, this
bug is fixed and <code>inf + inf</code> and <code>(-inf) + (-inf)</code> are correctly
summed to <code>inf</code> and <code>-inf</code> respectively.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53623
  title="BUG: groupby sum turning inf+inf and (-inf)+(-inf) into nan"
  description=projects_ossd_pandas_description_53623
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53517 %}
From pandas 2.0.3, when grouping by a singleton list in pandas and iterating over the
resulting <code>GroupBy</code> object, the correct behavior is that each group name is
a tuple of length one, in order to be consistent with non-singleton lists. For instance,

{% highlight python %}
>>> import pandas as pd
>>> df = pd.DataFrame({"a": [1, 1, 2], "b": [4, 5, 4], "c":[7, 8, 9]})
>>> for name, obj in df.groupby(["a"]):
...     print(name)
...
(1,)
(2,)
{% endhighlight %}

However in pandas 2.0.3, performing column selection on the <code>GroupBy</code> object
would violate the desired behavior.

{% highlight python %}
>>> for name, obj in df.groupby(["a"])[["a", "b", "c"]]:
...     print(name)
...
1
2
{% endhighlight %}

This was caused by keys getting lost in the first place when creating the <code>GroupBy</code>
objects since the grouper was passed in instead. With <a href="https://github.com/rhshadrach">@rhshadrach</a>'s
help, I fixed this by passing keys explicitly instead of implying from the grouper. From
pandas 2.1.0, the result would be consistent with or without column selection.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53517
  title="FIX groupby with column selection not returning tuple when grouping by list of a single element"
  description=projects_ossd_pandas_description_53517
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53237 %}
<code>groupby</code> with <code>as_index=False</code> should behave in SQL-style, i.e.,
the group labels should be columns after aggregation rather than being moved as index.
For instance,

{% highlight python %}
>>> import pandas as pd
>>> df = pd.DataFrame({"a1": [0, 0, 1], "a2": [2, 3, 3], "b": [4, 5, 6]})
>>> gb = df.groupby(by=["a1", "a2"], as_index=False)
>>> gb.agg("sum")
   a1  a2  b
0   0   2  4
1   0   3  5
2   1   3  6
{% endhighlight %}

However, if the aggregation functions are passed in as a list, <code>as_index=False</code>
was not respected in pandas 2.0.3.

{% highlight python %}
>>> gb.agg(["sum"])
print(result)
        b
      sum
a1 a2
0  2    4
   3    5
1  3    6
{% endhighlight %}

This was caused by the logic of result processing, which fell into an early-returning
case for the above scenario without going through the step of treating <code>as_index=False</code>.
I made a dummy fix, i.e., call the <code>reset_index</code> method on the result when
<code>as_index=False</code> and aggregation functions are list-like. From pandas 2.1.0,
the aggregation result would respect <code>as_index=False</code> in the above scenario,
i.e.,

{% highlight python %}
>>> gb.agg(["sum"])
  a1 a2   b
        sum
0  0  2   4
1  0  3   5
2  1  3   6
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53237
  title="BUG DataFrameGroupBy.agg with list not respecting as_index=False"
  description=projects_ossd_pandas_description_53237
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53049 %}
In pandas 2.0.3, indices may get sorted even if <code>groupby</code> is called with
<code>sort=False</code>. As an illustration, first create a <code>Series</code> with an
unsorted column "category", i.e., the B's are all before the A's.

{% highlight python %}
>>> import pandas as pd
>>> ind = pd.MultiIndex.from_tuples(
...     [(0, "B"), (0, "A"), (1, "B"), (1, "A")],
...     names=["sample", "category"],
... )
>>> ser = pd.Series(range(4), index=ind)
>>> ser
sample  category
0       B           0
        A           1
1       B           2
        A           3
dtype: int64
{% endhighlight %}

Now if we call <code>groupby</code> with <code>sort=False</code>, then perform
<code>.quantile(...).unstack()</code>, the result would be unexpectedly sorted, such
that A goes before B.

{% highlight python %}
>>> grp = ser.groupby(level="category", sort=False).quantile([0.2, 0.8])
>>> grp.unstack()
          0.2  0.8
category
A         1.4  2.6
B         0.4  1.6
{% endhighlight %}

This was caused by <code>index.levels</code> being sorted, while some methods were using
those levels. <code>index.levels</code> would, however, not be sorted if manually
created instead of being created using class methods like <code>MultiIndex.from_product</code>.
Manual creation of <code>MultiIndex</code> in the <code>_insert_quantile_level</code>
function resolved the issue, but at the cost of nearly 50% performance regression which
came from always using 64-bit indices. This was fixed using <code>coerce_indexer_dtype</code>
to find the most appropriate dtype. From pandas 2.1.0, the result would be unsorted when
specified, at least for the <code>quantile</code> method, without experience performance
regression.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53049
  title="BUG: GroupBy.quantile implicitly sorts index.levels"
  description=projects_ossd_pandas_description_53049
%}

<!-- ====================================================================== -->

### IO

{% capture projects_ossd_pandas_description_53844 %}
This is a follow-up on <a href="https://github.com/pandas-dev/pandas/pull/53764">pandas-dev/pandas#53764</a>
which is made also by me, fixing the display of complex <code>nan</code> values. However,
the trick that <em>if complex dtype then <code>nan</code> values are represented as
<code>NaN+0.0j</code></em> is wrong. In fact, both the real and the imaginary part of a
complex <code>nan</code> value can be <code>nan</code>. Thus the previous pull request
led to all types of complex <code>nan</code> values being displayed as <code>NaN+0.0j</code>,
even though the underlying data is stored correctly. In this pull request, I split the
real and imaginary parts, format them separately, and concatenate them (hopefully)
properly. Since the imaginary part can also be <code>NaN</code>, it also has to be
padded manually to the maximum length. For instance, from pandas 2.1.0, <code>Series</code>
with complex <code>nan</code> values would be displayed like

{% highlight python %}
>>> import numpy as np
>>> import pandas as pd
>>> pd.Series([complex(np.nan, -1.2), complex(np.nan, np.nan), complex(-1.23, np.nan)])
0     NaN-1.20j
1     NaN+ NaNj
2   -1.23+ NaNj
dtype: complex128
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53844
  title="BUG: complex Series/DataFrame display all complex nans as nan+0j"
  description=projects_ossd_pandas_description_53844
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53764 %}
This is a follow-up on <a href="https://github.com/pandas-dev/pandas/pull/53682">pandas-dev/pandas#53862</a>,
which fixed the bug in pandas 2.0.3 of being unable to construct <code>Series</code>
with complex <code>nan</code> values. However, that pull request did not account for the
display issues, which could result in for instance <code>N000a000N</code> being shown.
The internal reason was that pandas 2.0.3 did not consider complex numbers to have
<code>nan</code> values, thus splitting by <code>+</code>, <code>-</code>, and <code>j</code>
while representing complex <code>nan</code> values still as <code>NaN</code>. I applied
some tricks here: if complex dtype then <code>nan</code> values are represented as
<code>NaN+0.0j</code>. Then I split the real and imaginary parts with some regex and pad
both the real and imaginary parts of a single number, but also all real (resp. imaginary)
parts of all the numbers using some existing helper function. With the above fix,
<code>complex("nan")</code> can be displayed properly, starting from pandas 2.1.0.

{% highlight python %}
>>> import pandas as pd
>>> pd.Series([1.23, complex("nan"), -1.2j])
0   1.23+0.00j
1    NaN+0.00j
2   0.00-1.20j
dtype: complex128
{% endhighlight %}

<em>Update: This implementation turned out to be not considerate enough. Please refer to
my follow-up fix in <a href="https://github.com/pandas-dev/pandas/pull/53764">pandas-dev/pandas#53844</a>
or the item above.</em>

{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53764
  title="BUG: bad display for complex series with nan"
  description=projects_ossd_pandas_description_53764
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53044 %}
In pandas 2.0.3, displaying <code>MultiIndex</code> objects with long elements would
fail. For instance,

{% highlight python %}
>>> import pandas as pd
>>> pd.MultiIndex.from_tuples([("c" * 62,)])
AttributeError: 'tuple' object has no attribute 'rstrip'
{% endhighlight %}

This was caused an important variable being set only when breaking out of a for loop
during formatting, not addressding the case where the loop terminates naturally and thus
causing further errors. With an easy fix, the above code snippet would print correctly
starting from pandas 2.1.0.

{% highlight python %}
>>> pd.MultiIndex.from_tuples([("c" * 62,)])
MultiIndex([('cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',)],
           )
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53044
  title="BUG: MultiIndex displays incorrectly with a long element"
  description=projects_ossd_pandas_description_53044
%}

<!-- ====================================================================== -->

### Missing Data

{% capture projects_ossd_pandas_description_53962 %}
In pandas 2.0.3, calling the <code>interpolate</code> method with <code>method</code>
being some <code>fillna</code> method (e.g., <code>"ffill"</code>) failed to fill across
blocks. As an example, we first make a multi-block <code>DataFrame</code> object.

{% highlight python %}
>>> import numpy as np
>>> import pandas as pd
>>> df = pd.DataFrame(np.random.randn(3, 3), columns=list("ABC"))
>>> df["D"] = np.nan
>>> df["E"] = 1.0
>>> df
          A         B         C   D    E
0 -0.296721 -0.655025  0.220960 NaN  1.0
1  0.016386 -0.605724 -0.593538 NaN  1.0
2  0.274373 -0.203605  0.510585 NaN  1.0
{% endhighlight %}

Though not explicitly displayed, this <code>DataFrame</code> is internally multi-block,
i.e., columns A through C are in one block and columns D and E are one block each. In
pandas 2.0.3, interpolating it with <code>method="ffill"</code> yielded an incorrect
result.

{% highlight python %}
>>> df.interpolate(method="ffill", axis=1)
          A         B         C   D    E
0 -0.656239  0.898067  0.842284 NaN  1.0
1 -0.914892 -0.018121 -0.382542 NaN  1.0
2  1.818251 -0.148962  0.550328 NaN  1.0
{% endhighlight %}

Clearly the interpolation failed to pass across the block of column D. Although such a
usage has been deprecated, i.e., it is recommended to directly use <code>df.ffill(axis=1)</code>
instead, it was still meaningful to fix the bug since deprecation warnings are not
errors. The reason for this bug was that, internally such a multi-block <code>DataFrame</code>
needed to be transposed before passing to the block manager, and then transposed back
afterwards. However, the originally logic was to transpose only when <code>axis=1</code>
and <code>method</code> is not a <code>fillna</code>method. I updated the logic so that
it transposes also when detecting a multi-block internal layout (for reference, this
information can be accessed via the <code>_mgr</code> private attribute). Starting from
pandas 2.1.0 and until such a usage is fully removed, the functionality works correctly
despite the deprecation warning.

{% highlight python %}
>>> df.interpolate(method="ffill", axis=1)
<stdin>:1: FutureWarning: DataFrame.interpolate with method=ffill is deprecated and will raise in a future version. Use obj.ffill() or obj.bfill() instead.
          A         B         C         D    E
0 -0.296721 -0.655025  0.220960  0.220960  1.0
1  0.016386 -0.605724 -0.593538 -0.593538  1.0
2  0.274373 -0.203605  0.510585  0.510585  1.0
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53962
  title="BUG: interpolate with fillna methods fail to fill across multiblocks"
  description=projects_ossd_pandas_description_53962
%}

<!-- ====================================================================== -->

### Numeric

{% capture projects_ossd_pandas_description_53682 %}
In pandas 2.0.3, constructing <code>Series</code> or <code>DataFrame</code> objects that
contain complex <code>nan</code> values (e.g., <code>complex("nan")</code>) would raise
an error. For instance,

{% highlight python %}
>>> import pandas as pd
>>> pd.Series([complex("nan")])
TypeError: must be real number, not complex
{% endhighlight %}

This was caused by a hard conversion from complex <code>nan</code> into float dtype in
the Cython code. When designing the constructor, pandas did not really take into
consideration complex <code>nan</code> values, thus treating all <code>nan</code> as
float <code>nan</code>. I added a check for complex <code>nan</code> to avoid this
invalid converstion. Starting from pandas 2.1.0, <code>complex("nan")</code> is allowed
in <code>Series</code> and <code>DataFrame</code>, displayed as <code>NaN+0.0j</code>.

{% highlight python %}
>>> pd.Series([complex("nan")])
0   NaN+0.0j
dtype: complex128
{% endhighlight %}

<em>Update: The implementation is correct but the claim about the display is not
considerate enough. Please refer to my follow-up fix in
<a href="https://github.com/pandas-dev/pandas/pull/53764">pandas-dev/pandas#53844</a> or
the corresponding item in the <a href="#io">IO</a> section.</em>
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53682
  title="BUG: series with complex nan"
  description=projects_ossd_pandas_description_53682
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_53288 %}
In pandas 2.0.3, the step size of a <code>RangeIndex</code> objects was not correctly
reverted when subtracted from a constant. For instance,

{% highlight python %}
>>> import pandas as pd
>>> idx = pd.Index(range(4))
>>> idx
RangeIndex(start=0, stop=4, step=1)
>>> 3 - idx
RangeIndex(start=3, stop=-1, step=1)
>>> list(3 - idx)
[]
{% endhighlight %}

I made an easy fix to change <code>step</code> to <code>-step</code> if the operation
is <code>rsub</code>. From pandas 2.1.0, constant minus <code>RangeIndex</code> would
work correctly.

{% highlight python %}
>>> 3 - idx
RangeIndex(start=3, stop=-1, step=-1)
>>> list(3 - idx)
[3, 2, 1, 0]
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53288
  title="FIX RangeIndex rsub by constant"
  description=projects_ossd_pandas_description_53288
%}

<!-- ====================================================================== -->

### Resample

{% capture projects_ossd_pandas_description_53736 %}
In pandas 2.0.3, empty <code>DataFrame</code> or <code>Series</code> would lose timezone
information when resampled. For instance,

{% highlight python %}
>>> import pandas as pd
>>> df = pd.DataFrame({"ts": [], "values": []}).astype(
...     {"ts": "datetime64[ns, Atlantic/Faroe]"}
... )
>>> res = df.resample("2MS", on="ts", closed="left", label="left", origin="start")[
...     "values"
... ].sum()
>>> res
Series([], Freq: 2MS, Name: values, dtype: float64)
>>> res.index
DatetimeIndex([], dtype='datetime64[ns]', name='ts', freq='2MS')
{% endhighlight %}

The reason for this bug was that, the case of empty <code>DataFrame</code> or
<code>Series</code> was handled separately from the case of non-empty ones, and in the
former case it simply created empty <code>DatetimeIndex</code> with specified
<code>freq</code> and <code>name</code> without explicitly setting <code>dtype</code>.
The case is similar for <code>PeriodIndex</code>. I fixed this bug by just explicitly
passing in the correct dtype, so from pandas 2.1.0 the behavior would be correct.

{% highlight python %}
>>> res.index
DatetimeIndex([], dtype='datetime64[ns, Atlantic/Faroe]', name='ts', freq='2MS')
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53736
  title="BUG: resampling empty series loses time zone from dtype"
  description=projects_ossd_pandas_description_53736
%}

<!-- ====================================================================== -->

### Reshaping

{% capture projects_ossd_pandas_description_53641 %}

This is about a bug introduced during the development of pandas 2.1.0, so it does not
exist in any actual release. In short, when concatenating <code>DataFrame</code> objects
with different <code>datetime64</code> resolutions (e.g. <code>"datetime64[s]"</code>
versus <code>"datetime64[ns]"</code>), an extremly wierd <code>ValueError</code> would
be raised. In particular,

{% highlight python %}
>>> import pandas as pd
>>> df1 = pd.DataFrame({"a": range(2), "b": range(2)}, dtype="datetime64[s]")
>>> df2 = pd.DataFrame({"a": range(2), "b": range(2)}, dtype="datetime64[ns]")
>>> pd.concat([df1, df2])
ValueError: Shape of passed values is (2, 2), indices imply (4, 2)
{% endhighlight %}

This was because pandas internally implements a class method <code>_concat_same_type</code>
for extension arrays and so on, some with default <code>axis=0</code> and some not
supporting the <code>axis</code> keyword. Consequently, it originally called the class
method without specifying <code>axis</code>, which was fine in many cases but not fine
for datetime arrays who should have <code>axis=1</code>. I noticed that a
<code>ea_compat_axis</code> argument is available, such that the <code>axis</code>
keyword is not supported if <code>ea_compat_axis=True</code>. By this observation I
modified the logic to explicitly pass in the <code>axis</code> keyword whenever possible
instead of always using the default value. This avoided the regression in the function
<code>pd.concat</code> from pandas 2.0.3 to pandas 2.1.0. In particular,

{% highlight python %}
>>> pd.concat([df1, df2])
                              a                             b
0 1970-01-01 00:00:00.000000000 1970-01-01 00:00:00.000000000
1 1970-01-01 00:00:01.000000000 1970-01-01 00:00:01.000000000
0 1970-01-01 00:00:00.000000000 1970-01-01 00:00:00.000000000
1 1970-01-01 00:00:00.000000001 1970-01-01 00:00:00.000000001
{% endhighlight %}

This even resolved some other problems that may not explicitly use the <code>pd.concat</code>
function but involves implicit concatenations, e.g., using <code>df.loc[n] = ...</code>
where <code>df</code> is a <code>DataFrame</code> object with only <code>n</code> rows.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53641
  title="BUG: pd.concat dataframes with different datetime64 resolutions"
  description=projects_ossd_pandas_description_53641
%}

{% capture projects_ossd_pandas_description_53215 %}

In pandas 2.0.3, the method <code>DataFrame.merge</code> did not behave correctly when
encountering <code>MultiIndex</code> with a single level. As an example, we create two
<code>DataFrame</code> objects, the only difference being that <code>df1</code> has
<code>Index</code> while <code>df2</code> has <code>MultiIndex</code> with single level.

{% highlight python %}
>>> import pandas as pd
>>> df1 = pd.DataFrame(
...     data={"col2": [100]},
...     index=pd.Index(["A"], name="col1"),
... )
>>> df1
      col2
col1
A      100
>>> df1.index
Index(['A'], dtype='object', name='col1')
>>> df2 = pd.DataFrame(
...     data={"col2": [100]},
...     index=pd.MultiIndex.from_tuples([("A",)], names=["col1"]),
... )
>>> df2
      col2
col1
A      100
>>> df2.index
MultiIndex([('A',)],
           names=['col1'])
{% endhighlight %}

Now create a (left) <code>DataFrame</code> to check the merging behavior in pandas 2.0.3.

{% highlight python %}
>>> df = pd.DataFrame({"col1": ["A"]})
>>> df
col1
0    A
>>> df.merge(df1, left_on=["col1"], right_index=True, how="left")
  col1  col2
0    A   100
>>> df.merge(df2, left_on=["col1"], right_index=True, how="left")
  col1  col2
0    A   NaN
{% endhighlight %}

The merging behavior of <code>df2</code> was clearly incorrect, and should be the same
as that of <code>df1</code>. This was caused by the logic of checking whether to use
internally a multi-index indexer or a single-index indexer. In particular, pandas 2.0.3
checked the length of the join keys, incorrectly putting <code>df2</code> into the case
of using a single-index indexer. <code>("A",)</code> would then fail to match
<code>"A"</code>, leading to the <code>NaN</code>. I fixed this by alternatively
checking for <code>MultiIndex</code> instance, so that <code>df2</code> can be put into
the right case. From pandas 2.1.0, the merging behavior of <code>DataFrame</code> with
single-level <code>MultiIndex</code> would be correct, e.g., the merging behavior of
<code>df2</code> would agree with that of <code>df1</code>.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=53215
  title="BUG Merge not behaving correctly when having MultiIndex with a single level"
  description=projects_ossd_pandas_description_53215
%}

<!-- ====================================================================== -->

{% capture projects_ossd_pandas_description_51947 %}
<em>This is my first merged pull request to pandas!</em> In pandas 2.0.3, the method
<code>DataFrame.merge</code> raises an error when there are imcompatible keys, but there
was no information provided indicating which keys were the culprits. For instance,

{% highlight python %}
>>> import pandas as pd
>>> df = pd.DataFrame([{"a": 1, "b": 1, "c": 1}])
>>> df2 = pd.DataFrame([{"a": 1, "b": None, "c": 1}])
>>> pd.merge(df, df2)
ValueError: You are trying to merge on int64 and object columns. If you wish to proceed you should use pd.concat
{% endhighlight %}

This would become problematic if the number of columns is large, making it hard to
identify the culprit columns and resolve the failure. I improved the error message by
mentioning the name of the first incompatible key, which would be included starting from
pandas 2.1.0.

{% highlight python %}
>>> pd.merge(df, df2)
ValueError: You are trying to merge on int64 and object columns for key 'b'. If you wish to proceed you should use pd.concat
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=51947
  title="ENH include the first incompatible key in error message when merging"
  description=projects_ossd_pandas_description_51947
%}

<!-- ====================================================================== -->

### Others

{% capture projects_ossd_pandas_description_55395 %}
In pandas 2.1.3, the <code>Series</code> constructor would raise a deprecation warning
if the <code>index</code> argument is a list of <code>Series</code>. For instance,

{% highlight python %}
>>> import pandas as pd
>>> ser = pd.Series([1.23], index=[pd.Series([1]), pd.Series([2])])
DeprecationWarning: Series._data is deprecated and will be removed in a future version. Use public APIs instead.
{% endhighlight %}

This was caused by the logic of validating the <code>index</code> argument, which
implicitly looks for the <code>_data</code> attribute. However, <code>_data</code> that
has been depreated. The initial intention was to check for instances of lists,
<code>ABCIndex</code>, and <code>ABCSeries</code> while avoiding circular import. I
fixed this by runtime-importing <code>ABCIndex</code> and <code>ABCSeries</code> and
performing the explicit check. From pandas 2.1.4 the above construction would be clear
of this warning.
{% endcapture %}

{% include projects/ossd/pandas-item.html
  pr=55395
  title="BUG: avoid DeprecationWarning when the Series has index as list of Series"
  description=projects_ossd_pandas_description_55395
%}

<!-- ====================================================================== -->

## Maintenance Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/pandas-item.html
  pr=55527
  title="BUG fix deprecation of limit and fill_method in pct_change"
%}

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
