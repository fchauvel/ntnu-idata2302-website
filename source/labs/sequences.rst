===========
 Sequences
===========

:Module: Sequences
:Git Repository: `Lab 02---Sequences <https://github.com/fchauvel/aldast-lab02>`_
:Objectives:
   - Understand the sequence ADT
   - Understand dynamic arrays and memory allocation
   - Apply algorithm analysis techniques


.. important::

   This is the first **mandatory** lab session. Organize yourself by
   groups of 2 to 3 students and write a short report, summarizing
   your answers. Here are some guidelines:
   
   - Justify every answer, especially calculations.
   - Do *not* exceed *8 pages*
   - Do *not* attach a zip of your Java project

   Submit your report, as a **PDF** file, on Blackboard by **Monday
   September 11, 2023 at 13:00**.


Dynamic Arrays in Java
======================

This first section focuses on how to implementing the Sequence ADT
using *dynamic arrays* in Java (see :doc:`Lecture 2.3
</sequences/dynamic_arrays>`).

The class :code:`no.ntnu.idata2302.lab02.SequenceTest` contains some
unit test that can help you.

.. exercise:: 2 points
   :label: lab/sequences/insertion
   :nonumber:

   Implement the `insert` function, which appends the given item at
   the end. If the underlying array is full, it shall resize the array
   appropriately (multiply the capacity by 2)
           
   .. code-block:: java

      public void insert(int item, int index) {
        // TODO: Implement
        throw new RuntimeException("Not yet implemented.");
      }

.. exercise:: 2 points
   :label: lab/sequences/deletion
   :nonumber:

   Implement the `remove` function, which delete the item stored at
   the given index. If the underlying array gets empty, it shall
   resize the array appropriately. It should halve the capacity as soon
   as the load is less or equal to 25 %.
           
   .. code-block:: java

      public void remove(int index) {
          // TODO: Implement
          throw new RuntimeException("Not yet implemented.");
      }
   
.. exercise:: 2 points
   :label: lab/sequences/search
   :nonumber:

   Implement the `search` function, which returns an index where the
   given item can be found, or `0` if the sequence does not include
   that item.
           
   .. code-block:: java

      public int search(int item) {
        // TODO: Implement
        throw new RuntimeException("Not yet implemented.");
      }

Finding Extrema
===============

We focus here on finding extrema, that is, both the minimum and the
maximum of the given sequence.

.. exercise:: 3 points
   :label: lab/sequences/extrema/code
   :nonumber:

   Propose an algorithm the finds both the minimum and the maximum of
   the given sequence.

   .. code-block:: java

      public int[] extrema() {
        // TODO: Implement
        throw new RuntimeException("Not yet implemented.");
      }

.. exercise:: 1 point
   :label: lab/sequences/extrema/worst-case
   :nonumber:

   What is the worst-case scenario for your algorithm? Give an example
   of sequence that triggers that worst case.

.. exercise:: 2 points
   :label: lab/sequences/extrema/worst-case/count
   :nonumber:

   Given a sequence of length :math:`\ell`, how many comparisons are
   needed in the worst case. Express it as a function of :math:`\ell`.
              

Finding Duplicates
==================

.. exercise:: 2 points
   :label: lab/sequences/duplicate/code
   :nonumber:

   Propose an algorithm that checks whether the given sequence has
   duplicate, that is, whether any item occurs more than
   once. Consider the following examples:

   - The sequence :math:`s_1 = (1, 2, 3, 4, 5)` does not contain any
     duplicate.

   - The sequence :math:`s_2 = (2, 1, 3, 3, 5)` contains one
     duplicate, 3, which occurs twice.

   - The sequence :math:`s_3 = (1, 2, 1, 3, 1, 4)` also contains one
     duplicate, 1, which occurs three times.

   Do **not** use any additional data structure, such as hash tables,
   hash sets, etc. We can add it has a new operations on our Sequence
   ADT, as follows:

   .. code-block:: java

      public boolean hasDuplicate() {
        // TODO: Implement
        throw new RuntimeException("Not yet implemented.");
      }
      
.. exercise:: 2 points
   :label: lab/sequences/duplicate/worst-case
   :nonumber:

   What is the worst-case scenario for this algorithm? Given a
   sequence of length :math:`\ell`, how many comparisons does this
   worst-case requires? Express it a function of :math:`\ell`.

   
.. exercise:: 3 points
   :label: lab/sequences/duplicate/worst-case/big-oh
   :nonumber:

   Consider the following growth orders:

   .. hlist::
      :columns: 4

      - :math:`g(x) = 10`
      - :math:`g(x) = \log_2 x`
      - :math:`g(x) = \sqrt x`
      - :math:`g(x) = x`
      - :math:`g(x) = x^2`
      - :math:`g(x) = 2^x`
      - :math:`g(x) = x!`
   
   #. Which one(s) are valid upper bounds for the function you found
      the previous question?
   #. How would you express such an upper bound with the Big-Oh notation?
   #. Which one is the tightest bound?


      
Digital Counter
===============

Consider a counter whose value increases whenever the user presses the
"increment" button. The user can read the value on a sequence of
`single-digit displays
<https://en.wikipedia.org/wiki/Seven-segment_display>`_, where each
display only shows a single symbol (from 0 to 9).

Each single-digit display accepts a `next` command that changes it to
the next symbols, for instance, from 0 to 1, 1 to 2, from 2 to 3, etc,
and from 9 back to 0.

.. exercise:: 2 points
   :label: lab/sequences/counter/algo
   :nonumber:

   Implement the `increment` function of the counter, that increases its
   value by one.

   .. code-block:: java

      public class Counter {

         private DigitDisplay digits[];

         public void increment() {
            // TODO: Implement, by calling digits[i].next() when appropriate
         }

      }

      class DigitDisplay {
         // ...
      }
   
   Note  that, in  some  cases, we  must propagate  the  carry to  the
   left. For  instance to  increment `123`,  one the  right-most digit
   change to make `124`, but incrementing `199` yields `200` and three
   digits must changed.

.. exercise:: 2 points
   :label: lab/sequences/counter/amortized
   :nonumber:

   When incrementing the value of the counter, how many times does
   your algorithm invoke the `next` operation for its digits. Use
   amortized analysis to find a bound.
