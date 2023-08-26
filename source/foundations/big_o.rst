==================
The Big-O Notation
==================

:Lecture: Lecture 1.6 :download:`(slides) <_static/big_oh/big_oh.pptx>`
:Objectives: Understand Orders-of-growth
:Concepts: Order-of-growth, Big-O, Big-:math:`\Theta`, Big-:math:`\Omega`

We have now seen how to model the efficiency of an algorithm, using
functions that map the size of the given inputs to either the number of
instructions executed or the number of memory cell used. This let us
predict how much resources a calculation may requires, but in practice,
what we need is to compare the efficiency of alternative algorithms.
This is the purpose of this lecture.

The principle is simple: We take the efficiency models and we put them
into broad categories, called *growth orders*, which capture of fast the
resource consumption grows with the input size. For example, we
distinguish, between logarithmic growths, linear growths, quadratic
growths, etc.

In practice, there is often no absolute best algorithm. Some may
consume more memory but be faster whereas other may be slower may
consume less memory. It is often, if not always, a trade-off. Besides,
it might very well be that some algorithm a better “best case” but a
worst case, etc. Comparing efficiency is complicated.

I divided this lecture into two parts. First we will see two alternative
algorithms to compute the average of a sequence of number. We will see
that their efficiency depends on the underlying computing model. Then,
we will review asymptotic analysis, a tool that will help us identify to
which growth order a given model belong.

Comparing Efficiencies
======================

Consider for example the two algorithms shown on
:numref:`foundations/bigo_oh/averages/algorithms`. Both compute the
average of the given sequence, but using different approaches. The
first one (:numref:`foundations/bigo_oh/averages/algorithms`) loops
through the given values, adding them up, and finally divides this
total by the number of values. By contrast, the “online” average (see
:numref:`foundations/bigo_oh/averages/algorithms` starts with the
average initially set to 0 and then adjusts this average for every
given number. Which one is the fastest? Which one consume the least
memory?

.. margin::

   .. figure:: _static/big_oh/images/average.svg
      :name: foundations/big_oh/averages/plot

      The runtime of the two average algorithm
      

.. list-table:: Two alternative algorithms to compute the average
   :name: foundations/bigo_oh/averages/algorithms
   :widths: 50 50
   :header-rows: 1

   * - (a) Classical Average
     - (b) Online Average
   * - :Input: :math:`s = (s_1, s_2, \ldots, s_n) \in \mathbb{N}^n`
       :Output: :math:`\mu = \frac{1}{n} \sum_{i=1}^{n} s_i`  

       .. math::
          & sum \gets 0 \\
          & i \gets 1 \\
          & \mathbf{while} \; i \leq n \; \mathbf{do} \\
          & \quad sum \gets sum + s_i \\
          & \quad i \gets i + 1 \\
          & \mathbf{end} \\
          & \mathbf{return} \; sum / n
          
     - :Input: :math:`s = (s_1, s_2, \ldots, s_n) \in \mathbb{N}^n`
       :Output: :math:`\mu = \frac{1}{n} \sum_{i=1}^{n} s_i`

       .. math::
          & \mu \gets 0 \\
          & i \gets 1 \\
          & \mathbf{while} \; i \leq n \; \mathbf{do} \\
          & \quad \mu \gets \mu + \frac{s_i - \mu}{i + 1} \\
          & \quad i \gets i + 1 \\
          & \mathbf{end} \\
          & \mathbf{return} \; \mu


Algorithm efficiency helps us here, because we can compare their
efficiency model. Consider the runtime for instance. We saw in the
previous lecture that the “classical” average requires :math:`5n+4`
instructions, whereas we can now estimate that the “online” average
would require :math:`8n + 3` instructions. These models are simple
enough (there is no best, worst or average case) and we see on
:numref:`foundations/big_oh/averages/plot` and from the formulae we
obtain that the classical algorithm is always faster. For example, the
classical average would take 104 operations for a sequence of 20
numbers, whereas the online algorithm would need 163.

.. important::

   We compare algorithms’ efficiency by comparing their efficiency
   models. The comparison is seldom straightforward as best, worst and
   average case comparisons may not agree.

Precision vs. Generality
------------------------

The challenge is that such efficiency models are difficult to get on
real-life algorithms. The mathematics quickly become non-trivial.
Ideally, we would like to reuse efficiency models proven by others, but
this assumes that everyone uses the same assumptions.

These assumptions are in our doc:`RAM model </foundations/ram>`. It enables
very precise calculations. It describes a simple sequential “machine”,
yet with good realism and enables reasoning about both the correctness
and resource consumption of programs at the level of
machine-instruction. The downside is that our reasoning directly depends
on this RAM model. How to guarantee that everyone uses the same RAM?

.. margin::

   .. figure:: _static/big_oh/images/averages2.svg
      :name: foundations/big_oh/averages2/plot

      Comparing the runtime efficiencies of average algorithms on a
      machine that only supports additions and subtraction.

Contrast for example an augmented-RAM, which has dedicated
instructions for all arithmetic operations, with a simpler RAM with
only addition and subtraction (see :doc:`Lecture 1.2
</foundations/ram>`). Because the later can only add, any program must
“unfold” every multiplication into a sequence of additions.  The cost
of multiplication and division by :math:`n` is not 1 anymore, but
:math:`n`! As shown on :numref:`foundations/big_oh/averages2/plot`,
the classical average would thus need :math:`6n+4` while the online
average, which performs many divisions, would need
:math:`\frac{n^2+9n+6}{2}` operations!

We loose in generality what we gain in precision. A more realistic
machine model enables more precise estimations, but these estimation are
only valid for that machine. Our claims about efficiency thus always
assume a specific machine and a cost model. If we change these
assumptions we compromises our conclusions. There is no way out here,
the reasoning we make about a program depends on the underlying model of
computation.

.. important::

   Comparing the efficiency of algorithms is only meaningful when the
   efficiency models assumes the same *model of computation*.

To maximize “generality”, we strip away the details of our efficiency
models and we will focus on trends, using *asymptotic analysis*. The
strategy is to:

-  *look at large inputs* because algorithms seldom suffer from small
   input sizes. For small inputs size, differences of dozen of
   instructions is about a few nanoseconds at most. But for very large
   values, the differences may be about centuries.

-  *make qualitative statements* that do not focus on precise numerical
   values but capture the “way” the resource consumption “grows” as the
   size of input increases.

Asymptotic Analysis
===================

Asymptotic analysis does not directly relate to Computer Science. It is
the tool we borrow from Mathematics to classify the efficiencies of our
algorithms. Intuitively, we use asymptotic analysis to identify the
overall shape of a function, as we would do with everyday life objects,
when we state that this has a square shape or a round shape, etc. The
functions we will manipulate are the efficiency models.

The idea is to find some sort of “bounding box” around a complicated
function of interest, say :math:`f(n)`, using families of functions. We
will the “big-Oh” notation to describe these bounds:

-  Upper bounds (Big-O) are families of functions that are always
   greater than :math:`f` given a constant factor.

-  Lower bounds (Big-:math:`\Omega`) are families of functions that are
   always lesser :math:`f` given a constant factor

-  Approximations (Big-:math:`\Theta`) are families of functions that
   resemble :math:`f` given constant factors.

Upper Bounds using Big-O
------------------------

Upper bounds are functions that are always greater for large inputs. If
a function :math:`f` admits an upper bound :math:`g`, we can think of it
as :math:`f \leq g`. :numref:`foundations/big_oh/big_oh` illustrates this 
idea.


.. margin::

   .. figure:: _static/big_oh/images/big_oh.svg
      :name: foundations/big_oh/big_oh

      :math:`f \in O(g)` means that :math:`g` is an "upper bound" of :math:`f`

Formally, a function :math:`f(n)` admits another function :math:`g(n)`
as an upper bound if we can find two constants :math:`c` and :math:`n_0`
such as the product :math:`c \cdot g(n)` is greater than or equals to
:math:`f(n)` for every :math:`n` greater than :math:`n_0`. That is:

.. math::

   \begin{split}
     f \in O (g) & \iff \\
     & \exists \: c \in \mathbb{R}, \; \\
     & \qquad \exists \: n_0 \in \mathbb{N}, \;  \\
     & \qquad \qquad \forall \: n \geq n_0,\; f(n) \leq c \cdot g(n) 
     \end{split}

Lower Bounds using Big-:math:`\Omega`
-------------------------------------

A lower bound is the counter part of an upper bound: This bound is a
function that is “lesser” than the function of interest. Visually, the
lower is “below” as shown in :numref:`foundations/big_oh/big_omega`.
I like to think of a lower bound :math:`g(n)` as a functinon such as
:math:`g(n) \leq f(n)`.

.. margin::

   .. figure:: _static/big_oh/images/big_omega.svg
      :name: foundations/big_oh/big_omega

      :math:`f \in \Omega(g)` means that :math:`g` is a lower bound of :math:`f`
            
             
The definition mirrors the one of the upper bound. Provided a function
:math:`f(n)`, we say that :math:`f` admits at lower bound :math:`g(n)`,
if there exists two constants :math:`c` and :math:`n_0` such as the
product :math:`c \cdot g(n)` remains lesser than or equal to
:math:`f(n)` for each :math:`n` greater than or equal to :math:`n_0`. We
denote lower bounds with the Greek letter Omega (big-:math:`\Omega`) as
follows:

.. math::

   \begin{split}
     f \in \Omega (g) & \iff \\
     & \exists \: c \in \mathbb{R}, \; \\
     & \qquad \exists \: n_0 \in \mathbb{N}, \;  \\
     & \qquad \qquad \forall \: n \geq n_0,\; c \cdot g(n) \leq f(n) 
     \end{split}

Approximations using Big-:math:`\Theta`
---------------------------------------

Finally we can also search for a single function that approximates our
model. This is the big-Theta notation, which finds both an upper and a
lower bound at the same time. I like to think of this :math:`g(n)
\approx f(n)` as shown on :numref:`foundations/big_oh/big_theta`.

.. margin::

   .. figure:: _static/big_oh/images/big_theta.svg
      :name: foundations/big_oh/big_theta

      :math:`f \in \Theta(g)` means that :math:`g` is both an upper
      and a lower bound of :math:`f`.
             
Provided a function :math:`f(n)`, we say that :math:`f` is the range of
:math:`g(n)`, if there exists three constants :math:`c_1`, :math:`c_2`
and :math:`n_0` such as the product :math:`c_2 \cdot g(n)` remains below
:math:`f(n)` and the product :math:`c_1 \cdot g(n)` remains above
:math:`f(x)` for each :math:`n` greater than or equal to :math:`n_0`. We
denote ranges with the Greek letter Theta (big-:math:`\Theta`), which we
formally define as follows:

.. math::

   \begin{split}
     f \in \Theta(g) & \iff \\
     & \exists \: (c_1, c_2) \in \mathbb{R}^2, \\
     & \qquad \exists \: n_0 \in \mathbb{N}, \\
     & \qquad \qquad \forall \: n \geq n_0, \\
     & \qquad \qquad \qquad c_2 \cdot g(n) \leq f(n) \leq c_1 \cdot g(n)
   \end{split}

Other Types of Bounds
---------------------

There are two additional classes of bounds which are less commonly used,
but I add them here for the sake of completeness. They are the
*little-o* and *little-:math:`\omega`*.

Little-o
^^^^^^^^

Little-o also represents a family of functions that accept an upper
bound, but the definition is stricter. Little-o demands that the product
:math:`c \cdot g(x)` be *strictly greater than* :math:`f`, and *for all*
possible values of :math:`c`. Formally, we defined *little-o* as
follows:

.. math::

   \begin{split}
       f \in o(g) & \iff \\
       & \forall \: c \in \mathbb{R}^+, \\
       & \qquad \exists \: n_0 \in \mathbb{N}, \\
       & \qquad \qquad \forall \: n \geq n_0, \; c \cdot g(n) > f(n)
     \end{split}

Another way to look at the little-o approximation are those functions
that are upper-bounds but not range. Formally
:math:`f\in o(g) \iff f \in O(g) \land f \not\in \Theta(g)`.

Little-:math:`\omega`
^^^^^^^^^^^^^^^^^^^^^

Just as big-Omega is the counter part of big-O, *little-:math:`\omega`*
is the counter-part of little-o. Little-:math:`\omega` denotes the class
of functions that accepts :math:`g(n)` as a lower bound such that *for
every possible constant :math:`c`*, there exist a constant :math:`c`,
such that the product :math:`c \cdot g(n)` be *strictly lower* than
:math:`f(x)` for all values of n greater than :math:`n_0`. Formally, we
define *little-:math:`\omega`* as follows:

.. math::

   \begin{split}
       f \in \omega(g) & \iff \\
       & \forall \: c \in \mathbb{R}^+, \\
       & \qquad \exists \: n_0 \in \mathbb{N}, \\
       & \qquad \qquad \forall \: n \geq n_0, \;  c \cdot g(n) < f(n)
     \end{split}

Both little-o and little-:math:`\omega` place stronger constraints on
the bounds and therefore lie further away from the model they describe.
The are so called "loose" bounds.

Tights bounds
^^^^^^^^^^^^^

A bound is said to be “tight”, when there is no better “closer” for a
given function [#preiss2008]_. Note that the expression "tight
bounds" sometimes refer big-:math:`\Theta`.  Intuitively, the tightest
bound is the "minimum" bound, that is, the bound that is smaller than
all the others. Formally, given two functions :math:`f` and :math:`g`,
such that :math:`f \in O(g)`, would be the "tightest" bound if and
only if: :math:`\forall h, \, f \in O(h) \implies g \in O(h)`.

.. [#preiss2008] Preiss, B. R. (2008). Data structures and algorithms
                 with object-oriented design patterns in C++. : John
                 Wiley & Sons. Chap 3.

      
Orders of Growth
================

Classification
--------------

As for algorithm efficiency we will use asymptotic analysis with
pre-existing growths, as listed in
:numref:`foundations/big_oh/growth_orders` (and shown on
:numref:`foundations/big_oh/growth_orders/plot`). These growths orders
capture how the efficiency grows with the input size. A constant
growth indicates that the efficiency does not depends on the input
size. By convention, an efficient algorithm is an algorithm whose
approximation at most linear. Anything that grows faster than a linear
relationship is seen as inefficient. We will meet many problems for
which the best known algorithms are still not “efficient”.

.. important::

   We use *asymptotic analysis* to simplify the models we obtain from
   *algorithm analysis*. Any kind of bound can possible describe any
   kind of scenario (best, worst or average).

.. margin::

   .. figure:: _static/big_oh/images/growths.svg
      :name: foundations/big_oh/growth_orders/plot
               
      Common growth orders
   

.. list-table::  Main growth orders used in Computer Science
   :name: foundations/big_oh/growth_orders
   :widths: 15, 20, 10, 10, 10
   :header-rows: 1

   * - Name
     - Formula
     - Cost (:math:`k=2`)
     -  
     -  
   * -  
     -  
     - :math:`n=10`
     - :math:`n=100`
     - Growth
   * - Linear
     - :math:`k`
     - 2
     - 2
     - x1
   * - Logarithmic
     - :math:`\log_k n`
     - 3.32
     - 6
     - x2
   * - k :sup:`th` root
     - :math:`\sqrt[k]{n}`
     - 3.16
     - 10
     - x3
   * - Linear
     - :math:`k \cdot n`
     - 10
     - 100
     - x10
   * - Log-linear
     - :math:`n \cdot \log_k n`
     - 33
     - 664
     - x20
   * - Polynomial
     - :math:`n^k`
     - 100
     - 10 000
     - x100
   * - Exponential
     - :math:`k^n`
     - 1 024
     - 1.26 x 10 :sup:`30`
     - x10 :sup:`26`
   * - Factorial
     - :math:`n!`
     - 3 628 800
     - 9.33 x 10 :sup:`157`
     - x10 :sup:`151`
       

Some problems are *intractable* because the only algorithm known to
solve have such low efficiency than solving any realistic instance would
take forever.

In Practice
-----------

Computing bounds is more of an academic exercise but I found it useful
to know how to do. There are three steps:

#. Find the efficiency model. Refer to Lectures :doc:`1.4
   </foundations/efficiency>` and :doc:`1.5 </foundations/analysis>` if counting the number of
   instructions executed or the number of memory cells used is
   unclear. Consider for example the expression we got for the online
   average running on a RAM with only addition and subtraction.

   .. math:: f(n) = \frac{n^2+9n+6}{2}

#. Identify the “bound” :math:`g(n)`. To this end, simplify the formula
   by keeping only the most significant term (the highest-order term)
   and removing the constant factor. On the previous example, that
   gives:

   .. math::

      \begin{align}
          f(n) & = \frac{n^2+9n+6}{2} \\
          & \leadsto \frac{n^2}{2} \tag{highest order term} \\
          & \leadsto n^2 \tag{constant factors}
      \end{align}


.. margin::
      
   .. figure:: _static/big_oh/images/bounds.svg
      :name: foundations/big_oh/bounds

      Visualizing the lower and upper bounds

      
3. Find the constants :math:`c` and :math:`n_0` and check that the
   relationship you are working with (O, :math:`\Omega` or
   :math:`\Theta`) holds for all inputs size greater than :math:`n_0`.
   We make a guess at the constants :math:`c` and check it the
   inequalities holds. Say for example we want to establish that
   :math:`f \in \Theta(n^2)`. We try with :math:`c_1 = 1` and we check
   that:

   .. math::
      \begin{aligned}
          f(n) & \leq c \cdot g(n) \\
          f(n) & \leq 1 \cdot n^2 \\
          n^2+9n+6 & \leq 2n^2 \\
          0 & \leq n^2 - 9n -6 \\
          n & \geq \frac{1}{2} \cdot \left(9 + \sqrt{105}\right) \\
          n & \geq 10
      \end{aligned}
                

   That gives us a possible values for :math:`n_0`. We proceed similarly
   for :math:`c_2`. A possible guess could be :math:`c_2=\frac{1}{2}`.
   That gives us another value for :math:`n \geq -\frac{2}{3}`. Theta
   holds on the interval where :math:`g` is both an upper bound and a
   lower bound, that is when :math:`n\geq 10`. As shown on
   :numref:`foundations/big_oh/bounds`, :math:`f` thus admits
   :math:`g(n)=n^2` both as a lower and upper bound for
   :math:`n \geq 10`, so we have established that
   :math:`f \in \Theta(n^2)`.

Pitfalls
--------

In my experience, this notation is very useful, as it conveys a lot of
information. Say I want to sort huge collections of books, I can quickly
browse through existing sorting algorithms and see that common have a
log-linear time-efficiency, while naive ones are the most
time-efficient.

Same Computation Model?
^^^^^^^^^^^^^^^^^^^^^^^

As we saw, we must remember that these bounds are most often
computed for a RAM. So if our implementation relies on a different
model, say its uses multiple thread or processes, then the bound is
irrelevant.

Same Scenario?
^^^^^^^^^^^^^^

Most often, bounds are computed for the worst case. But is this what we
need in practice. In many cases, the worst cases may not be
representative, because it is a very rare cases or acceptable. The
average case may be more relevant then.

Same Growth Order?
^^^^^^^^^^^^^^^^^^

Sometimes, two alternatives fall in the same family while they may be
very different. Consider for example :math:`f_1(n) = 1000n` and
:math:`f_2(n)=10n`. They both are in the order of linear functions, but
:math:`f_1` is 100 time faster. That’s a huge speed up in practice.

Expected Input
^^^^^^^^^^^^^^

The documented bounds assume very large and “random” inputs. But this
may not be the cases in practice. One may be sorting arrays that are not
completely randomized but only slightly and then some so-called
inefficient algorithm actually perform the best. The same applies for
input size the bound say nothing about small input sizes (where
:math:`n < n_0`).

Conclusions
===========

Now we know how to identify and compare algorithms’ efficiency. We do
that by identifying the underling growth order. That tells us directly
whether or not an algorithm will “scale” to large inputs and deliver its
results in a reasonable amount of time.

This closes the foundations of our courses. We have covered quite some
ground: We started with general definitions about computation and
algorithms, them we looked at RAM, which enables reasoning about
correctness and efficiency. You now much enough “theory” and will now
start looking at various data structure and algorithms to use them! We
start with the array next week!

