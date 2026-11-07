========================
Computational Complexity
========================

Now we have covered quite many concepts, algorithms, and data
structures, all on the same machine, the RAM. What remains is to step
back and see how it all fits together. This is the purpose of
*computational complexity theory*: Understand how computational
problems and machines relate. This is the core of theoretical Computer
Science, and we will only take away a few ideas, with just enough
intuition.

We start with the simplest machines, which recognize patterns:
*regular expressions* and automata, and the limits of what they can do.
We then ask what a *machine* is, and look at some others, up to the Turing
machine, and at an imaginary machine that always guesses right. Finally, we
see what a *complexity class* is: A set of problems that a machine can solve
with a given amount of a resource, such as time or memory. This explains
what "P" and "NP" mean, and why "P = NP?" is such a famous open question.

Contents
========

.. toctree::
   :maxdepth: 2
   :numbered:

   regex/index
   machines/index
   complexity_classes/index
