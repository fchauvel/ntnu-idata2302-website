============
Using Arrays
============

:Lecture: Lecture 2.2 :download:`(slides) <_static/arrays/arrays.pptx>`
:Objectives: Understand how to implement sequences using arrays
:Concepts: Insertion, deletion and searching through sequences

Let us now look at "sequences", our first abstract data type. Our
objectives are:

#. See how to specify an abstract data type

#. See how to implement it

#. Understand whether our implementation adhere to our specification

#. Understand how efficient our implementation is

Our sequence ADT exposes five operations, namely, "create", "length",
"get", "insert", "remove", and "search". We aim at making them
"correct" and to understand how efficient they. Later in the course,
we will see how to make them. To link with our RAM, we will look at a
C implementation that allocates and frees memory, explicitly. Keep in
mind that most programming languages offer "sequences" as a built-in
data structures, so it is unlikely that you will ever get to implement
that yourself.

.. note::

   I want to emphasize how we can approach correctness for a data
   structure as a whole. The point is not to make a formal proof, but
   to illustrate the thought process, which also yields meaningful
   test cases in practice.


An ADT for Sequences
====================

.. index::
   pair: ADT ; Sequence

Intuitively, a sequence is just a collection of items. A "list" if you
will, but let's avoid the word "list", because "list" is a specific
data structure, which we shall study later.

.. caution::

   I use the word "sequence" for the ADT, but you will come across
   other words in other contexts. For example, Java and Python use the
   word "list", Ruby and JavaScript use the term "array", C++ uses
   both "vector" and "list", etc. Sometimes, these words describe an
   abstraction (like an interface in Java) and sometimes they describe
   an actual implementation. There is unfortunately no consensus.

A sequence, just like a set, is a well defined mathematical
concept. By contrast with a set, a sequence has an order and allows
for duplicates. For instance, we could have a sequence :math:`s` of
daily temperature reading:

.. math::
   s = (2, 3, -1, 0, 2, 5, 7, 7)

This sequence :math:`s` has eight items, the first one is 2, the
second is 3, the third is -1, and so on and so forth. Note that the
values 2 and 7 occur more than once. Sequences do not have to contain
numbers: The word "sequence" is indeed a sequence of characters such
that :math:`s=(s, e, q, u, e, n, c, e)`.

To describe an ADT, we need to define a set of operations and how they
relate to each other using axioms. These axioms capture how we expect these
operations to behave, regardless of their implementation.

Below is the list of operations and the axioms. I prefer to use pre-
and post-conditions, to give a more practical specification (and less
mathematical).

.. module:: seq

.. function:: create() -> Sequence

   Create a new, empty sequence (denoted by :math:`s'`).

   Pre-conditions:
     None

   Post-conditions:         
     - (A1) The resulting sequence has a length of zero. That is

       .. math::
          length(s') = 0

          
.. function:: length(s: Sequence) -> Natural

   Returns the number of items in the sequence without modifying it.

   For example, the sequence :math:`s = (s, e, q, u, e, n, c, e)` has
   a length of eight.

   Pre-conditions:
     None

   Post-conditions:
     None

.. function:: get(s: Sequence, p: Position) -> Item

   Returns Item ``i`` at position ``p`` or raises an error if ``p`` is
   invalid. It does not modify the sequence.

   For example, the second item in :math:`s = (s, e, q, u, e, n, c,
   e)` is the character 'e', and the fourth one is the character 'u'.

   Pre-conditions:
     - (A2) The position :math:`p` is valid with respect to the given
       sequence :math:`s`, that is:

       .. math::
          p \in [1, length(s)]

   Post-conditions:
      None

.. function:: insert(s: Sequence, i: Item, p: Position) -> Sequence

   Inserts Item ``i`` at position ``p``, shifting items forward as
   needed. Raises an error if ``p`` is invalid.

   For instance, inserting 'q' in third position in :math:`s = (s, e,
   q, u, e, n, c, e)` yields a new sequence :math:`s' = (s, e,
   \mathbf{q}, q, u, e, n, c, e)`.

   Pre-conditions:
    - (A3) The position :math:`p` is valid with respect to the given
      sequence :math:`s`. Since we can append at the end of the
      sequence, that gives us:

      .. math::
         p \in [1, length(s)+1]

   Post-conditions:   
    - (A4) The :func:`length` has increased by one, that is:

      .. math::
         length(s') = length(s) + 1
       
    - (A5) Calling :func:`get` with position :math:`p` returns Item
      :math:`i`, that is

      .. math::
         get(s', p) = i
                      
    - (A6) For all positions strictly lesser than ``p``, :func:`get`
      returns the same value than before the insertion. That is:

      .. math::
         \forall k \in [1, p-1], \; get(s', k) = get(s, k)
                      
    - (A7) For all position ``k`` strictly larger than ``p``,
      :func:`get` returns the item that was at position ``k-1`` before
      the insertion. That is:

      .. math::
         \forall k \in [p+1, length(s')], \; get(s', k) = get(s, k-1)

       
.. function:: remove(s: Sequence, p: Position) -> Sequence

   Removes the item at position ``p`` or raises an error if the
   position is invalid.

   For instance, removing the 3rd item in :math:`s = (s, e, q, u, e,
   n, c, e)` yields a new sequence :math:`s' = (s, e, u, e, n, c, e)`.

   Pre-conditions:  
    - (A8) The length of the sequence :math:`s` is strictly greater than
      zero, that is:

      .. math::
         length(s) > 0
                   
    - (A9) The position :math:`p` is valid with respect to sequence
      :math:`s`, that is:

      .. math::
         p \in [1, length(s)]

   Post-conditions:   
    - (A10) The length of the sequence has decreased by one. That is:

      .. math::
         length(s') = length(s) - 1
                     
    - (A11) All positions that precede :math:`p` still map to the same
      items. That is:

      .. math::
         \forall k \in [1, p[, \; get(s, k) = get(s', k)
                      
    - (A12) All positions that follow :math:`p` still map to the same
      items. That is:

      .. math::
         \forall k \in [p, length(s')], \; get(s', k) = get(s, k+1)

.. function:: search(s: Sequence, i: Item) -> Position

   Finds a position ``p`` where Item ``i`` occurs or returns 0 if Item
   ``i`` does not occur.

   For instance, searching for 'e' in :math:`s = (s, e, q, u, e, n, c,
   e)` may yield 2, 5, *or* 8. Either is a valid answer. By contrast,
   searching for 'z' yields 0.

   Pre-conditions:
    - None
                   
   Post-conditions:
    - (A13) If the result is a position ``p`` greater than zero,
      then :func:`get` should yields Item ``i`` for that position
      ``p``, that is:

      .. math::
         search(s, i) = p \implies get(s, p) = i
                  
    - (A14) If the result is zero, then there is no position where Item
      ``i`` can be found.

      .. math::
         search(s, i) = 0 \implies \forall p \in [1, length(s)], \; get(s, p) \neq i

                    
.. note::

   In general there is no way to check whether such a specification
   (i.e., the set of axioms) is itself correct. Do we miss any axiom?
   some useful operations?  etc. This depends on the problem.

Array-based Sequences in C
==========================

Now we have clarified what a sequence is and how it behaves, let's
look at how we could implement that in C, using arrays.

We shall restrict ourselves to only fixed-capacity sequences, that is,
sequences with a predefined maximum length. We will see in the next
lecture how to get rid off this limitation.

In procedural languages such as C, Pascal, Ada and the likes, an ADT
is often implemented by a *module*, which put together a data
structure and the operations that manipulate it. In C, each module has
a header and implementation file. The header file (`.h`) lists the
"signatures" of these operations, whereas the implementation file
(`.c`) defines their actual implementation.

.. code-block:: c
   :caption: Header file for our Sequence C module

   #ifndef SEQUENCE_H
   #define SEQUENCE_H

   typedef struct sequence_s Sequence;

   Sequence* seq_create(void);

   void seq_destroy(Sequence*);

   int seq_length(Sequence* sequence);

   void* seq_get(Sequence* sequence, int index);

   void seq_insert(Sequence* sequence, void* item, int index);

   void seq_remove(Sequence* sequence, int index);

   int seq_search(Sequence* sequence, void* item);

   #endif

To make our module *practical*, we represent items using generic
pointers ``void*`` (i.e., pointer to whatever). Our sequence is in
fact a sequence of pointers. Besides, C does not have a built-in
namespace mechanism, we prefix operations' name with ```seq_`` to
avoid name collisions.

Memory Representation
---------------------

Here, we use a single array to store the items in our sequences. Recall
an array is just a preallocated continuous segment of memory.

We represent our sequence using a *record* with two fields: ``length``
to keep track of the number of items currently in the sequence, and
the other one, ``items``, to keep track of the items in it.

.. code-block:: c
   :caption: C structure to capture the length and items

   const int CAPACITY = 100;
                             
   struct sequence_s {
     int length;
     void** items;
   };

In C, a record is named a "struct". Here, the type ``void**``
indicates an array of pointer to "whatever". A pointer is the C-way of
storing an array that we can modify.

Queries: Length and Access
--------------------------

Let me start with the simplest part: The two queries :func:`length`
and :func:`get`.

.. code-block:: c
   :emphasize-lines: 4, 11

   int
   seq_length(Sequence* sequence) {
     assert(sequence != NULL);
     return sequence->length;
   }

   void*
   seq_get(Sequence* sequence, int position) {
     assert(sequence != NULL);
     assert(position > 0 && position <= sequence->length);
     return sequence->items[position-1];
   }

The ``seq_length`` procedure directly returns the field ``length`` of
the given sequence record. Other operations with update it.

The ``seq_get`` procedure directly returns the items at the given
position in the underlying array. We first check however if this position
exists. In C, arrays are indexed from zero, so we return in fact the
items at position ``position-1`` in our internal array.

Is this Correct?  To show an implementation adhere to a specification,
  we must show that when the pre-conditions are true, then the
  post-conditions hold as well. In our specification, neither
  :func:`length` and :func:`get` have any post-condition, our
  implementation is correct so far (any implementation would fit).

How Efficient is It?
  Both operations runs in constant time: None includes a loop and
  because accessing a field in a record takes constant time, and
  accessing a specific entry in an array also takes constant time.


Creation & Destruction
----------------------

Consider the implementation of :func:`create` and a destructor (not
specified in our ADT), which allocate and free memory, respectively.

.. code-block:: c
   :emphasize-lines: 3, 5, 12-13

   Sequence*
   seq_create(void) {
     Sequence* new_sequence = malloc(sizeof(Sequence));
     new_sequence->length = 0;
     new_sequence->items = malloc(CAPACITY * sizeof(void*));
     return new_sequence;
   }

   void
   seq_destroy(Sequence* sequence) {
     assert(sequence != NULL);
     free(sequence->items);
     free(sequence);
   }

We use of ``malloc`` and ``free`` to acquire and release memory,
respectively. Both procedures come from the C standard library (i.e.,
stdlib.h), which the underlying OS provides. To create a new sequence,
we allocate a structure (length and pointer to an array of items), and
then we reserve this array of a fixed number of items. We release these
two in the opposite order.

Is this Correct?
  Our specification of the :func:`create` operation only has one
  post-condition: Ensure that the length of a resulting sequence is
  zero (A1). Recall that our implementation of :func:`length` directly
  returns the value of in the ``length`` field. Since we always
  explicitly set this fields for every new sequence, A1 does hold.

  Our ADT does not include any ``destroy`` operation. This is a common
  because no post-condition (or axiom) can exist on something that
  does not exist any more. At the system-level however, we have to
  free the memory that was used by the sequence. In C, we have to do
  that by hand (there is no garbage collection). We have to release
  both the array of pointers, as well as the sequence record
  itself. We do not free the items themselves, since they may still be
  needed by the client application.

How Efficient Is It?
  Provided that acquiring and releasing memory take constant time, these
  two operations ``seq_create`` and ``seq_destroy`` also take constant time.

  As for the storage efficiency, what do we get? Remember, here we
  implement a fixed-capacity sequence, and we *always* preallocate a
  fixed-length array. So our storage efficiency here is
  :math:`O(1)`:We always allocate an array of ``CAPACITY`` items,
  regardless of how many we will actually use.


Insertion
---------

Inserting into a sequence has to preserve the ordering. So we cannot
just append a new element at the end. Consider for example the
sequence :math:`s=(1,3,5,7.9)`, inserting :math:`4` in 3rd position
yields :math:`s'=(1,3,4,5,7,9)`. Note that items 5, 7, and 9 have
changed position.

We follow a two-step procedure. illustrated by :numref:`seq_insertion`
below:

#. Check whether the sequence is not full, and whether the given
   position :math:`k` is valid
         
#. Make room for the new item by shifting all those beyond the
   insertion point by one position towards the end. This yields a free
   entry at the insertion point.
   
#. Insert the given item into this free entry

#. Increment the length of the sequence

   
.. _seq_insertion:

.. figure:: _static/images/sequence_insertion.svg
   :align: center

   Insertion 'q' at the 3rd position of the a sequence :math:`s
   =(s,e,q,u,e,n,c,e)`.
   

In C, the insertion could look like:

.. code-block:: c
   :linenos:
   :emphasize-lines: 6-8, 10
                
   void
   seq_insert(Sequence* sequence, void* item, int position) {
     assert(sequence != NULL);
     assert(sequence->length < CAPACITY);
     assert(position > 0 && position <= sequence->length + 1);
     for (int i=sequence->length-1 ; i>=position-1 ; i--) {
       sequence->items[i+1] = sequence->items[i];
     }
     sequence->items[position-1] = item;
     sequence->length++;
   }

Keep in mind that C arrays are indexed from zero whereas our sequence
ADT is indexed from 1. Starting at the end, we loop through all the
items beyond the insertion point, shifting them towards the end. We
write the given item at the desired position. Finally, we increment
the length.

Is this Correct?
  We use ``assert`` to check for all pre-conditions, so, we have to
  look at each post-condition in turn:

  - (A4) The length is increased by one. At Line 10, we explicitly
    increment the length field, which is what our :func:`length`
    implementation returns. Since this always happens (there is no
    loop), A4 holds.

  - (A5) The given item ``i`` is available at position ``p``. Line 9,
    we explicitly assign the bucket ``p-1`` with the given item. Since
    our implementation of the :func:`get` returns the item in that
    very bucket, A5 holds as well.

  - (A6) For all positions strictly smaller than ``p``, :func:`get`
    returns the same item than before the insertion. Our loop starts
    at the last bucket and proceed until the position ``p``. Other
    buckets are left untouched, and thus remain available by
    :func:`get`. A6 holds.

  - (A7) For all positions strictly greater than ``p``, :func:`get`
    yields the item that was in the previous position prior to the
    insertion. Our ``for`` loop goes through all the buckets from
    ``p-1`` (included), and shifts them one-by-one in the next
    bucket. Since our implementation of :func:`get` returns bucket
    ``p-1``, each item is then available in the next bucket. A7 holds.

How Efficient Is It?
  In this case there are different scenarios. The "best case" occurs
  when we insert in the last position, because there is nothing to shift
  forward. The insertion then runs in constant time (i.e., :math:`O(1)`).

  The worst case occurs when we insert at first, because we must then
  shift every single item forward in order to free the first spot. Our
  insertion then runs in linear time (i.e., :math:`O(n)` where :math:`n`
  stands for length of the sequence).

  .. important::

     Inserting in array-based sequence is only efficient when we insert
     at the end.

Deletion
--------

Deletion is the very "counter part" of the insertion, the same backward
if you will. Consider again the sequence :math:`s=(1,3,4,5,7,9)`,
deleting the 3rd element (i.e., 4) yields the sequence
:math:`s'=(1,3,5,7,9)`. Note that 5, 7 and 9 have changed position.

We proceed as illustrated on :numref:`seq_deletion`:

#. Check that the sequence is not empty and that the given position is
   valid

#. Copy backward all the element beyond the deletion point. This
   override the insertion point and duplicate the last item.

#. Mark the last entry as ``NULL`` (optional)
   
#. Decrease the length of the sequence

.. _seq_deletion:

.. figure:: _static/images/sequence_deletion.svg
   :align: center

   Removing the 4th position of the a sequence :math:`s
   =(s,e,q,q,u,e,n,c,e)`.

   
.. code-block:: c
   :linenos:
   :emphasize-lines: 6-8, 10
      
   void
   seq_remove(Sequence* sequence, int position) {
     assert(sequence != NULL);
     assert(sequence->length > 0);
     assert(position > 0 && position <= sequence->length + 1);
     for(int i=position-1 ; i<sequence->length ; i++) {
       sequence->items[i] = sequence->items[i+1];
     }
     sequence->items[sequence->length] = NULL;
     sequence->length--;
   }

    
Is it Correct?
  We implemented each precondition using ``assert``, and that raises
  an error as soon as any does not hold.  What remains is thus to look
  at each post-condition of the :func:`remove` operations:

  - (A10) The length of the sequence decreases by one. This is done
    explicitly Line 10, and always happens (i.e, no loops or
    conditional). A10 holds.

  - (A11) All the positions that precedes ``p`` stay the same. In our
    internal array, we only shift backward the element from index
    :math:`p-1` onward: The previous buckets are left untouched. A11
    thus holds.

  - (A12) All the positions from ``p`` onwards now yields the item
    that was in the following position prior to the deletion. This is
    ensured by the for loop (Lines 6--8), which explicitly shift
    backward array buckets starting at position ``p-1``. A12 thus
    holds.

How Efficient is It?
  As we devised for the insertion, the deletion has two scenarios. The
  best case is when we delete the last item of the sequence. In that
  case, there is no need to shift anything, and our deletion runs in
  constant time (i.e., :math:`O(1)`). By contrast, the worst case occurs
  when we delete the first item: We have to shift every single items in
  the underlying array and the deletion thus takes linear time (i.e.,
  :math:`O(n)` where :math:`n` is the length of the sequence).

  .. important:: Just like the insertion, deleting in the array-based
     sequence is only efficient if we delete the last element.


Search
------

Finally, the :func:`search` operation offers a means to find the
position of a given item.

Consider again the sequence :math:`s = (s,e,q,u,e,n,c,e)`. Searching
for 'u' returns 4, because 'u' occurs in the 4th position. By
contrast, searching for 'e' may return 2, 5, or 8 because there are
'e' at several positions. Our specification did not constrain
that. Lastly, searching for 'z' yields 0, because there is no 'z'.

The simplest "search" strategy is named the *linear search*. We start
at the first position, check if we found what we are looking for. If
not, we check the next position, and so on until we either find what
we are looking for, or reach the end. Figure :numref:`seq_search`
illustrates this idea:

.. _seq_search:

.. figure:: _static/images/sequence_search.svg

   Searching for the character 'u' in the sequence :math:`s =
   (s,e,q,u,e,n,c,e)`.        

   
Our C implementation could look like:

.. code-block:: c
   :linenos:
   :emphasize-lines: 6, 8-10
                
   int
   seq_search(Sequence* sequence, void* item) {
     assert(sequence != NULL);
     int found = 0;
     int position = 1;
     while (!found && position <= sequence->length) {
       void* current = seq_get(sequence, position);
       if (current == item) {
         found = position;
       }
       position++;
     }
     return found;
   }

Is it Correct?
  Our specification of the :func:`search` operation does not define
  pre-conditions, so we are left with its two post-conditions:

  - (A13) If :func:`search` yields a position ``p``, the :func:`get`
    function should return the given item for that position. In the
    while-loop (line 6--12), we check every position using the
    :func:`get`. As soon as we find a match, we save the current index
    into the variable ``found``. As ``found`` is not zero anymore, the
    loop ends and we return that position. A13 thus holds.

  - (A14) If :func:`search` yields zero, there must *not* be any
    position for which :func:`get` returns the desired item. Because
    we are checking any position, at any point, we know that the
    desired item is not among the position we have already
    checked\ [#fn1]_. The only way for search to yields zero is therefore that
    the ```position`` variable exceeds the length of the sequence. In
    that case, we thus know that none of the position matches and A14
    thus hold.
    
How Efficient Is It?
  Here as well we have to distinguish between the best and the worst
  case scenario.

  In the best case, the item we are looking for is in first position, so
  we only check one item and we exit the loop. The search runs in
  constant time.

  In the worst case, the item we are looking for in not in the sequence,
  but to conclude that, we have to check every single position first. In
  that case, the search runs in linear time (i.e., :math:`O(n)` where
  :math:`n` is the length of the sequence).


.. [#fn1] This would be the *loop-invariant* needed for more a formal proof.
