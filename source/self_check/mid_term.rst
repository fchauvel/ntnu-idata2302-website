========
Mid-Term
========

We are halfway through the course. This self-check covers the first
half of the course: *Foundations*, *Sequences* and *Recursion*. It is
meant to let you see where you stand, particularly if you have chosen
not to attend the lectures or the lab sessions.

.. important::

   This problem set is **not graded**. If some questions feel harder
   than expected, that is useful to know.

   The solutions are not yet available. They will be released later,
   in a separate document, so that you get a chance to try the
   problems first. When they are, compare your *reasoning* with them,
   not just your final answers.

Part 1 — Finding the minimum, on-line
=====================================

The user types values one at a time. Your program must find the
smallest without storing them all.

.. exercise:: Question 1
   :label: self-check/mid-term/q01
   :nonumber:

   Write an algorithm that repeatedly asks the user for a value,
   :math:`n` times in total, and finds the smallest value given. Use
   pseudo-code, Java, or any high-level language you like.

Part 2 — RAM programs
=====================

This part connects our thinking to the machine. It is the foundation,
not what we do day to day. Use the RAM model from the lectures.

.. exercise:: Question 2
   :label: self-check/mid-term/q02
   :nonumber:

   Translate your algorithm from question 1 into a RAM program that
   reads :math:`n` integers, one at a time, and prints the smallest.

.. exercise:: Question 3
   :label: self-check/mid-term/q03
   :nonumber:

   How many instructions does your RAM program execute for :math:`n =
   10`? Choose a concrete input and state it.

.. exercise:: Question 4
   :label: self-check/mid-term/q04
   :nonumber:

   Express the number of instructions as a function of :math:`n`.
   Hint: does your answer depend on anything other than :math:`n`?

.. exercise:: Question 5
   :label: self-check/mid-term/q05
   :nonumber:

   How many memory words does your RAM program need to store
   intermediate results? Does this number depend on :math:`n`?

.. exercise:: Question 6
   :label: self-check/mid-term/q06
   :nonumber:

   What can you say about the number of instructions using big-O
   notation?

Part 3 — Back to pseudo-code
============================

.. exercise:: Question 7
   :label: self-check/mid-term/q07
   :nonumber:

   Back at our original pseudo code program from question 1. Why might
   we prefer to count comparisons rather than machine instructions?

.. exercise:: Question 8
   :label: self-check/mid-term/q08
   :nonumber:

   How many comparisons does your algorithm from question 1 perform
   for :math:`n` values? Does the answer depend on the order of the
   values?

.. exercise:: Question 9
   :label: self-check/mid-term/q09
   :nonumber:

   What can you say about this number using big-O notation?

.. exercise:: Question 10
   :label: self-check/mid-term/q10
   :nonumber:

   How many variables does your algorithm need? Does this number
   depend on :math:`n`? Compare with your answer to question 5.

Part 4 — Recursion
==================

.. exercise:: Question 11
   :label: self-check/mid-term/q11
   :nonumber:

   Write another algorithm that finds the minimum recursively.

.. exercise:: Question 12
   :label: self-check/mid-term/q12
   :nonumber:

   How can you model the number of comparisons this recursive
   algorithm performs for :math:`n` values? Hint: express the count
   for :math:`n` in terms of the count for :math:`n - 1`.

.. exercise:: Question 13
   :label: self-check/mid-term/q13
   :nonumber:

   How much memory does your recursive algorithm need, as a function
   of :math:`n`? Compare with your answer to question 10. Think about
   what happens each time a function calls itself.

Part 5 — Insertion sort
=======================

Now we want to store all the values the user provides and keep them
sorted, not just pick the minimum.

.. exercise:: Question 14
   :label: self-check/mid-term/q14
   :nonumber:

   Write an algorithm that inserts each value into its correct place
   as it is read (insertion sort).

.. exercise:: Question 15
   :label: self-check/mid-term/q15
   :nonumber:

   For insertion sort, are comparisons still the right thing to count?
   What else might matter?

.. exercise:: Question 16
   :label: self-check/mid-term/q16
   :nonumber:

   Store the values in an array. How many comparisons and how many
   moves does your algorithm need for :math:`n` values? Say what you
   count as a "move" and why. Does the answer depend on the order of
   the input? Give the best and the worst case, using big-O notation.

.. exercise:: Question 17
   :label: self-check/mid-term/q17
   :nonumber:

   Answer the same question if you store the values in a linked list
   instead. What changes, and what stays the same?

.. exercise:: Question 18
   :label: self-check/mid-term/q18
   :nonumber:

   How much memory does this program need, compared with your minimum
   algorithm from question 1?
