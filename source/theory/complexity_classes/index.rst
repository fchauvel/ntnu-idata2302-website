==================
Complexity Classes
==================

:Lecture: Lecture 8.3 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/EXxGuQ6duiJMpPVzNyQq6CsBct3rHRF5nXujbv43iILsow?e=gYK2An>`
:Objectives: Understand what is a complexity class, what P and NP mean, and
             why the question "P = NP?" matters
:Concepts: Complexity class, machine, resource, bound, P, NP, finding versus
           checking, NP-completeness, P = NP

Let us take a step back. Throughout this course, we have met many problems:
Sorting, searching, shortest paths, spanning trees, knapsacks. For each of
them, we have met many algorithms, with different efficiencies. And in the last
lecture we learned that the efficiency of an algorithm depends on the *machine*
that runs it: What takes ``n log n`` steps on a RAM may take fewer on a parallel
machine, and what takes forever on a RAM may take a handful of steps on a
machine that always guesses right.

That is a bit of a mess! Problems, algorithms, machines, each one changing the
answer to "how hard is it?". In this lecture, we clean it up, with one idea: We
stop looking at algorithms, and we look at the *problems*.


Complexity Classes
==================

From Algorithms to Problems
---------------------------

A problem usually has many algorithms, and most of them are not good. What
really matters is how much the *best possible* algorithm costs. This is the
*difficulty of the problem*. It does not belong to any particular algorithm: It
is a property of the problem itself.

And for the machine, we look only at the most powerful ones: The Turing machine,
or the RAM, which we know to be equivalent. Weaker machines, such as the
automaton, can only solve some of the problems, which we saw in the first
lecture.

To keep things simple, we look at problems that are *yes/no questions*: "Is
there a path shorter than ``k``?", "Is the list sorted?". We have seen that this
is no loss: A yes/no question is a *membership problem*, and so it is a problem
about a language.

Machine, Resource, Bound
------------------------

We can now define the central notion of this lecture. A **complexity class** is
a set of problems, defined by three choices:

- a **machine**: Which one do we use to solve the problem?
- a **resource**: What do we count? The number of steps (*time*), the amount of
  state to remember (*memory*), the number of processors?
- a **bound**: How much of this resource may it use, as a function of the size
  of the input? A constant, ``n``, ``n²``, ``2ⁿ``?

A class is then *the set of problems that can be solved by this machine, using
at most this amount of this resource*. For instance, "the problems that a Turing
machine can solve in a number of steps that is logarithmic in the size of the
input", or "the problems that an automaton solves with a constant amount of
state". The second one should ring a bell: These are the *regular languages* of
the first lecture!

There are countless such triplets, and thus countless classes. Fortunately, only
a few are of real interest, and we will meet only two, which have names:

======================  ==========================  ===========  ================
Class                   Machine                     Resource     Bound
======================  ==========================  ===========  ================
Regular languages       Automaton                   State        Constant
**P**                   Turing machine (or RAM)     Time         Polynomial
**NP**                  Non-deterministic machine   Time         Polynomial
======================  ==========================  ===========  ================


P
=

The class **P** is the set of problems that a Turing machine (or a RAM) solves
in *polynomial time*: A number of steps that grows as ``n``, ``n²``, ``n³``, or
any other power of the size ``n`` of the input.

We call these problems *efficient*, or *tractable*. All the problems of this
course that we could solve with a reasonable algorithm are in P: Sorting,
searching, the shortest path, the minimum spanning tree. In their yes/no form,
"is there a path shorter than ``k``?" or "is there a spanning tree cheaper than
``k``?" belong to P.

Why Polynomial?
---------------

Why draw the line at polynomial, and not at ``n²``, or ``n log n``? There are
two reasons.

The first is that polynomials do not blow up, but exponentials do.
:numref:`theory/complexity_classes/growth` shows how many steps a problem needs,
for a few sizes of input.

.. list-table:: Number of steps, as the input grows
   :name: theory/complexity_classes/growth
   :header-rows: 1
   :stub-columns: 1
   :align: center

   * - ``n``
     - ``n²``
     - ``n³``
     - ``2ⁿ``
   * - 10
     - 100
     - 1 000
     - 1 024
   * - 50
     - 2 500
     - 125 000
     - about 10¹⁵
   * - 100
     - 10 000
     - 1 000 000
     - about 10³⁰

Doubling the size of the input makes a polynomial algorithm a few times slower. It
makes an exponential algorithm a *different* algorithm, one that never ends.
(For ``n = 100``, ``2ⁿ`` is a number with 31 digits: More than the number of
grains of sand on Earth.)

The second reason is the one we left open in the last lecture. We did not look
at *how long* it takes for a RAM to simulate a Turing machine, or the other way
around. It turns out that the slowdown is only *polynomial*. So a problem solved
in polynomial time by a RAM is also solved in polynomial time by a Turing
machine, and the other way around. Polynomial time does not depend on which of
the two machines we pick, which is exactly what we want from a definition of
"efficient". (We state this without proof. It is a convenient property of
polynomials, which stay polynomial when we plug a polynomial into another.)

.. margin::

   A classical nuance: The knapsack problem can be solved by dynamic
   programming in a time proportional to the *capacity* of the knapsack. This
   looks polynomial, but it is not, because the capacity is a number, and a
   number written with ``k`` digits can be as large as ``10ᵏ``. This is a story
   for another course.

So P is the set of problems that are easy to *solve*. But there are many other
problems, which we do not know how to solve fast. Can we say anything about them?


NP
==

The class **NP** is the set of problems that a *non-deterministic* Turing
machine solves in polynomial time. This is our lucky machine of the last
lecture, which always chooses the right rule at each step (or, if you prefer,
which explores all the branches at the same time).

The name stands for *non-deterministic polynomial time*. It does **not** mean
"not polynomial", which is a common mistake!

Finding versus Checking
-----------------------

To see what NP really contains, let us look again at what the lucky machine did
for the Sudoku. It first *guessed* every cell. Then it *checked* the rows, the
columns and the blocks. These are the two sides of any problem:

- **Finding** a solution. This is the hard side, in general. It is a search in a
  tree, which may be exponential. This is what we did in the combinatorial
  search lecture.
- **Checking** that a given solution is correct. This is often much easier. It
  is the ``is_valid`` of our Search Problem. A solved Sudoku grid can be checked
  at a glance, whereas finding the grid can take hours. It is the same for a
  jigsaw puzzle, or a lock and its key.

Checking is a yes/no question: "Is this candidate a valid solution of this
instance?". It is a *membership problem*, as in the first lecture: Is the pair
(instance, candidate) in the set of valid pairs?

Here is the link with the lucky machine. It *guesses* a candidate, which takes
a polynomial number of steps, and then *checks* it, in polynomial time. If the
check is fast, the whole run is fast. So, a problem is in NP *exactly* when a
candidate solution can be **checked in polynomial time**. That is the
description of NP we will keep in mind: *easy to check*, but maybe hard to find.

Some examples, as yes/no questions:

- The **knapsack**: "Is there a set of items that fits in the box and is worth at
  least 15 000?". Given a set, we add up the weights and the values.
- The **traveling salesperson**: "Is there a tour that visits every city and is
  shorter than ``k``?". Given a tour, we add up its length.
- The **satisfiability** of a formula: "Is there a way to set the variables so
  that the formula is true?". Given the values, we evaluate the formula.
- The **Sudoku**: "Can this grid be completed?". Given a completed grid, we check
  every row, column and block.

Every problem of P is also in NP: If we can *find* a solution in polynomial
time, we can certainly *check* one. We just find it again, and compare. So P is
inside NP. The question is whether it is the *whole* of it.

NP-Complete
-----------

Are some problems in NP harder than the others? Yes, and here is a beautiful
idea. A problem can sometimes be *translated* into another, quickly. If we have a
fast way to turn any question of a problem A into a question of a problem B, with
the same answer, then a fast solver for B gives us a fast solver for A, as shown
in :numref:`theory/complexity_classes/translation`.

.. figure:: _static/images/translation.svg
   :name: theory/complexity_classes/translation
   :align: center

   If A translates quickly into B, a fast solver for B is also a fast solver
   for A.

So B is *at least as hard as* A. And it turns out that some problems of NP are
so general that *every* problem of NP translates into them. The first one that
was shown to be of this kind was the satisfiability of a formula, in the 1970s.
Since then, thousands of others have been found, including the knapsack and the
traveling salesperson. We call them **NP-complete**: They are the *hardest* of
NP.

What does that mean? If we found a fast algorithm for *just one* of them, we
would get a fast algorithm for *all* of NP, since all the others translate into
it. Despite decades of efforts, nobody has found one.

.. margin::

   The optimization versions of these problems ("what is the *best* knapsack?"
   instead of "is there one worth at least ``k``?") are at least as hard as the
   NP-complete ones. They are called **NP-hard**.

What does it mean for you, in practice? That when you recognize an NP-complete
problem in the wild, you should not hunt for a fast and exact algorithm.
Instead, go back to the Optimization module: Branch-and-bound, dynamic
programming when the numbers are small, or a heuristic.


P = NP?
=======

So we have two classes, P and NP, and we know that P is inside NP. Here is the
question that remains. Does the lucky machine *really* help? Can an ordinary
machine solve, in polynomial time, everything that the lucky machine solves, or
is the exponential tree unavoidable? In the words we used above: *Is finding
really harder than checking*, or have we just not been clever enough?

.. figure:: _static/images/worlds.svg
   :name: theory/complexity_classes/worlds
   :align: center

   The two possible worlds. Either P is strictly inside NP, or they are the
   same.

This question is **open**. Most specialists believe that the answer is no, that
finding really is harder than checking, but nobody has proved it. It is one of
the Millennium Prize Problems of the Clay Mathematics Institute, and comes with
a prize of one million dollars.

What is at stake? If P were equal to NP, then every NP-complete problem would
be easy, and so would thousands of problems we consider hard: Planning,
scheduling, routing, the design of circuits. Many things we rely on, such as
cryptography, which counts on some problems being hard to solve and easy to
check, would be in danger. And if P is not equal to NP, then we know that our
intuition is right, and that *some* problems are hopeless in general. Either
way, the answer would tell us a lot about what computers can do.
