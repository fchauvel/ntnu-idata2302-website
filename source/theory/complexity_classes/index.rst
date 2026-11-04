==================
Complexity Classes
==================

:Lecture: Lecture 8.3 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/EXxGuQ6duiJMpPVzNyQq6CsBct3rHRF5nXujbv43iILsow?e=gYK2An>`
:Objectives: Understand what is a complexity class, and what P, NP and
             NP-complete mean
:Concepts: Complexity class, resource, bound, P, NP, NP-completeness,
           NP-hardness

..
   OUTLINE. This page is an expanded outline of the lecture notes, to be
   turned into prose, figures and code. Hand-offs between sections are in
   italics. Items marked (optional) are the first to cut.

   Where this lecture stands: It closes the story "machine, resource,
   bound". Lecture 1 gave a machine and a first class. Lecture 2 gave more
   machines, and the imaginary one. Here, we put them together.

   What students should take away:

   - There are machines, and some are more powerful than others.
   - A complexity class is a set of problems that can be solved with a given
     amount of resource, by a specific machine, or an equivalent one.
   - Some classes are defined with an imaginary machine, the non-deterministic
     one, which always guesses right.
   - The two most common classes are P and NP.
   - Whether P = NP is an open problem.


Bounds Depend on the Machine
============================

- Until now, we measured algorithms with big-O, on the RAM.
- But the bound depends on the machine. Sorting ``n`` numbers: ``n log n`` on the
  RAM, but far faster on a parallel machine with many processors. A Sudoku:
  exponential on the RAM (a search), proportional to the number of cells on the
  machine that always guesses right.
- So, when we say "this problem needs ``n²``", we must say *on which machine*.
- From algorithms to *problems*: How much does the best possible algorithm cost,
  on a given machine?

*Hand-off: Let us give a name to this idea.*


What Is a Complexity Class?
===========================

- A **complexity class** is a set of problems that a given machine can solve with
  a given amount of a given resource.
- Three choices: a **machine**, a **resource** (time, memory, number of
  processors), and a **bound** (constant, ``n``, ``n²``, ``2ⁿ``).
- The table, started in lecture 1:

  ===========  ==================  ========  =================
  Class        Machine             Resource  Bound
  ===========  ==================  ========  =================
  Regular      Automaton           Memory    Constant
  P            RAM, or equivalent  Time      Polynomial
  NC           Parallel machine    Time      Polylogarithmic
  NP           Lucky machine       Time      Polynomial
  ===========  ==================  ========  =================

- "Or its equivalent": For polynomial bounds, the machines of lecture 2 that are
  equivalent give the same class. (Stated, not proved.)
- (Optional) The class NC, "solved efficiently by a parallel machine", links with
  the parallel computing module.
- Problems are, for the classes below, *yes/no questions*: This is why lecture 1
  introduced languages.

*Hand-off: The most famous class is the one of the machine we know.*


P
=

- The problems that a deterministic machine, the RAM, solves in *polynomial
  time*: ``n``, ``n²``, ``n³``...
- "Efficient" means polynomial. The growth, as in "how big is a million":
  ``n²`` against ``2ⁿ``.
- The problems of this course: Sorting, searching, shortest path, minimum
  spanning tree. In the yes/no form: "Is there a path shorter than ``k``?".
- A nuance (optional): The knapsack, solved by dynamic programming in time
  proportional to the capacity.

*Hand-off: What about the problems that need a search?*


NP
==

- The problems that the *lucky machine* solves in polynomial time.
- An equivalent description: The solutions can be **checked** in polynomial
  time. This is the ``is_valid`` of the Search Problem of the combinatorial
  search lecture.
- Examples, as yes/no questions: the knapsack ("is there a box worth at least
  15 000?"), the traveling salesperson, satisfiability of a formula, the Sudoku.
- Easy to check, hard to find (as far as we know): A Sudoku grid is checked in a
  glance.
- P is contained in NP: What an ordinary machine does, the lucky machine does
  too.

*Hand-off: Are some problems of NP harder than others?*


NP-Complete
===========

- Some problems are the *hardest* of NP. The idea: A problem can be *translated*
  into another, quickly. If A translates into B, a fast solver for B solves A.
- Satisfiability was the first one shown to be at the top. The knapsack, the
  traveling salesperson, and thousands of others translate into it, and into
  each other.
- So, a fast algorithm for *one* of them would give a fast algorithm for *all*
  of them. They are **NP-complete**.
- **NP-hard**: At least as hard as the NP-complete ones, including the
  optimization versions of the problems. One sentence.
- What it means in practice, back to the Optimization module: Do not look for a
  fast exact algorithm. Use branch-and-bound, dynamic programming when numbers
  are small, or a heuristic.

*Hand-off: Is there really no fast algorithm?*


P = NP?
=======

- The question: Does the lucky machine really help? Can an ordinary machine solve
  in polynomial time what the lucky machine solves, or is the exponential tree
  unavoidable?
- It is **open**. Most specialists believe the answer is no, but nobody has
  proved it. It is one of the Millennium Prize Problems of the Clay Mathematics
  Institute, worth one million dollars.
- What would change: Every NP-complete problem would be easy. Many things we
  rely on, such as cryptography, would be in danger.

*Hand-off: The map.*


The Map
=======

- Figure: nested classes, regular inside P, P inside NP, NC inside P, with an
  example in each.
- The take-aways, as in the objectives above.
- Where to go next: The "Beyond" module, with the parallel and quantum machines,
  which shift some of these boundaries.
