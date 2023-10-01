=========================
Sorting Without Comparing
=========================

:Lecture: Lecture 3.6 :download:`(slides) <_static/merge_sort/radix_sort.pptx>`
:Objectives: Understand the limit of sorting by comparing.
:Concepts: Sorting without comparing, counting sort, radix sort

We depart from recursion a bit to wrap up our discussing about sorting
algorithms. We have already looked at five: Selection sort, Insertion
sort, Bubble sort, Quick sort, and Merge sort. What is the common
trait among them? They all rely on comparisons, that is they compare
one item to another to decide where it should go. This type of sorting
is called *comparison-based*.

In this lecture look at the *problem* of sorting and its inherent
limits when one uses comparisons: No comparison-based
sorting algorithm can run faster than :math:`O(n \log n)`! To
illustrate a different approach, we shall look at *Counting sort* and
Radix sort, which offer, under specific conditions, linear runtime.

           
The Limit of Sorting by Comparing
=================================

What is sorting


What is sorting? Finding a permutation that adheres to the needed
ordering.

The theoretical bound: Sorting by Comparing


Counting Sort
=============

Idea: Counting keys

Assumptions: Know the ordering of keys

Count sort

Runtime

Memory


Radix Sort
==========

Idea: counting sort by digits

Implementation

Runtime

Memory


Sorting Algorithms, Overview
============================


