========
Machines
========

:Lecture: Lecture 8.2 (slides to come)
:Objectives: Understand what is a machine, what is a Turing machine, why the
             RAM and the Turing machine are equivalent, and what a
             non-deterministic machine is
:Concepts: Machine, state, rules, model of computation, Turing machine,
           equivalence by simulation, non-deterministic machine

..
   OUTLINE. This page is an expanded outline of the lecture notes, to be
   turned into prose, figures and code. Hand-offs between sections are in
   italics. Items marked (optional) are the first to cut.

   Vocabulary: We speak of the *state* of a machine, as for the automaton ("means
   to remember"), rather than of its "memory". It is the same thing, but it keeps
   one word across the lecture.

   Where this lecture stands: It is the middle of the story "machine,
   resource, bound". Lecture 1 gave the simplest machine. Here, we look at
   what a machine is, and at the reference machine, the Turing machine.
   The cost of simulating a machine with another is *not* discussed: The point
   is only that there are many machines, and that some are equivalent.

   Thread of the lecture: Three questions asked of every machine. *What is its
   state?* (What can it remember, and how can it touch it?) *What are its
   rules?* (What does it do next, given its state and what it reads?) *How does
   a computation go?* (A walk from configuration to configuration, as in the
   search lectures.) The automaton and the RAM are the two examples, and the
   Turing machine is the third.

   What students should take away:

   - A machine is a state plus rules. The automaton and the RAM are both
     machines.
   - There are many machines, or *models of computation*.
   - The RAM and the Turing machine are equivalent, and so are, as far as we
     know, all the reasonable machines. Equivalent means that each can
     *simulate* the other.
   - There is an imaginary machine, the non-deterministic one, which always
     guesses right.


Introduction
============

- In fact, the automaton of the previous lecture is a *machine*, just like the
  RAM at the beginning of the course. Last time, we asked what a machine can
  recognize, and the ladder of languages ended with the question: Harder, but
  harder for *what*? This lecture answers it, by looking at machines.
- The plan: What a machine is, one machine to rule them all (the Turing
  machine), and a machine that does not exist but that we need for the next
  lecture.


What Is a Machine?
==================

A Working Definition
--------------------

- Not a formal definition: A machine is a **state**, that is, a means to
  *remember*, plus **rules** that say what to do next, step by step, given the
  state and what we read. We keep the vocabulary of the automata: The state is
  what the machine knows right now.
- The *configuration* is the state at a given moment. One step moves it from a
  configuration to the next. A computation is a *walk* from configuration to
  configuration, the cursor we met in the heuristic search lecture, on a graph
  that is implicit.
- *Deterministic*: One possible next step, or none. *Non-deterministic*:
  several. The same notions as for the automata of lecture 1.
- Three questions to ask of any machine: What is its state? What are its
  rules? How does a computation go?

The Automaton as a Machine
--------------------------

- Recap of lecture 1, with the three questions, on the sheep automaton.
- *What is its state?* The vertex we are in. It is all the automaton
  remembers: What we know about the text so far (not read anything yet, in the
  middle of a sheep, a complete sheep). Nothing else is kept, so the state
  is a bounded way to remember.
- *What are its rules?* The transition table: For each state and each symbol
  read, the next state. The same table at every step. (Show it again.)
- *How does a computation go?* One symbol at a time, from left to right, from
  the initial state to the last one. Accept if the state is accepting.
- What we did on the RAM last time was to *simulate* this machine with a loop
  and a table. A machine, simpler than the RAM, but a machine.

The RAM as a Machine
--------------------

- The machine of this course, with the same three questions.
- *Its state*: The two registers, ``ACC`` and ``IP``, and the memory cells (the
  program is in there, too).
- *Its rules* are the same at every step: Read the two cells at the address in
  ``IP`` (the instruction), look at the operation code, and, depending on it,
  change ``ACC``, a cell or ``IP``; then go on. One rule per operation code,
  picked by what was read: A table, just like the transitions of an automaton.
- *A computation* is a walk from one configuration of (``ACC``, ``IP``, cells)
  to the next. The RAM is deterministic.
- So the automaton and the RAM differ in *what they can remember*, not in the
  kind of thing they are. The RAM has registers *and* many cells it can touch
  anywhere.
- The state is an ADT: What matters is not how it is stored, but which
  operations it offers. An automaton: Only a state to read and replace. The RAM:
  Registers and an array of cells.

A Zoo of Machines
-----------------

- Just to pick their curiosity, one line or one picture each, and no more. For
  each: What can it remember, what are its rules?
- The **automaton**: A state, and nothing else.
- The **stack machine** (or *pushdown automaton*): An automaton with a stack. It
  is the machine of the context-free level of the ladder of lecture 1: Nested
  comments and open tags.
- The **RAM**: The machine of this course.
- The **parallel machine**: Many processors, working at the same time. (See the
  "Beyond" module.)
- **Chemical or DNA computers**: Molecules do the computation.
- **Quantum computers**: (See the "Beyond" module.)
- (Optional) **Cellular automata**, such as the Game of Life, can compute too.
- The standard name is *model of computation*.
- How to compare them? A machine is **more powerful** if it can *simulate*
  another one, or if it solves more problems.

*Hand-off: Among all of them, one is the reference.*


Turing Machines
===============

The General Idea
----------------

- A *tape* (an unbounded state), a *head* that reads and writes one cell and
  moves left or right, and a *state*. The rules are a table: In this state,
  reading this symbol, write this one, move, and go to that state.
- Figure: a tape, a head, and a trace of a very small machine (for instance,
  adding one to a binary number).
- Same three questions: State, rules, computation.
- Why it matters: It is the simplest machine that is *general*, and simple
  enough to reason about. Its state is unbounded and can be rewritten anywhere,
  which an automaton lacks.
- It is the machine of the top of the ladder of lecture 1 ("recursively
  enumerable"). Optional: The *halting problem* in one slide: Some problems are
  solved by no machine, for instance "does this program eventually stop?", and a
  machine that *recognizes* a language may run forever on the words outside of
  it. This closes the loop with the top of the ladder.
- *Deterministic* here means that each state and symbol have at most one rule.

The RAM and the Turing Machine Are Equivalent
---------------------------------------------

- The intuition behind *equivalence*: Each machine can *simulate* the other.
  If machine A can run any computation of machine B, A is at least as powerful
  as B. If both ways, they are equivalent.
- The RAM simulates a Turing machine: The tape is an array, the head is an
  index, the rules are a table.
- The Turing machine simulates a RAM: The memory cells are written on the tape,
  one after the other, and so are ``ACC`` and ``IP``. A step of the RAM is a
  walk of the head along the tape.
- So they solve exactly the same problems.
- The *Church-Turing thesis*, informally: Every reasonable machine is
  equivalent to the Turing machine. It cannot be proved, since "reasonable" is
  not a mathematical word, but nobody has found a counter-example.
- Not covered here, on purpose: How long the simulations take.

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
