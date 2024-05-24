============
Binary Heaps
============

:Lecture: Lecture 5.3 :download:`(slides) <_static/heaps.pptx>`
:Objectives: Understand how to implement a binary heap
:Concepts: Priority queue ADT, insertion, minimum extraction,
           heapification.

The Priority Queue ADT
======================

We looked at the Queue ADT in :doc:`Lecture 2.6
</sequences/stacks>`. Queues follow a first-in-first-out policy
(FIFO), like the queue of persons waiting at the cashier in the
supermarket. By contrast, the *priority queue* we will study now
orders its items according to a given priority. This resembles the
*triage area* in a hospital, where patients are sorted according to the
severity of their condition. Patients that cannot wait will be treated
first, regardless on when they have arrived. Here the severity is the
priority.

There are two kinds of priority queue:

- *maximum priority queue*, where items are returned by decreasing
  priority, that is, the highest priority comes first.

- *minimum priority* queue where items are returned by ascending
  priority, that is, the lowest priority comes first.

Intuitively, a priority queue maintains order. Consider the following
minimum queue :math:`q = ((1,A), (5,D), (7, B))`. There are three main
operations on priority queue, which we will detail shortly.


.. module:: pq

.. function:: create() -> PQueue 

   Create an empty priority queue, denoted as :math:`q`. 

   Preconditions:
      None

   Postconditions:
    - The resulting queue :math:`q` is empty, that is

      .. math::
         q = create() \implies size(q) = 0 \, \land \, \nexists (i, p), \, contains(q, i, p)
    
    
.. function:: enqueue(q: PQueue, i: Item, p: Priority) -> PQueue

   Add the given item :math:`i` to the queue :math:`q` with the given
   priority :math:`p`. For instance, if :math:`q = ((1,A), (5,C), (7,
   B))`, adding the Item :math:`D` with priority 2, would yield
   :math:`q'=((1,A), (2,D), (5,C), (7, B))`.

   Preconditions:
     - The given item :math:`i` is not already associated with the
       given priority :math:`p`

       .. math::
          \neg \, contains(q, p, i)

   Postconditions:
     - The queue :math:`q` now contains the given item :math:`i` with the given
       priority :math:`p`, that is

       .. math::
          enqueue(q, i, p) = q' \implies contains(q', i, p)

     - The size of the priority queue has increased by one.

       .. math::

          size(q) = n \land enqueue(q, i, p) = q_2 \implies size(q_2) = n+1

.. function:: peek(q: PQueue) -> Item, Priority

   Returns, but does not remove, the item with the minimum/maximum
   priority. For instance, peeking the first item of the queue
   :math:`q=((1,A),(5,C),(7,B))` would yield :math:`(1,A)` but the
   queue :math:`q` would remain unchanged.

   Preconditions:
    - The given queue :math:`q` is not empty, that is

      .. math::
         size(q) > 0

   Postconditions:
    - The resulting item is necessarily in the given :math:`q`

      .. math::
         peek(q) = (i, p) \implies contains(q, i, p)
   
    - There is no other item in the queue :math:`q` with a strictly
      higher priority, that is:

      .. math::
         peek(q) = (i,p) \implies \nexists \,(i_2, p_2),\; contains(q, i_2, p_2) \,\land\, p_2 > p

         
.. function:: dequeue(q: PQueue) -> PQueue, Item, Priority

   Returns *and removes* the item :math:`i` with the minimum/maximum
   priority. For instance, peeking the first item of the queue
   :math:`q=((1,A),(5,C),(7,B))` would yield :math:`(1,A)` but the
   queue would then be :math:`q = ((5,C), (7,B))`.

   Preconditions:
    - The given queue :math:`q` cannot be empty, that is:

      .. math::
         size(q) > 0

   Postconditions:
    - The resulting item was necessarily in the queue before

      .. math::
         dequeue(q) = (q',i,p) \implies contains(q, i, p)

   
    - The resulting item is no longer in the queue

      .. math::
         dequeue(q) = (q',i,p) \implies \neg \, contains(q', i, p)
         
   
    - The size of queue decreases by one, that is:

      .. math::

         size(q) = n \, \land \, dequeue(q) = (q', i, p) \implies size(q') = n-1
      
    - There is no other item in the queue :math:`q` with a strictly
      higher priority, that is:

      .. math::
         dequeue(q) = (q',i,p) \implies \nexists \,(i', p'),\; contains(q, i', p') \,\land\, p' > p


For the sake of completeness, we also introduce the
:func:`pq.contains` and :func:`pq.size` which we have used to
formalized our ADT.


.. function:: size(q: PQueue) -> Natural

   Returns the number of items currently in the given priority queue
   :math:`q`.

   Preconditions:
     None

   Postconditions:
     None


.. function:: contains(q: Queue, i: Item, p: Priorty) -> Boolean

   Returns true if an only if the given queue :math:`q` contains the
   item :math:`i` with the priority :math:`p`.

   Preconditions:
     None

   Postconditions:
     None
     
Priority Queue Using Binary Heap
================================

Binary Heap Invariants
----------------------

- Complete

- Left packed

 


Array-based Implementation
--------------------------

- Numbering nodes

Heap Sort
=========
