==========
Math Recap
==========

I summarize below the main mathematical concepts we use in this
course and the related notations.

.. seealso:: I just put here a brief summary, too brief for sure. If
             you feel "rusty", just pick up a good textbook about basic Maths
             for Computer Science. See for instance:
             
             📖 E. Lehman, F. T. Leighton, and A. R. Meyer
             (2017). Mathematics for Computer Science. MIT
             Press. Available `here
             <https://courses.csail.mit.edu/6.042/spring17/mcs.pdf>`_
        

Logic
=====

As we study algorithms and data structure, we will make statements. To
formalize these statements (aka predicates, claims, assertions, etc.)
we shall rely on well-known logical operators, namely the negation
(not), the conjunction (and), the disjunction (or), the implication
(if) and the equivalence (equals).

- The *negation* of an assertion :math:`A` is true whenever :math:`A`
  is false, and false whenever :math:`A` is true. We denote it by by
  :math:`\neg A`. For instance, we write :math:`\neg (x \lt 5)` to
  denote that x shall not be lower than five.

- The *disjunction* (or) of two assertions :math:`A` and `B` is true
  when either is true and false only when both are false. We denote
  this disjunction by :math:`A \lor B`. For instance the expression
  :math:`x \lt 0 \lor x \gt 0` captures all numbers except zero.

- The *conjunction* (and) of two assertions :math:`A` and `B` is true
  only when both :math: `A` and `B` are true, and false otherwise. We
  denote such a conjunction using :math:`A \land B`. For instance the
  expression :math:`x \leq 0 \land x \geq 0` captures zero, the only number
  for which both assertions are true.

- The *implication* (if) between two assertions :math:`A` and
  :math:`B` indicates that :math:`B` is true whenever :math:`A` is
  true. Intuitively this is close to if A, then B. We denotes this using
  :math:`A \implies B`. We can write for instance that :math:`x \leq 5
  \implies x \leq 10` to say that if a number is smaller than five, it
  is necessary smaller than 10 too.

- The *equivalence* (equals) between two assertions :math:`A` and
  :math:`B` indicates that they are always true and false at
  together. We denote that by :math:`A \iff B`. We could write for
  instance :math:`x \leq 5 \iff \neg (x \gt 5)`.

Besides these five logical operations, we will use the universal and
existential quantifiers, to explicit how many "things" should satisfy
our assertions.

- The universal quantifier, denoted by :math:`\forall` indicates that
  our assertions apply to everything. For instance, the assertion
  :math:`\forall x, \: x \times 0 = 0` indicates that every number
  multiplied by zero gives zero.

- The existential quantifier, denoted ny :math:`\exists` indicates
  that our assertion applies to at least one thing. For instance, the
  assertion :math:`\exists x, \: x+1=5` claims that there exists at
  least one number, which incremented by 1 gives 5.

Note these two quantifiers are related by the negation operation as
follows:

.. math::

   \exists x, \neg A(x) \iff \neg (\forall x, A(x))

Sets
====

A set is a collection of unique items, without any order. For
instance, the set of card families (F) consists of spades (s), hearts
(h), clubs (c) and diamonds (d). We will denote the items of a given
set between *curly brackets* as follows:

.. math::

   F = \{ s, h, c, d \}

A set has no order. So returning to our set of card families, we
cannot talk about the first family. A set does not include duplicates,
so that:

.. math::
   F = \{ s, h, c, d \} = \{ s, s, s, h, h, c, c, d \}

We denote the fact that a given item belongs to a given set (i.e., the
membership) using the :math:`\in` symbol. For instance, :math:`s \in
F` indicates that :math:`s` (spades) is card family whereas :math:`z
\notin F` indicates that :math:`z` does not.

The number of elements that belongs to a set is called its
*cardinality*. We denote it between using vertical bars, for instance
:math:`|F| = 4`.


A set can be included into another set, if and only if all its member
are also members of the larger set. For instance, we can say that the
set of black families :math:`B = \{ s, c \}` is included into
:math:`F`. We denote this *inclusion* by :math:`B \subseteq F`. Using
the logical relationships above we can write:

.. math::

   B \subseteq F \iff \forall x \in B, x \in F

There are two main ways to define a set, by *extension* or by
*comprehension*.

- When defining a set by *extension* we will simply list all its
  members, exhaustively. For instance to define the set :math:`S`
  containing all the natural numbers smaller than 10, we would write:

  .. math::
     S = \{ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \}

- By contrast, when defining a set by *comprehension*, we will define a
  set using the rule that characterizes all its members. Returning to
  the set :math:`S` containing all the natural numbers smaller than 10
  we would write:

  .. math:: 
     S = \{ x \in \mathbb{N} \, | \,  x \leq 10 \}

We commonly use four main operations on sets, namely the complement,
the union, the intersection and the difference.

- The *complement* of a set :math:`S` is the all the elements that do
  not belong to :math:`S`. We denote it by :math:`S^\complement`.

  .. math::
     x \in S^\complement \iff  x \notin S
      
- The union between two sets :math:`A` and :math:`B` is all their
  member combined in a single set. We denote this union by :math:`A \cup B`.

  .. math::
     x \in (A \cup B) \iff (x \in A) \lor (x \in B)

- The intersection of two sets :math:`A` and :math:`B` is their common
  members. We denote this intersection by :math:`A \cap B`.

  .. math::
     x \in (A \cap B) \iff (x \in A) \land (x \in B)

- The difference between two sets :math:`A` and :math:`B` is the set
  of items that belong to A but not to be. We denote that as :math:`A
  \backslash B`.

  .. math::
     x \in (A \backslash B) \iff (x \in A) \land (x \notin B)

     
Sequences & Tuples
==================

By contrast with sets, *sequences* are ordered collections of non-unique
elements. We denote a sequence between round brackets, for instance
the ten first number of the Fibonacci sequence are :math:`(0, 1, 1, 2,
3, 5, 8, 13, 21, 34)`.

Sequence of particular length are pretty handy. For instance an
*ordered pair* :math:`(x,y)` is a sequence of length 2, which results
from the *cartesian product* (denoted by :math:`\times`) between two
sets.

.. math::
   A \times B = \{ (x,y) \; | \; x \in A \, \land \, y \in B \}

Similarly, triples, quadruples, quintuples, etc are sequences of
length 3, 4, 5 and so on and so forth.

Functions
=========

Intuitively, A *relation* :math:`R` between two sets :math:`A` and
:math:`B` associate some elements from :math:`A` to some of the
elements :math:`B`. Formally, such a *relation* :math:`R` is a subset
of the cartesian product such as :math:`R \subseteq A \times B`. We
denote the fact that a pair :math:`(x,y)` belongs to a relation
:math:`R` using the shorthand :math:`xRy`.

When R maps some elements of :math:`A` onto one and only one element
of :math:`B`, :math:`R` is a function. Formally, a function :math:`f
\subseteq A \times B` implies that:
      
.. math::

   \forall (x,y,z) \in A \times B \times B, \; (x, y) \in f \land (x, z) \in f \implies y = z

We denote functions using the notation :math:`f: A \to B` to stress
the fact that :math:`f` is a function that maps :math:`A` onto
:math:`B`, and not a general unconstrained relation. We use either the
notation :math:`f(x) = y` or :math:`x \mapsto y` to denote a specific
mapping :math:`(x,y) \in f`.

A *total* function :math:`f: A \to B` maps each and every element of
:math:`A`. By contrast, a *partial* function :math:`f: A \nrightarrow
B` only maps some of the elements of :math:`A`.

Probabilities
=============

A probability is a number that reflects how likely something is to
happen. This number is a real number between 0 and 1, where zero means
it cannot happen and 1 means it will necessarily happen.

Consider the roll of a dice. The six possible outcomes are the six
faces of the dices. In the probability theory, these form the *sample
space* :math:`\Omega= \{1, 2, 3, 4, 5, 6 \}` of the *experiment*. If
the dice is fair, each faces has the same *probability* to show up
:math:`1/6`. If the dice is biased, some faces will show up more often
and thus get a higher probability.

The function that maps all possible outcomes to their respective
probability is the *probability distribution* of the experiment.

A *random variable* is variable whose value represents the outcome of
an experiment. A random variable thus comes with both a sample space
:math:`\Omega` and a probability distribution. Consider again the roll
of a dice. We can define a random variable :math:`D` that represents
its visible face. We will denote the probability of obtaining a 3
by :math:`\mathbb{P}[D=3] = \frac{1}{6}`.

With probabilities, there are three important rules:

1. For a given random variable :math:`X`, the probability of each
   possible outcome always sum up to one.

   .. math::

      \sum_{x \, \in \, \Omega} \mathbb{P}[X=x] = 1

2. The probability of an event not occuring is given by

   .. math::
      \mathbb{P}[\neg (X = x)] = 1 - \mathbb{P}[X=x]

3. The probability of a disjunction of two *independent* events is given
   by

   .. math::

      \mathbb{P}[X=x \lor X=y] = \mathbb{P}[X=x] + \mathbb{P}[X=y]


Calculus
========

We also uses some basic calculus, so it is important to get a basic
understand and fluency with the exponents, logarithms and simple
summations.

Exponents
---------

We use a simple superscript notation to raise a number to the n-th
power, as followed.

.. math::
   \overbrace{3 \times 3 \times 3 \ldots \times 3}^{\textrm{n times}} = 3^n

There are a few basic calculus rules that may come up handy at times:

- :math:`x^0 = 1`

- :math:`(x \times y)^a = x^a \times y^a`
  
- :math:`x^a \times x^b = x^{a+b}`

- :math:`(x^a)^b = x^{a \times b}`

- :math:`\frac{x^a}{x^b} = x^{a-b}` 

Logarithms
----------

We will use logarithms quite a bit, so it is important to review this
concept.

Raising a number to a given power is unfortunately not a commutative
operation, that is :math:`a^b \neq b^a`. There are thus two ways to
reverse this process. Consider for instance the expression :math:`a^b
= c`:

- Given :math:`c` and :math:`b`, we can ask what number was raised to
  the power :math:`b` to get :math:`c`. The n-th root operation gives
  us the solution: :math:`a = \sqrt[b]{c}`

- Given :math:`c` and :math:`a`, we can ask the question to what power
  :math:`a` was raised to get :math:`c`. This operation is the
  *logarithm* and we denote it as :math:`b = \log_a(c)`. When the exponent
  is the number :math:`e`, we use :math:`\ln` and omit the exponent.

Here are a few calculus rules that I found useful to remember:

- :math:`\log_b(1) = 0`

- :math:`\log_b(b) = 1`

- :math:`\log_b(b^x) = x`

- :math:`\log_b(x^k) = k \times \log_b(x)`

- :math:`b^{\log_b(x)} = k`
  
- :math:`\log_b(x \times y) = \log_b(x) + \log_b(y)`

- :math:`\log_b(\frac{x}{y}) = \log_b(x) - \log_b(y)`
  
- :math:`\log_b(x) = \frac{\log_c(x)}{\log_c(b)}`
  
Summations
----------

Here are a few useful formulas

- :math:`\sum_{i=1}^{n} c = \overbrace{c + c + \ldots + c}^{\textrm{n times}} = c \times n`

- :math:`\sum_{i=a}^{b} c = c \cdot (b - a + 1)`
  
- :math:`\sum_{i=1}^{n} i = \frac{n (n+1)}{2}`

- :math:`\sum_{i=1}^{n} c \cdot f(i) = c \cdot \sum_{i=1}^{n} f(i)`

- :math:`\sum_{i=1}^{n} i^k \approx \frac{1}{k+1} n^{k+1}`

Products
--------

From time to time, we will meet "products". Here are a few formulas
that can be helpful:

- :math:`\prod_{i=1}^{n} i = 1 \times 2 \times 3 \times \ldots \times n`

- :math:`\prod_{i=1}^{n} f(i)g(i) = \prod_{i=1}^{n} f(i) \prod_{i=1}^{n} g(i)`

- :math:`\prod_{i=1}^{n} x^i = x^{\sum_{x=1}^{n}i}`

Factorial
---------

One special product is of importance, the *factorial*, which is the product of
all the positive integers smaller or equal to a given number
:math:`n`.

.. math::
   n! = \prod_{i_1}^{n} i =  n \times (n-1) \times (n-2) \times ... \times 1

Here are two useful facts about factorials:

- :math:`0! = 1`

- :math:`n! = n \times (n-1)!`
  

Combinatorics
=============

In this  course, we will often  count how many ways  there are arrange
items into a  collection. There are two concepts that  are useful here
*permutations* and *combinations*.  In both cases, we have  to look at
two cases, with and without "repetitions".

Permutations
------------

With permutations,  the order of  things matters. For instance,  if we
are try to find the PIN code of our mobile phone we have forgotten, in
principle, we must  try all the permutations of four digits (0, 1, 2,
3, ..., 9).

.. math::
   
   \overbrace{10 \times 10 \times 10 \times 10}^{\textrm{4 digits}} = 10^4 = 10000

More generally, there :math:`n^k` permutations of :math:`k` items
chosen among :math:`n` (with repetition).

When repetitions are not allowed this number :math:`P(n, k)` is given by:

.. math::

   P(n,k) = (n-1) \times (n-2) \times \ldots \times (n-k) = \frac{n!}{(n-k)!}

Combinations
------------

Sometimes, the order does not matter.  For instance, we have to create
a team of 3 persons in a company counting 20 employees.  How many of
such teamss can we create? The order does not matter, the team Hugo,
Lisa, John is the same as the team John, Hugo, Lisa (these are sets of
persons).  This number :math:`C(n,k)` (of combinations without
repetitions) is given by the formula:

.. math::

   C(n,k) = \frac{P(n,k)}{k!} = \frac{n!}{(n-k)!k!}

When repetitions are allowed, this number is given by :math:`C(n+k-1, k)`.


