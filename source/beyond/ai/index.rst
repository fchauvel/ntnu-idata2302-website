==
AI
==

:Lecture: Lecture 9.3 (slides to come)
:Objectives: Understand, with just enough intuition, how AI differs from the
             algorithms of this course, where it shines, and what it changes
             for a programmer
:Concepts: Specification versus examples, neural network, training, large
           language model, heuristic, checking

.. note::

   This lecture is optional, and it is not part of the exam. It is partly facts,
   and partly opinion, and I will tell you which is which.

Every year, students ask me a fair question: *Do we still need algorithms and data
structures, now that we have AI?* In the previous lectures, we looked at
parallel and quantum computing, which were once the answers to "but we have
better machines now". In 2026, the new answer is AI, and large language models in
particular. Is programming, and so this course, obsolete? To answer, let us first
see what AI is, and what it is not.


A Different Contract
====================

The algorithms of this course answer a *specified* problem, and come with a
guarantee. A sorting algorithm returns a sorted array, always. A linear search
finds the value if it is there. A binary search does it in ``log n`` steps, and we
can prove it. Ask a language model to sort a long list of numbers directly, and it
will probably make a mistake, whereas a merge sort never does, and does it in
``n log n`` steps. AI is *not* an answer to a linear search in ``log n``.

What AI gives is an answer that is *probably good*, with *no guarantee*. In that
sense, it is a **heuristic**, in the family of the hill climbing and simulated
annealing of the optimization module. The difference is in how it is produced.
There are two ways to get a program that does something:

- **We write the rules.** The program consumes data and produces data, by rules
  that we crafted. This is everything we have done so far.
- **We provide data, and an algorithm finds the rules.** We give examples of the
  inputs, and of the outputs we expect, and a *learning* algorithm produces the
  rules. This is machine learning.

So how does an algorithm find the rules?


How Does It Work, at a Glance?
==============================

This is not a course on machine learning. Here are just a few images, so that you
can picture it.

The Artificial Neuron
---------------------

The basic ingredient is the **neuron**. It is a vertex of a graph that stands for a
small calculation (:numref:`beyond/ai/neuron`). It takes a few numbers, as inputs.
Each input has its own **weight**, and the neuron computes the *weighted sum*: It
multiplies each input by its weight, and adds everything up. It then passes the
sum through an **activation function**, a simple function that decides how much of
the sum goes through (for instance, nothing if the sum is negative, and the sum
itself otherwise). The result is the output of the neuron.

.. figure:: _static/images/neuron.svg
   :name: beyond/ai/neuron
   :align: center

   An artificial neuron: A weighted sum of the inputs, then an activation function.

Layers
------

A single neuron does very little. But we can connect many of them, in **layers**,
where the outputs of one layer are the inputs of the next
(:numref:`beyond/ai/network`). It is a *weighted directed graph*, as in the graphs
module, without cycles. To compute the output of the network, we traverse it from
the inputs to the outputs, layer by layer. A whole layer is, in fact, one matrix
computation, as in the quantum lecture, except that it runs on an ordinary
computer.

.. figure:: _static/images/network.svg
   :name: beyond/ai/network
   :align: center

   Neurons in layers. Each line carries a weight. The weights are the *state* of
   this machine, in the sense of the machines lecture.

The weights are everything this machine remembers. They are its *state*. The
largest networks have billions of them.

Training
--------

How do we set these billions of weights? This is **training**. We have a set of
*examples*: Inputs, and the output we expect for each. We start with random
weights, and we repeat the following:

1. Feed the network with an input of an example.
2. Compare its output with the expected one, to **detect the error**.
3. **Adjust the weights**, a little, so that the error would be smaller.

After millions of examples, the weights have been shaped so that the network gives
the right output for the examples, and, with luck, for new inputs as well.

If this reminds you of something, it should: Training is a **hill climbing**,
where we look for the weights that make the error as low as possible (strictly,
we go *downhill*, since we minimize the error), over millions of parameters at
once. And it has the same traps as in the heuristic search lecture, as in
:numref:`beyond/ai/descent`: We may get stuck in a valley that is not the best one.
There is no guarantee to find the best weights.

.. figure:: _static/images/descent.svg
   :name: beyond/ai/descent
   :align: center

   Training goes downhill, and may get stuck in a valley that is not the deepest.

There is one difference with the hill climbing of this course. We do not try the
neighbors one by one: With millions of weights, each of them going up or down,
there would be far too many. Instead, the *slope* of the error, which we can
compute for all the weights at once, tells for each weight in which direction the
error goes down. This is called *gradient descent*.

One Intuition: Universal Approximation
--------------------------------------

Why would such a simple machine be so general? There is a result, which I state
without proof: With *enough neurons*, a network can approximate *any* reasonable
function, with any accuracy we like. This is the *universal approximation
theorem*. So, in principle, a network can represent the rule we are looking for,
whatever it is.

A caution, though. It says that a good network *exists*. It does not say that
training will *find* it, or how many neurons it takes. It is a promise of
possibility, and not a recipe.

Large Language Models
---------------------

A **large language model**, or LLM, is a neural network of this kind, at a giant
scale, with a simple job: Given the text so far, compute how *likely* each possible
next word is (in fact, each next piece of a word). :numref:`beyond/ai/next_word`
illustrates it.

.. figure:: _static/images/next_word.svg
   :name: beyond/ai/next_word
   :align: center

   A language model gives odds for the next word. (The numbers are made up.)

To answer a question, the model takes the question as the beginning of the text. It
picks a likely first word for the answer, with some randomness, so not always the
*most* likely, and that is why the answers vary. It adds this word to the text, and
does it again: A likely second word, then a third, one at a time. The model is
trained on huge amounts of text to predict the next word, and then refined to behave
as an assistant. It does not store the texts: What it has learned is in its weights.

This is a gross simplification, but it is a good picture to keep. And a reason why it
took off is hardware: Graphics cards do matrix computations on many numbers at the
same time, which are the parallel machines of the previous lecture.


Where It Shines
===============

There is no complexity class of the problems where AI shines. It is not about how
hard a problem is to *compute*. But two kinds of problems stand out.

**Problems that nobody can specify.** Is there a cat in this photograph? Is this
e-mail spam? What is a good translation of this sentence? We cannot write the
rules, so there is *no algorithm at all*, in any class. But we have plenty of
examples, and learning from examples is what AI does.

**Problems where a guess is cheap to check.** Remember the two sides of a problem,
in the lecture on complexity classes: Finding is hard, and checking is often easy. An
AI that *proposes*, and an exact checker that *verifies*, make a powerful pair. The
AI is a learned heuristic that guides the search, and the checker keeps it honest.
A game player guides a tree search. A program is checked by tests. A proof is
checked by a proof checker. The correctness comes from the *checker*, and not from
the AI. (It is a faint echo of the machine that always guesses right, except that
the AI guesses *well*, not always right.)

Where we have a specification and an efficient algorithm, such as sorting, shortest
paths or a minimum spanning tree, use the algorithm: The AI would be slower and less
reliable.

Why "Good Enough" Works
-----------------------

AI gives answers that are good enough, and in practice it works. The errors are
not too bad, and not impossible, only unlikely. Whether it works for *you* depends on
the *cost of an error*, and on whether you can *detect* it. For a movie
recommendation, a wrong answer costs nothing. For a medical decision, a wrong answer
that looks right is a disaster.

The world of algorithms has its own version of "good enough": *bounded-error*
algorithms, where the probability of an error is small, and we can make it as small
as we like by repeating (BQP, in the quantum lecture, is of this kind). For AI, there
is no such bound, in general. And the errors are often *systematic*: The same
misunderstanding comes back every time, so repeating the question does not always
fix it.


What It Changes for Engineers
=============================

Up to here, I told you facts. This section is different: It is my *take*, as a
software engineer, and it could be wrong. Lecturing is a side job for me. My main job
is to build software, in a company that gives us full access to AI, and encourages us
to use it. Here is what I see.

I do not write code anymore. Too bad, I liked it, and I miss it at times. I describe
what I want, and the AI writes it. But I cannot help reviewing the code, and maybe I
will be shown wrong, one day. The AI has injected errors that bit me, and it has also
surprised me with really clever designs that I would never have thought of. So it is
neither a fool nor a genius: It is a very fast colleague whose work I check.

Something is lost, too. When I wrote the code, I had to understand the problem to its
very bitter end, otherwise the code would not work. Understanding by *reviewing*
feels, as of today, always a bit shallow. Maybe it is just me. But I suspect it is one
more reason to write code yourself while you learn: You cannot check what you do not
understand.

Does It Still Matter How the Code Is Written?
---------------------------------------------

I used to say that it matters a lot. Now my answer is that it matters *less*, because
changing code has become so much cheaper. Changes that, a few years ago, were too
risky or too expensive, such as rewriting a component, are now real options on the
table. But the code that the AI writes is far from perfect, and the further we zoom
out, the more this shows:

- *Programming in the small*: A function, a class. It does well.
- *Programming in the middle*: Several components that must fit together. It is less
  reliable.
- *Programming in the large*: The architecture, the evolution over years, the
  requirements. This is where it struggles most.

So what matters, when *doing* has become cheap? It is **understanding what a change
will do to the rest**. How will a change in this component disturb the system? Or
even the ecosystem around it: The load on a third-party API, the business partners
who depend on us, the way users interact with it. Think of the lecture on parallel
computing: With Amdahl's law, speeding up one part of a program is limited by the
parts that did not get faster. Writing code got fast. Understanding the consequences
did not, and this is what now limits us.

This is where the tools of this course are still precious, more than ever.

- **Contracts and clear interfaces.** I rely on preconditions and postconditions more
  than before, to reason about the components of a system: What does it promise, and
  what does it expect? Without clear interfaces, a large and spaghetti-like system is
  simply impossible to reason about. The ADTs we used throughout the course are this.
- **Knowing the cost.** The AI does not know how large your data is. That a change
  makes one call per item, and that it becomes ``n²`` calls to a partner, is
  something we must see.
- **Choosing the structure and recognizing the problem.** Is it a known problem? Is it
  one of the hard ones? Which structure fits?
- **Checking.** Finding is cheap, and checking is what we trust, as in the lecture on
  complexity classes.

And there are things that did not get cheaper. A change is cheap to *make*, but not
always cheap to *undo*, once it has reached the outside world: A partner who was
called, a user who was confused. And, since changing is cheap, we change *more* often,
and each change can disturb something.

I do not know where it will stop. The field moves fast, and in a few years this
section may look naive. What I believe will not change is the lens of this course: A
guess is cheap, and a check is what we trust.
