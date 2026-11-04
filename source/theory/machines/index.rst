========
Machines
========

:Lecture: Lecture 8.2 (slides to come)
:Objectives: Understand what is a machine, that machines differ in power, and
             what is a Turing machine and a non-deterministic machine
:Concepts: Model of computation, automaton, stack machine, parallel machine,
           Turing machine, Turing equivalence, non-deterministic machine

..
   OUTLINE. This page is an expanded outline of the lecture notes, to be
   turned into prose, figures and code. Hand-offs between sections are in
   italics. Items marked (optional) are the first to cut.

   Where this lecture stands: It is the middle of the story "machine,
   resource, bound". Lecture 1 gave the simplest machine. Here, we look at
   what a machine is, and at others, up to the Turing machine, the reference.
   The cost of simulating a machine with another is *not* discussed: The point
   is only that there are many machines, and that some are equivalent.

   What students should take away:

   - There are many machines, or *models of computation*.
   - Some machines are more powerful than others.
   - The RAM and the Turing machine are equivalent, and so are, as far as we
     know, all the reasonable machines.
   - There is an imaginary machine, the non-deterministic one, which always
     guesses right.


The Automaton Is a Machine
==========================

- Recap of lecture 1: An automaton reads a word, and keeps a state.
- What we did last time, on the RAM, was to *simulate* this machine with a
  loop. A machine, simpler than the RAM, but a machine.
- The question: So, what is a machine?

*Hand-off: Let us try to say what a machine is, without a formal definition.*


So, What Is a Machine?
======================

- A working definition, not a formal one: A machine is **memory** plus
  **rules** that say what to do next, step by step.
- The *configuration* is what the machine remembers right now. One step moves
  it from a configuration to the next. A computation is a *walk* from
  configuration to configuration, the cursor we met in the heuristic search
  lecture, on a graph that is implicit.
- *Deterministic*: One possible next step, or none. *Non-deterministic*:
  several. The same notions as for the automata of lecture 1.
- Machines differ by what they can remember, and how they can touch it.

*Hand-off: Which machines exist?*


Models of Computation
=====================

- A zoo, on one slide each or as a table. For each: what is its memory, what
  is its rule?
- The **automaton**: constant memory.
- The **stack machine**: an automaton with a stack. (A stack is memory that can
  only be touched at the top.)
- The **RAM**: the machine of this course.
- The **parallel machine**: many processors, working at the same time.
  (See the "Beyond" module.)
- **Chemical or DNA computers**: molecules do the computation. (Pointer.)
- **Quantum computers**: (Pointer, see the "Beyond" module.)
- (Optional) **Cellular automata**, such as the Game of Life, can compute too.
- The standard name is *model of computation*.
- How to compare them? A machine is **more powerful** if it can *simulate*
  another one, or if it solves more problems.

*Hand-off: Let us look at two of them, to see what more memory buys.*


The Stack Machine
=================

- ``aⁿbⁿ``, the language that automata cannot recognize, becomes easy with a
  stack: Push on each ``a``, pop on each ``b``, and check that the stack is
  empty.
- Figure: a trace on ``aaabbb``.
- This is the middle rung of the hierarchy of lecture 1: The **context-free**
  languages, such as the syntax of C or Java, are exactly what a stack machine
  recognizes.
- Still not everything: ``aⁿbⁿcⁿ`` is out of reach, because the stack can be
  emptied only once.

*Hand-off: What if the memory could be touched anywhere, and freely?*


The Turing Machine
==================

- A *tape* (unbounded memory), a *head* that reads and writes one cell and moves
  left or right, and a *state*. The rules are a table: In this state, reading
  this symbol, write this one, move, and go to that state.
- Figure: a tape, a head, and a trace of a very small machine (for instance,
  adding one to a binary number).
- Why it matters: It is the simplest machine that is *general*, and simple
  enough to reason about.
- Memory is unbounded and can be rewritten: This is what a stack and an automaton
  lack.
- *Deterministic* here means that each state and symbol have at most one rule.

*Hand-off: Is it as powerful as the RAM?*


The RAM and the Turing Machine Are Equivalent
=============================================

- Each can *simulate* the other. The RAM simulates a Turing machine: The tape
  is an array. The Turing machine simulates a RAM: The memory cells are written
  on the tape, one after the other.
- So they solve exactly the same problems.
- The *Church-Turing thesis*, informally: Every reasonable machine is
  equivalent to the Turing machine. It cannot be proved, since "reasonable" is
  not a mathematical word, but nobody has found a counter-example.
- Not covered here, on purpose: How long the simulations take.
- (Optional) A word about the *halting problem*: Some problems are solved by no
  machine. One slide, at the top of the ladder.

*Hand-off: Machines can be compared. But there is one more machine, which does
not exist, and which we need.*


The Machine We Search For
=========================

- The **non-deterministic Turing machine**: At each step, it may have several
  rules to choose from, and it **always chooses the right one**.
- Example: It solves a Sudoku in a time proportional to the number of cells.
  It guesses the digit of every cell, and then checks the rows, the columns and
  the blocks.
- Figure: the *tree of choices* of the combinatorial search lecture, with the
  machine going straight to the winning leaf.
- It does not exist. It is a yardstick, to say how hard a problem is.
- An ordinary machine can imitate it by trying all the choices, one after the
  other. This is the *combinatorial search* of the Optimization module, and it
  is **determinisation** again: Instead of guessing, we keep track of all the
  possibilities. The price is the exponential tree.
- The question for the next lecture: Can we do without the exponential tree?

*Hand-off: We can compare machines. How do we compare problems?*
