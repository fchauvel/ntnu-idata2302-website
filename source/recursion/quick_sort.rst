==========
Quick Sort
==========

:Lecture: Lecture 3.4 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/EQ3eIyg4GPhGuQ1cVfOTDGoBmXZQfwz7A8GdcSWofKnGoQ?e=iLNPe5>`
:Objectives: Understand how does quick sort works, and why does it sort fast
:Concepts: Sorting, recursion, pivot element

We have already looked at three sorting algorithms: Insertion sort,
selection sort, and bubble sort. All are rather slow as they run in
quadratic time (see :doc:`Lecture 2.5 </sequences/sorting>`). We will
now scrutinize one of the faster, namely *quick-sort*, implemented
among others by the :code:`qsort` operation in the C standard library.
           

Quick Sort
==========

The Idea: Partitioning
----------------------

The idea of quick sort [#hoare]_ relies on partitioning the given items around a
*pivot* item. We pick the pivot at random, and then, every item that
is smaller than pivot goes on one side, and the rest on the other
side. :numref:`recursion/quick_sort/partitioning` illustrates this
idea. We will look later at what algorithm one can use to do that.

.. figure:: _static/quick_sort/images/partitioning.svg
   :name: recursion/quick_sort/partitioning

   Partitioning a sequence around a chosen pivot, here 22

Note that partitioning is a property of a sorted sequence. Any item in
a sorted sequence is preceded by smaller items and followed larger
items.

.. [#hoare] Quick sort is attributed to C. A. R. Hoare in 1959. He
            later received the Turing award in 1980 for his
            contribution to formal verification.

The "Quick-sort" Algorithm
--------------------------

Equipped with partitioning the sequence around a chosen pivot, we can
describe quick-sort as follows:

#. Choose a *pivot* item, randomly.

#. Partition the sequence as follows: Items that are smaller than the
   pivot go to its left, and the rest to its right.

#. Apply quick-sort on the left of the pivot (recursion)

#. Apply quick-sort on the right of the pivot (recursion)

.. margin::

   .. code-block:: python
      :caption: Overview of the quick-sort algorithm
      :name: recursion/quick_sort/algorithm

      def quick_sort(sequence):
          if len(sequence) < 2:
             return
          pivot = partition(sequence)
          quick_sort(sequence[:pivot])
          quick_sort(sequence[pivot+1:])

:numref:`recursion/quick_sort/algorithm` shows a Python program that
implements quick sort, using
recursion. :numref:`recursion/quick_sort/quick_sort` shows how this
would unfold on a sequence of integers. The sequence is gradually
broken down into smaller sequences, until it gets sequences of length
that are sorted, by definition.

       
.. figure:: _static/quick_sort/images/quick_sort.svg
   :name: recursion/quick_sort/quick_sort
          
   Unfolding quick sort on a small sequence of integers.

.. caution:: Quick sort, when written recursively, is a fairly short
             algorithm. Its behavior is not trivial however. This is
             often the case with recursive algorithms.
            
Out-of-place Partitioning
-------------------------

How do we partition a sequence around a chosen pivot? The simplest
solution is the "out-of-place" approach, where we create a new
sequence that holds the result of the partitioning. If we accept using
this extra memory, we can proceed as follows:

#. We create a new empty sequence that will hold the result of the
   partitioning.

#. We choose a pivot index, for instance the middle item. Other
   strategies are possible.

#. We copy the pivot *item* into our result sequence.

#. We traverse the given sequence, and for every item *but the pivot*:

   #. If the current item is smaller than the pivot, we insert it in
      front of the result, that is before the pivot

   #. If the current item is greater or equal to the pivot, we insert
      it at the end of result, that is after the pivot.

:numref:`recursion/quick_sort/partitioning/out-of-place` illustrates
how that would look like in Python. Here we choose as pivot the middle
element. The `append()` function insert an item at the end of a
sequence.
      
.. code-block:: c
   :caption: Partitioning the sequence (with a new sequence)
   :name: recursion/quick_sort/partitioning/out-of-place
   :emphasize-lines: 2, 9-12

   def partition(sequence):
     pivot_index = len(sequence) // 2
     pivot = sequence[pivot_index]
     result = [pivot]
     for index in range(len(sequence)):
       if index == pivot_index:
           continue
       current = sequence[index];
       if current >= pivot:
          result.append(current)
       else:
          result.insert(0, current)
     return pivot, result

This approach is not ideal because it requires allocating a new
sequence each time we partition the array. Keep in mind, that quick
will partition sub sequences again and again. Besides, insertion in
front of a sequence runs in :math:`O(n)`, so the runtime would not great
either. A better way is the "in-place" partitioning where we only swap
items without any extra memory cost.
      
In-place Partitioning
----------------------

To partition "in-place" we rely on the swap operation, which exchanges
the position of two items in a sequence, and runs in :math:`O(1)`. To
do that, we will organize our sequence as shown on
:numref:`recursion/quick_sort/in-place_partitioning`. We will
temporarily place the pivot in front, while we will divide the rest
into smaller items on the left, larger items on the right, with the
items yet to be partitioned in between.

.. figure:: _static/quick_sort/images/in-place_partitioning.svg
   :name: recursion/quick_sort/in-place_partitioning

   Setup used to partition a sequence: The pivot is placed in front
   (temporarily), while the rest is split between the smaller items on
   the left and the larger items on the right.

As we progress, we move items from the middle to either smaller or
greater. The variable :code:`first` and :code:`last` keep track of
the remaining items yet to be partitioned. Overall, we proceed as
follows:

#. We choose a pivot item, and we swap it with first item, put it in
   "safe" place.

#. Initially, :code:`first` and :code:`last` points toward the second
   and the last item, respectively.

#. As long as last is not smaller than first:

   #. If :code:`first` is greater or equal to the pivot, we swap it with
      :code:`last` and we *decrement* last.

   #. If :code:`first` is smaller than the pivot, we simply increment
      :code:`first`.

#. We swap back the pivot with :code:`first`, to put it back in the
   right place.


.. code-block:: python
   :caption: In-place partition of sub sequences, delimited by
             :code:`lower` and :code:`upper`.

   def partition(sequence, lower, upper):
     pivot = (lower + upper) // 2
     sequence.swap(lower, pivot)
     first, last = lower+1, upper-1
     while first <= last:
          if sequence[first] <= sequence[lower]:
               first += 1
          else:
               sequence.swap(first, last)
               last -= 1
     swap(array, lower, first-1)
     return first-1

   
Efficiency
==========

Let's now look at how fast is the quick sort. First we have to
distinguish the best case from the worst case before to try to
calculate their growth order.


Best Case
---------

.. figure:: _static/quick_sort/images/best_case.svg

   Unfolding the best case scenario for quick sort: The chosen pivot
   index turns out to always hold the median value, which yields a
   "perfect" split in halves.

How fast would that be? Again, for such a recursive algorithm we have
to model it using a recurrence relationship. At a high-level, the time
spent sorting is the time spent partitioning plus the time spent
sorting the left and right hand side of the pivot.

If we assume the time spent partitioning is proportional to the length
of the given sequence, we get:

.. math::

   t(n) & = \begin{cases}
      0 & \textrm{if } n < 2 \\
      n + 2\cdot t(\frac{n}{2}) & \textrm{otherwise}
   \end{cases}

We can expand it to see a pattern emerge as follows:

.. math::

   t(n) & = n + 2 \cdot t(\frac{n}{2}) \\
        & = n + 2 \left[ \frac{n}{2} + 2 \cdot t(\frac{n}{4}) \right] \\
        & = n + n + 4 \cdot t(\frac{n}{4}) \\
        & = n + n + 4 \left[ \frac{n}{4} + 2 \cdot t(\frac{n}{8}) \right] \\
        & = n + n + n + 8 \cdot t(\frac{n}{8}) \\
        & = n + n + n + \ldots  + 2^k \cdot t(\frac{n}{k}) \\

Now the question becomes: When will this term :math:`\frac{n}{k}`
becomes smaller than 2. Or put in another way, how many time can one
recursively divide :math:`n` by 2? The answer is given by
:math:`\log_2 n`.

.. math::
        t(n) & = \underbrace{n + n + n + \ldots + n}_{log_2 n \textrm{ times}} + 0 \\
             & = n \log_2 n \\
        t(n) & \in O(n \log n)

.. important:: In the best case, quick sort runs in :math:`O(n \log n)`

Worst Case
----------

What is the worst case? When we pick a pivot element, we pick an item
in the middle. We pick *an index*, but the hope is that this value is
the "median" value of the sequence, that is, it has as many items on
its left as it has on its right. That way, we have a "perfect" split
of the sequence in two halves. By contrast, the worst case occurs when
the pivot turns out to be the minimum (or the maximum). As shown on
:numref:`recursion/quick_sort/worst_case`, that yields broken splits
where one side is empty, and in turns, :math:`n` recursion levels.

.. figure:: _static/quick_sort/images/worst_case.svg
   :name: recursion/quick_sort/worst_case

   Unfolding the worst case: At every recursion, the chosen pivot
   turns out to be the minimum (resp. the maximum) of the sequence.

How many operation would that require? To simplify the calculation
let's only count the swap operations, and assume that partitioning an
sequences of length :math:`\ell` runs in :math:`O(\ell)`.

As for other recursive algorithms, we have to formulate the efficiency
using a recurrence relationship.

.. math::

   t(n) = \begin{cases}
   0 & \textrm{if } n < 2 \\
   n + t(n-1) & \textrm{otherwise}
   \end{cases}

If we unfold this recurrence, we can see that it yields the sum of the
:math:`n` first integers.

.. math::

   t(n) & = n + t(n-1) \\
        & = n + (n-1) + t(n-2) \\
        & = n + (n-1) + (n-2) + t(n-3) \\
        & = n + (n-1) + (n-2) + (n-3) + \ldots + (n-n+2) + 0 \\
        & = \sum_{i=1}^{n} i \\
        & = \frac{n \cdot (n+1)}{2} \\
        & = \frac{n^2 + n}{2} \\
    t(n) & \in O(n^2)
  
.. important:: In the worst case, quick sort also runs in
               :math:`O(n^2)`, but in practice this case is rare
               enough.


Average Case
------------
