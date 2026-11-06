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

   Vocabulary: We speak of the *state* of a machine, as for the automaton ("means
   to remember"), rather than of its "memory". It is the same thing, but it keeps
   one word across the lecture.

   Where this lecture stands: It is the middle of the story "machine,
   resource, bound". Lecture 1 gave the simplest machine. Here, we look at
   what a machine is, and at others, up to the Turing machine, the reference.
   The cost of simulating a machine with another is *not* discussed: The point
   is only that there are many machines, and that some are equivalent.

   Thread of the lecture: Lecture 1 ended on a ladder of languages, each
   level harder than the previous one. Here, each level gets its machine, and
   the machines differ by *the interface of their state* (an ADT, as in the
   Sequences module): Only a state to replace (automaton), a stack (push, pop at
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
- Let us look at the automaton as a machine, with three questions that we will
  ask of every machine in this lecture.
- *What is the machine?* A graph, which we read one symbol at a time: The text
  is the input, read once, from left to right.
- *What is its state?* The vertex we are in. It is all the automaton
  remembers: What we know about the text so far (not read anything yet, in the
  middle of a sheep, a complete sheep). Nothing else is kept, so the state
  is a bounded way to remember.
- *What are its rules?* The transition table: For each state and each symbol
  read, the next state. The same table at every step. (Show it again for the
  sheep automaton.)
- What we did last time on the RAM was to *simulate* this machine with a loop
  and a table. A machine, simpler than the RAM, but a machine.
- The question: So, what is a machine?

*Hand-off: Let us try to say what a machine is, without a formal definition.*


So, What Is a Machine?
======================

- A working definition, not a formal one: A machine is a **state**, that is,
  a means to *remember*, plus **rules** that say what to do next, step by step,
  given the state and what we read. We keep the vocabulary of the automata:
  The state is what the machine knows right now.
- The *configuration* is the state at a given moment. One step moves
  it from a configuration to the next. A computation is a *walk* from
  configuration to configuration, the cursor we met in the heuristic search
  lecture, on a graph that is implicit.
- Grounding, with the machine of this course: **the RAM fits the definition**.

  - Its *state* is what it remembers: The two registers, ``ACC`` and ``IP``,
    and the memory cells (the program is in there, too).
  - Its *rules* are the same at every step: Read the two cells at the address
    in ``IP`` (the instruction), look at the operation code, and, depending on
    it, change ``ACC``, a cell or ``IP``; then go on. One rule per operation
    code, picked by what was read: A table, just like the transitions of an
    automaton.
  - A computation on the RAM is a walk from one configuration of
    (``ACC``, ``IP``, cells) to the next.
  - So the automaton and the RAM differ in *what they can remember*, not in the
    kind of thing they are. The RAM has registers *and* many cells it can
    touch anywhere.
- *Deterministic*: One possible next step, or none. *Non-deterministic*:
  several. The same notions as for the automata of lecture 1. (The RAM is
  deterministic.)
- The state is an ADT: What matters is not how it is stored, but which
  operations it offers. This is what makes machines differ. An automaton: Only a
  state to read and replace. A stack machine: A stack. A Turing machine: A
  tape. The RAM: Registers and an array of cells.

*Hand-off: Which machines exist?*


Models of Computation
=====================

- A zoo, on one slide each or as a table. For each: what can it remember, what
  is its rule?
- The **automaton**: a state, and nothing else, so a bounded way to remember.
- The **stack machine**: an automaton with a stack. (A stack is a state that can
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

*Hand-off: Let us look at two of them, to see what a richer state buys.*


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

*Hand-off: What if the state could be touched anywhere, and freely?*


The Turing Machine
==================

- A *tape* (unbounded state), a *head* that reads and writes one cell and moves
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
