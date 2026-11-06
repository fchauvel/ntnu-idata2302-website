========
Machines
========

:Lecture: Lecture 8.2 (slides to come)
:Objectives: Understand what is a machine, what is a Turing machine, why the
             RAM and the Turing machine are equivalent, and what a
             non-deterministic machine is
:Concepts: Machine, state, rules, model of computation, Turing machine,
           equivalence by simulation, non-deterministic machine
:Implementation: Java `A Turing machine <https://github.com/fchauvel/aldast-examples/tree/main/theory/turing-machine/java>`_

In fact, the automaton we used in the previous lecture is a *machine*,
just like the RAM at the beginning of the course. We ended the last
lecture on a ladder of languages, each level harder than the one below,
and on a question: Harder, but harder for *what*? Now we can answer: Harder
for the machines that recognize them. So, what is a machine? How many kinds
of machines are there? And is there a machine to rule them all? This is
what we look at in this lecture.


What Is a Machine?
==================

A Working Definition
--------------------

I will not give a formal definition, only a working one. A machine is
made of two things:

- a **state**, which is a means to *remember*: What the machine knows
  right now;
- and **rules**, which say what to do next, given the state and what
  the machine reads.

At any moment, the state is called the *configuration* of the machine. A
step moves the machine from one configuration to the next. A computation
is thus a *walk* from configuration to configuration, which is the cursor
we met in the search lectures, moving on a graph that nobody draws in
full.

If, in each configuration, there is at most one possible next step, the
machine is *deterministic*. If there may be several, it is
*non-deterministic*. These are the same words as for the automata of the
previous lecture.

So, for every machine we meet, we can ask three questions. What is its
state? What are its rules? And how does a computation go?

The Automaton as a Machine
--------------------------

Let us ask these questions of our sheep automaton
(:numref:`theory/machines/sheep`), which accepts ``b``, then any number
of ``a``, then ``!``.

.. figure:: _static/images/sheep.svg
   :name: theory/machines/sheep
   :align: center

   The sheep automaton of the previous lecture.

- Its **state** is the vertex we are in. This is *all* the automaton
  remembers: what we know about the text so far (nothing read yet, in the
  middle of a sheep, a complete sheep). It keeps nothing else, so the
  state is a very small, bounded way to remember.
- Its **rules** are the transition table: For each state and each symbol
  read, the next state. It is the same table at every step.

  .. list-table::
     :header-rows: 1
     :stub-columns: 1
     :align: center

     * - state
       - ``b``
       - ``a``
       - ``!``
     * - 0
       - 1
       -
       -
     * - 1
       -
       - 1
       - 2
     * - 2
       -
       -
       -

- A **computation** reads the text one symbol at a time, from left to
  right, and follows the table from the initial state. The text is accepted
  if we end in an accepting state.

Remember what we did with this machine on the RAM: We *simulated* it, with
a table and a loop. The automaton is a machine simpler than the RAM, but it
is a machine.

The RAM as a Machine
--------------------

What about the RAM, the machine of this course? Does it fit the
definition? Let us ask the same questions.

.. figure:: _static/images/ram.svg
   :name: theory/machines/ram
   :align: center

   A RAM in the middle of a computation. The two registers and the memory
   cells make up its state.

- Its **state** is what it remembers: The two registers, ``ACC`` and
  ``IP``, and the memory cells. The program lives in these cells, too.
- Its **rules** are the same at every step. Read the two cells that start at
  the address held in ``IP``: This is the instruction, made of an operation
  code and an operand. Look at the operation code and, depending on it,
  change ``ACC``, a cell, or ``IP``. Then go on. There is one rule for
  each operation code, picked by what was just read: This is a table, just
  like the transitions of an automaton.
- A **computation** is a walk from one configuration (the value of
  ``ACC``, the value of ``IP``, and the contents of the cells) to the
  next. The RAM is deterministic: Given a configuration, there is only one
  next one.

So the automaton and the RAM are two machines of the same family. They
differ in *what they can remember*, and *how they can touch it*. The
automaton has a state, and that is it. The RAM has registers, and also
an array of cells it can read and write anywhere. In both cases, notice that
what matters is not how the state is stored, but which operations it
offers. That is an ADT, again.

A Zoo of Machines
-----------------

There are many other machines, which we will not study. Here are a few,
just to tickle your curiosity. Each one has its own state, and its own
rules.

- The **stack machine** (or *pushdown automaton*) is an automaton with a
  stack. It is the machine of the context-free level of our ladder: The
  stack remembers the open comments or the open tags.
- **Parallel machines** have many processors working at the same time, and
  we will say a word about them in the *Beyond* module.
- **Quantum computers** are a different kind of machine, which obeys the
  rules of quantum physics. See the *Beyond* module as well.
- **DNA computers** compute with molecules, and the Game of Life, with
  its cells that live and die, can compute too!

The general name for such a machine is a *model of computation*. How do we
compare them? One machine is *more powerful* than another if it can
*simulate* it, or if it solves more problems. Among all these models, one is
the reference.


Turing Machines
===============

The General Idea
----------------

Alan Turing imagined this machine in 1936, long before computers existed.
It has three parts. A *tape*, as long as needed in both directions, cut in
cells that each hold one symbol. A *head*, which sits on one cell, reads
it, writes it and moves one cell to the left or to the right. And a *control
state*, which is a name, such as "find the end" or "carry".

Let us ask our three questions.

- Its **state** is the tape, the position of the head, and the control
  state. The tape is the part that makes it different from the automaton:
  It is unbounded, and it can be rewritten anywhere.
- Its **rules** are a table: In this control state, reading this
  symbol, write that symbol, move to the left or to the right, and go to that
  control state.
- A **computation** starts with the input on the tape, and goes on until
  the machine reaches a special *halting* state.

Here is a very small machine. It adds one to a binary number written on the
tape, with the head on the leftmost digit. It walks to the end of the number.
Then it comes back, turning every ``1`` into a ``0`` (this is the carry),
until it finds a ``0``, or a blank, to turn into a ``1``. The rules are:

.. list-table::
   :header-rows: 1
   :align: center

   * - in state
     - reading
     - write
     - move
     - new state
   * - find the end
     - ``0`` or ``1``
     - the same
     - right
     - find the end
   * - find the end
     - blank
     - blank
     - left
     - carry
   * - carry
     - ``1``
     - ``0``
     - left
     - carry
   * - carry
     - ``0``
     - ``1``
     - left
     - halt
   * - carry
     - blank
     - ``1``
     - left
     - halt

:numref:`theory/machines/trace` shows it adding one to ``1011``
(eleven, in binary), and getting ``1100`` (twelve). Each row is one
configuration. The head is the blue triangle.

.. figure:: _static/images/turing_trace.svg
   :name: theory/machines/trace
   :align: center

   A Turing machine adding one to ``1011``. It takes eight steps.

Why do we care about such an odd and slow machine? Because it is the
simplest machine that is *general*: Anything we can compute, it can compute
too, and its simplicity makes it easy to reason about. A Turing machine
writes on its tape, as much as it needs, wherever it needs. This is what the
automaton lacks, and what lets the Turing machine do all the things the
previous ladder was missing, such as comparing a word with a copy of itself.

.. admonition:: Implementation in Java
   :class: hint, dropdown

   The rules are a table, stored as a map from (state, symbol read) to
   (symbol written, move, new state). The machine runs until it reaches
   the halting state.

   .. code-block:: java

      import java.util.HashMap;
      import java.util.Map;

      // A Turing machine. Its state is a tape, as long as needed in both
      // directions, a head on one cell of the tape, and a control state. Its rules
      // are a table: In a given state, reading a given symbol, write a symbol, move
      // the head by one cell, and go to the next state.
      public class TuringMachine {

          public static final char BLANK = '_';

          public enum Move { LEFT, RIGHT }

          private record Situation(String state, char read) {}

          private record Action(char write, Move move, String nextState) {}

          public record Outcome(String tape, int steps) {}

          private final String initialState;
          private final String haltingState;
          private final Map<Situation, Action> rules = new HashMap<>();

          public TuringMachine(String initialState, String haltingState) {
              this.initialState = initialState;
              this.haltingState = haltingState;
          }

          public TuringMachine rule(String state, char read, char write, Move move, String nextState) {
              var situation = new Situation(state, read);
              if (rules.containsKey(situation)) {
                  throw new IllegalArgumentException("Two rules for " + situation);
              }
              rules.put(situation, new Action(write, move, nextState));
              return this;
          }

          // Runs until the machine reaches its halting state. A machine may run
          // forever, so we give up after a number of steps.
          public Outcome run(String input, int maxSteps) {
              var tape = new Tape(input);
              var head = 0;
              var state = initialState;
              var steps = 0;
              while (!state.equals(haltingState)) {
                  if (steps == maxSteps) {
                      throw new IllegalStateException("Still running after " + maxSteps + " steps");
                  }
                  var action = rules.get(new Situation(state, tape.read(head)));
                  if (action == null) {
                      throw new IllegalStateException("Stuck in state " + state + " on '" + tape.read(head) + "'");
                  }
                  tape.write(head, action.write);
                  head += (action.move == Move.RIGHT) ? 1 : -1;
                  state = action.nextState;
                  steps++;
              }
              return new Outcome(tape.contents(), steps);
          }

          // Unbounded in both directions: every cell we never wrote is blank
          private static class Tape {
              private final Map<Integer, Character> cells = new HashMap<>();

              Tape(String input) {
                  for (int i = 0; i < input.length(); i++) {
                      cells.put(i, input.charAt(i));
                  }
              }

              char read(int position) {
                  return cells.getOrDefault(position, BLANK);
              }

              void write(int position, char symbol) {
                  cells.put(position, symbol);
              }

              // From the first to the last cell that is not blank
              String contents() {
                  var text = new StringBuilder();
                  var first = cells.keySet().stream().min(Integer::compare).orElse(0);
                  var last = cells.keySet().stream().max(Integer::compare).orElse(-1);
                  for (int i = first; i <= last; i++) {
                      text.append(read(i));
                  }
                  return text.toString().replaceAll("^_+|_+$", "");
              }
          }
      }

   The machine that adds one is just a list of rules.

   .. code-block:: java

      // Adds one to a binary number written on the tape, the head starting on the
      // leftmost digit. It walks to the end of the number, and comes back, turning
      // every 1 into a 0, until it finds a 0 (or a blank) to turn into a 1.
      public class BinaryIncrement {

          private static final TuringMachine.Move LEFT = TuringMachine.Move.LEFT;
          private static final TuringMachine.Move RIGHT = TuringMachine.Move.RIGHT;

          public static TuringMachine machine() {
              return new TuringMachine("find the end", "halt")
                  .rule("find the end", '0', '0', RIGHT, "find the end")
                  .rule("find the end", '1', '1', RIGHT, "find the end")
                  .rule("find the end", TuringMachine.BLANK, TuringMachine.BLANK, LEFT, "carry")
                  .rule("carry", '1', '0', LEFT, "carry")
                  .rule("carry", '0', '1', LEFT, "halt")
                  .rule("carry", TuringMachine.BLANK, '1', LEFT, "halt");
          }
      }

A Machine May Never Stop
------------------------

There is a catch. Nothing says that a Turing machine ever reaches its
halting state. Give it a rule that moves right forever, and it will run
forever (the code above gives up after a number of steps for this reason).
That is why the top of our ladder was called the languages that a program
*recognizes*: On a word that is in the language, the machine eventually says
yes. On a word that is not in it, it may just run forever.

Can we tell in advance whether a program will stop? We can't, and this is a
famous result. There is no machine that, given any program and its input,
always answers correctly "this one stops" or "this one runs forever". Some
problems are solved by no machine at all. We will not prove it here. It
is worth remembering that some questions are out of reach, whatever the
machine we pick.

The RAM and the Turing Machine Are Equivalent
---------------------------------------------

Is the Turing machine as powerful as the RAM? Both can *simulate* each
other, and this is what "equivalent" means: If a machine A can run any
computation of a machine B, then A is at least as powerful as B. If it
works both ways, they are equivalent.

.. figure:: _static/images/simulation.svg
   :name: theory/machines/simulation
   :align: center

   Each machine simulates the other.

- **The RAM simulates a Turing machine.** The tape is an array, the head is an
  index in that array, and the rules are a table. A step of the Turing machine
  is a few instructions of the RAM. (This is more or less what the code above
  does!)
- **The Turing machine simulates a RAM.** We write the registers and the memory
  cells on the tape, one after the other. A step of the RAM is a walk of the
  head to find the cell it needs, read it or write it, and come back.

So the RAM and the Turing machine solve exactly the same problems. And we
could say more: Every machine that anyone has proposed, that we could
actually build, turned out to be equivalent to the Turing machine. This is the
*Church-Turing thesis*. It cannot be proved, since "reasonable machine" is not
a mathematical notion, but nobody has found a counter-example in almost a
century. This is why we are comfortable using the Turing machine as a
reference.

One thing we do not look at here is *how long* the simulation takes. We only
care that it can be done. The time will matter in the next lecture.


The Machine We Search For
=========================

There is one more machine, and it does not exist. It is the
**non-deterministic Turing machine**. At each step, it may have several
rules to choose from, and it **always chooses the right one**.

Imagine we give it a Sudoku to solve. It writes a digit in the first
empty cell. Which one? It does not matter: It *guesses*, and it guesses
right. Then the next cell, and so on until all the cells are filled, which takes
a number of steps proportional to the number of cells. Finally, it checks
that every row, every column and every block has no repeated digit. If
there is a solution, one sequence of lucky guesses leads to it, and the machine
finds it. :numref:`theory/machines/choices` shows the tree of the choices, and
the machine going straight to the leaf that works.

.. figure:: _static/images/choices.svg
   :name: theory/machines/choices
   :align: center

   The choices of a non-deterministic machine, as a tree. It always follows the
   blue path, and ends on a valid leaf.

Of course, we cannot build it. It is a *yardstick*: A way to say how hard a
problem is, by asking how long this lucky machine would need.

An ordinary machine can imitate it, by trying *all* the choices, one after the
other. You know this tree: It is the search tree of the combinatorial search
lecture, and trying all the leaves is the exhaustive search. It is also
*determinisation* again, as for the automata: Instead of guessing, we keep track
of all the possibilities. The price is the same, an exponential tree.

That leaves us with a question, to which the next lecture is devoted:
Can we do without the exponential tree?
