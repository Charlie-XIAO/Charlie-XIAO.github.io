---
layout: distill
title: scikit-learn
description: "Top #50 Contributor"
img: assets/img/sklearn-logo.jpg
importance: 10
category: Open Source Development

authors:
  - name: Yao Xiao
    url: "https://charlie-xiao.github.io/"
    affiliations:
      name: NYU Shanghai

bibliography: projects-ossd-sklearn.bib

shortcuts:
  - name: Rank
    link: https://github.com/scikit-learn/scikit-learn/graphs/contributors
  - name: Contributions
    link: https://github.com/scikit-learn/scikit-learn/commits?author=Charlie-XIAO

toc:
  - name: Code Contributions
    subsections:
      - name: Cross Decomposition
      - name: Decomposition
      - name: Ensemble
      - name: Feature Selection
      - name: Metrics
      - name: Neighbors
      - name: Preprocessing
      - name: Tree
      - name: Utilities
  - name: Maintenance Contributions
  - name: Documentation Contributions
---

This is the collection of my open source contributions to [scikit-learn](https://scikit-learn.org/stable/),
a Python module for machine learning.<d-cite key="scikit-learn"></d-cite> It has its
code base maintained on [GitHub](https://github.com/scikit-learn/scikit-learn), with
over 2500 contributors.

I have contributed [75 merged pull requests](https://github.com/scikit-learn/scikit-learn/commits?author=Charlie-XIAO)
to scikit-learn, and I am currently its [Top #50 contributor](https://github.com/scikit-learn/scikit-learn/graphs/contributors).<d-footnote>Note
that throughout this post, when saying a bug existed in scikit-learn a.b.c, it does not
take into consideration backporting. For instance, "a bug existed in scikit-learn 1.3.1"
and "fixed in scikit-learn 1.3.2" only implies that the bug was fixed after the release
of scikit-learn 1.3.1, but does not gurantee that one would see the bug with
scikit-learn 1.3.1 now since the fix for scikit-learn 1.3.2 may be backported to
earlier versions, especially 1.3.x.</d-footnote>


## Code Contributions

Items in each section are sorted in reverse chronological order by the time of merge.

### Cross Decomposition

{% capture projects_ossd_sklearn_description_26602 %}
In scikit-learn 1.3.x, <code>cross_decomposition.PLSRegression</code> always predicts 2D
result no matter if the input is 1D or 2D. This is somehow inconsistent with other
regressors such as <code>linear_model.LinearRegression</code> and <code>linear_model.Ridge</code>.
For instance,

{% highlight python %}
>>> import numpy as np
>>> from sklearn.cross_decomposition import PLSRegression
>>> from sklearn.linear_model import LinearRegression
>>> X = np.array([[1, 1], [2, 4], [3, 9], [4, 16], [5, 25], [6, 36]])
>>> y = np.array([2, 6, 12, 20, 30, 42])
>>> lr = LinearRegression().fit(X, y)
>>> lr.predict(X)
array([ 2.,  6., 12., 20., 30., 42.])
>>> plsr = PLSRegression().fit(X, y)
>>> plsr.predict(X)
array([[ 2.],
       [ 6.],
       [12.],
       [20.],
       [30.],
       [42.]])
{% endhighlight %}

I made a simple fix to determine whether to automatically ravel the output based on the
shape of the input <code>y</code>. From scikit-learn 1.4.0, <code>PLSRegression</code>
would behave consistently with other regressors, such that it returns 1D prediction if
fitted with 1D <code>y</code>.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26602
  title="ENH ravel prediction of PLSRegression when fitted on 1d y"
  description=projects_ossd_sklearn_description_26602
%}

<!-- ====================================================================== -->

### Datasets

{% capture projects_ossd_sklearn_description_28111 %}
In scikit-learn 1.4.0, the function <code>datasets.dump_svmlight_file</code> would raise
a <code>ValueError</code> when <code>X</code> is read-only, e.g., memmap-based. For
instance,

{% highlight python %}
>>> import numpy as np
>>> from sklearn.datasets import dump_svmlight_file
>>> X = np.zeros((3, 4))
>>> y = np.zeroes(3)
>>> X.flags.writeable = False
>>> dump_svmlight_file(X, y, "test.svmlight")
ValueError: buffer source array is read-only
{% endhighlight %}

This is the function is written in Cython for efficiency, but the signature of
<code>X</code> in one of the helper functions is <code>int_or_float[:, :] X</code>,
i.e., a mutable Cython memoryview. I made a simple fix by adding <code>const</code> to
the signature. From scikit-learn 1.4.1, <code>datasets.dump_svmlight_file</code> would
work correctly with read-only <code>X</code>.

{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=28111
  title="FIX dump svmlight when data is read-only"
  description=projects_ossd_sklearn_description_28111
%}

{% capture projects_ossd_sklearn_description_27438 %}
In scikit-learn 1.3.x, the function <code>datasets.make_sparse_spd_matrix</code> used
dense numpy array throughout the computation and output a dense array, even though the
result is sparse (the sparsity increases with the parameter <code>alpha</code>). This
is inefficient in terms of both memory usage and computational cost. I refactored the
code and used sparse memory layout from the very beginning, greatly reducing memory
consumption especially when <code>alpha</code> is large. I also added a new keyword
argument <code>sparse_format</code> which allows outputting a sparse matrix directly.
By default, <code>sparse_format</code> is <code>None</code>, meaning that the output
will be converted to a dense numpy array. Otherwise it should be a string like
<code>"csr"</code>, <code>"csc"</code>, or others, specifying the specific sparse
format to return. This improvement is included from scikit-learn 1.4.0.

{% highlight python %}
>>> from sklearn.datasets import make_sparse_spd_matrix
>>> make_sparse_spd_matrix(4, random_state=0)
array([[ 1.23245136, -0.48213209,  0.        ,  0.        ],
       [-0.48213209,  1.        ,  0.        ,  0.        ],
       [ 0.        ,  0.        ,  1.        ,  0.        ],
       [ 0.        ,  0.        ,  0.        ,  1.        ]])
>>> make_sparse_spd_matrix(4, random_state=0, sparse_format="csr")
<4x4 sparse matrix of type '<class 'numpy.float64'>'
        with 6 stored elements in Compressed Sparse Row format>
>>> make_sparse_spd_matrix(4, random_state=0, sparse_format="csc")
<4x4 sparse matrix of type '<class 'numpy.float64'>'
        with 6 stored elements in Compressed Sparse Column format>
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=27438
  title="ENH make_sparse_spd_matrix use sparse memory layout"
  description=projects_ossd_sklearn_description_27438
%}

<!-- ====================================================================== -->

### Decomposition

{% capture projects_ossd_sklearn_description_26337 %}
In scikit-learn 1.2.x, <code>decomposition.KernelPCA</code> could produce incorrect
results through the <code>inverse_transform</code> method when <code>gamma=None</code>.
In particular, with <code>gamma=None</code> the value of <code>gamma</code> should be
automatically chosen as <code>1/n_features</code> where <code>n_features</code> is the
number of features of <code>X</code>, so the result using <code>gamma=None</code> and
<code>gamma=1/n_features</code> should be theoretically the same, which was not the
case in scikit-learn 1.2.x. For instance,

{% highlight python %}
>>> import numpy as np
>>> from sklearn.decomposition import KernelPCA
>>> rng = np.random.RandomState(0)
>>> X = rng.random_sample((5, 4))
>>> kwargs = {
...     "n_components": 2,
...     "random_state": rng,
...     "fit_inverse_transform": True,
...     "kernel": "rbf",
... }
>>> kpca1 = KernelPCA(gamma=None, **kwargs).fit(X)
>>> kpca2 = KernelPCA(gamma=1 / X.shape[1], **kwargs).fit(X)
>>> kpca1.inverse_transform(kpca1.transform(X))
array([[0.44334543, 0.59512828, 0.46569486, 0.50624967],
       [0.39736721, 0.59593894, 0.47787971, 0.53831915],
       [0.48914575, 0.50067493, 0.46519924, 0.45894488],
       [0.41840832, 0.58699316, 0.323197  , 0.3546591 ],
       [0.30997022, 0.57619197, 0.46445272, 0.5512108 ]])
>>> kpca2.inverse_transform(kpca1.transform(X))
array([[0.43304986, 0.58984587, 0.45734748, 0.49734729],
       [0.407028  , 0.59067998, 0.46527052, 0.51668476],
       [0.46205772, 0.53774587, 0.45877911, 0.47233884],
       [0.42196757, 0.58748932, 0.3754222 , 0.41023455],
       [0.35705227, 0.58148822, 0.45995811, 0.52773517]])
{% endhighlight %}

The reason was, when <code>gamma=None</code> and automatically setting to <code>1/n_features</code>,
the value of <code>n_features</code> at fit time and at inverse transform time could be
different, leading to different <code>gamma</code> values of the kernel and thus
different results. When <code>gamma</code> is not <code>None</code>, however, the value
is always consistent. I made a simple fix to make sure that the value of <code>n_features</code>
at fit time is consistently used, so from scikit-learn 1.3.0, <code>kpca1</code> and
<code>kpca2</code> would produce the same results.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26337
  title="FIX KernelPCA inverse transform when gamma is not given"
  description=projects_ossd_sklearn_description_26337
%}

<!-- ====================================================================== -->

### Ensemble

{% capture projects_ossd_sklearn_description_25931 %}
In scikit-learn 1.2.x, when fitting an <code>ensemble.IsolationForest</code> on a pandas
<code>DataFrame</code> and <code>contamination</code> is not <code>"auto"</code>, there
would be a spurious warning about missing features. For instance,

{% highlight python %}
>>> import numpy as np
>>> import pandas as pd
>>> from sklearn.ensemble import IsolationForest
>>> rng = np.random.RandomState(0)
>>> X = pd.DataFrame(data=rng.randn(4), columns=["a"])
>>> clf = IsolationForest(random_state=0, contamination=0.05)
>>> clf.fit(X)
UserWarning: X does not have valid feature names, but IsolationForest was fitted with feature names
IsolationForest(contamination=0.05, random_state=0)
{% endhighlight %}

The reason was that, the <code>fit</code> method was called with a <code>DataFrame</code>
so there were features coming in, but at the end of the <code>fit</code> method, if
<code>contamination</code> is not <code>"auto"</code>, we would call the
<code>score_samples</code> method but the input data <code>X</code> has already been
validated and converted into a numpy array at this point, thus the warning. I created a
private method <code>_score_samples</code> without validation to be called at the end of
<code>fit</code>, so this warning would go away. This fix is included from scikit-learn
1.3.0.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=25931
  title="FIX Remove spurious feature names warning in IsolationForest"
  description=projects_ossd_sklearn_description_25931
%}

<!-- ====================================================================== -->

### Feature Selection

{% capture projects_ossd_sklearn_description_26748 %}
In scikit-learn 1.3.x, <code>feature_selection.mutual_info_regression</code> would
return inaccurate or incorrect result when input data <code>X</code> is of integer
dtype. As an illustration, we compare its output with two input data that are different
only in there dtypes:

{% highlight python %}
>>> import numpy as np
>>> from numpy.testing import assert_array_equal
>>> from sklearn.feature_selection import mutual_info_regression
>>> rng = np.random.RandomState(0)
>>> X = rng.randint(100, size=(100, 10))
>>> X_float = X.astype(np.float64, copy=True)
>>> y = rng.randint(100, size=100)
>>> res = mutual_info_regression(X, y, random_state=0)
>>> res_float = mutual_info_regression(X_float, y, random_state=0)
>>> assert_array_equal(res, res_float)
AssertionError:
Arrays are not equal

Mismatched elements: 6 / 10 (60%)
Max absolute difference: 0.08158231
Max relative difference: 1.80656396
...
{% endhighlight %}

The reason was that, continuous features of the input data were scaled and assigned back
to the input data <code>X</code>, but if <code>X</code> is of integer dtype, such an
in-place assignment would force the scaled values to be rounded, thus largely losing
precision. I made a simple fix to convert <code>X</code> to <code>np.float64</code>
dtype in advance, so from scikit-learn 1.4.0, <code>res</code> and <code>res_float</code>
would be the same.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26748
  title="FIX mutual_info_regression when X is of integer dtype"
  description=projects_ossd_sklearn_description_26748
%}

<!-- ====================================================================== -->

{% capture projects_ossd_sklearn_description_25973 %}
When fitting a <code>feature_selection.SequentialFeatureSelector</code>, the parameter
<code>cv</code> should accept any iterable according to the documentation. However in
scikit-learn 1.2.x, a confusing <code>IndexError</code> would occur when <code>cv</code>
is passed as a generator. For instance,

{% highlight python %}
>>> import numpy as np
>>> from sklearn.datasets import make_classification
>>> from sklearn.feature_selection import SequentialFeatureSelector
>>> from sklearn.model_selection import KFold
>>> from sklearn.neighbors import KNeighborsClassifier
>>> X, y = make_classification(random_state=0)
>>> knc = KNeighborsClassifier(n_neighbors=5)
>>> cv = KFold().split(X, y)  # This is a generator
>>> sfs = SequentialFeatureSelector(knc, n_features_to_select=5, cv=cv)
>>> sfs.fit(X, y)
IndexError: list index out of range
{% endhighlight %}

This was because <code>cv</code> was passed around and consumed multiple times, thus
the generator was exhausted after the first time. I made a simple fix by calling
<code>model_selection.check_cv</code> that would convert the generator into a list, thus
being safe to pass around. This fix is included from scikit-learn 1.3.0.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=25973
  title="FIX SequentialFeatureSelector throws IndexError when cv is a generator"
  description=projects_ossd_sklearn_description_25973
%}

<!-- ====================================================================== -->

### Metrics

{% capture projects_ossd_sklearn_description_26019 %}
<code>PrecisionRecallDisplay</code> plots the Precision-Recall (PR) curve.
The PR curve is constructed by plotting the precision against recall,
where precision is the proportion of true positives among all actual positives,
and recall is the proportion of true positives among all predicted positives.
The baseline is called chance level, which is the PR curve of a predictor that predicts all examples as positive.
Therefore, I added a keyword <code>plot_chance_level</code> for plotting the chance level.
I also provided a keyword <code>chance_level_kw</code> that supports a dictionary of matplotlib keywords for customizing the rendering of the chance level line.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26019
  title="ENH PrecisionRecallDisplay add option to plot chance level"
  description=projects_ossd_sklearn_description_26019
%}

<!-- ====================================================================== -->

{% capture projects_ossd_sklearn_description_25987 %}
<code>RocCurveDisplay</code> plots the Receiver Operating Characteristic (ROC) curve.
The ROC curve is constructed by plotting the true positive rate against the false positive rate,
which measures the diagnostic ability of binary classifiers.
The baseline is called chance level, which is the diagonal, and the farther the ROC curve is from the baseline, the better performance the classifier has.
Therefore, I added a keyword <code>plot_chance_level</code> for plotting the chance level.
I also provided a keyword <code>chance_level_kw</code> that supports a dictionary of matplotlib keywords for customizing the rendering of the chance level line.
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=25987
  title="ENH RocCurveDisplay add option to plot chance level"
  description=projects_ossd_sklearn_description_25987
%}

<!-- ====================================================================== -->

### Neighbors

{% capture projects_ossd_sklearn_description_26410 %}
In scikit-learn 1.4.0, <code>neighbors.KNeighborsClassifier</code> behaved unreasonably
when the weights of all neighbors of some sample are zero. This is possible when using
a user-define weight function. For instance, there could be cases where all neighbors
are pretty far away and the user-defined weight function assigns zero weights to all
points outside a certain threshold. For simplicity of illustration, consider the
following example where we directly assign zero weights to all points:

{% highlight python %}
>>> import numpy as np
>>> from sklearn.neighbors import KNeighborsClassifier
>>> X = np.array([[0, 1], [1, 2], [2, 3], [3, 4]])
>>> y = np.array([0, 0, 1, 1])
>>> def _weights(dist):
...     return np.vectorize(lambda x: 0 if x > 0.5 else 1)(dist)
>>> est = KNeighborsClassifier(n_neighbors=3, weights=_weights).fit(X, y)
>>> est.predict([[1.1, 1.1]])
array([0])
>>> est.predict_proba([[1.1, 1.1]])
array([[0., 0.]])
{% endhighlight %}

As shown in the example above, the <code>predict</code> method predicted the first class
and the <code>predict_proba</code> method returned all zero probabilities. After
discussions, maintainers were convinced that it was worth breaking backward
compatibility to raise an error in this case, instead of returning almost random results
that hide potential bugs. Therefore, I made a simple fix to check if there is any
all-zero row (i.e., sample with all-zero neighbor weights). To avoid creating large
temporary boolean arrays in memory during this check, I also implemented a small Cython
function for this. From scikit-learn 1.4.1, the aforementioned ill case would lead to
an informative error message with a suggestion to fix the problem, such that

{% highlight python %}
>>> est.predict([[1.1, 1.1]])
ValueError: All neighbors of some sample is getting zero weights. Please modify 'weights' to avoid this case if you are using a user-defined function.
>>> est.predict_proba([[1.1, 1.1]])
ValueError: All neighbors of some sample is getting zero weights. Please modify 'weights' to avoid this case if you are using a user-defined function.
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26410
  title="FIX KNeighborsClassifier raise when all neighbors of some sample have zero weights"
  description=projects_ossd_sklearn_description_26410
%}

<!-- ====================================================================== -->

### Preprocessing

{% capture projects_ossd_sklearn_description_26400 %}
In scikit-learn 1.2.x, <code>preprocessing.PowerTransformer</code> would raise a
confusing error when using box-cox transformation and there exists a column with all
<code>nan</code> values. As an illustration,

{% highlight python %}
>>> import numpy as np
>>> from sklearn.preprocessing import PowerTransformer
>>> X = np.random.random_sample((4, 5))
>>> X[:, 0] = np.nan
>>> PowerTransformer(method="box-cox").fit_transform(X)
ValueError: not enough values to unpack (expected 2, got 0)
{% endhighlight %}

This was because scikit-learn internally used <code>scipy.stats.boxcox</code>, which
returned an empty array if the input array is empty (because all <code>nan</code> values
are masked), thus not unpackable. After discussions with maintainers we believed that
in this case it is best to raise a more informative error rather than letting it pass.
Therefore, I made a fix to check the input array in advance, and the following error
message would be raised from scikit-learn 1.3.0:

{% highlight python %}
>>> PowerTransformer(method="box-cox").fit_transform(X)
ValueError: Column must not be all nan.
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26400
  title="FIX PowerTransformer raise when \"box-cox\" has nan column"
  description=projects_ossd_sklearn_description_26400
%}

<!-- ====================================================================== -->

### Tree

{% capture projects_ossd_sklearn_description_26289 %}
In scikit-learn 1.2.x, <code>tree.export_text</code> and <code>tree.export_graphviz</code>
only accepted <code>feature_names</code> and <code>class_names</code> as lists of
strings. If using an array-like it would raise a confusing error. For instance,

{% highlight python %}
>>> import numpy as np
>>> from sklearn.datasets import load_iris
>>> from sklearn.tree import DecisionTreeClassifier, export_text
>>> iris = load_iris()
>>> X, y = iris["data"], iris["target"]
>>> feats = np.array(iris["feature_names"])
>>> clf = DecisionTreeClassifier(random_state=0, max_depth=2).fit(X, y)
>>> print(export_text(clf, feature_names=feats))
ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()
{% endhighlight %}

However under many circumstances users get feature names and class names from arrays
or dataframes, so I extended support to all array-like inputs for <code>feature_names</code>
and <code>class_names</code>. From scikit-learn 1.3.0, the above example would work
directly without convertion in advance.

{% highlight python %}
>>> print(export_text(clf, feature_names=feats))
|--- petal width (cm) <= 0.80
|   |--- class: 0
|--- petal width (cm) >  0.80
|   |--- petal width (cm) <= 1.75
|   |   |--- class: 1
|   |--- petal width (cm) >  1.75
|   |   |--- class: 2
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=26289
  title="FIX export_text and export_graphviz accepts feature and class names as array-like"
  description=projects_ossd_sklearn_description_26289
%}

<!-- ====================================================================== -->

### Utilities

{% capture projects_ossd_sklearn_description_28090 %}
In scikit-learn 1.4.0, when calling <code>utils.check_array</code> with a Series-like
object (e.g., pandas <code>Series</code> or polars <code>Series</code>) and expecting a
2D container, the error message would be confusing. For instance,

{% highlight python %}
>>> import pandas as pd
>>> from sklearn.utils import check_array
>>> ser = pd.Series([1, 2, 3])
>>> check_array(ser, ensure_2d=True)
ValueError: Expected 2D array, got 1D array instead:
array=[1 2 3].
Reshape your data either using array.reshape(-1, 1) if your data has a single feature or array.reshape(1, -1) if it contains a single sample.
{% endhighlight %}

This is because the error message was generated after converting the input, and it did
not really distinguish between Series-like and other one-dimensional array-like objects.
I made a simply fix to the error message by explicitly stating the type of the input and
using a more appropriate error message customized for Series-like objects. This fix is
included from scikit-learn 1.4.1, and the improved error message is shown as below:

{% highlight python %}
>>> check_array(ser, ensure_2d=True)
ValueError: Expected a 2-dimensional container but got <class 'pandas.core.series.Series'> instead. Pass a DataFrame containing a single row (i.e. single sample) or a single column (i.e. single feature) instead.
{% endhighlight %}
{% endcapture %}

{% include projects/ossd/sklearn-item.html
  pr=28090
  title="FIX improve error message in check_array when getting a Series and expecting a 2D container"
  description=projects_ossd_sklearn_description_28090
%}

<!-- ====================================================================== -->


## Maintenance Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/sklearn-item.html
  pr=27969
  title="MNT Work-around sphinx-gallery UnicodeDecodeError in recommender system"
%}

{% include projects/ossd/sklearn-item.html
  pr=27954
  title="CLN avoid nested conftests"
%}

{% include projects/ossd/sklearn-item.html
  pr=27723
  title="TST Extend tests for scipy.sparse.*array in sklearn/svm/tests/test_sparse"
%}

{% include projects/ossd/sklearn-item.html
  pr=27240
  title="TST Extend tests for scipy.sparse/*array in sklearn/manifold/tests/test_spectral_embedding"
%}

{% include projects/ossd/sklearn-item.html
  pr=27468
  title="FIX make dataset fetchers accept os.Pathlike for data_home"
%}

{% include projects/ossd/sklearn-item.html
  pr=27250
  title="TST Extend tests for scipy.sparse/*array in sklearn/neighbors/tests/test_neighbors"
%}

{% include projects/ossd/sklearn-item.html
  pr=27277
  title="TST Extend tests for scipy.sparse/*array in sklearn/impute/tests/test_common"
%}

{% include projects/ossd/sklearn-item.html
  pr=27219
  title="TST Extend tests for scipy.sparse/*array in sklearn/feature_extraction/tests/test_text"
%}

{% include projects/ossd/sklearn-item.html
  pr=27216
  title="TST Extend tests for scipy.sparse/*array in sklearn/ensemble/tests/test_forest"
%}

{% include projects/ossd/sklearn-item.html
  pr=27217
  title="TST Extend tests for scipy.sparse/*array in sklearn/ensemble/tests/test_gradient_boosting"
%}

{% include projects/ossd/sklearn-item.html
  pr=27218
  title="TST Extend tests for scipy.sparse/*array in sklearn/ensemble/tests/test_iforest"
%}


{% include projects/ossd/sklearn-item.html
  pr=27261
  title="TST Extend tests for scipy.sparse/*array in sklearn/tree/tests/test_tree"
%}

{% include projects/ossd/sklearn-item.html
  pr=27253
  title="TST Extend tests for scipy.sparse/*array in sklearn/preprocessing/tests/test_data"
%}

{% include projects/ossd/sklearn-item.html
  pr=27225
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_base"
%}

{% include projects/ossd/sklearn-item.html
  pr=27226
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_coordinate_descent"
%}

{% include projects/ossd/sklearn-item.html
  pr=27237
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_sparse_coordinate_descent"
%}

{% include projects/ossd/sklearn-item.html
  pr=27222
  title="TST Extend tests for scipy.sparse/*array in sklearn/feature_selection/tests/test_variance_threshold"
%}

{% include projects/ossd/sklearn-item.html
  pr=27235
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_ridge"
%}

{% include projects/ossd/sklearn-item.html
  pr=27228
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_quantile"
%}

{% include projects/ossd/sklearn-item.html
  pr=27233
  title="TST Extend tests for scipy.sparse/*array in sklearn/linear_model/tests/test_ransac"
%}

{% include projects/ossd/sklearn-item.html
  pr=27254
  title="TST Extend tests for scipy.sparse/*array in sklearn/preprocessing/tests/test_function_transformer"
%}

{% include projects/ossd/sklearn-item.html
  pr=27252
  title="TST Extend tests for scipy.sparse/*array in sklearn/neural_network/tests/test_rbm"
%}

{% include projects/ossd/sklearn-item.html
  pr=27241
  title="TST Extend tests for scipy.sparse/*array in sklearn/metrics/cluster/tests/test_unsupervised"
%}

{% include projects/ossd/sklearn-item.html
  pr=27246
  title="TST Extend tests for scipy.sparse/*array in sklearn/model_selection/tests/test_split"
%}

{% include projects/ossd/sklearn-item.html
  pr=27262
  title="TST Extend tests for scipy.sparse/*array in sklearn/utils/tests/test_extmath"
%}

{% include projects/ossd/sklearn-item.html
  pr=27276
  title="TST Extend tests for scipy.sparse/*array in sklearn/utils/tests/test_testing"
%}

{% include projects/ossd/sklearn-item.html
  pr=27274
  title="TST Extend tests for scipy.sparse/*array in sklearn/utils/tests/test_multiclass"
%}

{% include projects/ossd/sklearn-item.html
  pr=26759
  title="CLN v1.4.rst entries are not sorted"
%}

{% include projects/ossd/sklearn-item.html
  pr=26682
  title="MAINT Parameters validation for sklearn.utils.gen_even_slices"
%}

{% include projects/ossd/sklearn-item.html
  pr=26250
  title="MAINT Parameters validation for sklearn.linear_model.ridge_regression"
%}

{% include projects/ossd/sklearn-item.html
  pr=26125
  title="MAINT Parameters validation for sklearn.metrics.pairwise_distances_chunked"
%}

{% include projects/ossd/sklearn-item.html
  pr=26124
  title="MAINT Parameters validation for sklearn.metrics.pairwise_distances_argmin"
%}

{% include projects/ossd/sklearn-item.html
  pr=26122
  title="MAINT Parameters validation for sklearn.metrics.pairwise.manhattan_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26227
  title="MAINT Parameters validation for sklearn.model_selection.learning_curve"
%}

{% include projects/ossd/sklearn-item.html
  pr=26229
  title="MAINT Parameters validation for sklearn.model_selection.validation_curve"
%}

{% include projects/ossd/sklearn-item.html
  pr=26230
  title="MAINT Parameters validation for sklearn.model_selection.permutation_test_score"
%}

{% include projects/ossd/sklearn-item.html
  pr=26161
  title="MAINT Parameters validation for sklearn.datasets.fetch_species_distributions"
%}

{% include projects/ossd/sklearn-item.html
  pr=26165
  title="MAINT Parameters validation for sklearn.datasets.load_breast_cancer"
%}

{% include projects/ossd/sklearn-item.html
  pr=26166
  title="MAINT Parameters validation for sklearn.datasets.load_diabetes"
%}

{% include projects/ossd/sklearn-item.html
  pr=26126
  title="MAINT Parameters validation for sklearn.datasets.fetch_rcv1"
%}

{% include projects/ossd/sklearn-item.html
  pr=26072
  title="MAINT Parameters validation for sklearn.metrics.pairwise.sigmoid_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26071
  title="MAINT Parameters validation for sklearn.metrics.pairwise.rbf_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26070
  title="MAINT Parameters validation for sklearn.metrics.pairwise.polynomial_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26075
  title="MAINT Parameters validation for sklearn.metrics.pairwise.paired_cosine_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26074
  title="MAINT Parameters validation for sklearn.metrics.pairwise.paired_manhattan_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26073
  title="MAINT Parameters validation for sklearn.metrics.pairwise.paired_euclidean_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26046
  title="MAINT Parameters validation for sklearn.metrics.pairwise.cosine_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26049
  title="MAINT Parameters validation for sklearn.metrics.pairwise.linear_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26048
  title="MAINT Parameters validation for sklearn.metrics.pairwise.laplacian_kernel"
%}

{% include projects/ossd/sklearn-item.html
  pr=26047
  title="MAINT Parameters validation for sklearn.metrics.pairwise.haversine_distances"
%}

{% include projects/ossd/sklearn-item.html
  pr=26036
  title="MAINT Parameters validation for sklearn.preprocessing.scale"
%}

{% include projects/ossd/sklearn-item.html
  pr=26034
  title="MAINT Parameters validation for sklearn.tree.export_graphviz"
%}


## Documentation Contributions

Items are sorted in reverse chronological order by the time of merge.

{% include projects/ossd/sklearn-item.html
  pr=28134
  title="DOC solve some sphinx errors when updating to pydata-sphinx-theme"
%}

{% include projects/ossd/sklearn-item.html
  pr=28128
  title="DOC make up for errors in #26410"
%}

{% include projects/ossd/sklearn-item.html
  pr=28120
  title="DOC fix the confusing ordering of whats_new/v1.5.rst"
%}

{% include projects/ossd/sklearn-item.html
  pr=28107
  title="DOC fix wrong indentations in the documentation that lead to undesired blockquotes"
%}

{% include projects/ossd/sklearn-item.html
  pr=27970
  title="DOC update doc build sphinx link to by matching regex in lock file"
%}

{% include projects/ossd/sklearn-item.html
  pr=27790
  title="DOC minor fixes of splitter docstrings (from #26423)"
%}

{% include projects/ossd/sklearn-item.html
  pr=27472
  title="DOC fix return type of make_sparse_spd_matrix"
%}

{% include projects/ossd/sklearn-item.html
  pr=26661
  title="DOC show usage of __ in Pipeline and FeatureUnion"
%}

{% include projects/ossd/sklearn-item.html
  pr=26610
  title="DOC search link to sphinx version"
%}

{% include projects/ossd/sklearn-item.html
  pr=26018
  title="DOC fix SplineTransformer include_bias docstring"
%}


<!-- Include some additional scripts for item folding/unfolding -->
{% include projects/ossd/scripts.html %}
