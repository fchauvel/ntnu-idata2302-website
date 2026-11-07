==
AI
==

:Lecture: Lecture 9.3 (slides to come)
:Objectives: Understand, with just enough intuition, how AI relates to what we
             learned, and what it does and does not change for a programmer
:Concepts: Machine learning, neural network, training, large language model

..
   OUTLINE (to be refined). This page is a first outline for the lecture notes on
   AI, to be discussed before being written.

   Why this lecture: Parallel and quantum computing came as questions from
   students over the years ("all that is obsolete, now we have the cloud / quantum
   computers"). In 2026, the question is AI and LLMs: Is programming, and so this
   course, obsolete?

   A thread that ties AI to the course: AI is not outside of it.

   - A new way to get the rules. Until now, *we* craft rules that consume data
     and produce data. With machine learning, we craft *data* and an algorithm
     produces the rules.
   - A neural network is a machine, as in the machines lecture: Its *state* is a
     huge list of numbers (the weights), its *rules* are matrix computations.
   - *Training* is optimization: We look for the weights that minimize an error.
     Gradient descent is the hill climbing of the heuristic search lecture, with its
     traps (local minima, plateaus). It is *heuristic*: No guarantee of the best.
   - It took off with *parallel* hardware: Graphics cards (SIMD, as in the parallel
     lecture) do matrix computations very fast.
   - An LLM predicts the next piece of text, one at a time, with some randomness
     (the "randomize" idea of the design lecture).
   - Finding versus checking (lecture on complexity classes): An LLM is a fast
     *guesser*, like the lucky machine, except that it does not always guess right.
     What makes it useful for programming is that *checking* is often cheaper than
     *finding*: We read, we test. What makes it dangerous is when we cannot check.
   - So what remains of programming? Writing code may change. Understanding the
     problem, specifying what is correct, checking, choosing the right data
     structure, knowing the cost: These are what this course teaches, and they are
     what lets us use the tool, and trust it.

   Open questions (to decide): Which angle is the main one? How much on how LLMs
   work? How much on using them while learning?
