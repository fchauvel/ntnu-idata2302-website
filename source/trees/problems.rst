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

   This page is a draft. Problems 10 and 11 are placeholders.


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

   :doc:`Lecture 5.5 </trees/btree/index>` introduces B-trees to
   reduce the number of disk accesses. We use its conventions with
   :math:`k = 4`: Only the leaves carry entries, at most four each. An
   internal node has at most four children, separated by up to three
   keys, and every key is the smallest key found in the subtree on its
   right. Every node except the root holds at least
   :math:`\lfloor k/2 \rfloor = 2` entries or children. Consider the
   B-tree shown on :numref:`trees/problems/btree-disk/tree`.

   .. figure:: _static/images/btree-disk.svg
      :name: trees/problems/btree-disk/tree

      A B-tree with :math:`k = 4`, holding ten entries

   To leave no room for doubt, we fix the following rules:

   - An overflowing node (five entries or children) keeps the first
     three, and moves the last two into a new node, placed just on its
     right. Its parent gets a new key: The smallest key under the new
     node.
   - To repair an underflowing node, first look at its left sibling:
     If it holds more than two entries (or children), borrow its last
     one. Otherwise, look at its right sibling, and borrow its first
     one under the same condition. Otherwise, merge with the left
     sibling if there is one, or else with the right sibling. In every
     case, update the keys of the parent.

   We count disk accesses as in the disk-access model. Each node fills
   exactly one block: Reading a node costs one ``READ_BLOCK``, and
   writing it costs one ``WRITE_BLOCK``. Memory is small, so every
   operation starts by reading the root, but a node read during an
   operation stays in memory until the operation ends. Every node that
   is created or changed is written exactly once, at the end of the
   operation. Discarding a node costs nothing, and so does keeping
   track of where the root is.

   #. Insert the key 28. Draw the tree after every split. Which nodes
      do you read, and which do you write? How many disk accesses does
      the insertion cost in total?

   #. Starting from the tree you obtained, delete the keys 30, 10, and
      50, in this order. Draw the tree after each deletion, say how you
      repair every underflow (borrowing or merging, and with which
      sibling), and count the reads and writes.

      After the last deletion, the root is left with a single child.
      Does this break the B-tree rule? What would you do about it, and
      why does it matter for later operations?

   #. Consider a B-tree of height :math:`h`, where, as for any tree, a
      single node has height 0. In the worst case, how many disk
      accesses does an insertion cost? Which insertion triggers this
      worst case? Show that a deletion also costs :math:`O(h)` disk
      accesses.

   #. A database stores :math:`10^9` entries in a B-tree, on a hard
      drive whose blocks hold 4096 bytes. A key and the address of a
      block take 8 bytes each, so we choose
      :math:`k = 4096 / 16 = 256`. What are the smallest and the
      largest possible heights of this B-tree? How many blocks does a
      search read at most?

      Compare with a perfectly balanced BST holding the same entries,
      where every node sits in its own block. Assuming a disk access
      takes 10 ms, how long does a search take in each case?

      *Hint:* The tree is tallest when its nodes are as empty as the
      rule allows. At least how many entries does a B-tree of height
      :math:`h` hold?


.. exercise:: Prefix Power ★★
   :label: trees/problems/prefix

   :doc:`Lecture 5.6 </trees/tries/index>` stores a set of words in a
   prefix tree: The root carries the empty symbol :math:`\varepsilon`,
   every other node carries one symbol, and a leaf :math:`\bot` marks
   the end of each word. The lecture explains how to check whether a
   word is in the tree, but leaves prefix search, insertion, and
   deletion open. This problem fills these gaps. Consider the set of
   eight words

   .. math::

      S = \{ \mathit{in},\, \mathit{inner},\, \mathit{tea},\,
      \mathit{tear},\, \mathit{ten},\, \mathit{tend},\,
      \mathit{to},\, \mathit{toe} \}

   #. Draw the prefix tree that holds :math:`S`. How many nodes does it
      have? Compare with the total number of symbols in the eight
      words. Explain why the leaves :math:`\bot` are necessary in this
      tree.

   #. In a *compressed* prefix tree, every chain of nodes that have a
      single child is merged into a single node, which carries all
      their symbols. Afterwards, every node except the leaves has at
      least two children. Draw the compressed version of your tree.
      How many nodes are left?

      Explain how to check whether the compressed tree contains a word,
      and run your method on "te", "tend", and "inn".

   #. Design a procedure ``prefixSearch(root, p)`` that returns all the
      words of a (non-compressed) prefix tree that start with the
      prefix :math:`p`. Run it on the prefixes "te", "in", "tex", and
      on the empty prefix. What is its time complexity?

      What changes in a compressed tree? Think in particular of the
      prefix "inn".

   #. Add the word "i" to your compressed tree, then remove the word
      "in". Draw the tree after each step. In general, when does an
      insertion force you to split a node? When does a deletion force
      you to merge nodes?


.. exercise:: One Pass Is Enough ★★★
   :label: trees/problems/one-pass

   Many questions about a binary tree combine answers computed on
   its subtrees. Computed carelessly, the same answers get recomputed
   over and over. This problem shows how to compute everything in a
   single traversal.

   As in :doc:`Lecture 5.4 </trees/avl/index>`, the empty tree has
   height :math:`-1`, and we say a binary tree is *balanced* when the
   balance factor of every node lies in :math:`[-1, 1]`. We ignore the
   items: The tree need not be a BST. The *diameter* of a tree is the
   number of edges on the longest path between two of its nodes. Such
   a path climbs up from one node and goes down to the other, and it
   need not pass through the root.

   .. figure:: _static/images/one-pass.svg
      :name: trees/problems/one-pass/tree

      A binary tree with ten nodes

   #. A classmate checks the balance as follows, where ``height``
      returns the height of a subtree, as in
      :numref:`trees/problems/counting`:

      .. code-block:: text

         isBalanced(node):
            if node is null:
               return true
            if abs(height(node.left) - height(node.right)) > 1:
               return false
            return isBalanced(node.left) and isBalanced(node.right)

      Which nodes of the tree shown on
      :numref:`trees/problems/one-pass/tree` are unbalanced? Which one
      makes ``isBalanced`` return false?

      Now run ``isBalanced`` on a *perfect* binary tree of height
      :math:`h`, whose leaves all sit at depth :math:`h`. How many
      times do the calls to ``height`` visit a node at depth
      :math:`d`? Deduce the time complexity of ``isBalanced`` on such a
      tree, in terms of its number of nodes :math:`n`.

   #. Write a procedure that checks the balance in a single traversal,
      visiting every node at most once. What is its time complexity?
      Run it on :numref:`trees/problems/one-pass/tree`. Which node
      reveals the imbalance first? Which nodes are never visited?

      *Hint:* A node needs the heights of its children to check its
      own balance, and to compute its own height. Let a single
      procedure return both, and agree on a special value meaning
      "unbalanced".

   #. What is the diameter of the tree on
      :numref:`trees/problems/one-pass/tree`? Give a longest path. Does
      it pass through the root?

      The classmate now writes:

      .. code-block:: text

         diameter(node):
            if node is null:
               return 0
            through = height(node.left) + height(node.right) + 2
            return max(through, diameter(node.left), diameter(node.right))

      Explain why it is correct. What is its time complexity on a tree
      where every node has a single child? Write a procedure that
      computes the diameter in a single traversal.

   #. Adapt your single-pass procedure to the general trees of
      :numref:`trees/problems/counting`, where a node may have any
      number of children. Run it on the tree shown on
      :numref:`trees/problems/counting/tree`: What is its diameter,
      and which two nodes are the furthest apart?

      *Hint:* A longest path has a single highest node. Through which
      of its children can it go?


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
