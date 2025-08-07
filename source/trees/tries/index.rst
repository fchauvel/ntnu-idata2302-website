=======================
Prefix and Suffix Trees
=======================

:Lecture: Lecture 5.6 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/EVJ8rMN7JHdKgxTb2gWmKEwBwvMNLvO0i0k-495CCmBlJw?e=70ie5r>`
:Objectives: Understand what is a prefix and what is a suffix tree
:Concepts: Insertion, deletion and search into a Prefix-tree


.. margin::

   .. figure:: _static/images/completion.png
      :name: trees/tries/completion

      Auto-completion in a text editor based on the words already typed
      in.
           
As a last example of tree data structures, we shall look at *prefix*
and *suffix* trees. These are data structures used to speed up text
search. especially full-text search and auto completion in text
editors.

- *Auto-completion* means that editor suggests possible endings for what
  you have started to type. For instance,
  :numref:`trees/tries/completion` shows an example of "default
  completion", where the editor make suggestions based on words
  already in the document.

- *Full-text search*, is what happen for instance when you press
  ``Ctrl-F``, which prompt you for a some text, and highlights all the
  occurrences in the page. This is often available in text editors,
  web browser, or IDEs.

.. admonition:: Prefixes vs. Suffixes
   :class: note

   What are prefixes and suffixes?  Intuitively, we can say the are
   just "beginning" and "ending" of sequences. More formally, given a
   sequence of characters :math:`s = (c_1, c_2, \dots, c_n)` any
   shorted sequence :math:`s' = (c_1, \dots, c_k)` where :math:`0 \leq
   k \leq n` is a prefix of :math:`S`. For instance, the word
   "algorithm" has the following prefixes (ordered by length):

   .. math::
      P = \{ '',\, 'a',\, 'al',\, 'alg',\, 'algo',\, 'algor',\, 'algori',\,
      'algorit',\, 'algorith',\, 'algorithm' \}

   Note that the set of prefixes includes the empty sequence and the
   complete word itself. Formally, we denote that fact that a word
   :math:`w` admits a prefix :math:`p` by :math:`p \preceq w`.

   Similarly, suffixes are possible endings. Formally, and sequence
   :math:`s' = (c_k, \dots, c_n)` is a suffix of :math:`s`. The word
   algorithm therefore admits the following suffixes:

   .. math::
      S = \{ '',\, 'm',\, 'hm',\, 'thm',\, 'ithm',\, 'rithm',\,
      'orithm',\, 'gorithm',\, 'lgorithm', \, 'algorithm' \}
   
   

Prefix Trees
============

How can we implement such auto-completion mechanisms efficiently? What
we need is kind of :doc:`Map ADT </hashing/index>` that could give us
all the word that starts by the "prefix2 the user has typed. For
instance, given a set of words already typed, one could index them by
prefix, using a hash table.

.. seealso::

   📖 Goodrich, M. T., Tamassia, R., & Goldwasser, M. H. (2014). Data
   structures and algorithms in Java. John Wiley & Sons. Chap. 13

The conventional solution is to use a **prefix tree**, also known as
*trie*. A prefix tree is not an ADT per se, but it extends the Set ADT
and generally exposes the following operations:

.. module:: tries

.. function:: contains(t: Trie, w: Word) -> Boolean

   Check whether the prefix tree :math:`t` contains the given word
   :math:`w`.

.. function:: prefix_search(t: Trie, p: Word) -> Set[Word]

   Returns the subset :math:`S` of all the words from :math:`t` that
   starts with the given prefix :math:`p`.

   Pre-conditions:
    - None

   Post-conditions:
    - (A1) :math:`S` is the very subset of words from the prefix tree
      that start with the given prefix :math:`p`. No other words in
      the tree starts with :math:`p` and S does not contain any other
      word than those from the tree.
         
      .. math::

         S = \mathit{prefix\_search}(t, p) \implies S = \{ w \in \mathcal{A}^* \:|\: contains(t, w) \land p \preceq w \}


.. function:: add(t: Trie, w: Word) -> Trie

   Add a new word in the prefix tree :math:`t`.

   Pre-conditions:
    - None

   Post-conditions:
    - (A2) The word is :math:`w` is necessary in the resulting prefix
      tree, that is:

      .. math::
         t' = add(t, w) \Longleftrightarrow contains(t', w)

.. function:: remove(t: Trie, w: word) -> Trie

   Remove the given word :math:`w` from the the prefix tree :math:`t`.

   Pre-conditions:
    - None

   Post-conditions:
    - (A3) The word that is removed is not anymore in the result
      prefix tree, that is:

      .. math::

         t' = remove(t, w) \Longleftrightarrow \neg \, contains(t', w)

   
Basic Structure
---------------

A prefix tree, is an :math:`n`-ary tree meant to contains a set of
words. Every node in the tree contains a symbol from the alphabet of
these words. The root contains a special symbol :math:`\varepsilon`,
which represents the empty symbol. The leaves carries another special
symbol, :math:`\bot`, which denotes the end of a word. This way every
path from the root to a leaf node represents a word starting from
:math:`\varepsilon` and ending with :math:`\bot`.

:numref:`trees/tries/prefix_tree` shows a prefix tree built over the
words: 'apart', 'apartment', 'ape', 'apear', 'apple', 'apply',
'apricot', 'april'.
      
.. figure:: _static/images/prefix_tree.svg
   :name: trees/tries/prefix_tree

   A prefix tree built on the set of eight words :math:`S = \{'apart',
   'apartment', 'ape', \, 'apear',\, 'apple', 'apply',\, 'apricot',\,
   'april' \}`
      


Each leaf is annotated with the word that can be read following the
path from the root to that leaf. Similarly, the path that leads to an
internal node represent a *prefix* and its descend leaves are all the
words that start with that prefix.

In a sense, a node somehow represents the characters that have been
typed so far by the user. On the root for instance, the user hasn't
typed anything yet and all the words are possible. As we move down
along a specific path, we start narrowing down the set of possible
worda. In :numref:`trees/tries/prefix_tree`, in Node 2, we know the
user has typed an "a", in Node 3, we know the suer has typed the
prefix "ap", in Node 4, the prefix "app", and so on and so forth.

.. admonition:: Why Use Special Characters?
   :class: note

   The special characters :math:`\varepsilon` and :math:`\bot` allow
   handling words that are also a prefix of another longer word, such
   as 'apart' which is a prefix of 'apartment'. Without the special
   :math:`\bot` character, we would have no way to know that apart is
   also a valid word in the set.

.. admonition:: Implementation in Scala
   :class: hint, dropdown

   Let see how we could implement this. Prefix tree is a data
   structure where recursion makes things easier.

   First we need to define the "facade" of our `PrefixTree` as
   follows. Here we are just declaring the operation we have listed in
   our ADT. I added an operation ``size`` for convenience: The size is
   simply the number of words that the prefix tree contains. We will
   see later how to implement these operations.

   .. code-block:: scala

      class PrefixTree:

        def add(word: String): Unit =
          throw new Error("Not implemented")

        def contains(word: String): Boolean =
          throw new Error("Not implemented")

        def prefixSearch(prefix: String): Set[String] =
          throw new Error("Not implemented")

        def remove(word: String): Unit =
          throw new Error("Not implemented")

        def words: Set[String] =
          throw new Error("Not implemented")

        def size: Int = words.size

   Now we define some more classes to represent the nodes of our
   prefix tree. I choose to use two separate classes for leaves and
   branches as follows.

   First I defined the interface for an node in general, regardless
   whether it is a leaf or a branch. Node simply expose the same
   operations as our ADT. I then add two subclasses that implements
   the leaves, and branches, respectively.

   .. code-block:: scala

      abstract class Node(val symbol: Char):

        def contains(word: String): Boolean

        def add(word: String): Node

        def words: Set[String]

        def prefixSearch(prefix: String): Set[String]

        def remove(word: String): Option[Node]

      class Leaf(symbol: Char) extends Node(symbol)

      class Branch(symbol: Char, children: Map[Char, Node]) extends Node(symbol)
        
   
Compressed Prefix Tree
----------------------

This default tree structure is not really efficient, because it
consumes a lot memory: There are many nodes that have only one
child. To reduce the memory overhead, prefix trees are compressed as
follows.

We place more than one symbol in each node, and merge those nodes
that have only one child,
consequently. :numref:`trees/tries/compressed` shows the compressed
version of the prefix tree initially shown on
:numref:`trees/tries/prefix_tree`. Now, all nodes but the leaves have
two or more children.

.. figure:: _static/images/compressed.svg
   :name: trees/tries/compressed

   A compressed prefix tree, equivalent to the one shown on
   :numref:`trees/tries/prefix_tree`



Membership
----------

To check whether a given word :math:`w=(c_1,\dots,c_k)` exists in our
prefix tree, we use the following procedure (assuming a *non-compressed*
prefix tree):

1. We start at the root of the tree, which becomes our "current node" :math:`n`.

2. a. If Node :math:`n` is a branch

      a. If Node :math:`n` has a child node :math:`c` whose symbol is the
         :math:`c_1` (the first character)

         1. We remove that first character from Word :math:`w`
               
         2. Node :math:`c` becomes our current node and we continue at
            Step 2.

      b. Else

         - We return False

   a. Otherwise (Node :math:`n` is a leaf)

      - We return true only if the given word :math:`w` is empty (i.e.,
        :math:`w=''`) and if the symbol carried by the Node :math:`n` is
        :math:`\bot`.

Figure :numref:`trees/tries/contains` illustrates how this procedure
operates. It shows how the search for "ape" at the root node, reduces
to searching for "pe" on the child, which reduces to searching for "e"
on the grandchild, which reduces to searching for the empty word.
              
.. figure:: _static/images/contains.svg
   :name: trees/tries/contains

   Searching for the word "ape" in the prefix tree initially shown on
   :numref:`trees/tries/prefix_tree`, shortened for the sake
   conciseness.
             
.. admonition:: Implementation in Scala
   :class: hint, dropdown

   We implement the case where the node is a branch (see Step 2.a) in
   our `Branch` class as follows. In Scala (and some other languages)
   the first character of a string is named "head", and the rest is
   named "tail".
                
   .. code-block:: scala
      :linenos:

      class Branch(symbol: Char, val children: Map[Char, Node]) extends Node(symbol):

        def contains(word: String): Boolean =
          children.get(word.head) match {
            case None => false
            case Some(n) => n.contains(word.tail)
          }

   The case where the node is a leaf (see Step 2.b) goes as follows:

   .. code-block:: scala
      :linenos:

      class Leaf(symbol: Char) extends Node(symbol):

        def contains(word: String): Boolean =
          return word.isEmpty && symbol == '⊥'

   Finally, we complete our `PrefixTree` with the following
   implementation:

   .. code-block:: scala
      :linenos:

      class PrefixTree:

        private var _root: Node = new Branch('ε', Map())

        def contains(word: String): Boolean =
          _root.contains(word)      
              

Why Is This Correct?
   Because

How Efficient Is This?

Let us consider searching for a word :math:`w=(c_1,\ldots,c_n)`. How
much time does it require? In the best case, we deduce straight in the
root node that the word :math:`w` is not in the tree, because the root
has no children whose symbol matches its character,
:math:`c_1`. Besides, if branch nodes are implemented using hashing,
that local search runs in :math:`O(1)`. If it were implemented with a
linear search, it would run in :math:`O(|\mathcal{A}|)` where
:math:`\mathcal{A}` represents the alphabet over which the words are built.

What is the worse case? The worst case occurs when we search for the
longest word that exists in the tree. This longest word is stored
along the longest branch of the tree, and, in that case, we have to
check every node along that long branch. The would give us a worst
case runtime that is linear to the length of the word :math:`w`, that
is :math:`O(n)`. Again if searching for specific child is implemented
using a local search, then, the search would run in :math:`O(n \cdot
|\mathcal{A}|)`

As for the memory, the recursive implementation I showed above would
require at :math:`O(n)` memory, as each node would place a new call to
progress further down the tree.
          
Prefix Search
-------------

To find all the words that start with a given prefix :math:`p=(c_1,
\dots, c_n)` we navigate the tree from the root according to the
character in the given prefix.

Insertion
---------

Deletion
--------

Suffix Trees
============
