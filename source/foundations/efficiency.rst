==========
Efficiency
==========

:Lecture: Lecture 1.4 :download:`(slides) <_static/efficiency/efficiency.pptx>`
:Objectives: Understand how to estimate the resources consumed by a
             computation
:Concepts: Time, Space, Efficiency/Complexity, Cost Model

Algorithms tell us how to manipulate symbols to solve computational
problems. We also saw how the machine executes a program and how we can
therefore argue for correctness.

Generally there are however many ways to solve a given computation
problem. If we have several “correct” algorithms, them we need to
compare them. There are many things we can look at, including their
length, there readability, or their performance. In this course, we will
only look at their performance, which includes time and space. Time is
the clock time enlapsed between the moment the RAM starts and the moment
it stops, whereas space is the number of memory cells the machine uses.

I organized the remainder as follows. The first part introduces two
programs that both compute the sum of the 100 first integers using two
alternative algorithms. We will go through a quick benchmark to see
which program runs the fastest and consumes the least memory. We then
take a closer look, by converting these programs to RAM assembly, which
gives us very different results. Finally, we look at understanding
higher-level code without resorting to RAM assembly. In the next
lecture, we will generalize to fully-fledge algorithms with arbitrary
inputs and code.

Running Example
===============

Consider the following computational problem: Finding the sum :math:`s`
of the natural numbers up to 100. More formally, that is finding
:math:`s` such that:

.. math:: s = 1 + 2 + 3 + \ldots + 99 + 100

Consider the two programs shown on
:numref:`foundations/efficiency/sum/loop` and
:numref:`foundations/efficiency/sum/formula`. :numref:`foundations/efficiency/sum/loop`
is a C program that computes this sum using a loop: It iterates from 0
to 100 and adds up numbers as it goes. By contrast,
:numref:`foundations/efficiency/sum/formula` is a Python script that
relies on a closed-form formula:

.. math::
   :label: foundations/efficiency/sum/equation

   1 + 2 + 3 \ldots + n = \sum_{i=1}^{n} i =\frac{n \cdot (n+1)}{2}.

Not only are these two programs expressed using different programming
languages, but they also use different algorithms: A loop vs. a formula.
So which one will perform best? To compare these two programs, and their
respective algorithms we will look at the resources these computations
require. There are two main resources: Time and space.

.. margin::
   
   .. code-block:: python
      :caption: Computing the sum of the first :math:`n` integers
                using a closed-form formula (in Python)
      :name: foundations/efficiency/sum/formula
      :linenos:
            
      #!/usr/bin/env python3
      sum = 100 * 101 / 2
      print("Sum: ", sum)


.. code-block:: c
   :caption: Computing the sum of the the first :math:`n` integers
             using a loop
   :name: foundations/efficiency/sum/loop
   :linenos:

   #include <stdio.h>
   
   int main() {
     int sum = 0;
     for (int any=0; any<=100; any++) {
       sum += any;
     }
     printf("Sum: %d\n", sum);
   }
      
          
Benchmarking Performance
========================

How can get an idea of the time and memory these programs require? The
simplest way to answer that is to execute them and to measure. On most
POSIX operating systems, one can do that using the ``time`` command,
which accepts a command and displays various runtime information
including the run-time and memory consumption, as we can see on
:numref:`foundations/efficiency/sum/benchmark`

.. code-block:: console
   :caption: Benchmarking the two progams from
             :numref:`foundations/efficiency/sum/loop` and
             :numref:`foundations/efficiency/sum/formula`
   :name: foundations/efficiency/sum/benchmark

   $ gcc sum.c
   $ /usr/bin/time -l ./a.out
   Sum: 2550
           0.00 real         0.00 user         0.00 sys
                1245184  maximum resident set size
                      0  average shared memory size
                      0  average unshared data size
                      0  average unshared stack size
                     85  page reclaims
                     [...]
   $ /usr/bin/time -l python3 sum.py
   Sum:  2550
           0.06 real         0.02 user         0.02 sys
                8290304  maximum resident set size
                      0  average shared memory size
                      0  average unshared data size
                      0  average unshared stack size
                   4045  page reclaims
                    198  page faults
                    [...]

This is of course a simplistic way to measure, but it gives some
indications nonetheless. We see that our C program takes less than 10
milliseconds (0.00 real) to run whereas our Python programs takes 60 ms.
As for the memory (indicated by the maximum resident set size, in
bytes), our C program requires 1.1 MiB, whereas our Python programs uses
7.9 MiB. This a huge difference, but is that really about our
algorithms?

These measurements describe the whole underlying setup, including
hardware, operating system (OS) and runtime environment. C and Python
are very different in this respect: A C program is compiled into machine
code whereas a Python program is dynamically interpreted, which is much
slower, and requires much more memory.

.. important::

   *Benchmarking* describes the *programs* (in their environment) but not
   the underlying *algorithms*.

   This is **not** the focus of this course.

*Performance engineering* is the Art of fine-tuning the machine, the OS
and the runtime environment for maximum performance. In this course, we
only focus “ballpark estimates”, independent of the machine and software
stack. What we aim at is a relative landmark to compare alternative
algorithms.

Computational Complexity
========================

Benchmarking has its limitations, so what else can we do? We can use
our RAM model, which we have designed in Lecture 1.2. The idea is to
scrutinize the computation(s) that these programs would generate on
RAM. In Computer Science, this is named *computational complexity*,
and can refer to either time or space, as we shall see.

.. important::

   How we measure the time and space needed for a computation ultimately
   depends on the underlying computation model.
   

RAM Programs
------------

How would our two programs from
:numref:`foundations/efficiency/sum/loop` and
:numref:`foundations/efficiency/sum/formula` look like if they were
written for RAM? :numref:`foundations/efficiency/sum/loop/asm` and
:numref:`foundations/efficiency/sum/formula/asm` shows two
possible translations in RAM assembly, which I derived using the
translation schemes presented in Lecture 1.2.

:numref:`foundations/efficiency/sum/loop/asm` implements a loop,
whereas :numref:`foundations/efficiency/sum/formula/asm` implements
formula shown by Equation :eq:`foundations/efficiency/sum/equation` I
assume here an augmented RAM where all arithmetic operations are
readily available as machine instructions.

.. code-block:: asm
   :caption: Summing the :math:`n` first integers using a lopp in
             assembly code (cf.  :numref:`foundations/efficiency/sum/loop`)
   :name: foundations/efficiency/sum/loop/asm
   :linenos:

            .entry main
            .data
            end     WORD    100
            sum     WORD    0
            any     WORD    0

            .code
    main:   LOAD    0
            ADD     any
            SUB     end
            JUMP    done
            LOAD    0
            ADD     sum
            ADD     any
            STORE   sum
            LOAD    1
            ADD     any
            STORE   any
            LOAD    0
            JUMP    main
    done:   PRINT   sum
            HALT

.. code-block:: asm
   :caption: Summing the :math:`n` first integers using a formula in
             assembly code
             (cf. :numref:`foundations/efficiency/sum/formula`)
   :name: foundations/efficiency/sum/formula/asm
                
             .entry main
             .data
             end     WORD    100
             sum     WORD    0
             byTwo   WORD    2

             .code
     main:   LOAD    1
             ADD     end
             MUL     end
             DIV     byTwo
             STORE   sum
             PRINT   sum
             HALT

                   
Space
-----

How can we estimate the memory used by these RAM programs? We will count
the number of memory cells used in the *data segment*. Here there are
three in each programs. Space-wise, both programs are equivalent. This
departs from our benchmarking, which indicated that our formula consumed
much more memory.

.. important::

   The memory used in a computation boils down to the number of memory
   cells used to store actual data (i.e., not the program instructions).
   By convention, we will only account for intermediate results, and
   discard inputs and outputs.

Time
----

To estimate the time spent by the machine, we need to know how much
time each instruction take. This is known as the *cost model* of the
computation model (i.e., the RAM). In this course we assume that every
instruction takes one unit of time, as shown in
:numref:`foundations/efficiency/cost-model` below. This is known as
the *unit cost model [#other-cost-models]_ .

.. [#other-cost-models] More "realistic" cost models exist. For
                        example, with the *bit-cost* model, the time
                        spent by an instruction depends on the number
                        of symbol in its operand. This cost model,
                        assuming an alphabet with 10 symbols, is
                        :math:`cost(\mathtt{ADD}\; a)= \log_{10}
                        \mathrm{Mem}(a)`
        
.. csv-table:: Unit cost model associated with the RAM instructions.
           Others models are possible
   :name: foundations/efficiency/cost-model
   :header: "Op Code", "Mnemonic", "Cost"
   :widths: 5, 20, 5

   "1", "`LOAD <value>`", "1"
   "2", "`ADD <address>`", "1"
   "3", "`SUBTRACT <address>`", "1"
   "4", "`STORE <address>`", "1"
   "5", "`JUMP <address>`", "1"
   "6", "`READ <address>`", "1"
   "7", "`PRINT <address>`", "1"
   "\*", "`HALT`", "1"

.. important::

   The time spent in a computation is by definition the time spent by
   the machine to reach to produce a result.

   In this course (unless stated otherwise), we shall assume however
   that every instruction takes one unit of time. Time thus
   reflects the number of instructions the machine executes.
   
Example: The Formula
~~~~~~~~~~~~~~~~~~~~
   
How does this apply to our example? Consider first our Python program
shown on :numref:`foundations/efficiency/sum/formula/asm`. The
execution starts at the “main” label and ends with the ``HALT``
instruction. The machine executes once an only once every of its seven
instructions (there is no ``JUMP``). So this algorithm takes 7 units of
time.

Example: The Loop
~~~~~~~~~~~~~~~~~

By contrast, our C program (see
:numref:`foundations/efficiency/sum/loop/asm`) includes ``JUMP``
instructions so we have to pay attention to how many time each
instruction runs. We have to look at each assembly instruction and
mark down its cost (always 1) and how many times it runs (the
count). These two combined give us a total cost for each assembly line
and the overall execution time of our program is simply the “grand
total” for all assembly lines. Table `2 <#tab:breakdown>`__ shows how
we can break this down for our C program.

Our C program is a loop (see :numref:`foundations/efficiency/sum/loop`) so
the assembly code contains three parts: A test from (lines 1–4), a loop
body (lines 5–13) and the rest (lines 14–15). As always, we assume the
unit cost model, so every instruction takes one unit of time. The “test”
section runs 102 times, because it runs once for every integer from 0 to
100 (included) and once more where the variable ``any`` holds 101 and we
then exit the loop. Each instruction in the loop body runs 101 times.
Finally the two last instructions run only once. That gives us a grand
total of 1319.

.. csv-table:: Calculating the runtime of our loop-based program (see
               :numref:`foundations/efficiency/sum/loop/asm`)
   :name: foundations/efficiency/sum/loop/asm/cost
   :widths: 5, 20, 5, 5, 5
   :header: "Line", "Assembly Code", "Runs", "Cost", "Total"

      
   "1", "``⁣main: LOAD   0``", "102", "1", "102"
   "2", "``⁣      ADD    any``", "102", "1", "102" 
   "3", "``⁣      SUB    end``", "102", "1", "102"
   "4", "``⁣      JUMP   done``", "102", "1", "102"
   "5", "``⁣      LOAD   0``", "101", "1", "101"
   "6", "``⁣      ADD    sum``", "101", "1", "101"
   "7", "``⁣      ADD    any``", "101", "1", "101"
   "8", "``⁣      STORE  sum``", "101", "1", "101"
   "9", "``⁣      LOAD   1``", "101", "1", "101"
   "10", "``⁣      ADD    any``", "101", "1", "101"
   "11", "``⁣      STORE  any``", "101", "1", "101"
   "12", "``⁣      LOAD   0``", "101", "1", "101"
   "13", "``⁣      JUMP   main``", "101", "1", "101"
   "14", "``⁣dome: PRINT  sum``", "1", "1", "1"
   "15", "``⁣      HALT``", "1", "1", "1"
   "", "", "", "**Total:**", "**1319**"
..       ==== ================ ===== ====== =====
         Line ASM code         Count Cost   Total
         ==== ================ ===== ====== =====
         1    main: LOAD 0     102   1      102
         2           ADD any   102   1      102
         3           SUB end   102   1      102
         4           JUMP done 102   1      102
         5           LOAD 0    101   1      101
         6           ADD sum   101   1      101
         7           ADD any   101   1      101
         8           STORE sum 101   1      101
         9           LOAD 1    101   1      101
         10          ADD any   101   1      101
         11          STORE any 101   1      101
         12          LOAD 0    101   1      101
         13          JUMP main 101   1      101
         14   done: PRINT sum  1     1      1
         15          HALT      1     1      1
         \                           Total: 1319
         ==== ================ ===== ====== =====

Time-wise, this reveals that our loop-based algorithm is much slower
than our formula: The loop takes instructions against only 7 for the
formula! This is also very different from our benchmarking, where our C
program run much faster! Again, what we saw with the benchmark is that
machine code runs much faster than interpreted code.

Higher-level Code
-----------------

Now, we know how to estimate the time and space of algorithms. In
practice however, we will not have time to write down RAM assembly. We
do not really want to. Besides, we do not know exactly how high-level
code would be compiled. Instead, we count arithmetic and logic
operations when we look at the run time, and we count variables when
we look at space. As we shall see in the next lecture, we cannot
always come up with a precise number of instructions anyway.

Returning to our sum of integers, if we only count arithmetic and logic
operations, we get a total of 3 for the formula algorithm and 404 for
the loop. The difference (x10) is still there, and this is what matters.

.. important::

   In practice, we do not know precisely the RAM instructions that would
   be generated by a compiler so we will only account for arithmetic and
   logic operations.

Conclusion
==========

Now we know what are the runtime and space required to run a given
computation. Time is simply the time it takes before the machine halts
whereas the space is the number of memory cells it uses to store
intermediate results. We are not there yet though. We have only looked
at single computation, but an algorithm (and a program) captures a group
of computations. This will be the topic of the next lecture on algorithm
analysis.
