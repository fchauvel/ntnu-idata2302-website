==========
Collisions
==========

:Lecture: Lecture 4.2 :download:`(slides) <_static/collisions/hashing_collisions.pptx>`
:Objectives: Understand the problem of collisions when using a hash
             function and how to work around it
:Concepts: Hash function, collisions, separate chaining, open addressing


What Are "Collisions"?
======================

Hash functions maps a rather very large set of keys onto a much
smaller set of array indices. The mere size difference between these
two sets implies that there will be several keys mapped onto the same
index: This a *collision*.

.. important::

   A *collision* occurs whenever a hash function maps two different
   keys onto the same index.

.. figure:: _static/collisions/images/collisions.svg
   :name: hashing/collision/idea

   A collision: Two entries whose keys unfortunately maps to the same
   index

:numref:`hashing/collision/idea` illustrates these collisions. The
first entry, whose key is the email' ``john@test.com`` maps to index
3, but a second entry, whose key is ``lisa@test.com`` maps to the very
same index. Which value should we store at that index?



This implies that a good hash function therefore minimizes the number
of collisions. But collisions will necessarily happens as soon as the
set of keys is larger than the set of indices. Otherwise, we would
talk about *perfect hashing* [#perfect-hashing]_ .

.. [#perfect-hashing] Perfect hashing is possible is the set of keys
                      is fixed and known in advance. Then one can
                      allocate enough entry in the table to ensure
                      perfect hashing.

.. margin::

   .. figure:: _static/collisions/images/probability.svg
      :name: hashing/collisions/probability

      Minimizing the probability of collisions by evenly distributing
      keys to indices.
                      
As shown on :numref:`hashing/collisions/probability`, minimizing the
probability of collision boils down to mapping evenly the keys to the
possible indices. The mathematics behind hash function relate to the
`balls into bins
<https://en.wikipedia.org/wiki/Balls_into_bins_problem>`_ problem. The
player is given :math:`n` balls, and at each step, she places a ball
into one of the :math:`m` available bins. The question that connects
with hash functions and collisions in particular is: At the end of the
game, what is the expected number of balls in a bin?

I see no need to dive into the maths here, but we shall see how can we
modify our implementation of hash tables, to guard against
collisions. There are two main strategies: *Separate chaining* and
*open addressing*

.. important::

   There are two common ways to manage collisions: Separate
   Chaining and Open addressing.

Separate Chaining
=================

Retrieval
---------

Insertion
---------

Deletion
--------

Wasted Space
------------


Open Addressing
===============

Retrieval
---------

Insertion
---------

Deletion
--------

Variations
----------
