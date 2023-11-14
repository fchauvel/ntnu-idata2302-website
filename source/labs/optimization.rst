============
Optimization
============

:Module: Optimization
:Git Repository: `Lab 06---Optimization <https://github.com/fchauvel/aldast-lab06>`_
:Objectives:
   - Understand how to use recursion to approach optimization problem
   - Understand how to apply dynamic programming
   
Given two words, say “dog” and “cat”, our job is to find the minimum
number of editions that transforms the first word into the second. There
are various type of edit distance, depending on what “edition” we
consider. In the following, we will study the `Levenshtein
distance <https://en.wikipedia.org/wiki/Levenshtein_distance>`__, which
restricts editions to adding character, removing character, and
replacing a character by another [#skiena2020]_\ . Here are a few examples:

-  “dog” can be transformed to “cat” by a minimum of 3 editions, namely
   converting ’d’ to ’c’, ’o’ to ’a’, and ’g’ to ’t’.

-  ”sunday” can be transformed to ”monday” by a minimum of 2 editions,
   namely converting ’s’ to ’m’, ’u’ to ’o’.

-  ”sun” can be transformed to ”sunday” by a minimum of 3 editions,
   namely adding ’d’, ’a’, and ’y’.

-  “aloud” can be transformed into “allowed” in three steps: Inserting a
   second ’l’ between the ’l’ and the ’o’, replacing the ’u’ with a ’w’,
   and finally inserting an ’e’ between the ’w’ and the ’d’.

.. [#skiena2020] See for instance Skiena, S. S. (2020). The algorithm
                 design manual. : Springer International
                 Publishing. Chapter 10.2
   
Recursion
=========

Let us start with a “naive” implementation of the Levenshtein distance,
with three kinds of edition: Addition, deletion and replacement.

.. exercise::
   :label: labs/optimization/base-case
   :nonumber:

   What would be the “base cases” of the recursion?

.. solution:: labs/optimization/base-case
   :class: dropdown

   The base case is when one of the two words is “empty”. In that case,
   we know that we will need to add (resp. to delete) all the character
   of the other word. For example to transform “cat” into ““, we need to
   delete the three letters ’c’, ’a’, ’t’.

.. exercise::
   :label: labs/optimization/recursive-case
   :nonumber:

   What would be the “recursive cases” of the recursion?

.. solution:: labs/optimization/base-case
   :class: dropdown

   Consider the distance :math:`d(c_1w_1, c_2w_2)`, where :math:`c_i`
   represents a single character and :math:`w_i` the rest of the word.

   .. math::

      d(c_1w_1,\;c_2w_2) =
          \begin{cases}
            d(w_1, w_2) & \textrm{if } c_1 = c_2 \\
            1 + \min \big[d(w_1, w_2), d(w_1, c_2w_2), d(c_1w_1, w_2)\big] & \textrm{else}
          \end{cases}

   If the two first characters :math:`c_1` and :math:`c_2` are the same,
   there is no need to modify any of them and the distance is just the
   distance between the two remaining words :math:`w_1` and :math:`w_2`.

   Otherwise, we need to explore all possible path of actions, including
   replacing the characters :math:`1 + d(w_1, w_2)`, adding :math:`c_1`
   (or deleting :math:`c_2`) :math:`1 + d(c_1w_1, w_2)` or adding
   :math:`c_2` (or deleting :math:`c_1`) :math:`1 + d(w_1, c_2w_2)`.


.. exercise::
   :label: labs/optimization/recursive-implementation
   :nonumber:

   Implement a recursive implementation of the Levenshtein distance
   problem.

   #. Complete the file ``WithRecursion.java``.

   #. The test suite ``WithRecursionTest.java`` may help you get your
      algorithm right.

.. solution:: labs/optimization/recursive-implementation
   :class: dropdown
      
   The code below shows how to implement the base and recursive cases we
   found in the previous questions. The ``minimumOf`` is a “custom”
   function that finds the minimum in a list.

   .. code-block:: java

          public int distance(String left, String right) {
            if (left.isEmpty())
               return right.length();
            if (right.isEmpty())
               return left.length();
            if (left.charAt(0) == right.charAt(0))
               return distance(left.substring(1), right.substring(1));
            var candidates = new ArrayList<Integer>(3);
            candidates.add(distance(left.substring(1), right.substring(1)));
            candidates.add(distance(left, right.substring(1)));
            candidates.add(distance(left.substring(1), right));
            return 1 + minimumOf(candidates);
          }

Memoization
===========

In this section, we will improve our recursive solution with
*memoization*, that is avoiding solving multiple times the same sub
problems.

.. exercise::
   :label: labs/optimization/show-tree
   :nonumber:

   Instrument your recursive implementation to display the tree
   structure formed by the recursive calls. Can you see any recurrent
   sub problems, that would justify the need for memoïzation?

.. solution:: labs/optimization/show-tree
   :class: dropdown
   
   One way to instrument the code is to display the problem that is
   solved and the solution, indented with respect to the recursion. The
   code below show changes to the recursive implementation.

   .. code-block:: java
      :linenos:

          private int depth;
          
          public int distance(String left, String right) {
            open();
            display(String.format("ED('%s','%s')", left, right));
            int result = 0;
            if (left.isEmpty()) {
              result = right.length();
              
            } else if (right.isEmpty()) {
              result = left.length();
              
            } else if (left.charAt(0) == right.charAt(0)) {
              result = distance(left.substring(1),
                                right.substring(1));
              
            } else {
              var candidates = new ArrayList<Integer>(3);
              candidates.add(distance(left.substring(1),
                                      right.substring(1)));
              candidates.add(distance(left, right.substring(1)));
              candidates.add(distance(left.substring(1), right));
              result = 1 + minimumOf(candidates);
            }
            close();
            return result;
          }
          
          void open() { depth++; }

          void close() { depth--; }

          void display(String message) {
              System.out.println("  ".repeat(depth) + message);
          }

   Running this code on “cat”, and “dog” yields the following output,
   where we thus see that we are solving multiple time the same
   problems.

   .. code-block:: shell
      :linenos:
         
          ED('cat','dog')
          ED('at','og')
            ED('t','g')    // Once
              ED('','')
              ED('t','')
              ED('','g')
            ED('at','g')
              ED('t','')
              ED('at','')
              ED('t','g')   // once again
                ED('','')
                ED('t','')
                ED('','g')
                // ... cut for the sake of conciseness


.. exercise::
   :label: labs/optimization/memoization
   :nonumber:

   Implement memoization for the Levenshtein distance.

   #. Create a class to represent a single sub problem.

   #. Override the ``equals`` and ``hashCode`` so that we can store such
      problem and their solution into a hash table.

   #. Starting from your recursive code, complete the file
      ``WithMemoization.java`` by storing solved sub problems and their
      solution.

   #. The test suite ``WithMemoizationTest.java`` can help you test your
      implementation.


.. solution:: labs/optimization/memoization
   :class: dropdown
   
   We create a ``Pair`` class to capture a single invocation of the edit
   distance. The key point is that to be able to use this as a key in a
   hash table, this object has to be immutable (all fields are final)
   and we need to override both ``equals`` and ``hashCode``.

   .. code-block:: java
      :linenos:
         
          class Pair {
            
            private final String left;
            private final String right;
            
            Pair(String left, String right) {
              this.left = left;
              this.right = right;
            }
            
            @Override
            public int hashCode() {
              return 17 * left.hashCode()
                     + 31 * right.hashCode();
            }
            
            @Override
            public boolean equals(Object other) {
              if (!(other instanceof Pair)) {
                return false;
              }
              var otherPair = (Pair) other;
              return left.equals(otherPair.left)
              && right.equals(otherPair.right);
            }
            
          }

   We this class, we can now equip our edit distance class with an hash
   table and check—before to recurse—if the problem has not already been
   solve.

   .. code-block:: java
      :linenos:
         
          private Map<Pair, Integer> memory;
          
          public EDWithMemoization() {
            this.memory = new HashMap<Pair, Integer>();
          }

          public int distance(String left, String right) {
              var key = new Pair(left, right);
              if (memory.containsKey(key))
                  return memory.get(key);

              int result = 0;
              if (left.isEmpty()) {
                  result = right.length();

              } else if (right.isEmpty()) {
                  result = left.length();

              } else if (left.charAt(0) == right.charAt(0)) {
                  result = distance(left.substring(1), right.substring(1));

              } else {
                  var candidates = new ArrayList<Integer>(3);
                  candidates.add(distance(left.substring(1), right.substring(1)));
                  candidates.add(distance(left, right.substring(1)));
                  candidates.add(distance(left.substring(1), right));
                  result = 1 + minimumOf(candidates);
              }
              memory.put(key, result);
              return result;
          }

.. exercise::
   :label: labs/optimization/benchmark
   :nonumber:
      
   Use the ``Benchmark.java`` class to compare the speed of your
   recursive and memoized implementation. Check that your two solution
   output the same edit distance (see Appendix `4 <#sec:benchmark>`__
   for info about how to run the benchmark).

.. solution:: labs/optimization/benchmark
   :class: dropdown   

   By running the benchmark class, we can see that our memoization is
   able to cope much larger problem. Note by default, the function are
   stopped (i.e., time out thrown) after 20 seconds.

   .. code-block:: shell
      :linenos:
         
      % mvn compile \
            exec:java --quiet \
            -Dexec.mainClass="no.ntnu.idata2302.lab06.Benchmark"  
      Length       Recursion     Memoization       Dyn. Prog
                   time   ED       time   ED       time   ED
           5          0    4          0    4      error  n/a
          10         10    8          9    8      error  n/a
          50    timeout  n/a          2   36      error  n/a
         100    timeout  n/a          6   67      error  n/a
         500    timeout  n/a        671  335      error  n/a
        1000    timeout  n/a       4054  693      error  n/a

Dynamic Programming
===================

We now further improve our solution, using dynamic programming to get
rid of the recursive calls and, in turn, minimize the memory we
consumed.

.. exercise::
   :label: labs/optimization/dp/table
   :nonumber:

   How would you organize the sub problems into a “table”?

   #. Where would the “base” cases be in this table?

   #. Where would the “recursive” cases be?

   #. How would you update a cell in this table?

.. solution:: labs/optimization/dp/table
   :class: dropdown

   The edit distance problem is such that it is possible to lay down all
   sub problems into a :math:`n \times m` matrix where :math:`n-1` and
   :math:`m-1` relates to the length of the two words to compare. The
   indices in this tables relate to the their *suffixes*. Consider for
   instance, “dog” and “cats” again. The word “dog” as 4 suffixes, and
   the word “cats” (note the plural form) 5 suffixes. In the cell
   :math:`(2,1)`, we place the distance between the suffix “–g” (suffix
   at :math:`n-2`) and “–ats” (suffix at :math:`m-1`).

   .. math::

      D = \begin{bmatrix}
                0      & 1 & \ldots  & n  \\
                1      &   &         &  & \\
                \vdots &   & d_{i,j} &  & \\
                m      &   &         &  & \\
              \end{bmatrix}

   The base cases, which capture comparisons with an empty suffix (the
   last suffix) therefore occupy the first row and the first column.
   Provided we denote by :math:`c_i` the first character of suffix
   :math:`i`, we can derive the update rules from our recursive
   definition:

   .. math::

      d_{i,j}=\begin{cases}
                    d_{i-1,j-1} & \textrm{if } c_i = c_j \\
                    1 + \min (d_{i,}, d_{i-1,j}, d_{i, j-1}) & \textrm{otherwise}
                  \end{cases}

.. exercise::
   :label: labs/optimization/dp
   :nonumber:

   Implement dynamic programming for the edit distance.

   #. Complete the file ``WithDP.Java``.

   #. The test suite ``WithDPTest.java`` can help you test your
      implementation.

.. solution:: labs/optimization/dp
   :class: dropdown

   The DP algorithm directly creates the matrix we described in the
   previous question and then fills compute all the possible values.
   Once the matrix is filled, it simply returns the last cell, where the
   answer to the original problem lays. The code below shows a possible
   implementation.

   .. code-block:: java
      :linenos:
         
          public int distance(String left, String right) {
            int [][] distance =
            new int[left.length()+1][right.length()+1];
            
            for (int row=0 ; row<left.length()+1 ; row++) {
              distance[row][0] = row;
            }
            
            for (int column=0 ; column<right.length()+1 ; column++) {
              distance[0][column] = column;
            }
            
            for (int row=1 ; row<left.length()+1 ; row++) {
              for (int column=1 ; column<right.length()+1 ; column++) {
                int result =
                   1 + Math.min(Math.min(distance[row-1][column],
                                         distance[row][column-1]),
                                distance[row-1][column-1]);
                char leftHead = left.charAt(left.length()-row);
                char rightHead = right.charAt(right.length()-column);
                if (leftHead == rightHead)
                  result = distance[row-1][column-1];
                distance[row][column] = result;
              }
            }
            
              return distance[left.length()][right.length()];
          }

.. exercise::
   :label: labs/optimization/dp/benchmark
   :nonumber:

   Use the ``Benchmark.java`` class to compare the speed of your
   memoized and DP implementation. Check that your two solutions
   output the same edit distance.

.. solution:: labs/optimization/dp/benchmark
   :class: dropdown

   We can use the ``Benchmark`` class again to assess the speed gain
   brought by dynamic programming. Note the benchmark only runs once
   every algorithm, so the time measures may vary due to garbage
   collection or operating system interruptions. For instance, when I
   ran it, DP was faster for a characters than for 500.

   .. code-block:: shell
      :linenos:
         
      % mvn compile \
            exec:java --quiet \
            -Dexec.mainClass="no.ntnu.idata2302.lab06.Benchmark"  
      Length       Recursion     Memoization       Dyn. Prog
                   time   ED       time   ED       time   ED
           5          1    4          0    4          1    4
          10         58    7          0    7          1    7
          50    timeout  n/a          1   32          1   32
         100    timeout  n/a          5   69          3   69
         500    timeout  n/a        516  342         18  342
        1000    timeout  n/a       3986  662         10  662

.. _`sec:benchmark`:

Benchmark
=========

The code available in the `Github
repository <https://github.com/fchauvel/aldast-lab06>`__ includes a
simple Java class that runs the three implementation (recursive, with
memoization, and with dynamic programming) against random words of
increasing length (10, 50, 100, 500, and characters). If the run takes
more than 20 seconds, it is considered as timed out. We can run this
benchmark with the command:

.. code-block:: shell
   :linenos:
         
   % mvn compile \
         exec:java --quiet \
         -Dexec.mainClass="no.ntnu.idata2302.lab06.Benchmark"  
