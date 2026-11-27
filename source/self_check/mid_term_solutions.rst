=======================
Mid-Term: Solutions
=======================

This page repeats the questions of the :doc:`mid-term self-check
<mid_term>` together with a solution for each. Try the questions first:
the solutions are hidden until you click on them. Compare your
*reasoning* with the solutions, not just your final answers.

.. note::

   There are usually several correct answers. If yours differs,
   check that it is justified, rather than that it matches ours.

Part 1 — Finding the minimum, on-line
=====================================

The user types values one at a time. Your program must find the
smallest without storing them all.

.. exercise:: Question 1
   :label: self-check/mid-term/solutions/q01
   :nonumber:

   Write an algorithm that repeatedly asks the user for a value,
   :math:`n` times in total, and finds the smallest value given. Use
   pseudo-code, Java, or any high-level language you like.

.. solution:: self-check/mid-term/solutions/q01
   :class: dropdown

   Keep only the smallest value seen so far, and compare each new value
   with it. We assume :math:`n \geq 1`.

   .. code-block:: text

      min ← read()
      for i from 2 to n do
          x ← read()
          if x < min then
              min ← x
          end
      end
      print min

   Only :math:`min`, :math:`x` and the loop counter :math:`i` are stored (plus
   :math:`n`): we never keep the values themselves.

Part 2 — RAM programs
=====================

This part connects our thinking to the machine. It is the foundation,
not what we do day to day. Use the RAM model from the lectures.

Throughout this part, the "number of instructions" is the number of
instructions the machine **executes** when it runs your program on a
given input. It is *not* the number of instructions written in the
program (its length), because a loop executes the same instructions
many times.

.. exercise:: Question 2
   :label: self-check/mid-term/solutions/q02
   :nonumber:

   Translate your algorithm from question 1 into a RAM program that
   reads :math:`n` integers, one at a time, and prints the smallest.

.. solution:: self-check/mid-term/solutions/q02
   :class: dropdown

   We assume natural numbers, as the RAM from the lectures cannot
   represent negative values: ``SUBTRACT`` stops at 0, and ``JUMP`` only
   jumps when ``ACC`` is *strictly positive*. This is what lets us
   compare two values: ``ACC := a - b`` is positive exactly when
   :math:`a > b`. The program first reads :math:`n`, then the values
   themselves.

   .. code-block:: asm

             .data
             n       0
             min     0
             x       0
             i       0

             .code
      main:  READ     n
             READ     min          ; the first value is the minimum so far
             LOAD     1
             STORE    i            ; i <- 1 (values read so far)
      test:  LOAD     0
             ADD      n
             SUBTRACT i            ; ACC > 0 iff i < n (more values to read)
             JUMP     body
             PRINT    min
             HALT
      body:  READ     x
             LOAD     0
             ADD      x
             SUBTRACT min          ; ACC > 0 iff x > min
             JUMP     next         ; x > min: nothing to do
             LOAD     0
             ADD      x
             STORE    min          ; x <= min: new minimum
      next:  LOAD     1
             ADD      i
             STORE    i            ; i <- i + 1
             LOAD     1            ; ACC > 0, so the next JUMP is unconditional
             JUMP     test

   .. note::

      Since ``JUMP`` only jumps when ``ACC`` is positive, an unconditional
      jump needs ``ACC`` to be positive first, hence ``LOAD 1`` before
      the final ``JUMP``.

.. exercise:: Question 3
   :label: self-check/mid-term/solutions/q03
   :nonumber:

   How many instructions does your RAM program execute for :math:`n =
   10`? Choose a concrete input and state it.

.. solution:: self-check/mid-term/solutions/q03
   :class: dropdown

   Take the input :math:`n = 10` followed by the values
   :math:`5, 3, 8, 1, 9, 2, 7, 4, 6, 0`. The machine executes
   **145** instructions. Here is how we get there:

   - 4 instructions to get started (two ``READ``, ``LOAD`` and ``STORE``);
   - the test (4 instructions) runs 10 times, that is 40 instructions;
   - 9 iterations of the loop body, each running 10 instructions when the
     value is not a new minimum (5 in ``body``, 5 in ``next``), that is
     90 instructions;
   - 3 of these values (3, 1 and 0) are new minima, and each costs 3
     extra instructions, that is 9 instructions;
   - the final ``PRINT`` and ``HALT``: 2 instructions.

   In total, :math:`4 + 40 + 90 + 9 + 2 = 145`. Running the same program
   with the values in increasing order (:math:`0, 1, \ldots, 9`) takes
   136 instructions, and with the values in decreasing order
   (:math:`9, 8, \ldots, 0`), it takes 163 instructions.

.. exercise:: Question 4
   :label: self-check/mid-term/solutions/q04
   :nonumber:

   Express the number of instructions executed as a function of
   :math:`n`. Hint: does your answer depend on anything other than :math:`n`?

.. solution:: self-check/mid-term/solutions/q04
   :class: dropdown

   Let :math:`u` be the number of times a value is a new minimum (i.e.,
   :math:`x \leq min`). The number of executed instructions is

   .. math::

      T(n) = 14\,n - 4 + 3\,u

   Indeed: 4 instructions to start, 4 per test (and the test runs
   :math:`n` times), 10 per loop iteration (and there are :math:`n - 1`
   of them), 3 more for each new minimum, and 2 to finish. Check
   for :math:`n = 10` and :math:`u = 3`: :math:`140 - 4 + 9 = 145`.

   So the answer does depend on something else than :math:`n`: it
   depends on the *values* and their *order*, through :math:`u`, which
   lies between 0 (the first value is the smallest) and :math:`n - 1`
   (values given in decreasing order). Hence

   .. math::

      14\,n - 4 \;\leq\; T(n) \;\leq\; 17\,n - 7

.. exercise:: Question 5
   :label: self-check/mid-term/solutions/q05
   :nonumber:

   How many memory words does your RAM program need to store
   intermediate results? Does this number depend on :math:`n`?

.. solution:: self-check/mid-term/solutions/q05
   :class: dropdown

   The program needs **4 memory words**: :math:`n`, :math:`min`,
   :math:`x` and :math:`i`. We do not count the program itself (the
   instructions), and ``ACC`` is a register, not a memory word.

   This number does **not** depend on :math:`n`: whether we read 10 or
   10 million values, we only keep the minimum and the current value.

.. exercise:: Question 6
   :label: self-check/mid-term/solutions/q06
   :nonumber:

   What can you say about the number of instructions executed using
   big-O notation?

.. solution:: self-check/mid-term/solutions/q06
   :class: dropdown

   Whatever the order of the values, :math:`14\,n - 4 \leq T(n) \leq 17\,n
   - 7`. The number of executed instructions thus grows linearly with
   :math:`n`: it is in :math:`O(n)` (and even :math:`\Theta(n)`). The
   order of the values only changes the constant (14 versus 17), which
   big-O notation ignores.

Part 3 — Back to pseudo-code
============================

.. exercise:: Question 7
   :label: self-check/mid-term/solutions/q07
   :nonumber:

   Back at our original pseudo code program from question 1. Why might
   we prefer to count comparisons rather than executed machine
   instructions?

.. solution:: self-check/mid-term/solutions/q07
   :class: dropdown

   Counting machine instructions ties our analysis to one particular
   machine and one particular translation: a different instruction set, or
   a different (but equally correct) RAM program, would give another
   count, such as :math:`12\,n` or :math:`20\,n`. Comparisons, on the
   other hand, are a property of the *algorithm*: any implementation has to
   perform them. They are also what drives the running time, since the
   other instructions (reading, copying, counting) are repeated alongside
   the comparisons. Counting comparisons is simpler, and it leads to the
   same growth rate.

.. exercise:: Question 8
   :label: self-check/mid-term/solutions/q08
   :nonumber:

   How many comparisons does your algorithm from question 1 perform
   for :math:`n` values? Does the answer depend on the order of the
   values?

.. solution:: self-check/mid-term/solutions/q08
   :class: dropdown

   The algorithm performs exactly :math:`n - 1` comparisons: the first
   value needs none, and each of the other :math:`n - 1` values is compared
   once with the current minimum. The answer does **not** depend on the order
   of the values (only the number of *assignments* to :math:`min` does).

.. exercise:: Question 9
   :label: self-check/mid-term/solutions/q09
   :nonumber:

   What can you say about this number using big-O notation?

.. solution:: self-check/mid-term/solutions/q09
   :class: dropdown

   :math:`n - 1` comparisons is in :math:`O(n)` (and in :math:`\Theta(n)`),
   in line with what we found by counting machine instructions.

.. exercise:: Question 10
   :label: self-check/mid-term/solutions/q10
   :nonumber:

   How many variables does your algorithm need? Does this number
   depend on :math:`n`? Compare with your answer to question 5.

.. solution:: self-check/mid-term/solutions/q10
   :class: dropdown

   The algorithm needs 4 variables: :math:`n`, :math:`min`, :math:`x` and
   :math:`i`. This does not depend on :math:`n`. It is the same as the
   4 memory words of the RAM program (question 5): each variable occupies
   one word, and the RAM program needs no extra temporary variable.

Part 4 — Recursion
==================

.. exercise:: Question 11
   :label: self-check/mid-term/solutions/q11
   :nonumber:

   Write another algorithm that finds the minimum recursively.

.. solution:: self-check/mid-term/solutions/q11
   :class: dropdown

   We read one value, ask a recursive call to find the minimum of the
   remaining :math:`n - 1` values, and keep the smaller one. The base case
   is a single value.

   .. code-block:: text

      procedure minimum(n)
          x ← read()
          if n = 1 then
              return x
          end
          m ← minimum(n − 1)
          if x < m then
              return x
          else
              return m
          end
      end

   Calling ``minimum(n)`` reads :math:`n` values and returns the smallest.

.. exercise:: Question 12
   :label: self-check/mid-term/solutions/q12
   :nonumber:

   How can you model the number of comparisons this recursive
   algorithm performs for :math:`n` values? Hint: express the count
   for :math:`n` in terms of the count for :math:`n - 1`.

.. solution:: self-check/mid-term/solutions/q12
   :class: dropdown

   Let :math:`C(n)` be the number of comparisons performed by
   ``minimum(n)``. The base case does not compare anything, and otherwise we
   compare once, after the recursive call on :math:`n - 1` values:

   .. math::

      C(1) = 0 \qquad C(n) = C(n - 1) + 1 \quad \text{for } n > 1

   Unrolling gives :math:`C(n) = C(n - 1) + 1 = C(n - 2) + 2 = \ldots =
   C(1) + (n - 1)`, hence :math:`C(n) = n - 1`. This is the same number of
   comparisons as the iterative algorithm.

.. exercise:: Question 13
   :label: self-check/mid-term/solutions/q13
   :nonumber:

   How much memory does your recursive algorithm need, as a function
   of :math:`n`? Compare with your answer to question 10. Think about
   what happens each time a function calls itself.

.. solution:: self-check/mid-term/solutions/q13
   :class: dropdown

   Each call to ``minimum`` keeps its own *activation frame* on the call
   stack, holding its parameter :math:`n`, its variables :math:`x` and
   :math:`m`, and its return address. The recursive call happens before
   the function returns, so none of the frames can be released before the
   deepest call returns: there are :math:`n` frames on the stack at the
   same time. The memory needed grows linearly with :math:`n`, that is
   :math:`O(n)`.

   By contrast, the iterative algorithm of question 10 needs a constant
   number of variables. Recursion trades memory for a simpler formulation.

Part 5 — Insertion sort
=======================

Now we want to store all the values the user provides and keep them
sorted, not just pick the minimum.

.. exercise:: Question 14
   :label: self-check/mid-term/solutions/q14
   :nonumber:

   Write an algorithm that inserts each value into its correct place
   as it is read (insertion sort).

.. solution:: self-check/mid-term/solutions/q14
   :class: dropdown

   We keep the values received so far in a sorted array, and insert each
   new value at its place, shifting the larger values one position to the
   right.

   .. code-block:: text

      size ← 0
      repeat n times
          x ← read()
          j ← size
          while j > 0 and sorted[j − 1] > x do
              sorted[j] ← sorted[j − 1]        // shift one position right
              j ← j − 1
          end
          sorted[j] ← x
          size ← size + 1
      end

.. exercise:: Question 15
   :label: self-check/mid-term/solutions/q15
   :nonumber:

   For insertion sort, are comparisons still the right thing to count?
   What else might matter?

.. solution:: self-check/mid-term/solutions/q15
   :class: dropdown

   Comparisons are still a good measure of the *logic* of the algorithm,
   but they no longer tell the whole story. When values are stored in an
   array, making room for a new value means *moving* (copying) other
   values, and these moves cost as much as the comparisons, if not more
   when items are large. Memory accesses (reads and writes) are also what
   we should count when we compare, for instance, an array with a linked
   list, as we do in the next two questions.

.. exercise:: Question 16
   :label: self-check/mid-term/solutions/q16
   :nonumber:

   Store the values in an array. How many comparisons and how many
   moves does your algorithm need for :math:`n` values? Say what you
   count as a "move" and why. Does the answer depend on the order of
   the input? Give the best and the worst case, using big-O notation.

.. solution:: self-check/mid-term/solutions/q16
   :class: dropdown

   We count a *move* as every time an item is copied into a slot of the
   array: each shift, plus the final placement of the new value. We count
   a comparison each time the new value is compared with a stored one.

   When inserting the :math:`k`-th value into the :math:`k - 1` values
   already stored, the algorithm scans from the end:

   - **Best case**: the new value is not smaller than the last stored one.
     There is 1 comparison and no shift (1 move for the placement). It
     happens at every step when the input is already **sorted**, which
     gives about :math:`n` comparisons and :math:`n` moves in total,
     that is :math:`O(n)`.

   - **Worst case**: the new value is smaller than all the stored ones. It
     needs :math:`k - 1` comparisons and :math:`k - 1` shifts. It happens
     at every step when the input is in **decreasing** order, which gives

     .. math::

        \sum_{k=1}^{n} (k - 1) = \frac{n(n-1)}{2}

     comparisons and as many shifts (plus :math:`n` placements), that
     is :math:`O(n^2)`.

   So yes, the answer depends on the order of the input: :math:`O(n)`
   in the best case and :math:`O(n^2)` in the worst case, both for the
   comparisons and the moves.

.. exercise:: Question 17
   :label: self-check/mid-term/solutions/q17
   :nonumber:

   Answer the same question if you store the values in a linked list
   instead. What changes, and what stays the same?

.. solution:: self-check/mid-term/solutions/q17
   :class: dropdown

   With a sorted linked list, we scan from the head until we find the
   place of the new value, and then we link a new node there.

   **What changes.** There is no shifting: inserting a node only updates
   a couple of references, which is a constant number of moves per
   insertion, :math:`O(n)` moves in total, whatever the order of the
   input. However, we can only reach a position by walking through the list
   from its head. Hence the best case is now when each new value is
   **smaller** than all the stored ones (1 comparison each, decreasing
   input, :math:`O(n)` comparisons overall), and the worst case when it is
   **larger** (the whole list is traversed, increasing input,
   :math:`O(n^2)` comparisons).

   **What stays the same.** The number of comparisons still depends on the
   order of the input, and is still :math:`O(n)` at best and :math:`O(n^2)` at
   worst. The total running time therefore remains :math:`O(n^2)` in the
   worst case: the linked list only removes the cost of the moves.

.. exercise:: Question 18
   :label: self-check/mid-term/solutions/q18
   :nonumber:

   How much memory does this program need, compared with your minimum
   algorithm from question 1?

.. solution:: self-check/mid-term/solutions/q18
   :class: dropdown

   Storing all the values requires :math:`n` memory words (for the array),
   or about :math:`2n` (for the linked list, where each node holds a value
   and a reference), plus a handful of variables (:math:`x`, :math:`j`,
   :math:`size`, and so on). This is :math:`O(n)`, whereas the minimum
   algorithm needs only a constant amount of memory.

   This is unavoidable: the result (the sorted sequence of :math:`n` values)
   is itself :math:`n` values long, so we have to store at least that much.
