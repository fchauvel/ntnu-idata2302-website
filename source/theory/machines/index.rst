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

   Thread of the lecture: Lecture 1 ended on a ladder of languages, each
   level harder than the previous one. Here, each level gets its machine, and
   the machines differ by *the interface of their memory* (an ADT, as in the
   Sequences module): None beyond the state (automaton), a stack (push, pop at
   the top), a tape (read, write, move, anywhere). Computation is a walk
   from configuration to configuration, as in the search lectures.

   What students should take away:

   - There are many machines, or *models of computation*.
   - Some machines are more powerful than others.
   - The RAM and the Turing machine are equivalent, and so are, as far as we
     know, all the reasonable machines.
   - There is an imaginary machine, the non-deterministic one, which always
     guesses right.


The Automaton Is a Machine
==========================

- Recap of lecture 1: An automaton reads a word, and keeps a state. The ladder
  of languages ended with a question: Harder, but harder for *what*?
- What we did last time, on the RAM, was to *simulate* this machine with a
  loop. A machine, simpler than the RAM, but a machine.
- The question: So, what is a machine?

*Hand-off: Let us try to say what a machine is, without a formal definition.*


So, What Is a Machine?
======================

- A working definition, not a formal one: A machine is **memory** plus
  **rules** that say what to do next, step by step.
- The memory is an ADT: What matters is not how it is stored, but which
  operations it offers. This is what makes machines differ.
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
  empty. Same for nested comments, or the open tags of an XML document.
- Figure: a trace on ``aaabbb``.
- This is the **context-free** level of the ladder of lecture 1: Exactly what a
  stack machine recognizes.
- Still not everything: The stack gives back the *last* item first, and is
  emptied as it is read. So ``aⁿbⁿcⁿ`` and the word written twice (the
  here-document) are out of reach.
- The level in between, context-sensitive, needs a tape of limited size. We skip
  it: It brings no new idea.

*Hand-off: What if the memory could be touched anywhere, and freely?*


The Turing Machine
==================

- A *tape* (unbounded memory), a *head* that reads and writes one cell and moves
  left or right, and a *state*. The rules are a table: In this state, reading
  this symbol, write this one, move, and go to that state.
- Figure: a tape, a head, and a trace of a very small machine (for instance,
  adding one to a binary number).
- Example of what the stack could not do: Checking that a word is written twice,
  by crossing off the letters one at a time. Code: A tiny simulator, with
  tests.
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
- The *halting problem*, in one slide: Some problems are solved by no machine,
  for instance "does this program eventually stop?". This closes the loop with
  the top of the ladder of lecture 1 ("recursively enumerable"): The machine for
  this level is the Turing machine, but a machine that *recognizes* a language
  may run forever on the words outside of it.

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
