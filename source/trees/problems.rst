===========
Problem Set
===========

:Objectives: Practice the concepts introduced in the *Trees* module

This problem set is optional practice. Work on it wherever you like,
alone or in groups, and with any resources you find useful. Unless a
problem says otherwise, answer with pen and paper or in pseudocode;
implementation tasks can be done in any programming language.

Problems are roughly ordered by difficulty, from ★ (warm-up) to ★★★★
(challenging). The last two problems introduce topics that are *not*
covered in the lectures: Each one starts with a short background that
gives you everything you need.

.. note::

   This page is a draft. Problems 7 to 11 are placeholders.


Core Problems
=============

.. exercise:: Counting on Recursion ★
   :label: trees/problems/counting

   Recall from :doc:`Lecture 5.1 </trees/intro/index>` that a tree
   :math:`t = (r, c)` is made of a root :math:`r` and a sequence
   :math:`c` of disjoint children trees. Assume every node gives
   access to ``node.children``, the (possibly empty) sequence of its
   children, as in the "sequence of children" representation. Consider
   the tree shown on :numref:`trees/problems/counting/tree`.

   .. figure:: _static/images/counting.svg
      :name: trees/problems/counting/tree

      A general tree with nine nodes

   #. Write recursive procedures for the following three operations:

      - ``size(node)`` returns the number of nodes in the subtree
        rooted at ``node``;
      - ``height(node)`` returns the height of the subtree rooted at
        ``node``, where a single node has height 0;
      - ``leaves(node)`` returns the number of leaves in the subtree
        rooted at ``node``.

   #. Run ``height(R)`` on the tree above. List the calls in the order
      they *return*, together with the value each of them returns.

   #. Look at the order you obtained in the previous question. Which
      traversal is it? Explain why all three operations end up
      visiting the nodes in this order.

   #. How many calls to ``size`` does ``size(R)`` trigger in total, for
      a tree with :math:`n` nodes? What is the time complexity of
      ``size``? Justify your answer.


.. exercise:: One Tree, Two Encodings ★
   :label: trees/problems/encodings

   :doc:`Lecture 5.1 </trees/intro/index>` shows a second way to
   store a general tree: Every node keeps only two references, one to
   its *left-most child* and one to its *next sibling* (see
   :numref:`trees/intro/with_siblings`). If we read the first
   reference as a "left" child and the second as a "right" child, any
   general tree becomes a binary tree, where every node has at most
   two children.

   Consider for instance the tree shown on
   :numref:`trees/problems/encodings/example`. Node A has three
   children, so it is not a binary tree. In its encoding, shown on
   :numref:`trees/problems/encodings/example-binary`, A keeps a link to
   its first child B only. B links to its next sibling C, which in turn
   links to its own first child E and to its next sibling D.

   .. list-table::
      :widths: 50, 50

      * -
          .. figure:: _static/images/encodings-example-tree.svg
             :name: trees/problems/encodings/example

             A general tree, where Node A has three children

        -
          .. figure:: _static/images/encodings-example-binary.svg
             :name: trees/problems/encodings/example-binary

             Its encoding as a binary tree. Solid arrows lead to the
             left-most child, dashed arrows to the next sibling.

   The tree from :numref:`trees/problems/counting/tree` is *not* a
   binary tree either: Its root has four children.

   #. Draw the binary tree that encodes the tree from
      :numref:`trees/problems/counting/tree`. What is its height?
      Compare it with the height of the original tree.

   #. List the nodes of both trees in pre-order. Then list the nodes
      of the general tree in post-order, and the nodes of the binary
      tree in *in-order* (left subtree, then the node itself, then the
      right subtree). What do you notice?

   #. Explain why the post-order of a general tree always matches the
      in-order of its encoding.

      *Hint:* Given a node :math:`v`, which nodes of the general tree
      end up in the left subtree of :math:`v` in the encoding? Which
      end up in its right subtree?

   #. A classmate reuses the ``size`` procedure for binary trees,
      where an empty tree has size 0:

      .. code-block:: text

         size(node):
            if node is null:
               return 0
            return 1 + size(node.left) + size(node.right)

      They call it on Node S of the encoding. Does the result match the
      size of the subtree rooted at S in the general tree? Explain why
      ``size(R)`` still returns the correct answer, then fix the
      procedure so that it returns the size of the general subtree
      for any node.


.. exercise:: Rebuilding from Traversals ★★
   :label: trees/problems/reconstruction

   A traversal turns a tree into a sequence. Can we go the other way,
   and rebuild a binary tree from its traversals? In this problem, all
   nodes carry different labels. Recall that the *in-order* visits the
   left subtree, then the node itself, then the right subtree (see
   :numref:`trees/problems/encodings`).

   #. A binary tree with nine nodes gives the following two
      sequences:

      - Pre-order: M, K, Q, A, J, P, T, R, L
      - In-order: Q, K, J, A, M, P, R, T, L

      Rebuild the tree. Explain how you find the root, and how you
      decide which nodes belong to its left and right subtrees.

   #. Turn your method into a recursive procedure
      ``rebuild(preorder, inorder)`` that returns the root of the
      tree. What is its time complexity in the worst case? Which tree
      shape triggers this worst case?

   #. Does the pre-order alone determine the tree? How many different
      binary trees have the pre-order A, B, C? Draw them all.

   #. Do the pre-order and the post-order together determine the
      tree? If not, find two different binary trees that share both
      sequences. Can you think of a family of binary trees for which
      these two sequences *are* enough?


.. exercise:: The Lazy Validator ★★
   :label: trees/problems/validator

   Recall from :doc:`Lecture 5.2 </trees/bst/index>` the invariant of
   a binary search tree: Every node carries an item that is greater
   than or equal to all the items in its left subtree, and strictly
   smaller than all the items in its right subtree. A classmate wants
   to check whether a binary tree satisfies this invariant, and writes
   the following procedure:

   .. code-block:: text

      isBST(node):
         if node is null:
            return true
         if node.left is not null and node.left.item > node.item:
            return false
         if node.right is not null and node.right.item <= node.item:
            return false
         return isBST(node.left) and isBST(node.right)

   Their argument: "It checks every node against its children, and it
   does so for every node in the tree, so it must be correct."

   .. figure:: _static/images/validator.svg
      :name: trees/problems/validator/tree

      A binary tree with eight nodes

   #. Run ``isBST`` on the tree shown on
      :numref:`trees/problems/validator/tree`. What does it return? Is
      this tree a BST? Search for 30 in this tree, as the lecture's
      ``contains`` operation would do. What happens?

   #. What is the smallest tree (with the fewest nodes) that ``isBST``
      accepts, although it is not a BST? Explain why no smaller tree
      can fool it.

   #. Fix the procedure.

      *Hint:* As you walk down the tree, every node you pass narrows
      the range of items allowed below it. Write a procedure
      ``isBST(node, low, high)`` that also checks that every item in
      the subtree lies within this range. How do you call it on the
      root? What is its time complexity?

   #. Another classmate suggests a different approach: Run an in-order
      traversal, and check that the resulting sequence never
      decreases. Does that work with the invariant above? If not, give
      a counterexample, and say under which condition the approach
      does work.

      *Hint:* Think about duplicates.


.. exercise:: Inner Trouble ★★
   :label: trees/problems/avl-inner

   :doc:`Lecture 5.4 </trees/avl/index>` distinguishes two ways in
   which an AVL tree can become unbalanced: The *outer* cases, fixed
   by a single rotation, and the *inner* cases, which need two. This
   problem focuses on the inner cases, and on what happens when we
   delete.

   We use the conventions of the lecture: The empty tree has height
   :math:`-1`, the balance factor of a node is :math:`b = h(L) - h(R)`,
   and a *left rotation* lifts up the right child. Insertions proceed
   as in a plain BST before rebalancing, and a deleted node that has
   two children is replaced by its predecessor.

   #. Starting from an empty AVL tree, insert the keys 50, 20, 70, 10,
      30, and 25, in this order. Draw the tree after every insertion,
      and write down the balance factor of every node. When the tree
      becomes unbalanced, say which node is unbalanced, which of the
      four cases applies (outer or inner, left or right), and which
      rotations restore the balance. Draw the tree after each
      rotation.

   #. Insert 60 into the resulting tree, and restore the balance.
      Compare the height of the subtree you rebalanced *before* the
      insertion with its height *after* the rebalancing. Why does this
      mean that, after an insertion, no node higher up ever needs
      rebalancing?

   #. Now delete the keys 10, 25, and 20, in this order. Which
      deletion breaks the balance? What is then the balance factor of
      the heavy child? Which of the four cases from the lecture
      applies? Which rotation(s) restore the balance? Check that your
      final tree is a valid AVL tree.

   #. Explain why the situation from the previous question, where the
      heavy child has a balance factor of 0, never occurs right after
      an insertion.


.. exercise:: Heapify, Step by Step ★★
   :label: trees/problems/heapify

   We use the minimum binary heap from :doc:`Lecture 5.3
   </trees/heap/index>`, stored in an array whose first index is 0:
   The children of the node at index :math:`i` sit at indices
   :math:`2i+1` and :math:`2i+2`.

   #. Heapify the array (14, 9, 17, 3, 12, 5, 8, 1, 6, 10). For every
      non-leaf node you process, list the swaps you make and give the
      array afterwards. How many swaps do you make in total? Draw the
      resulting heap as a tree.

   #. Now build a heap by inserting the same items, in the same order,
      into an empty heap. Give the array after every insertion, and
      count the swaps. Do you obtain the same heap? Which method made
      fewer swaps?

   #. Consider the keys 1 to 7. In which order should you insert them
      into an empty heap to make as many swaps as possible? How many
      swaps is that? How many swaps does heapify make on an array that
      holds the keys in that same order?

      Explain the difference. *Hint:* In a complete binary tree, about
      half the nodes are leaves. How far can a leaf move during an
      insertion? During heapify?

   #. A game server receives :math:`n` scores, one at a time, and must
      report the :math:`k` highest ones at the end. Memory is short:
      You may only use a *minimum* heap that never holds more than
      :math:`k` scores.

      Design a procedure that solves this problem, and run it on the
      scores (42, 17, 63, 8, 55, 71, 23, 60, 90, 12) with :math:`k = 3`.
      Give the heap array after every score. What is the time
      complexity of your procedure, in terms of :math:`n` and
      :math:`k`? Why does a *minimum* heap fit better here than a
      maximum heap?


.. exercise:: Counting Disk Reads ★★
   :label: trees/problems/btree-disk

   *Placeholder.* B-tree insertions and deletions (splits, borrowing,
   merging) and their cost in disk accesses.


.. exercise:: Prefix Power ★★
   :label: trees/problems/prefix

   *Placeholder.* Build a prefix tree and its compressed version, then
   design the prefix search.


.. exercise:: One Pass Is Enough ★★★
   :label: trees/problems/one-pass

   *Placeholder.* Check whether a binary tree is AVL-balanced in a
   single pass, then compute its diameter.


Going Further
=================
  These problems go beyond the lectures: Huffman coding and scapegoat
  trees are not part of the syllabus. Both build directly on this
  module, though. Huffman codes are binary prefix trees, and scapegoat
  trees are another way to keep a search tree balanced. Each problem
  starts with a short background that introduces everything you need.

.. exercise:: Squeezing BANANA BANDANA ★★★
   :label: trees/problems/huffman

   *Placeholder.* Prefix-free codes as binary prefix trees, and
   Huffman coding.


.. exercise:: Scapegoat Trees ★★★★
   :label: trees/problems/scapegoat

   *Placeholder.* Scapegoat trees: tracing an insertion, proving the
   height bound, and arguing about the cost of rebuilding.
