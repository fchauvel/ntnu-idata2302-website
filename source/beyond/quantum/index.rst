=================
Quantum Computing
=================

:Lecture: Lecture 9.2 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/EVC9YVse8EZEiSkyLpLUktABdbzWVNhsy1RyfG3BMbrgwQ?e=5hl1dI>`
:Objectives: Understand the promises and limitations of quantum computing
:Concepts: Qubit, superposition, quantum gate, quantum circuit, BQP

.. note::

   This lecture is optional, and it is not part of the exam. It is here to
   pick your curiosity, with just enough intuition. There is no quantum physics
   in it, and we simplify a lot.

.. margin::

   This lecture follows a talk from Microsoft Research.

Quantum computers make the news regularly. In October 2019, Google announced that
its quantum computer had performed, in 200 seconds, a computation that would take
the best supercomputer about 10,000 years. (Other researchers argued that a
supercomputer could do it much faster, so the claim is debated.) Are quantum
computers about to make our algorithms obsolete?

In the last module, we met a machine that always guesses right, and that would
solve the hardest problems of NP in a handful of steps. Is a quantum computer
that machine? Spoiler: No. Let us look at what it *is*, from a distance.


From Bits to Qubits
===================

An ordinary computer works with *bits*, which are 0 or 1. A few simple operations,
the *gates*, such as NOT, AND, OR, XOR or NAND, transform bits into bits. Wire
gates together, and you get a *Boolean circuit*, which is how processors are made.

A quantum computer works with **qubits**. A qubit is a bit that can be in a
*superposition*: A mix of 0 and 1, described by two weights, one for each, as in
:numref:`beyond/quantum/qubit`. The qubit is not "either 0 or 1, we do not know
which". It is both, in a way, with those weights.

.. figure:: _static/images/qubit.svg
   :name: beyond/quantum/qubit
   :align: center

   A bit is 0 or 1. A qubit is a mix of both. When we measure it, we get 0 or 1,
   with odds given by the weights, and the mix is lost.

There is a catch, and it is a big one. When we *measure* a qubit, to read the
result, we see only a 0 or a 1, chosen at random according to the weights. And the
mix is gone: What we measured is all that remains. So we cannot "read" all the
values at once. A quantum algorithm must be arranged so that, in the end, the
answer we want is the likely one.

Quantum Gates
-------------

Quantum gates, which transform qubits, have a peculiarity: They are **reversible**.
Given the output of a gate, we can always recover its input, because the laws of
quantum physics do not let us throw information away. An ordinary AND is not
reversible: From a ``0`` we cannot tell which of the three inputs gave it. So
quantum computers have their own gates. Two of them will be enough:

- the **Hadamard** gate, H, which turns a ``0`` into an equal mix of 0 and 1;
- the **controlled NOT**, CNOT, which has two qubits, a *control* and a *target*,
  and flips the target if the control is 1.

As for classical circuits, a *quantum circuit* is gates wired together, and it is
how we write quantum algorithms.


A First Quantum Algorithm
=========================

Here is a small problem, where a quantum computer beats an ordinary one. Someone
gives us a black box that computes a function ``f`` from one bit to one bit. There
are only four possible functions: *Set-0* (always 0), *Set-1* (always 1),
*identity*, and *not*. The first two are **constant**: The output does not depend
on the input. The last two are **variable**. The question: Is ``f`` constant?

An ordinary computer has no choice. It must evaluate ``f`` twice, on 0 and on 1, and
compare. The quantum computer of :numref:`beyond/quantum/deutsch`, the *Deutsch
algorithm*, needs a *single* evaluation. It puts its inputs in superposition with
the Hadamard gate, so that the box computes ``f`` on both values *at once*. Then a
last Hadamard gate makes the two results *interfere*, like waves: What remains tells
us whether the two results were the same, constant or not, but not what they were.
We measure the first qubit: 0 means that ``f`` is constant, and 1 that it is
variable.

.. figure:: _static/images/deutsch.svg
   :name: beyond/quantum/deutsch
   :align: center

   The Deutsch algorithm. The box is ``f``, and it is used only once.

This is a toy, but it shows the *trick* of quantum computing: Put the inputs in
superposition, compute on all of them at once, and arrange the interference so that
the information we want comes out, and the rest cancels. We do not get all the
results, but one property of them.


Two Famous Algorithms
=====================

Two algorithms made quantum computing famous.

**Shor's algorithm** finds the prime factors of an integer, such as
``323 = 17 × 19``. The best known ordinary algorithms need a time that is far from
polynomial for large numbers, and a good part of the cryptography we use on the
Internet relies on factoring being hard. Shor's algorithm factors in polynomial
time. If a large enough quantum computer was ever built, much of today's
cryptography would have to be replaced.

**Grover's algorithm** searches an unsorted array of ``n`` cells, as in a linear
search. An ordinary computer needs about ``n`` steps. Grover's algorithm needs
about the square root of ``n``. It is a speed-up, but only a *polynomial* one. For
the hardest problems of NP, which take about ``2ⁿ`` steps by brute force, it gives
about ``2^(n/2)`` steps: Still exponential. So, a quantum computer is *not* the
machine that guesses right.


Skepticism
==========

Quantum computing deserves some skepticism. We would need a large number of
reliable qubits, and today's qubits are fragile: Errors creep in, and it may be that
they accumulate faster than we can correct them as the machine grows. Nobody knows
yet whether large quantum computers can be built.

Where Does It Fit?
------------------

Suppose we can build them. The problems that a quantum computer solves in
polynomial time, with a small probability of error, form a class called **BQP**
(*bounded-error quantum polynomial time*). :numref:`beyond/quantum/bqp` shows where
it stands. Everything an ordinary computer solves in polynomial time, a quantum
one does too, so P is inside BQP. And BQP is inside PSPACE. But whether it
contains NP is open, and most specialists believe it does not. Factoring is in
BQP, and we do not know whether it is in P, but we do not believe it is
NP-complete either.

.. figure:: _static/images/bqp.svg
   :name: beyond/quantum/bqp
   :align: center

   Where BQP stands. It contains P, and it is inside PSPACE. Its relation to NP
   is open.

So quantum computers are not magic. They are a different kind of machine, which is
better at some specific problems, such as factoring, and not so good for most
others. Still a pretty good speed-up, where it applies!
