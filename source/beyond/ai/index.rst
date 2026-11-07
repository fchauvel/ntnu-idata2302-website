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

- Not a course on machine learning: A few images, so that the rest of the lecture
  makes sense. Just enough detail to *picture* it.

The Artificial Neuron
---------------------

- A **neuron** is a *vertex of a graph* that stands for a small calculation: It
  takes several numbers, makes a *weighted sum* (each input has its own weight),
  and passes it through an *activation function* (a simple function, such as "stay
  at 0 if the sum is negative, else keep it"). It outputs one number.
- Figure: A neuron, with its inputs, weights, sum and activation.

Layers
------

- We stack neurons in **layers**. The outputs of a layer are the inputs of the
  next. Figure: A small network, with an input layer, one or two hidden layers, an
  output layer.
- It is a *weighted directed graph* (the graph ADT of the graphs module), without
  cycles. Evaluating it means traversing it from the inputs to the outputs, layer
  by layer. A whole layer is one matrix computation (as in the quantum lecture).
- The **weights** are the *state* of the machine, as in the machines lecture. There
  can be billions of them.

Training
--------

- What is training? We have *examples*: Inputs, and the output we expect. Feed an
  input, **detect the error** (how far is the output from the expected one?), and
  **adjust the weights** so that the error shrinks. Repeat over many examples.
- It is a **hill climbing** over millions of parameters *at once*, with the traps of
  the heuristic search lecture: Local minima and plateaus. No guarantee to reach the
  best. (Strictly, we go *downhill*, since we minimize the error.)
- A difference with the hill climbing of the course: We do not try the neighbors one
  by one, there would be far too many (millions of weights, each in two directions).
  The *slope* (the derivative) tells, for each weight, in which direction the error
  goes down. This is *gradient descent*.

One Intuition: Universal Approximation
--------------------------------------

- One result, stated without proof: With *enough neurons*, a network can
  approximate *any* reasonable function, to any accuracy we like. This is the
  *universal approximation theorem*. So, in principle, a network can represent any
  rule we could want.
- A caution: It says that a good network *exists*, not that training will *find* it,
  nor how many neurons it takes. Existence, not a recipe.

Large Language Models
---------------------

- A quick jump, with a gross simplification (fine for intuition): An LLM is a
  *giant neural network* that, given the text so far, computes how *likely* each
  possible next word is (in fact, each next piece of a word).
- To answer a question, it takes the question as the start of the text, picks a likely
  first word of the answer (with some randomness, so not always the *most* likely, and
  the answer varies), adds it to the text, and does it again, one word at a time.
- It is trained on huge amounts of text to predict the next word, and then refined to
  behave as an assistant. It does not store texts: What it learned is in its weights.
- It took off with **parallel hardware**: Graphics cards do matrix computations on
  many numbers at the same time (the SIMD machines of the parallel lecture).

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
  (Personal: "I don't write code anymore. Too bad, I liked it, and I miss it at
  times.")
- I still review code, I cannot help it. Maybe I will be shown wrong. AI has
  injected errors that bit me. And it has also surprised me with really clever
  designs that I would not have thought of.
- Not writing code takes something away: Writing meant understanding something to
  its very bitter end. Understanding by *reviewing* feels, as of today, always a bit
  shallow. Maybe this is just me. (An argument for learning by writing, in a course.)
- Contracts (preconditions and postconditions) and clear interfaces matter *more*:
  They are a tool to reason about the components of a system. Without clear
  interfaces, it feels impossible to reason about a large, spaghetti-like system.
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
