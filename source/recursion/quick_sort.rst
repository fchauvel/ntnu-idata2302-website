==========
Quick Sort
==========


:Lecture: Lecture 3.4 :download:`(slides) <_static/quick_sort/quick_sort.pptx>`
:Objectives: Understand how does quick sort works, and why does it sort fast
:Concepts: Sorting, recursion, pivot element


Quick Sort
==========

The Idea: Partitioning
----------------------



The "Quick-sort" Algorithm
-------------

.. code-block:: python

   def quick_sort(array):
       if len(array) < 2:
          return
       pivot = partition(array)
       quick_sort(array[:pivot])
       quick_sort(array[pivot+1:])


             
Out-of-place Partitioning
-------------------------

                

In-place Partitioning
----------------------



Efficiency
==========

Worst Case
----------


Best Case
---------


Average Case
------------
