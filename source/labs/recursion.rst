=========
Recursion
=========

:Module: Recursion
:Git Repository: `Lab 03---Recursions <https://github.com/fchauvel/aldast-lab03>`_
:Objectives:
   - Play with the concept of recursion
   - Implement a linked list in Java


Simple Recursions
=================

We start this lab session with a few small recursive algorithms. Each of
them can be written either using iteration of recursion, but we focus
here on recursive solutions.

.. exercise::
   :label: lab/recursion/power
   :nonumber:

   Write a program that raises a given value :math:`v` to a given
   positive exponent :math:`e`. Formally, the task is to write a
   function :math:`\mathit{power}(v, e) = v^e`.

   #. Identify the base and the recursive cases.

   #. Look at the file ``WarmUp.java``, and complete the method named
      ``power``, using recursion.

   #. You can use the ``PowerTest.java`` to test your solution.

.. solution:: lab/recursion/power
   :class: dropdown

   We can define the power function as the following recurrence:

   .. math::

      \mathit{power}(v, e) = \begin{cases}
            1 & \textrm{if } e = 0 \\
            v * \mathit{power}(v, e-1) & \textrm{otherwise}
      \end{cases}

   We can convert this recurrence as a Java program, as is:

   .. code:: java

          public static int power(int value, int exponent) {
            if (exponent < 0)
               throw new IllegalArgumentException("Negative exponent!");
            if (exponent == 0) return 1;
            return value * power(value, exponent-1);
          }

.. exercise::
   :label: lab/recursion/sum-array
   :nonumber:

   Write a program that sums up all the values contained in the given
   array. Use recursion.

   #. Identify the base and the recursive cases.

   #. Look at the file ``WarmUp.java``, and complete the method named
      ``sum``, using recursion.

   #. You can use the ``ArraySumTest.java`` to test your solution.

.. solution:: lab/recursion/sum-array
   :class: dropdown

   To use recursion, I define the sum of the element of the array as
   being the value in the first cell, to which I add the sum of the
   remainder of the array. I implement this recursion in a separate
   method as follows:

   .. code:: java

          public static int sum(int[] array) {
            if (array == null)
               throw new IllegalArgumentException("Cannot sum an null!");
            return doSum(array, 0);
          }

          private static int doSum(int[] array, int start) {
            if (start >= array.length) {
              return 0;
            }
            return array[start] + doSum(array, start+1);
          }

.. exercise::
   :label: labs/recursion/palindromes
   :nonumber:

   We now turn to palindromes, that is, words that are symmetrical such
   as “kayak”, “madam” or “level”. Write a recursive procedure that
   checks if a given word is indeed a palindrome.

   #. Identify the base and the recursive cases.

   #. Look at the file ``WarmUp.java``, and complete the method named
      ``isPalindrome``, using recursion.

   #. You can use the ``PalindromeTest.java`` to test your solution.

.. solution:: labs/recursion/palindromes
   :class: dropdown
   
   To check if a word is a palindrome, we check if its first character
   matches its last one. If that holds, we recurse and go check the
   remaining characters, that is, the original word minus the first and
   last characters. This gives us the following recursive procedure:

   .. code:: java

          public static boolean isPalindrome(String text) {
            return checkFrom(text, 0);
          }
          
          private static boolean checkFrom(String text, int index) {
            if (index >= text.length() / 2) return true;
            return text.charAt(index) == text.charAt(text.length()-index-1)
                   && checkPalindromeFrom(text, index+1);
          }

.. exercise::
   :label: labs/recursion/base-conversion
   :nonumber:

   Write a recursive procedure that converts a given number into a
   different base. The base of a number denotes the number of symbols
   used. For instance, in base 2, we only use two symbols
   :math:`\{0,1\}`, and for instance 10 (in base 10) is written ’1010’.
   Similarly, 5 in base 10 becomes ’12’ in base 3. We can verify that
   :math:`(1 \times 3^1) + (2 \times 3^0) = 5`.

   #. Identify the base and the recursive cases.

   #. Look at the file ``WarmUp.java``, and complete the method named
      ``toBase``, using recursion.

   #. You can use the ``BaseConversionTest.java`` to test your solution.

.. solution:: labs/recursion/base-conversion
   :class: dropdown
   
   One way to convert a given number into another base is to identify
   the first digit (the rightmost one) by dividing it by the desired
   base. This gives us a quotient and a remainder. We can map the
   remainder to a symbol using a static array, which we append to the
   quotient converted to the same base. That gives us the following Java
   program:

   .. code:: java

          public static String toBase(int number, int base) {
            if (number < base)
               return SYMBOLS[number];
            return toBase(number/base, base) + SYMBOLS[number%base];
          }

Linked Lists
============

We continue by implementing the sequence ADT as a singly linked
list. We implemented the same sequence ADT using arrays in
:doc:`Lecture 2.2 <sequences/arrays>`.

.. code:: java

   public abstract class Sequence<T> {
       int length();
       T get(int index) throws InvalidIndex;
       void set(int index, T item) throws InvalidIndex;
       void insert(int index, T item) throws InvalidIndex;
       void remove(int index) throws InvalidIndex;
       int search(T item);
       boolean isEmpty();
   }

In this lab session, we will contrast two implementations: One using
iteration, and one using recursion.

Using Iteration
---------------

We start with the iterative implementation, which is often more
“natural”. Figure `1 <#fig:iterative>`__ shows one way to implement the
``Sequence``. The ``IterativeList`` class may contain a ``Node``, which,
in turn, may refer to another ``Node``, and so on and so forth. The list
is thus formed by “linked” nodes. You will find this design in
``IterativeList.java``.

.. container:: float
   :name: fig:iterative

   .. container:: center

      |image1|

.. exercise::
   :label: labs/recursion/linked-list/insert
   :nonumber:

   Implement the insert method using a loop. As we saw during the
   lectures, you will the ``getNode`` method, that finds the i\
   :sup:`th` node.

   #. Implement the ``getNode`` method.

   #. Implement the ``insert`` method.

   #. The test cases from ``IterativeListTest.java`` can help you find
      issues in your algorithm.

.. solution:: labs/recursion/linked-list/insert
   :class: dropdown

   To insert at a given position I distinguish between two cases:
   Insertion in front, and insertion further into the list. To insert in
   front, I first create an initial node and set the ``head`` field with
   it. To insert further, I have to first find the node that precedes
   the insertion point, create a new node that contains the given item,
   attach it to the next node, and set the next of previous node with my
   new node. The code below summarizes this approach:

   .. code:: java

          @Override
          public void insert(int index, T item) throws InvalidIndex {
            if (index == 1) {
              head = new INode(item, head);

            } else {
              var previous = getNode(index-1);
              previous.next = new INode(item, previous.next);
              
            }
          }

          private INode<T> getNode(int index) throws InvalidIndex {
            if (index < 1) throw new InvalidIndex(index);
            int counter = 0;
            var currentNode = head;
            while (currentNode != null) {
              counter++;
              if (counter == index) return currentNode;
              currentNode = currentNode.next;
            }
            throw new InvalidIndex(index);
          }

.. exercise::
   :label: labs/recursion/insertion/runtime
   :nonumber:

   In the worst case, how many comparisons does your algorithm requires?
   What is the order of growth? Argue.

   #. What is the worst case scenario for the insertion?

   #. How many comparisons take place in the worst case (a frequency
      table may help you).

   #. Argue for an order of growth

.. solution:: labs/recursion/insertion/runtime
   :class: dropdown

   To insert we need to traverse the list up to the insertion point.
   This is the main body of work, and the problem size is therefore the
   length of the given list (denoted by :math:`\ell`).

   In the worst case, we are inserting at the very end of the list, and
   in this case the work is maximum, because we have to traverse the
   whole list.

   To count the comparisons (see
   Question `[Q:iterative-insert] <#Q:iterative-insert>`__), we have to
   count the number of comparisons that take place when we invoke the
   ``getNode`` method. This operation contains a loop, which contains a
   conditional. The loop condition is evaluated :math:`\ell+1` times,
   and the inner conditional, :math:`\ell` times. That gives us a total
   of :math:`2\ell+1`. My ``insert`` method makes one comparison before
   it invokes the ``getNode`` method, so that gives us a total of
   :math:`2\ell+2` comparisons, in the worst case.

   Without detailing the proof, we see that this worst case is linear.

.. exercise::
   :label: labs/recursion/insertion/memory
   :nonumber:
      
   In the worst case, how much memory does your solution requires?

.. solution:: labs/recursion/insertion/memory
   :class: dropdown

   Estimating the memory (i.e., the space) requires counting the
   variables created by the algorithm. As we did while counting
   comparisons, we have to also look at the ``getNode`` method, since it
   does most of the “heavy lifting” here.

   The method ``getNode`` creates two variables in all cases. For the
   ``insert`` method, we have to understand both cases to see which one
   is the worst. If we insert in front, we have to allocate a new
   ``Node`` object, which has two fields, so that is, two pieces of
   memory. Otherwise, to insert further in the list we still have to
   allocate a node, but we also need to invoke the ``getMethod`` that
   declares two variables. That is 4 cells in total.

   Overall, we see that this is constant, because it does not depends on
   the problem size, which is the length of the list.

Using Recursion
---------------

.. caution:: Available as soon as possible   
   
.. dede


   We now turn towards a recursive implementation of the linked list. The
   class ``INode`` we used for our iterative implementation is a recursive
   type: It references itself. In this section, we explore an alternative
   design that makes the most of this inherent recursive structure. As
   shown in Figure `2 <#fig:recursive>`__, we created two classes. The
   class ``RNode`` represents a item followed by a list, whereas the class
   ``Empty`` represents the empty list. Both implements the
   ``List`` interface. A list is thus either a node followed by another
   list, or an empty list. You will find this design in the file
   ``RecursiveList.java``

   .. container:: float
      :name: fig:recursive

      .. container:: center

         |image2|

   Consider for example the ``length()`` method, whose code appears below.
   Recursively, the length of a list is one for the first element, plus the
   length of the rest. The ``Empty`` class only handles the *base case*
   when the list is empty. The class ``Node`` implements the *recursive
   case*. None of them uses loops and both are short statements. This is
   typical from recursive algorithms.

   .. code:: java

        class RNode<T> implements List<T> {

          @Override
          public int length() {
             return 1 + next.length();
          }

        }

        class Empty<T> {

          @Override
          public int length () { return 0; }

        }

   .. exercise::
      :label: labs/recursion/linked-list/recursive/insert
      :nonumber:

      By taking inspiration on the length method, implement the ``insert``
      operation in a recursive manner. Here are some steps to guide you.

      #. Can you identify self-similar sub problems. The structure of the
         linked list may help you.

      #. What are the base cases?

      #. What are the recursive cases?

   .. solution::
      :class: dropdown

      As a recursive data type, a linked list is either an empty list, or
      an item followed by another list. To insert in a list, we either have
      to modify the first element or insert into the “rest”, which is
      another list, but shorter. I see the following cases:

      #. The given index is smaller than 1, so we raise an error

      #. The given index is 1, we create a new node, with the given item
         and the current list as next.

      #. When the index is greater than one, there are two alternatives:

         #. The list is empty, so we raise an error.

         #. The list is a node and we delegate the insertion to the next
            list, but with a smaller index. This is the recursive case.

      The recursive case occurs when the list is not empty and the given
      index is greater than one. In that case, we delegate the insertion to
      the next list, but we decrease the index.

      The following piece of code gives illustrates this idea:

      .. code:: java

             public class Node<T> implements List<T> {

               @Override
               public List<T> insert(int index, T item) throws InvalidIndex {
                 if (index < 1) throw new InvalidIndex(index);
                 if (index == 1) return new Node(item, this);
                 next = next.insert(index-1, item);
                 return this;
               }

             }

             class Empty<T> implements List<T> {

               @Override
               public List<T> insert (int index, T item) throws InvalidIndex {
                 if (index == 1) return new Node(item, this);
                 throw new InvalidIndex(index);
               }

             }


   .. exercise::
      :label: labs/recursion/linked-list/recursive/comparisons
      :nonumber:

      In worst case, how many comparisons will your recursive insertion
      takes?

      #. Try to abstract the algorithm (for example in pseudo code) from
         the Java code.

      #. Write down the number of comparisons as a recurrence relation.

      #. Solve this recurrence.

   .. solution:: labs/recursion/linked-list/recursive/comparisons
      :class: dropdown

      One challenge when working with actual source code, is that the
      algorithm is obscured by the technicalities. Here, the use of
      inheritance spread our algorithm over two methods.
      Figure `[alg:insert] <#alg:insert>`__ shows the general principle.

      We can thus count the comparisons, and formalize the number of
      comparison for a sequence of length :math:`n` by a recurrence
      :math:`F(n,i)` as follows:

      .. math::

         F(n, i) = \begin{cases}
               1 & \textrm{if } i < 1 \\
               2 & \textrm{if } i = 1 \\
               3 & \textrm{if } n = 0 \\
               3 + F(n-1, i-1) & \textrm{otherwise}
               \end{cases}

      In our case, we are looking at the worst case, which is the last one,
      that is, when we insert at the end of the list. In that case, we know
      that :math:`i = n+1`.

      A simple strategy to solve such recurrences is to expand a few
      examples. Consider for instance :math:`n = 6`.

      .. math::

               F(6, 7) & = 3 + F(5, 6) \\
                       & = 3 + 3 + F(4, 5) \\
                       & = 3 + 3 + 3 + F(3, 4) \\
                       & = \underbrace{3 + 3 + \ldots + 3}_{\textrm{6 times}} + F(0, 1) \\
                       & = 3\times 6 + 2;

      We can see the general pattern is :math:`F(n,n+1)= 3n + 2`.

   .. exercise::
      :label: labs/recursion/list/recursive/insert/memory
      :nonumber:

      In the worst case, how much memory will it takes? Remember to account
      for the call stack.

   .. solution:: labs/recursion/list/recursive/insert/memory
      :class: dropdown

      Just as we did for counting comparisons, we have to count the pieces
      of memory that are allocated. That gives us the following recurrence
      relationship:

      .. math::

         S(n, i) = \begin{cases}
               3 & \textrm{if } i > 1 \land n > 0 \\
               0 & \textrm{otherwise}
             \end{cases}

      By solving this recurrence, we obtain :math:`S(n, i) = 3n;`, which is
      linear. By contrast with the iterative approach, a recursive
      algorithm consumes memory on each call.

   Benchmark
   =========

   Let see now is theory matches practice. To get some concrete evidence,
   we will try to insert items in both an ``IterativeList`` and in a
   ``RecursiveList``. Take a look at the file ``Benchmark.java``, which
   implements the above scenario.

   .. exercise::
      :label: labs/recursion/benchmark/run
      :nonumber:

      Run the benchmark on your machine. What result do you get. To run the
      benchmark, you can use the command:

      .. code:: shell

             $ java -cp target/lab03-0.1-SNAPSHOT.jar \
                        no.ntnu.idata2302.lab03.Benchmark 

   .. solution:: labs/recursion/benchmark/run
      :class: dropdown

      On my machine, I obtain the following:

      .. code:: shell

             $ java -cp target/lab03-0.1-SNAPSHOT.jar \
                        no.ntnu.idata2302.lab03.Benchmark
             Iterative List: 100000 item(s) inserted. 
             Recursive List: 23723 item(s) inserted. (error)

   .. exercise::
      :label: labs/recursion/benchmark/why
      :nonumber:

      Why do you think happen to ``RecursiveList``? Why is it
      underperforming?

   .. solution:: labs/recursion/benchmark/why
      :class: dropdown

      Most languages and OS limit the size of the call stack, so that it
      cannot grow indefinitely. Looking at the code of the benchmark, we
      are actually catching a ``StackOverflowError`` which, in Java,
      indicates that the program has used all the memory allowed for the
      call stack. That is often the main problem of recursive algorithms:
      They consume more memory. We will see further in the course, method
      to avoid that in some cases.

   .. |image1| image:: images/iterative.pdf
      :width: 65.0%
   .. |image2| image:: images/recursive.pdf
      :width: 75.0%
