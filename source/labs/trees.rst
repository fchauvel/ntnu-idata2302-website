=====
Trees
=====

:Module: Trees
:Git Repository: `Lab 04---Trees <https://github.com/fchauvel/aldast-lab04>`_
:Objectives:
   - Understand the general concept of tree
   - Understand how a binary search tree works 
   - Understand how a heap tree works


.. caution::

   This is the second **mandatory** lab session. Organize yourself by
   groups of 2 to 3 students and write a short report, summarizing
   your answers. Here are some guidelines:
   
   - Justify every answer, especially calculations.
   - Do *not* exceed *8 pages*
   - Do *not* attach a zip of your Java project

   Submit your report, as a **PDF** file, on Blackboard by **Friday
   November 6, 2025 at 23:30** at the latest.

   
Binary Search Tree (BST)
========================

Here we focus on the Binary search trees. For the questions that
relate to programming, chec out the file `BST.java`.

.. exercise:: 2 points
   :label: labs/trees/bst/insertions
   :nonumber:

   Starting with an empty binary search tree, insert the keys A, L, P,
   D, R, E, I, and X (in this very order). Assume keys compare one
   another alphabetically (i.e. A < B < C < . . . ). Draw the tree
   after every insertion.


.. exercise:: 1 point
   :label: labs/trees/bst/deletions
   :nonumber:

   Consider the tree resulting from the previous question and delete
   the keys X, A, and L (in this very order). Draw the tree after
   every deletion.

   
.. exercise:: 3 points
   :label: labs/trees/bst/balancing
   :nonumber:

   Consider inserting the items A, B, and C in an empty BST. 

   #. What are all the possible ways (i.e., orderings) to insert these
      three keys into a BST when done randomly?

   #. What are the possible tree "shapes" resulting from the insertion
      orders you have listed in the previous question.

   #. What can you say about the probability these various tree
      shapes? Have all tree shape the same probability?

   #. If we generalize to inserting :math:`n`, what can you conclude
      about the probability of obtaining specific tree shapes?

.. exercise:: 2 points
   :label: labs/trees/bst/insert
   :nonumber:

   Implement the :code:`insert` operation, which insert a new item
   into the tree.
      

.. exercise:: 1 point
   :label: labs/trees/bst/size
   :nonumber:

   Implement the :code:`size` operation, which returns the number of
   items in a BST.


.. exercise:: 2 points
   :label: labs/trees/bst/minimum
   :nonumber:

   Implement the :code:`minimum` and :code:`maximum` operations, which
   returns the smallest and the largest item inserted in the tree,
   respectively.
   

.. exercise:: 1 point
   :label: labs/trees/bst/shows
   :nonumber:

   Implement the operation :code:`format()`, which converts the tree
   into a string with all the items listed in ascending order,
   separated by commas. What type of tree traversal does that require?
              

Minimum Binary Heap
===================

We look here at how one can implement a minimum heap in Java.

.. exercise:: 1 point
   :label: labs/trees/heap/insert
   :nonumber:

   Look at the :code:`Heap` class provided and implement the
   :code:`insert` operation.


.. exercise:: 1 point
   :label: labs/trees/heap/takeMinimum
   :nonumber:

   Implement the :code:`takeMinimum`, we removes and returns the
   minimum of the heap.


.. exercise:: 2 points
   :label: labs/trees/heap/count
   :nonumber: 

   How many elements does a binary heap of height h have at least? How many at
   most? (only a root has height 0)


.. exercise:: 1 point
   :label: labs/trees/heap/k-smallest
   :nonumber: 
              
   Where can the second-smallest element be in a min-binary heap? What
   about the third-smallest? In general, give a rule at which level
   the k-smallest element in a binary heap with n elements could
   be. (you can assume a heap of an arbitrary size :math:`n = 2t − 1`
   with :math:`t \in N`, the root is at level 0).

.. exercise:: 2 point
   :label: labs/trees/heap/decreaseKey
   :nonumber: 

   Implement the :code:`decreaseKey(i, k)`, which set the element at
   position i to the value k and restore the heap property. It throws
   an error if k is greater or equal to the element stored at
   position i.

