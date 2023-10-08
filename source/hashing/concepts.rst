================
What Is Hashing?
================

Hashing is a general concepts that surfaces in cryptography, pseudo
random number generation, machine learning, etc. In this course, we
will use it to access data in constant time (i.e., :math:`O(1)`).


The *Map* ADT
=============

The *Map* ADT captures a mapping from a set of keys :math:`K` to a set
of values :math:`V`.  In mathematics, that corresponds to a partial
function from :math:`K` to :math:`V`.

Consider mapping names to phone numbers. The set of names is
:math:`N=\{John, Lisa, Steve, Shirley\}` and the set of phones is
:math:`P = \{ 1234, 5678 \}`.  A possible mapping :math:`m` could be:

.. math::
   m = \{ (John, 1234),
          (Lisa, 1111),
          (Shirley, 1234) \}

Note that John and Shirley share the same phone number. That works
because a single value can relate to multiple keys. By contrast, a
single key has at most one value [#partial]_ . Steve is not part of
the mapping: the underlying function is partial.

.. [#partial] Otherwise, we would not get a function, but a
              relationship, in the mathematical sense.

.. important::

   In a map, each key is associated to zero or one value.

The *map* ADT offers at least the following operations:
   
.. module:: map

.. function:: create() -> Map

   Create a new empty mapping.

   Postconditions:
     - The result mapping is empty, that is

       .. math::
          m = create() \implies size(m) = 0

   
.. function:: size(m: Map) -> Natural

   Return the number of ordered pairs in the mapping.


.. function:: contains(m: Map, k: Key) -> Boolean

   Return true if the mapping has a pair :math:`(k_i, v_i)` such as
   :math:`k_i = k`.
   
.. function:: get(m: Map, k: Key) -> Value

   Retrieve the value associated with the given key

   Preconditions:
    - The key :math:`k` is in the mapping :math:`m`, that is:

      .. math::
         contains(m, k) \implies \exists v, get(m,k) = v

.. function:: put(m: Map, k: Key, v: Value) -> Map

   Insert a new pair :math:`(k,v)` into the mapping :math:`m`

   Postconditions:
    - The key :math:`k` is now associated to the value :math:`v` in
      the mapping :math:`m`

      .. math::
         m' = put(m, k, v) \implies contains(m', k) \land get(m', k) = v
   
.. function:: remove(m: Map, k: Key) -> Map

   Remove the pair with Key :math:`k` from the mapping :math:`m` 
   
   Preconditions:
    - The key :math:`k` is in the mapping :math:`m`.

   Postconditions:
    - The key is no longer part of the mapping, that is:

      .. math::
         m' = remove(m, k) \implies \neg \, contains(m', k)
    



Hash Tables
===========

The hash table is a data structure that implements the *map* ADT.


Insertion
---------

Retrieval
---------

Deletion
--------

Hash Functions
==============


Other Usages of Hashing
=======================
