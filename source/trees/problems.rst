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

   This page is a draft. Problems 2 to 11 are placeholders.


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

   *Placeholder.* Find a counterexample to a BST check that only
   compares each node with its children, then fix it.


.. exercise:: Inner Trouble ★★
   :label: trees/problems/avl-inner

   *Placeholder.* AVL insertions that trigger the inner cases, and a
   deletion that requires rebalancing.


.. exercise:: Heapify, Step by Step ★★
   :label: trees/problems/heapify

   *Placeholder.* Heapify an array by hand, compare with repeated
   insertions, and select the :math:`k` largest items with a heap of
   size :math:`k`.


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
