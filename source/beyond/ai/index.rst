==
AI
==

:Lecture: Lecture 9.3 (slides to come)
:Objectives: Understand, with just enough intuition, how AI differs from the
             algorithms of this course, where it shines, and what it changes
             for a programmer
:Concepts: Specification versus examples, machine learning, neural network,
           training, large language model, heuristic, checking

..
   OUTLINE. This page is an outline of the lecture notes, to be turned into
   prose, figures and, perhaps, examples. Hand-offs between sections are in
   italics. Items marked (optional) are the first to cut.

   Why this lecture: Parallel and quantum computing came as questions from
   students over the years ("all that is obsolete, now we have the cloud / quantum
   computers"). In 2026, the question is AI and LLMs: Is programming, and so this
   course, obsolete?

   Voice: The section "What It Changes for Engineers" is the lecturer's *take*, and
   is written in the first person. The rest is as in the other lectures. The
   field moves fast, so the notes avoid naming tools or products. What lasts is the
   lens: *finding versus checking*, from the lecture on complexity classes.

   What students should take away:

   - AI and the algorithms of this course answer different questions: Problems we
     can *specify*, and problems we can only *illustrate with examples*.
   - AI gives answers that are good enough, with no guarantee. It is a heuristic.
   - AI shines where there is no specification, or where a guess is cheap to check.
   - Programming changes, and checking becomes the bottleneck. Understanding, which
     this course teaches, is what lets us check.


A Different Contract
====================

- Open with the question, as students ask it: "Do we still need algorithms and data
  structures, now that we have AI?"
- The algorithms of this course answer a **specified** problem, and come with a
  guarantee: Sorting returns a sorted array, always. A linear search finds the
  value if it is there. A binary search does it in ``log n``, and we can prove it.
- AI is not an answer to a linear search in ``log n``. It gives an answer that is
  *probably good*, with *no guarantee*. In that sense, it is a **heuristic**, in the
  family of hill climbing and simulated annealing of the optimization module, but
  with a different mechanism: The rules are *learned from examples*, not written.
- Two ways to get a program:

  - *We write the rules*, which consume data and produce data (all the course).
  - *We provide data, and an algorithm finds the rules.* This is machine learning.

*Hand-off: How does an algorithm find the rules?*


How Does It Work, at a Glance?
==============================

- Not a course on machine learning: A few images only, so that the rest of the
  lecture makes sense.
- A neural network is a **machine**, as in the machines lecture. Its *state* is a
  huge list of numbers, the *weights* (billions, for the largest ones). Its *rules*
  are computations on matrices, as in the quantum lecture, but on ordinary computers.
- **Training** is optimization: We look for the weights that make the error on the
  examples as small as possible. The usual method, *gradient descent*, is the hill
  climbing of the heuristic search lecture, with the same traps: Local minima and
  plateaus. No guarantee to reach the best.
- It took off with **parallel hardware**: Graphics cards do matrix computations on
  many numbers at the same time (the SIMD machines of the parallel lecture).
- A **large language model** is trained to predict the next piece of text, given what
  came before. To write, it predicts, picks one piece with some randomness (the
  *randomize* idea of the design lecture), and starts again.
- Figure (optional): A tiny network, with its weights as the state.

*Hand-off: When is such a tool the right one?*


Where It Shines
===============

- There is **no complexity class** of problems where AI shines. It is not about
  how hard a problem is to compute. Two kinds of problems stand out.
- **Problems that nobody can specify**: Recognizing a face, translating a sentence,
  summarizing a text. We cannot write the rules, so there is *no algorithm at all*,
  in any class. But we have examples.
- **Problems where a guess is cheap to check.** Remember finding versus checking.
  An AI that proposes, and an exact checker that verifies, is a *learned
  heuristic*, as a guide for a search: A game player guiding a tree search, a
  program checked by tests, a proof checked by a proof checker. The correctness
  comes from the *checker*, not from the AI. (A faint echo of the lucky machine,
  which guesses right every time. The AI guesses well, not always.)
- Where we have a specification and an efficient algorithm (sorting, shortest paths,
  a minimum spanning tree), AI is slower and less reliable. Use the algorithm.
- Why "good enough" works: What matters is the *cost of an error*, and whether we
  can *detect* it. The algorithm world has its own version, *bounded-error*
  algorithms, with a small probability of error that we control (BQP, in the
  quantum lecture, is one). For AI, there is no such bound in general, and the errors
  are often systematic, so repeating does not always fix them.

*Hand-off: And what does it do to programming?*


What It Changes for Engineers
=============================

*First person, the lecturer's take. To be written by the lecturer. Points to make:*

- It is changing how we work: We hardly write code anymore, we direct, read, test.
- Does it still matter *how* the code is written, or only that it is correct? It
  matters *less* than before, because **changing code has become much cheaper**.
  Changes that were too risky or too expensive a few years ago are now real options.
- But the generated code is far from perfect, and the gap grows when we zoom out:

  - *Programming in the small*: A function, a class. It does well.
  - *Programming in the middle*: Several components that must fit together.
  - *Programming in the large*: Architecture, evolution over years, requirements.
    This is where it struggles most.

- The cost of *writing* collapsed, the cost of *understanding and checking* did
  not. The bottleneck is checking: Finding versus checking, again.
- What still matters, and what this course teaches:

  - **Specifying** what a correct answer is (the ADTs, with preconditions and
    postconditions): The contract we give to a generator, and the test we apply to
    what it returns.
  - **Checking**: Testing, correctness.
  - **The cost**: A generator does not know the size of your data. Knowing that
    ``n²`` is too slow for a million items is up to us.
  - **Choosing the structure**: Hash table or tree, array or list.
  - **Recognizing the problem**: Is it a known one? Is it one of the hard ones?

- A caution for those who learn: We cannot check what we do not understand, and
  understanding comes from writing and analyzing. That is the point of this course.
- An honest ending: The field moves fast, and nobody knows where it stops. What is
  unlikely to change is the lens: A guess is cheap, a check is what we trust.
