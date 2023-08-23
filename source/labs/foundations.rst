===========
Foundations
===========

:Module: Foundations
:Git Repository: `Lab 01---Foundations <https://github.com/fchauvel/aldast-lab01>`_
:Objectives:
   - Refresh our Java programming skills
   - Play with Random Access Machines
   - Consider correctness of simple programs
         
Java Refresher
==============

The questions below should help you get up-to-speed with Java and with
programming in general.

.. exercise::
   :label: foundations/refresher/rps
           
   Write a procedure ``whoWins`` that decides who wins a
   Rock-scissor-paper game. The procedure accepts the choice of the two
   players as integers (0 is “rock”, 1 is “scissors”, and 2 is “paper”)
   and returns another integer (1 when Player 1 wins, 2 when Player 2
   wins, and 0 if there is a draw).

   #. Look at the file ``src/main/java/.../lab01/RSP.java``

   #. There are 9 test cases, which you can run from using the command

      .. code:: shell

               $ mvn test -Dtest="no.ntnu.idata2302.lab01.RSPTest"

               
.. solution:: foundations/refresher/rps
   :class: toggle

   There are many ways solve this. The simplest I can think of is to
   wrote a conditional with all the possibilities. I prefer however to
   extract all the possibilities in a separate 2D array and to just
   fetch the result from there. The rows represent Player 1 whereas the
   columns represents Player 2.

   .. code-block:: java
      :linenos:

      public static short whoWins(short player1, short player2) {
        return WINNER[player1][player2];
      }

      private static final short[][] WINNER = {
        {0, 1, 2},
        {2, 0, 1},
        {1, 2, 0}
      };

.. exercise::
   :label: foundations/minimum

   Write a procedure that finds the minimum in a given array of
   integers.

   #. Look at the file ``Minimum.java``. Complete the code.

   #. There are a few test cases, which you can run from using the
      command

      .. code:: shell

               $ mvn test -Dtest="no.ntnu.idata2302.lab01.MinimumTest"

.. solution:: foundations/minimum
   :class: dropdown

   To find the minimum, I would proceed as follows:

   -  Check that the given array is not empty, in which case, the
      minimum makes no sense.

   -  Initialize the minimum with the first value of the given array.

   -  Go through each remaining value, updating the minimum when I find
      one that is smaller than the minimum so far.

   The following code snippet shows how we can implement that in Java.

   .. code-block:: java
      :linenos:
         
       public static int findMinimum (int[] array) {
         if (array.length == 0)
           throw new IllegalArgumentException("There must be at least one item.");

         int minimum = array[0];
         for (int each = 1 ; each < array.length ; each++) {
           if (array[each] < minimum) {
             minimum = array[each];
           }
         }

         return minimum;
       }

.. exercise::
   :label: foundations/triangles

   Write a procedure that draws a triangle with characters, as shown
   below. The procedure accepts its height and a buffer where it can
   append character.

   .. code:: shell

          $ mvn package
          $ java -cp ./target/lab01-0.1-SNAPSHOT.jar \
                 no.ntnu.idata2302.lab01.Triangle \
                 6
               X
              XXX
             XXXXX
            XXXXXXX
           XXXXXXXXX
          XXXXXXXXXXX

   -  Look at the file ``lab01/Triangle.java``

   -  Checkout the documentation of the `StringBuffer
      API <https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuffer.html>`__.

   -  You can test your code manually using the command shown for the
      example above. The last parameter on the command line is the
      height of the triangle.

   -  There are 6 test cases, which you can run from using the command

      .. code:: shell

               $ mvn test -Dtest="no.ntnu.idata2302.lab01.TriangleTest"

.. solution:: foundations/triangle
   :class: toggle

   To write a triangle with a given height, I would proceed line by
   line. First, I would compute the padding, that is the number of white
   spaces I need before the actual triangle starts. The triangle itself
   is made of three parts: the left side ’X’, the central ’X’, the right
   side ’X’ and the new line. Here a possible Java implementation.

   .. code:: java

          public static void createTriangle (int height,
                                             StringBuffer buffer) {
              if (height <= 0) {
                  String message = "Error: Negative height.";
                  throw new IllegalArgumentException(message);
              }
                
              int sideWidth = height-1;
              for (int eachRow=0; eachRow < height ; eachRow++) {
                  int padding = sideWidth - eachRow;
                  for (int i=0 ; i<padding; i++)
                      buffer.append(" ");
                  for(int i=0 ; i<eachRow; i++)
                      buffer.append("X");
                  buffer.append("X");
                  for(int i=0 ; i<eachRow; i++)
                      buffer.append("X");
                  buffer.append("\n");
              }
          }

Random Access Machines
======================

This section illustrates random access machines: The computation model
we will use throughout the course.

.. exercise::
   :label: foundations/ram/jvm

   Consider for example the following Java program, which you can find
   in the file ``Multiplication.java``. It defines two constants
   :math:`x` and :math:`y` and computes their product in the variable
   ``result``.

   .. code:: java

          public class Multiplication {
            
            public static void main(String[] args) {
              final int x = 23;
              final int y = 3;
              int result = 0;
              for (int i=0 ; i<y ; i++) {
                result += x;
              }
            }
              
          }

   Let see what instructions the JVM executes and compare that with the
   RAM assembly we saw in Lecture 1.2. To this end, we will compile our
   code and then “diassemble” it with ``javap``, the Java disassembler.

   #. Compile the class or the whole project using ``mvn package``.

   #. Use ``javap`` to disassemble the class file as follows:

      .. code:: shell

               $ javap -c \
                       --classpath ./target/lab01-0.1-SNAPSHOT.jar \
                       no.ntnu.idata2302.lab01.Multiplication 

   #. Take the time to read about the Java bytecode, for example `on
      Wikipedia <https://en.wikipedia.org/wiki/Java_bytecode>`__.

   #. How does this Java bytecode compare with the RAM assembly? Why?

.. solution:: foundations/ram/jvm
   :class: toggle

   Using ``javap`` on my machine, I obtain the following output (the
   code may vary from one JVM versions to the next).

   .. code:: console

        $ javap -c \
                -classpath ./target/lab01-0.1-SNAPSHOT.jar \
               no.ntnu.idata2302.lab01.Multiplication
        Compiled from "Multiplication.java"
        public class no.ntnu.idata2302.lab01.Multiplication {
          public no.ntnu.idata2302.lab01.Multiplication();
            Code:
               0: aload_0
               1: invokespecial #1            
               4: return

          public static void main(java.lang.String[]);
            Code:
               0: bipush        23
               2: istore_1
               3: iconst_3
               4: istore_2
               5: iconst_0
               6: istore_3
               7: iconst_0
               8: istore        4
              10: iload         4
              12: iconst_3
              13: if_icmpge     25
              16: iinc          3, 23
              19: iinc          4, 1
              22: goto          10
              25: return
          }

   From this small code sample, Obviously, the JVM machine is much more
   complicated than the random access machine we looked at in Lecture
   1.2: It supports constants, procedures, objects, and much more. But
   the principles remain the same. The JVM is a sequential machine that
   stores intructions in memory and process them one after the other.

.. exercise::
   :label: foundations/ram/minimum

   Write a RAM assembly program that computes the minimum between two
   numbers given by the user (i.e., read on the I/O device).

.. solution:: foundations/ram/minimum
   :class: toggle

   The main challenge about this program is to implement a conditional
   statement, that is to jump over some instructions. To do this,
   assembly languages offers “labels”, that give names to specific
   instructions.

   The idea is to read two number from the I/O device, subtract second
   one from the first one. If the result is positive, we print the
   first, otherwise, we print the second.

   .. code:: asm

               .data
               first   1 0
               second  1 0
          
               .code
        main:  READ      first
               READ      second    ; Read two from I/O
               LOAD      0
               ADD       first
               SUBTRACT  second    ; Compare by subtracting
               JUMP      else      ; Jump if negative
               PRINT     first
               LOAD      0         ; Force JUMP
               JUMP      done      ; Always jump (ACC = 0)
        else:  PRINT     second      
        done:  HALT

.. exercise::
   :label: foundations/ram/product

   Write a RAM assembly program that computes the product of two
   positive numbers given by the users (i.e., read on the I/O device).

.. solution:: foundations/ram/product
   :class: toggle

   One possible solution is to implement the product of two number as a
   series of additions such that:

   .. math:: x \times y = \underbrace{x+x+\ldots+x}_{y~times}

   This program basically requires you to write a loop using the RAM
   instructions. We loop :math:`y` times, and each time, we increment
   the product by :math:`x`.

   .. code:: asm

              .data
              x       WORD    0
              y       WORD    0
              product WORD    0
              counter WORD    0

              .code
      main:   READ    x               ;
              READ    y               ;
      loop:   LOAD    0
              ADD     counter
              SUB     y
              JUMP    done            ; while (counter < y)
              LOAD    0               ; do
              ADD     product         ;
              ADD     x               ;
              STORE   product         ;    product <- product + x
              LOAD    1               ;
              ADD     counter         ;
              STORE   counter         ;    counter <- counter + 1
              LOAD    0               ;
              JUMP    loop            ; done
      done:   PRINT   product
              HALT

Correctness
===========

Consider the “auto-completion” problem. You can see auto-completion at
work when you use your favorite IDE and that it suggests possible
endings as soon as you type a few characters. Auto-completion is also
very common on web sites that provide search capabilities. How would you
build that?

In our case, we consider a database of quotes (a single CSV file). The
job is that, given a fragment of text, say “jog”, find all the quotes
that contains that very fragment.

.. exercise::
   :label: foundations/correctness/find-all-quotes

   Write an algorithm to find all the quotes that contains the fragment
   the user has provided.

   #. Download the file ``quotes_1k.csv`` from Blackboard.

   #. Look at the file ``search/MySearch.java``. Propose an algorithm to
      find all the matching string.

   #. There is no test cases associated with this question. You will
      roll your own in the next question.

.. solution:: foundations/correctness/find-all-quotes
   :class: toggle

   My first attempt would be to iterate through each of the entries and
   to collect those that contains the given fragment.

   .. code:: java

          public List<String> run(String givenFragment) {
              var matches = new ArrayList<String>();
              for(var entry: this.entries) {
                  if (entry.contains(givenFragment)) {
                      matches.add(entry);
                  }
              }
              return matches;
          }

.. exercise::
   :label: foundations/correctness/find-all-quotes/test-cases

   Consider testing your algorithm. Which test-cases would you write?
   Why these in particular? How much is enough for you to be confident
   that your implementation is correct?

   #. We will use JUnit4 to simplify testing. Look at the
      `documentation <https://github.com/junit-team/junit4/wiki>`__.

   #. List all the test-cases you would write for the auto-complete
      program in the previous question.

   #. Implement each of these test-cases you have selected.

   #. Why did you choose these test-cases?

.. solution:: foundations/correctness/find-all-quotes/test-cases
   :class: toggle
   
   The test cases I would select include:

   -  Find no match if none exists

   -  Find one match if only one exists

   -  Find many matches if many exists

   -  Throw an error if the given fragment is null or empty
      (pre-condition)

   Here is an example of the test case when there is no match.

   .. code:: java

          @Test
          public void findNothingWhenNoMatchExists() {
              List<String> corpus = Arrays.asList(new String[]{
                      "AABBCC",
                      "AABB",
                      "BBCC"
                  });
              MySearch sut = new MySearch(corpus);

              List<String> result = sut.run("ZZ");

              assertTrue(result.isEmpty());
          }

.. exercise::
   :label: foundations/correctness/find-all-match/proof

   *Prove* that your algorithm is correct.

   #. Draw the flowchart of your algorithm.

   #. Formalize what you are trying to prove: The post-condition.

   #. Formalize the initial conditions: The pre-condition.

   #. Try to connect the two. How can you deduce the post-condition from
      the pre-condition?

.. solution:: foundations/correctness/find-all-match/proof
   :class: toggle

   The algorithm iterates over the entries and checks each of them. Here
   I assume that procedures from the Java API are correct (I only
   concerned about my own code/algorithm).

   The prediction is that we are given a fragment of text. The post
   condition is that we return all and only the entries that contains
   this fragment.

   To connect these two statements, we first need to identify the *loop
   invariant*: A condition that is true before, after, and during the
   loop. I suggest to use the fact that the set of matches contains all
   and only these entry that matches, *so far*. We use a *proof by
   induction* to show it always holds.

   At first the invariant holds because the set of matches is empty, and
   we have not yet processed any entries.

   Now, let us assume that our invariant holds up to the i-th entry. We
   pick the entry :math:`i+1` and we have two cases. Either the entry
   contains the fragment in which case we add it to the match, and the
   invariant holds ; or we skip it, and our invariant still holds: the
   set ``matches`` still contains only these entry that matches so far.

   The induction rule tells us that, because our invariant holds at
   first, and then for any following situation, it always holds. So we
   can conclude that after the loop, we have processed all the entries
   and that the ``macthes`` variable contains all and only those entries
   that do match.

Cost Models
===========

Consider the following algorithm, which computes the factorial of a
number: :math:`n! = 1 \times 2 \times 3 \times \ldots \times n`.

.. code:: java

     public int factorial(int n) {
       int result = 1
       int each = 1;
       while (each <= n) {
         result = result * each;
         each = each + 1;
       }
       return result;
     }

.. exercise::
   :label: foundations/efficiency/factorial

   Let us assume a cost model where all operations (assignments,
   arithmetic and logic) all cost 1 unit of time. Find the time
   efficiency, that is the function :math:`time(n)` that captures the
   relationship between the size of the given array and the time needed
   for the computation.

.. solution:: foundations/efficiency/factorial

   My approach is to simply count the instructions executed using a
   frequency table, which gives me :math:`time(n) = 5n+3`.


   =========================== ==== =========== ============
   Algorithm                   Cost Runs        Total
   =========================== ==== =========== ============
   ``int result = 1``          1    1           1
   ``int each = 1``            1    1           1
   ``while (each <= n) {``     1    :math:`n+1` :math:`n+1`
   ``result = result * each;`` 2    :math:`n`   :math:`2n`
   ``each = each + 1;``        2    :math:`n`   :math:`2n`
   ``return result;``          0    1           0
   \                                            
   Total Runtime:                               :math:`5n+3`
   =========================== ==== =========== ============

.. exercise::
   :label: foundations/efficiency/factorial

   What is the associated order of growth? How would you prove it?

.. solution:: foundations/efficiency/factorial
   :class: toggle

   Intuitively, this ``factorial`` procedure is of linear order (i.e.,
   :math:`\Theta(n)`). Let see how one could prove that:

   To this end, I would return to the definitions, and prove that our
   function is both bounded above and below by a linear function.

   Let shows our function :math:`f \in O(n)`. We have to find two
   constants :math:`c` and :math:`n_0`, such that
   :math:`f(n) \leq c \cdot n` for all :math:`n` above :math:`n_0`.
   Looking at the expression :math:`f(n) = 5n+3`, I would start with
   :math:`c=6` as a first guess. That gives us:

   .. math::

      \begin{aligned}
          f(n) \leq & c \cdot n \\
          5n + 3  \leq & 6n \\
               3  \leq & n
        
      \end{aligned}

   That holds! And we get the :math:`n_0` value: :math:`n_0 = 3`.

   I proceed the same way for the lower bound in order to show that
   :math:`f \in \Omega(n)`, and get :math:`c = 4` and :math:`n_0=3`.

   I can thus conclude that our factorial procedure is of linear order
   (i.e., :math:`\Theta(n)`).

.. exercise::
   :label: foundations/efficiency/factorial/cost

   Let us consider a different cost model, where a multiplication
   :math:`a \times b` takes :math:`b` unit of times. What is the time
   efficiency of this algorithm?

.. solution:: foundations/efficiency/factorial/cost
   :class: toggle
              
   Here, we cannot fill a table as we did previously. The challenge is
   the cost of Line 5, which contains a product. This cost changes every
   time the instruction runs, because the value of ``each`` changes as
   well. We know from the question that the cost is a function
   :math:`time_\times(b) = b`. At each iteration, the :math:`b` argument
   takes the value of the variable ``each``, that is, values ranging
   from :math:`[1, n]`. That gives a total cost for Line 5 of:

   .. math::

      \begin{aligned}
          time_{L5}(n) = & \sum_{i=1}^{n} time_{\times}(i) \\
                      = & \sum_{i=1}^{n} i \\
                      = & \frac{n(n+1)}{2}
        
      \end{aligned}

   And a grand total for the ``factorial`` procedure of:

   .. math::

      \begin{aligned}
          time(n) = & 1 + 1 + (n + 1) + \frac{n(n+1)}{2} + 2n \\
                  = & 3n + \frac{n(n+1)}{2} + 3 \\
                  = & \frac{6n + (n^2 + n) + 6}{2} \\
                  = & \frac{n^2 + 7n + 6}{2}
        
      \end{aligned}

.. exercise::
   :label: foundations/efficiency/factorial/cost2

   What is the associated order of growth, with this alternative cost
   model? What does that tell us.

.. solution:: foundations/efficiency/factorial/cost2

   Without going into a formal proof, we can see that our alternative
   cost model yields a completely different order of growth: Our
   algorithm has become quadratic (i.e., :math:`\Theta(n^2)`).

   This shows the tight coupling between an algorithm and the underlying
   machine. When we study a new algorithm and are given some measure of
   efficiency, it is important to reflect about what machine was assumed
   to obtain such measures.

Efficiency
==========

We practice here measuring the efficiency of algorithms on the following
problem. Given a natural number :math:`n`, we want an algorithm that
lists all the pairs of natural numbers :math:`\{x,y\}` whose sum is
:math:`n`. For example, if :math:`n=4`, then pairs are
:math:`\{0, 4\}, \{1, 3\}, \{2, 2\}`. Note that *pairs* are not ordered,
so :math:`\{x,y\} = \{y,x\}`.

.. exercise::
   :label: foundations/efficiency/pairs

   Design an algorithm that finds all such pairs. The point is not to
   find the perfect algorithm, just a working solution. We will try to
   improve it in the following questions.

   #. Sketch your solution using some pseudo code

   #. Argue for the correctness. What make you think that it will not
      miss any pair? That it will not output twice the same pair?

.. solution:: foundations/efficiency/pairs
   :class: toggle
              
   My first idea would be to search through all the possible pairs and
   print those that fit. I come up with something like:

   .. math::
      x \gets 0

   My intuition is that given a value for :math:`x`, say 4, the inner
   loop searches through all the pairs where :math:`y` is greater than
   4. This does not miss any pair because pairs where :math:`y` is
   smaller than :math:`x` have necessarily been printed during previous
   iterations of the outer loop. For instance if :math:`n=10` and
   :math:`x=6`, the pair :math:`\{6, 4\}` will have been listed when
   :math:`x=4`.

.. exercise::
   :label: foundations/efficiency/pairs

   Implement your algorithm in Java. I provide a ``Pair`` class which
   can hold two values. You program should return a list of pairs.

   #. Look at the file ``Pair.java``.

   #. There are a few test cases, which you can run from using the
      command

      .. code:: shell

         $ mvn test -Dtest="no.ntnu.idata2302.lab01.PairTest"

   #. Did any test case failed? Where did you get it wrong?

.. solution:: foundations/efficiency/pairs
   :class: toggle
              
   Here is my implementation of the algorithm shown above. I add pairs
   to the given list instead of printing thing out.

   .. code:: java

      public static List<Pair> findAllPairs(int n) {
         if (n < 0)
             throw new IllegalArgumentException("n must be positive!");
         var pairs = new ArrayList<Pair>();
         int x = 0;
         while (x <= n) {
             int y = x;
             while (y <= n) {
                 if (x + y == n) {
                     pairs.add(new Pair(x,y));
                 }
                 y++;
             }
             x++;
         }
         return pairs;
     }

.. exercise::
   :label: foundations/efficiency/parameter

   Let us assume that :math:`n=4`. How many instructions would the
   computation take? We account only for assignments, arithmetic
   operations, and logic operations.

.. solution:: foundations/efficiency/parameter
   :class: toggle
        
   Let us see what happens when we run this algorithm for :math:`n=4`. I
   list below the pairs tested for each value that :math:`x` takes
   during this computation. I underline the pairs that match.

   -  :math:`x=0`: :math:`\{0, 0\}`, :math:`\{0, 1\}`, :math:`\{0, 2\}`,
      :math:`\{0, 3\}`, *:math:`\{0, 4\}`*

   -  :math:`x=1`: :math:`\{1, 1\}`, :math:`\{1, 2\}`,
      *:math:`\{1, 3\}`*, :math:`\{1, 4\}`

   -  :math:`x=2`: *:math:`\{2, 2\}`*, :math:`\{2, 3\}`,
      :math:`\{2, 4\}`

   -  :math:`x=3`: :math:`\{3, 3\}`, :math:`\{3, 4\}`

   -  :math:`x=4`: :math:`\{4, 4\}`

   Creating a line in the above representation cost 3, whereas each pair
   cost 6. That gives us a total of
   :math:`15 \times 6 + 4 \times 3 = 102`.

.. exercise:: foundations/efficiency/model

   Generalize a model of the time-efficiency of your algorithm.

   #. Try filling in a frequency table, as we did in the lectures.

   #. If your algorithm contains nested loops, you may want to address
      each loop separately, starting from the inner ones.

.. solution:: foundations/efficiency/model
   :class: toggle
              
   To create an efficiency model of this algorithm I would start by
   looking at the body of the outer loop in isolation.

   +-----------------------------------------+------+---------------+-----------------+
   | Algorithm                               | Cost | Runs          | Total           |
   +=========================================+======+===============+=================+
   | :math:`y \gets x`                       | 1    | 1             | 1               |
   +-----------------------------------------+------+---------------+-----------------+
   | :math:`\mathbf{while}\; y \leq n`       | 1    | :math:`n-x+2` | :math:`n-x+2`   |
   +-----------------------------------------+------+---------------+-----------------+
   | :math:`~~~\mathbf{if}\; x + y = n`      | 2    | :math:`n-x+1` | :math:`2n-2x+2` |
   +-----------------------------------------+------+---------------+-----------------+
   | :math:`~~~~~~\mathbf{print}\; \{x, y\}` | 0    | –             | 0               |
   +-----------------------------------------+------+---------------+-----------------+
   | :math:`~~~y \gets y + 1`                | 2    | :math:`n-x+1` | :math:`2n-2x+2` |
   +-----------------------------------------+------+---------------+-----------------+
   | :math:`x \gets x + 1`                   | 2    | 1             | 2               |
   +-----------------------------------------+------+---------------+-----------------+
   |                                         |      |               |                 |
   +-----------------------------------------+------+---------------+-----------------+
   | Total Runtime:                          |      |               | :math:`5n-5x+9` |
   +-----------------------------------------+------+---------------+-----------------+

   Now, we know express the time taken by main body of the outer loop
   as:

   .. math::

      \begin{aligned}
          \mathit{time}´(x, n) =               & 5n-5x+9
        
      \end{aligned}

   We can now do the count the main program as follows:

   .. math::
      
       \mathit{time}(n) & = 1 + (n+2) + \sum_{x=0}^{n} \mathit{time}'(x, n) \\
                        & = 1 + (n+2) + \sum_{x=0}^{n} (5n-5x+9) \\ 
                        & = 1 + (n+2) + \sum_{x=0}^{n} 5n - \sum_{x=0}^{n} 5x + \sum_{x=0}^{n} 9 \\
                        & = 1 + (n+2) + 5n (n+1) - 5 \sum_{x=0}^{n} x + 9 (n+1) \\
                        & = 1 + (n+2) + 5n (n+1) - 5 \frac{n(n+1)}{2} + 9 (n+1) \\
                        & = 1 + n + 2 + 5n^2 + 5n - 5 \frac{n(n+1)}{2} + 9n + 9 \\
                        & = 5n^2 - 5 \frac{n(n+1)}{2} + 15n + 12 \\
                        & = \frac{10n^2 - 5n^2 - 5n + 30n + 24}{2} \\
                        & = \frac{5n^2 + 25n + 24}{2} \\
        

   We can check that :math:`time(4) = 102`, as we anticipated.


.. exercise::
   :label: foundations/efficiency/last

   What order of growth best characterizes the time-efficiency of your
   solution? If your algorithm is not of linear order, do you see a way
   to improve?

.. solution:: :numref:`foundations/efficiency/last`
   :class: toggle

   Intuitively, we see that this solution runs in quadratic time (i.e.,
   :math:`\Theta(n^2)`). However, looking at the behavior of this
   algorithm, I realize that there is only one valid pair for each value
   of :math:`x`, which is :math:`\{x, n-x\}`. Such pairs exists only if
   :math:`x \leq \frac{n}{2}`. That gives us a faster “linear” algorithm
   as follows:

   .. container:: algorithm

      :math:`x \gets 0`

.. _`sec:setup`:



