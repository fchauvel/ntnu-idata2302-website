==========
Merge Sort
==========

:Lecture: Lecture 3.5 :download:`(slides) <_static/merge_sort/merge_sort.pptx>`
:Objectives: Understand how does merge sort works, and why does it sort fast
:Concepts: Merge sort using split and merge, master theorem

We now look at another well known recursive sorting algorithm: Merge
sort\ [#vonNeumann]_, running among others behind
:code:`Collections.sort` in Java. In the worst case, merge sort runs
in :math:`O(n \log n)` and beats quick sort, whose runs in
:math:`O(n^2)`, in the worst case.

.. [#vonNeumann] Yet another great contribution of John Von Neumann.

Merge Sort
==========

Principle: Split & Merge
------------------------

.. margin::
   
   .. code-block:: python

      def merge_sort(sequence):
          if (sequence.length < 2):
             return
          cut = sequence.length() // 2
          left, right = sequence.split_at(cut)
          merge_sort(left)
          merge_sort(right)
          merge(left, right)

As many recursive algorithms, merge sort is very succinct. It goes as
follows:

#. Split the sequence into two halves, namely *left* and *right*

#. Sort both *left* and *right* using merge sort

#. Merge back *left* and *right* into a single, sorted sequence

Why does that work? Conceptually, we recursively split the given
sequence until we get single-item sequences, which are sorted by
definition. Then we can merge then two by two until have sorted the
complete sequence. :numref:`recursion/merge_sort/unfolding`
illustrates this behaviour.

.. figure:: _static/merge_sort/images/unfolding.svg
   :name: recursion/merge_sort/unfolding

   Applying merge sort to the sequence :math:`s=(23,2,7,18,11,10,5)`.

The Merge Algorithm
-------------------

To merge two sorted sequences, we proceed as follows:

#. We create a new sequence, which will hold the merge

#. We keep track of our position (i.e., an iterator) for each
   sequences, say left and right. We start by pointing the two first
   items.

#. As long as we can move in both sequences:

   #. We compare the current left and right values, and we copy the
      smallest one into our result sequence.

   #. We increment the position of the sequence that yielded that
      minimum.

#. As soon as we have exhausted the items in one sequence, we copy the
   remaining items of the other into the result sequence.

The :numref:`recursion/merge_sort/merging` illustrates this
procedure. We are merging two sequences, namely :math:`\textrm{left} =
(2,7,11,23)` and :math:`\textrm{right}=(5,10,18)`. One each sequence,
we are comparing the 3\ :sup:`rd` item (10) the 2\ :sup:`nd` item
(11). As 10 is the smallest, we insert at the end of the result
sequence, and we increment the right current pointer.

   
.. figure:: _static/merge_sort/images/merging.svg
   :name: recursion/merge_sort/merging

   Merging two sorted sequences (left & right) into a new sequence

   
Efficiency
==========

Memory
------

Runtime
-------

Master Theorem
--------------
