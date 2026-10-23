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

Every problem comes with a solution, hidden in a dropdown below it.
Give the problem a real try before you open it: Most of the learning
happens while you are stuck.

.. note::

   This page is a draft.


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

.. solution:: trees/problems/counting
   :label: trees/problems/counting/solution
   :class: dropdown

   #. All three operations combine the answers of the children:

      .. code-block:: text

         size(node):
            total = 1
            for each child in node.children:
               total = total + size(child)
            return total

         height(node):
            tallest = -1
            for each child in node.children:
               tallest = max(tallest, height(child))
            return 1 + tallest

         leaves(node):
            if node.children is empty:
               return 1
            total = 0
            for each child in node.children:
               total = total + leaves(child)
            return total

      Starting ``height`` with ``tallest = -1`` mirrors the convention
      :math:`h(\varnothing) = -1` from the AVL lecture, so a leaf
      returns 0 without a special case.

   #. The calls return in the following order:

      .. list-table::
         :header-rows: 1

         * - Call
           - W
           - X
           - S
           - T
           - Z
           - Y
           - U
           - V
           - R
         * - Returns
           - 0
           - 0
           - 1
           - 0
           - 0
           - 1
           - 2
           - 0
           - 3

   #. This is a *post-order* traversal. Each operation needs the
      answers of all the children before it can compute the answer of
      the node itself, so a node always returns after all its
      descendants.

   #. ``size(R)`` triggers exactly :math:`n` calls: The root is called
      once, and every other node is called exactly once, by its
      parent. Each call does a constant amount of work plus one loop
      iteration per child. Summed over all calls, the loops run once
      per edge, that is :math:`n - 1` times. The total is therefore
      :math:`O(n)`.

   **Common mistakes**

   - Counting nodes instead of edges, so that a leaf gets height 1 and
     ``height(R)`` returns 4.
   - Returning 0 from ``leaves`` on a leaf, which makes every answer 0.
   - Claiming :math:`O(n^2)` or :math:`O(n \log n)` "because there is a
     loop inside a recursion". The loops are not nested over the same
     nodes: Each edge is followed exactly once.


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

.. solution:: trees/problems/encodings
   :label: trees/problems/encodings/solution
   :class: dropdown

   #. Solid arrows lead to the left-most child (drawn as a left
      child), dashed arrows lead to the next sibling (drawn as a right
      child):

      .. figure:: _static/solutions/encodings.svg

         The tree from Problem 1, encoded as a binary tree

      The binary tree has height 5 (along R, S, T, U, Y, Z), whereas the
      general tree has height 3. The encoding is never shorter: The
      depth of a node in the encoding is its depth in the general tree
      *plus* the number of sibling links on the way, so wide trees
      become tall binary trees.

   #. Both pre-orders are identical: R, S, W, X, T, U, Y, Z, V.

      The post-order of the general tree is W, X, S, T, Z, Y, U, V, R,
      and the in-order of the binary tree gives exactly the same
      sequence.

   #. In the encoding, the left subtree of a node :math:`v` holds
      exactly the descendants of :math:`v` in the general tree (its
      first child, followed by that child's siblings and all their
      descendants). Its right subtree holds the siblings that come
      *after* :math:`v`, together with their descendants.

      The in-order visits the left subtree, then :math:`v`, then the
      right subtree. That is: All the descendants of :math:`v`, then
      :math:`v` itself, then the next siblings. This is precisely the
      post-order rule: A node comes after all its descendants, and
      before its next siblings.

      For the pre-order, the same reasoning gives :math:`v`, then its
      descendants, then its next siblings, which is the pre-order rule
      for general trees.

   #. No. ``size(S)`` returns 8 (S, W, X, T, U, Y, Z, V), whereas the
      subtree of S in the general tree has only 3 nodes (S, W, X). The
      right subtree of S holds its *siblings*, not its descendants.

      ``size(R)`` is correct by luck: The root has no sibling, so its
      right subtree is empty and only its descendants are counted.

      The fix is to count the node and its left subtree only:

      .. code-block:: text

         generalSize(node):
            return 1 + size(node.left)

      Here ``size`` is the classmate's procedure: Applied to the
      left-most child, it counts that child, its siblings, and all
      their descendants, which are exactly the descendants of
      ``node``.

   **Common mistakes**

   - Drawing every child as a left child of its parent (e.g., T and U
     as children of R). Only the *first* child hangs to the left: The
     others are chained to the right of their previous sibling.
   - Placing a single child in the middle, so that X looks like a
     left child of W. A right child must be visibly on the right.
   - Defining in-order for the general tree instead of the encoding.
     In-order only makes sense when a node has a "left" and a "right".


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

.. solution:: trees/problems/reconstruction
   :label: trees/problems/reconstruction/solution
   :class: dropdown

   #. The tree is the following:

      .. figure:: _static/solutions/reconstruction.svg

         The tree rebuilt from its pre-order and in-order

      The pre-order always starts with the root, so the root is M. In
      the in-order, the root sits between its two subtrees: Everything
      on the left of M (Q, K, J, A) is the left subtree, and everything
      on its right (P, R, T, L) is the right subtree. The left subtree
      has four nodes, so the next four nodes of the pre-order (K, Q, A,
      J) are its pre-order, and the remaining ones (P, T, R, L) are the
      pre-order of the right subtree. We repeat on each side:

      .. list-table::
         :header-rows: 1

         * - Pre-order
           - In-order
           - Root
           - Left
           - Right
         * - M K Q A J P T R L
           - Q K J A **M** P R T L
           - M
           - Q K J A
           - P R T L
         * - K Q A J
           - Q **K** J A
           - K
           - Q
           - J A
         * - A J
           - J **A**
           - A
           - J
           - (empty)
         * - P T R L
           - **P** R T L
           - P
           - (empty)
           - R T L
         * - T R L
           - R **T** L
           - T
           - R
           - L

   #. A possible procedure, using 0-based positions and slices that
      include their first index but exclude their last:

      .. code-block:: text

         rebuild(preorder, inorder):
            if preorder is empty:
               return null
            root = preorder[0]
            i = position of root in inorder
            left  = rebuild(preorder[1 .. i+1], inorder[0 .. i])
            right = rebuild(preorder[i+1 .. n], inorder[i+1 .. n])
            return new Node(root, left, right)

      Here :math:`i` is also the size of the left subtree. Each call
      searches for the root in the in-order, which takes up to
      :math:`O(n)` for a call on :math:`n` nodes. In the worst case,
      the tree is a single long branch, every call peels off a single
      node, and the total work is :math:`n + (n-1) + \ldots + 1`, that
      is :math:`O(n^2)`.

      *Going further:* Storing the position of every label of the
      in-order in a hash table, and passing indices instead of copying
      slices, brings it down to :math:`O(n)`.

   #. No. Exactly five binary trees have the pre-order A, B, C:

      .. figure:: _static/solutions/reconstruction-abc.svg

         The five binary trees whose pre-order is A, B, C

      The pre-order tells us which node comes first, but not on which
      side each child hangs, nor whether two nodes are siblings or
      parent and child. In fact, every possible shape with three nodes
      appears exactly once (compare with the lab exercise on the
      possible shapes of a BST with three keys).

   #. No. Consider a root A with a single child B. Whether B is the
      left or the right child, the pre-order is A, B and the post-order
      is B, A. Both traversals put a lonely child after (or before)
      its parent, but neither says on which side it hangs.

      These two sequences are enough when every node has either zero or
      two children (so-called *full* binary trees). The second node of
      the pre-order is then always the root of the left subtree. Finding
      it in the post-order tells us how large the left subtree is,
      because the left subtree ends exactly there. We then recurse as in
      Question 1.

   **Common mistakes**

   - Splitting the pre-order around the root's position in the
     in-order. Only the in-order is split around the root. In the
     pre-order, we skip the root and use the *size* of the left subtree
     to know where it ends.
   - Assuming the tree is a BST and sorting the labels. The in-order of
     this tree is not alphabetical, so it is not a BST.
   - In Question 3, listing a couple of trees instead of all five, or
     drawing a single child in the middle, so that left and right look
     the same.

   *Remark:* The problem assumes distinct labels for a reason. With
   duplicates, such as pre-order A, A and in-order A, A, we cannot tell
   whether the second A is the left or the right child of the first
   one.


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

.. solution:: trees/problems/validator
   :label: trees/problems/validator/solution
   :class: dropdown

   #. ``isBST`` returns true: Every node is consistent with its
      children (in particular, 30 > 19 is a valid right child). Yet the
      tree is *not* a BST: 30 sits in the left subtree of 27, although
      30 > 27.

      Searching for 30 goes right at 27 (30 > 27), then left at 39,
      then left at 35, where there is no left child. The search
      reports that 30 is missing, although the tree contains it. A
      broken invariant does not crash anything: The operations
      silently return wrong answers.

   #. The smallest such tree has three nodes, for instance a root 2,
      its left child 1, and the right child 3 of Node 1 (left on the
      figure below). Node 3 is a valid right child of 1, but it sits
      in the left subtree of 2.

      .. figure:: _static/solutions/validator.svg

         Left: The smallest tree that fools ``isBST``. Right: A tree
         whose in-order never decreases, but which is not a BST.

      With one or two nodes, every pair of nodes is a parent and its
      child, which ``isBST`` checks directly. With three nodes, the
      only pairs it does not check are two siblings, or a node and its
      grandchild. Siblings are safe: :math:`l \leq r < s` gives
      :math:`l < s`. A grandchild hanging on the same side as the
      child (both left, or both right) is safe too, since the order
      carries over: :math:`x \leq y \leq z` gives :math:`x \leq z`.
      Only a "zig-zag" (left then right, or right then left) can
      escape the check.

   #. Each node passes down a range of allowed items, :math:`(low,
      high]`: Its left subtree must hold items at most ``node.item``,
      and its right subtree items strictly greater than
      ``node.item``.

      .. code-block:: text

         isBST(node, low, high):
            if node is null:
               return true
            if node.item <= low or node.item > high:
               return false
            return isBST(node.left, low, node.item)
               and isBST(node.right, node.item, high)

      We call it as ``isBST(root, -∞, +∞)``. On the tree from
      Question 1, 30 receives the range :math:`(19, 27]` and the check
      fails. Every node is visited once and does a constant amount of
      work, so the procedure runs in :math:`O(n)`.

      *Alternative:* Each call returns the minimum and the maximum of
      its subtree, and each node compares itself with the maximum of
      its left subtree and the minimum of its right subtree. It is
      also :math:`O(n)`, but harder to get right.

   #. Not with duplicates. Take a root 5 with a *right* child 5 (right
      on the figure above). Its in-order is 5, 5, which never
      decreases, but the tree breaks the invariant: Items in the right
      subtree must be *strictly* greater. Moving the child to the left
      gives a valid BST with the same in-order, so the in-order alone
      cannot tell the two apart.

      The approach works when all items are distinct: Then a binary
      tree is a BST exactly when its in-order is *strictly*
      increasing. It also runs in :math:`O(n)`.

   **Common mistakes**

   - Answering Question 1 with "it is a BST, since every node is
     larger than its left child and smaller than its right child".
     That is the classmate's mistake: The invariant is about whole
     subtrees.
   - In Question 2, proposing a tree with a straight branch (e.g., 3,
     2, 1 all as left children). Transitivity makes such trees safe.
   - Passing the ranges the wrong way round, for instance giving the
     left subtree :math:`(node.item, high]`.
   - Using strict bounds on both sides, so that the fixed procedure
     rejects valid trees with duplicates on the left.


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

.. solution:: trees/problems/avl-inner
   :label: trees/problems/avl-inner/solution
   :class: dropdown

   #. The first five insertions keep every balance factor in
      :math:`[-1, 1]`:

      .. list-table::
         :header-rows: 1

         * - Insert
           - Tree (balance factors in brackets)
         * - 50
           - 50 [0]
         * - 20
           - 50 [+1] with left child 20 [0]
         * - 70
           - 50 [0] with children 20 [0] and 70 [0]
         * - 10
           - 50 [+1], 20 [+1] with left child 10
         * - 30
           - 50 [+1], 20 [0] with children 10 and 30

      Inserting 25 places it as the left child of 30. Node 50 then has
      :math:`b = +2` (left-heavy), and its left child 20 has
      :math:`b = -1` (right-heavy): This is the *inner left* case. We
      rotate 20 to the left, which lifts 30 and moves its left child
      25 under 20, then rotate 50 to the right:

      .. figure:: _static/solutions/avl-inner-left.svg

         Left: After inserting 25, 50 is unbalanced. Middle: After
         rotating 20 to the left (an intermediate state). Right: After
         rotating 50 to the right. Balance factors are shown next to
         each node.

      The final tree has root 30, with children 20 (10, 25) and 50
      (right child 70).

   #. 60 goes to the left of 70. Node 50 then has :math:`b = -2`
      (right-heavy), and its right child 70 has :math:`b = +1`
      (left-heavy): This is the *inner right* case. We rotate 70 to the
      right, then 50 to the left. The root 30 has :math:`b = -1`, which
      is still valid, so the rebalancing stays local:

      .. figure:: _static/solutions/avl-inner-right.svg

         Left: After inserting 60, 50 is unbalanced. Right: After
         rotating 70 to the right and 50 to the left.

      Before the insertion, the subtree rooted at 50 (50, 70) had
      height 1. After the rebalancing, the subtree that takes its
      place (60, with children 50 and 70) has height 1 as well. Seen
      from the parent 30, nothing has changed, so neither 30 nor any
      other ancestor needs rebalancing. This holds for every
      insertion, single or double rotation alike: After an insertion,
      at most one node is rebalanced.

   #. Deleting 10 and 25 keeps the tree balanced: 20 becomes a leaf
      and the root 30 gets :math:`b = -1`. Deleting 20 breaks the
      balance: The root 30 has an empty left subtree (height
      :math:`-1`) and a right subtree of height 1, so :math:`b = -2`.

      Its heavy child 60 has :math:`b = 0`: Both its subtrees (50 and
      70) have the same height. None of the four cases from the
      lecture applies as such, since they assume a left- or
      right-heavy child. A *single* left rotation of 30 restores the
      balance, as in the outer case:

      .. figure:: _static/solutions/avl-delete.svg

         Left: After deleting 20, 30 is unbalanced, and its right
         child 60 is balanced. Right: After rotating 30 to the left.

      The resulting tree has root 60 (:math:`b = +1`), whose left
      child 30 (:math:`b = -1`) has 50 as right child, and whose right
      child is 70. All balance factors lie in :math:`[-1, 1]`, and the
      BST ordering holds (30 < 50 < 60 < 70).

      *Going further:* Here, a double rotation would happen to yield
      a valid tree as well (50 at the root), but only because the
      subtrees are tiny. In general, it does not: With the notation of
      the lecture, take A with :math:`b = -2`, its right child B with
      two subtrees of height :math:`h+1`, and the left child C of B
      with a left subtree of height :math:`h` and a right subtree of
      height :math:`h-1`. After a double rotation, B keeps its right
      subtree (height :math:`h+1`) and receives the right subtree of C
      (height :math:`h-1`) as its left subtree, so :math:`b(B) = -2`. When the heavy child is
      balanced, always use a single rotation.

   #. A node becomes unbalanced after an insertion because the height
      of one of its children grew by one. That child grew because one
      of *its* subtrees grew, namely the one where the new node went.
      If the child ended up with :math:`b = 0`, its two subtrees would
      have the same height after the insertion, so the subtree that
      grew used to be the shorter one. Then the height of the child
      would not have changed, which contradicts our starting point.

      The only exception would be the new leaf itself (:math:`b = 0`).
      Its parent, however, had an empty side before the insertion, so
      its other subtree is at most a single leaf, and the parent's
      balance factor stays within :math:`[-1, 1]`.

      *Going further:* After a deletion, the rebalanced subtree may
      end up one level *shorter* than before (whenever the heavy child
      is not balanced). Unlike insertion, a deletion may therefore
      require rebalancing several nodes on the way up to the root.

   **Common mistakes**

   - Computing balance factors as :math:`h(R) - h(L)`, which flips all
     the cases.
   - Rotating the root instead of the *lowest* unbalanced node. In
     Question 2, only 50 needs fixing.
   - Losing a subtree during a rotation: In Question 1, 25 (the left
     child of 30) must move to become the right child of 20.
   - Treating Question 3 as an inner case, because 60 "is not
     right-heavy".


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

.. solution:: trees/problems/heapify
   :label: trees/problems/heapify/solution
   :class: dropdown

   #. The array has 10 items, so the last non-leaf node is the parent
      of index 9, at index :math:`(9 - 1) / 2 = 4`. We process indices
      4 down to 0:

      .. list-table::
         :header-rows: 1

         * - Index
           - Swaps
           - Array afterwards
         * - 4 (12)
           - 12 ↔ 10
           - 14, 9, 17, 3, 10, 5, 8, 1, 6, 12
         * - 3 (3)
           - 3 ↔ 1
           - 14, 9, 17, 1, 10, 5, 8, 3, 6, 12
         * - 2 (17)
           - 17 ↔ 5
           - 14, 9, 5, 1, 10, 17, 8, 3, 6, 12
         * - 1 (9)
           - 9 ↔ 1, 9 ↔ 3
           - 14, 1, 5, 3, 10, 17, 8, 9, 6, 12
         * - 0 (14)
           - 14 ↔ 1, 14 ↔ 3, 14 ↔ 6
           - 1, 3, 5, 6, 10, 17, 8, 9, 14, 12

      This makes 8 swaps in total. The resulting heap is shown on the
      left of the figure below.

      .. figure:: _static/solutions/heapify.svg

         Left: The heap built by heapify. Right: The heap built by
         repeated insertions. They differ only in the two highlighted
         nodes.

   #. Inserting the items one by one gives:

      .. list-table::
         :header-rows: 1

         * - Insert
           - Swaps
           - Array afterwards
         * - 14
           - 0
           - 14
         * - 9
           - 1
           - 9, 14
         * - 17
           - 0
           - 9, 14, 17
         * - 3
           - 2
           - 3, 9, 17, 14
         * - 12
           - 0
           - 3, 9, 17, 14, 12
         * - 5
           - 1
           - 3, 9, 5, 14, 12, 17
         * - 8
           - 0
           - 3, 9, 5, 14, 12, 17, 8
         * - 1
           - 3
           - 1, 3, 5, 9, 12, 17, 8, 14
         * - 6
           - 1
           - 1, 3, 5, 6, 12, 17, 8, 14, 9
         * - 10
           - 1
           - 1, 3, 5, 6, 10, 17, 8, 14, 9, 12

      This makes 9 swaps, against 8 for heapify. The heaps are *not*
      the same: 9 and 14 (indices 7 and 8) are swapped. Both are
      valid, since the heap ordering only constrains parents and
      children, not siblings. A set of items usually has many valid
      heaps.

   #. Each insertion makes at most as many swaps as the depth of the
      new node. Inserting in *descending* order (7, 6, 5, 4, 3, 2, 1)
      makes every new key the smallest so far, so it climbs all the
      way to the root: :math:`0 + 1 + 1 + 2 + 2 + 2 + 2 = 10` swaps,
      the maximum possible.

      Heapify on (7, 6, 5, 4, 3, 2, 1) makes only 4 swaps: 5 ↔ 1 (index
      2), 6 ↔ 3 (index 1), then 7 ↔ 1 and 7 ↔ 2 (index 0). The result
      is (1, 3, 2, 4, 6, 7, 5).

      In an insertion, a node moves *up*, at most its depth. The
      leaves are the deepest nodes and make up about half of the tree,
      so in the worst case the total is about
      :math:`\frac{n}{2} \log_2 n`, that is :math:`O(n \log n)`. In
      heapify, a node moves *down*, at most its height. Leaves do not
      move at all, their parents move at most one level, and only the
      root may move :math:`\log_2 n` levels. Most nodes are near the
      bottom, so most nodes move little: This is the :math:`O(n)`
      bound from the lecture.

   #. Keep in the heap the :math:`k` highest scores seen so far. Its
      root is the *smallest* of them, that is, the one to evict when a
      better score arrives:

      .. code-block:: text

         topK(scores, k):
            heap = empty minimum heap
            for each score in scores:
               if size(heap) < k:
                  enqueue(heap, score)
               else if score > minimum(heap):
                  dequeue(heap)
                  enqueue(heap, score)
            return heap

      With :math:`k = 3`, using the lecture's ``dequeue`` and
      ``enqueue``:

      .. list-table::
         :header-rows: 1

         * - Score
           - Action
           - Heap afterwards
         * - 42
           - enqueue
           - 42
         * - 17
           - enqueue
           - 17, 42
         * - 63
           - enqueue
           - 17, 42, 63
         * - 8
           - ignore (8 ≤ 17)
           - 17, 42, 63
         * - 55
           - evict 17
           - 42, 63, 55
         * - 71
           - evict 42
           - 55, 63, 71
         * - 23
           - ignore (23 ≤ 55)
           - 55, 63, 71
         * - 60
           - evict 55
           - 60, 71, 63
         * - 90
           - evict 60
           - 63, 71, 90
         * - 12
           - ignore (12 ≤ 63)
           - 63, 71, 90

      The three highest scores are 63, 71, and 90. If you
      replace the root directly and move it down, you get (42, 55, 63) and
      (55, 71, 63) after scores 55 and 71, which is also correct.

      Each score costs at most one ``dequeue`` and one ``enqueue`` on
      a heap of size :math:`k`, so the procedure runs in
      :math:`O(n \log k)` time and :math:`O(k)` memory.

      A maximum heap gives quick access to the *best* score kept so
      far, but to decide whether a new score gets in, we need the
      *worst* one. In a maximum heap of size :math:`k`, finding (and
      removing) it would take :math:`O(k)`.

      *Going further:* With enough memory, we could heapify all
      :math:`n` scores into a maximum heap and dequeue :math:`k` times,
      in :math:`O(n + k \log n)`. That requires storing every score,
      and having them all before we start.

   **Common mistakes**

   - Starting heapify at the root, or at the last node instead of the
     last *non-leaf* node.
   - Stopping a node's descent after one swap. In Question 1, 14 moves
     down three levels.
   - Swapping with the *first* child instead of the smallest one.
   - In Question 4, using a maximum heap and evicting the root, which
     throws away the best score instead of the worst.


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

.. solution:: trees/problems/btree-disk
   :label: trees/problems/btree-disk/solution
   :class: dropdown

   #. 28 lands in Leaf 2, which overflows with five entries (20, 25,
      28, 30, 35). Leaf 2 keeps (20, 25, 28), a new Leaf 5 takes (30,
      35), and the root gets the key 30. The root then has five
      children (keys 20, 30, 40, 60) and overflows in turn: It keeps
      its first three children (Leaf 1, Leaf 2, Leaf 5, separated by
      20 and 30), and a new Node B takes Leaf 3 and Leaf 4 (separated
      by 60). The smallest key under Node B, 40, goes up into a new
      root:

      .. figure:: _static/solutions/btree-insert.svg

         The B-tree after inserting 28. The nodes in red are written.

      We read 2 nodes (the root and Leaf 2) and write 5 (Leaf 2, Leaf
      5, the old root, Node B, and the new root), that is, 7 disk
      accesses. The tree grows at the top, so all leaves stay at the
      same depth.

   #. The three deletions go as follows:

      .. list-table::
         :header-rows: 1

         * - Delete
           - Repair
           - Reads
           - Writes
           - Total
         * - 30
           - Leaf 5 is left with (35). Its left sibling Leaf 2 holds
             three entries, so Leaf 5 borrows 28, and the key 30 in
             Node A becomes 28.
           - 4 (root, A, Leaf 5, Leaf 2)
           - 3 (Leaf 2, Leaf 5, A)
           - 7
         * - 10
           - Leaf 1 is left with (5). It has no left sibling, and its
             right sibling Leaf 2 has no entry to spare, so they merge
             into Leaf 6 (5, 20, 25). Node A keeps two children.
           - 4 (root, A, Leaf 1, Leaf 2)
           - 2 (Leaf 6, A)
           - 6
         * - 50
           - Leaf 3 is left with (40), and merges with its right
             sibling Leaf 4 into Leaf 7 (40, 60, 70). Node B is then
             left with a single child. Its left sibling Node A has no
             child to spare, so A and B merge. The key 40, the smallest
             key under Leaf 7, comes down from the root.
           - 5 (root, B, Leaf 3, Leaf 4, A)
           - 2 (Leaf 7, merged node)
           - 7

      .. figure:: _static/solutions/btree-delete-30.svg

         After deleting 30: Leaf 5 borrows from Leaf 2

      .. figure:: _static/solutions/btree-delete-10.svg

         After deleting 10: Leaf 1 merges with Leaf 2

      .. figure:: _static/solutions/btree-delete-50.svg

         After deleting 50: The leaves merge, then the internal nodes
         merge, and the root disappears

      A root with a single child does not break the rule, since the
      root is the only node allowed to have fewer than two children.
      It is useless, though: Every later operation would read it,
      paying one disk access to learn nothing. We discard it, and the
      merged node becomes the new root. The height drops back to 1: A
      B-tree shrinks at the top, just as it grows at the top.

      If you keep the old root and write it, you count 3 writes
      instead of 2 for the last deletion.

   #. An insertion reads one node per level, that is, :math:`h + 1`
      reads. In the worst case, every node on the path splits, which
      writes two nodes per level, plus a new root:
      :math:`2(h + 1) + 1 = 2h + 3` writes. The total is
      :math:`3h + 4`. It happens when the leaf and all its ancestors
      are full, as in Question 1 (:math:`h = 1`, 7 accesses).

      A deletion also reads the path, plus at most two siblings per
      level (the left one, then the right one). At every level, the
      repair writes at most the node, its sibling, and their parent.
      Each level therefore costs a constant number of disk accesses,
      and there are :math:`h + 1` levels: :math:`O(h)` in total. (A
      careful count gives at most :math:`3h + 1` reads and
      :math:`h + 2` writes.)

   #. The tree is shortest when its nodes are full: A tree of height
      :math:`h` then holds :math:`256^h` leaves of 256 entries, that is
      :math:`256^{h+1}` entries. Since :math:`256^3 \approx 1.7 \cdot
      10^7` and :math:`256^4 \approx 4.3 \cdot 10^9`, we need
      :math:`h + 1 = 4`, so the smallest height is :math:`h = 3`.

      The tree is tallest when its nodes are as empty as possible: The
      root has two children, and every other node has 128 children or
      entries. A tree of height :math:`h \geq 1` then holds
      :math:`2 \cdot 128^{h-1}` leaves of 128 entries, that is
      :math:`2 \cdot 128^h` entries. Since :math:`2 \cdot 128^4 \approx
      5.4 \cdot 10^8 \leq 10^9` but :math:`2 \cdot 128^5 \approx 6.9
      \cdot 10^{10} > 10^9`, the largest height is :math:`h = 4`.

      A search reads one block per level, so at most 5 blocks, that
      is 50 ms. A perfectly balanced BST with :math:`10^9` nodes has
      height :math:`\lfloor \log_2 10^9 \rfloor = 29`, so a search
      reads up to 30 blocks: 300 ms, six times slower. In practice,
      the database keeps the root (and often the next level) in
      memory, which brings the B-tree down to 3 or 4 reads.

   **Common mistakes**

   - Writing only the leaf after a split, and forgetting the new node
     and the parent that gets a new key.
   - Not counting the reads of siblings during a deletion. A node can
     only borrow from a sibling once it has looked at it.
   - Forgetting to update the parent's key after borrowing. If Node A
     still holds 30 after the first deletion, a search for 28 goes to
     Leaf 2 and misses it.
   - Stopping after the leaves merge when deleting 50, although Node B
     is then left with a single child.
   - Mixing up levels and height: A tree of height :math:`h` has
     :math:`h + 1` levels, so a search reads :math:`h + 1` blocks.

   *Note:* In the lecture, the split figure keeps three entries on
   the left, whereas the Ruby code keeps two. The problem
   fixes the figure's rule, so that everyone gets the same trees.


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

.. solution:: trees/problems/prefix
   :label: trees/problems/prefix/solution
   :class: dropdown

   #. The prefix tree has 22 nodes: The root, 13 nodes that carry a
      symbol, and 8 leaves :math:`\bot`, one per word.

      .. figure:: _static/solutions/trie.svg

         The prefix tree holding :math:`S`

      The eight words total :math:`2 + 5 + 3 + 4 + 3 + 4 + 2 + 3 = 26`
      symbols, but only 13 symbol nodes are needed: Words that share a
      prefix share the nodes of that prefix.

      Without the leaves :math:`\bot`, we could not tell that "in" is
      a word: Its path is part of the path to "inner". The same goes
      for "tea" (part of "tear"), "ten" ("tend"), and "to" ("toe"). By
      contrast, "te" and "inn" label paths in the tree, but they are
      not words, since no leaf :math:`\bot` hangs below them.

   #. The compressed tree has 15 nodes:

      .. figure:: _static/solutions/trie-compressed.svg

         The compressed prefix tree holding :math:`S`

      The nodes "i" and "n" merge into "in", and every symbol whose only
      child is a leaf merges with it (for instance "r⊥").

      To check a word, we compare the rest of the word with the
      *whole* label of a child, and only move to that child when the
      label is a prefix of the rest. The word is in the tree when we
      consume it entirely and reach a node that ends with :math:`\bot`
      (or that has a child :math:`\bot`).

      - "te": we consume "t", then "e", and the word is used up. Node
        "e" has no child :math:`\bot`, so "te" is not in the tree.
      - "tend": we consume "t", "e", "n", and the rest "d" matches the
        label "d⊥". The word is in the tree.
      - "inn": we consume "in", and the rest "n" only matches the
        beginning of "ner⊥". The word is not in the tree.

   #. We walk down along :math:`p`, then collect every word below the
      node we reach:

      .. code-block:: text

         prefixSearch(root, p):
            node = root
            for each symbol c in p:
               if node has no child carrying c:
                  return {}
               node = the child of node carrying c
            results = {}
            collect(node, p, results)
            return results

         collect(node, word, results):
            for each child of node:
               if child.symbol is ⊥:
                  add word to results
               else:
                  collect(child, word + child.symbol, results)

      - "te" gives {tea, tear, ten, tend}.
      - "in" gives {in, inner}: "in" itself counts, since a word is a
        prefix of itself.
      - "tex" gives the empty set: Node "e" has no child "x".
      - The empty prefix gives the whole set :math:`S`, since we
        collect from the root.

      Walking down takes :math:`O(|p|)` steps, assuming each node finds
      a child in :math:`O(1)` (e.g., with a hash table). The collection
      visits every node below once, and there are at most as many such
      nodes as symbols in the results (plus one :math:`\bot` per
      word). The total is :math:`O(|p| + m)`, where :math:`m` is the
      total length of the words returned: The cost depends on the
      size of the answer, not on the size of the tree.

      In a compressed tree, the prefix may end in the *middle* of a
      label. With "inn", we consume "in", and the rest "n" is only the
      beginning of "ner⊥". We must then collect everything below
      "ner⊥", which gives {inner}. At each step, there are three
      cases: The label is a prefix of the rest (consume it and go on),
      the rest is a prefix of the label (stop and collect below that
      child), or neither (return the empty set).

   #. Adding "i" leaves the label "in" in the middle: "i" ends after
      its first symbol. We split the node "in" into "i", whose children
      are a new leaf :math:`\bot` and "n", which keeps the former
      children of "in". Removing "in" then deletes the leaf
      :math:`\bot` below "n". "n" is left with a single child, so it
      merges with it into "nner⊥":

      .. figure:: _static/solutions/trie-update.svg

         Left: After adding "i", the node "in" splits. Right: After
         removing "in", the node "n" merges with its last child.

      An insertion splits a node when the new word and the label share
      only a part of the label: The shared part stays in the node, and
      the rest moves down to a new child. A deletion merges a node with
      its child when the node is left with a single child. In a
      non-compressed tree, a deletion removes the nodes that lead only
      to the deleted word, climbing up until it reaches a node that
      still has other children.

   **Common mistakes**

   - Forgetting the leaf :math:`\bot` below "in" (or "tea", "ten",
     "to"), which loses the shorter words.
   - Matching only the first symbol of a label in the compressed tree,
     so that "inn" is found although it is not a word.
   - In the prefix search, returning only the leaves directly below the
     prefix node instead of the whole subtree, or forgetting the
     prefix itself when it is a word.
   - Claiming the prefix search runs in :math:`O(|p|)`. Listing
     :math:`m` symbols takes at least :math:`m` steps.


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

.. solution:: trees/problems/one-pass
   :label: trees/problems/one-pass/solution
   :class: dropdown

   #. The heights and balance factors are:

      .. list-table::
         :header-rows: 1

         * - Node
           - A
           - B
           - C
           - D
           - E
           - F
           - G
           - H
           - I
           - J
         * - Height
           - 4
           - 3
           - 0
           - 2
           - 2
           - 1
           - 0
           - 0
           - 1
           - 0
         * - Balance
           - **+3**
           - 0
           - 0
           - +1
           - **-2**
           - +1
           - 0
           - 0
           - -1
           - 0

      Two nodes are unbalanced: A and E. ``isBalanced`` checks the root
      first, so A makes it return false at once, and the procedure never
      looks at E.

      In a perfect tree, every node is balanced, so ``isBalanced`` runs
      on every node. ``isBalanced(v)`` calls ``height`` on both
      children of :math:`v`, which visits the whole subtree of
      :math:`v`, except :math:`v` itself. A node at depth :math:`d` is
      thus visited once for each of its :math:`d` proper ancestors:
      :math:`d` times. There are :math:`2^d` nodes at depth :math:`d`,
      so the total is

      .. math::

         \sum_{d=0}^{h} d \cdot 2^d = (h - 1) \cdot 2^{h+1} + 2

      With :math:`n = 2^{h+1} - 1`, that is about :math:`n \log_2 n`:
      ``isBalanced`` runs in :math:`O(n \log n)` on a perfect tree. Most
      nodes are deep, and each of them is visited once per ancestor.

   #. A single post-order traversal computes the heights and checks
      the balance along the way:

      .. code-block:: text

         checkHeight(node):
            if node is null:
               return -1
            left = checkHeight(node.left)
            if left is UNBALANCED:
               return UNBALANCED
            right = checkHeight(node.right)
            if right is UNBALANCED:
               return UNBALANCED
            if abs(left - right) > 1:
               return UNBALANCED
            return 1 + max(left, right)

         isBalanced(root):
            return checkHeight(root) is not UNBALANCED

      Each node is visited at most once and does a constant amount of
      work, so the procedure runs in :math:`O(n)`.

      On the tree from the figure, the calls return in post-order: H
      (0), F (1), G (0), D (2), J (0), I (1), then E, whose children
      have heights :math:`-1` and 1, returns UNBALANCED. B and A pass it
      up without further checks. The imbalance is revealed at E, the
      *lowest* unbalanced node, and C is never visited.

   #. The diameter is 6, along H, F, D, B, E, I, J. Its highest node is
      B, not the root: The longest path through A (from H or J to C)
      has only 5 edges.

      The procedure is correct because every path has a single highest
      node :math:`v`. Either the path goes down into both subtrees of
      :math:`v`, and then its longest version has
      :math:`h(L) + 1 + h(R) + 1` edges, or it stays entirely within
      one subtree, where the recursive calls find it. With
      :math:`h(\varnothing) = -1`, the formula also gives 0 for a leaf
      and :math:`h + 1` for a node with a single child.

      On a tree where every node has a single child (a single branch
      of :math:`n` nodes), each call computes the height of the whole
      branch below it: :math:`(n - 1) + (n - 2) + \ldots + 1`, that is
      :math:`O(n^2)`. Returning the height together with the diameter
      avoids recomputing it:

      .. code-block:: text

         heightAndDiameter(node):
            if node is null:
               return (-1, 0)
            (hl, dl) = heightAndDiameter(node.left)
            (hr, dr) = heightAndDiameter(node.right)
            height = 1 + max(hl, hr)
            diameter = max(hl + hr + 2, dl, dr)
            return (height, diameter)

      It visits every node once and runs in :math:`O(n)`.

   #. A path whose highest node is :math:`v` goes down through at most
      two of its children. To make it as long as possible, we pick the
      two *tallest* ones:

      .. code-block:: text

         heightAndDiameter(node):
            first = -1     # largest height among the children
            second = -1    # second largest
            diameter = 0
            for each child in node.children:
               (h, d) = heightAndDiameter(child)
               diameter = max(diameter, d)
               if h > first:
                  second = first
                  first = h
               else if h > second:
                  second = h
            diameter = max(diameter, first + second + 2)
            return (1 + first, diameter)

      Starting both heights at :math:`-1` handles leaves and nodes
      with a single child, as before. The procedure still visits every
      node once, in :math:`O(n)`.

      On the tree from Problem 1, the children of R have heights 1 (S),
      0 (T), 2 (U), and 0 (V). The two tallest give
      :math:`2 + 1 + 2 = 5`, and no other node does better (S gives 2,
      U and Y give 1). The diameter is 5, between Z and W (or X), along
      Z, Y, U, R, S, W.

   **Common mistakes**

   - Counting nodes instead of edges, which gives a diameter of 7
     instead of 6.
   - Assuming the longest path passes through the root, and answering
     :math:`h(L) + h(R) + 2 = 5`.
   - Using :math:`-2` as the "unbalanced" value without checking for
     it. A child returning :math:`-2` next to an empty sibling
     (:math:`-1`) then passes the test :math:`|{-2} - ({-1})| \leq 1`,
     and the imbalance gets lost.
   - In Question 4, combining the first two children instead of the
     two tallest ones.


Going Further
=============

These problems go beyond the lectures: Huffman coding and scapegoat
trees are not part of the syllabus. Both build directly on this
module, though. Huffman codes are binary prefix trees, and scapegoat
trees are another way to keep a search tree balanced. Each problem
starts with a short background that introduces everything you need.

.. exercise:: Squeezing BANANA BANDANA ★★★
   :label: trees/problems/huffman

   **Background.** A computer stores text as a sequence of bits, so
   every symbol needs a *code*: A sequence of bits that stands for
   it. The simplest choice gives every symbol a code of the same
   length. With five symbols, three bits each are enough, for example
   A = 000, B = 001, and so on. But some symbols are much more frequent
   than others. If we give them shorter codes, and give longer codes to
   the rare ones, the whole text takes fewer bits.

   Codes of different lengths raise a problem, though: Where does one
   code end and the next begin? A code is *prefix-free* when no code is
   the beginning (the prefix) of another one. With a prefix-free code,
   we can read the bits from left to right, and as soon as the bits
   read so far form a code, we know which symbol it stands for.

   A prefix-free code is a binary tree. Every symbol sits in a leaf,
   and its code describes the path from the root to that leaf: 0 means
   "go to the left child" and 1 means "go to the right child". This is
   the prefix tree of :doc:`Lecture 5.6 </trees/tries/index>`, over the
   alphabet :math:`\{0, 1\}`. Because no code is the prefix of another,
   every code ends in a leaf, and we need no :math:`\bot` marker. To
   decode, we start at the root and follow the bits. Whenever we reach
   a leaf, we output its symbol and jump back to the root.

   *Huffman's algorithm* builds the best such tree for a given text.
   It uses a minimum priority queue, as in :doc:`Lecture 5.3
   </trees/heap/index>`, whose items are trees and whose priorities
   are *weights*:

   #. Count how often each symbol occurs. For each symbol, enqueue a
      tree made of a single leaf, whose weight is that count.
   #. While the queue holds more than one tree, dequeue the two
      lightest trees, join them as the left and right children of a new
      root, and enqueue the result, whose weight is the sum of their
      weights.
   #. The last tree left in the queue is the code tree.

   The algorithm leaves ties open: When several trees have the same
   weight, any choice is allowed.

   **Problem.** We want to store the text "BANANA BANDANA", where the
   space " " counts as a symbol, written ␣. Consider the following
   three codes:

   .. list-table::
      :header-rows: 1

      * - Symbol
        - A
        - N
        - B
        - D
        - ␣
      * - Code 1
        - 0
        - 1
        - 01
        - 10
        - 11
      * - Code 2
        - 00
        - 01
        - 10
        - 110
        - 111
      * - Code 3
        - 000
        - 001
        - 010
        - 011
        - 100

   #. Which of these codes are prefix-free? For Code 1, find a
      sequence of bits that can be decoded in two different ways. Draw
      the trees of the other two codes, and use the tree of Code 2 to
      decode 110000100.

   #. How many bits does the text take with Code 2? With Code 3?

   #. Run Huffman's algorithm on the text. Give the content of the
      priority queue after every step, draw the resulting tree, and
      give the code of every symbol. How many bits does the text take
      now? Does a different way of breaking the ties change this
      number?

   #. Show that in a best code tree (one that minimises the total
      number of bits), every internal node has exactly two children.

      Then show that there is always a best tree where the two least
      frequent symbols are siblings, at the deepest level. This is the
      key step in proving that Huffman's algorithm is optimal.

      *Hint:* What happens to the total number of bits if you swap a
      frequent symbol with a rarer one that sits deeper in the tree?

   #. A text uses :math:`m` different symbols. What is the time
      complexity of Huffman's algorithm, once the symbols are counted,
      if the priority queue is a binary heap? Find a text with four
      different symbols where the Huffman code saves nothing compared
      with a code where every symbol takes two bits.

.. solution:: trees/problems/huffman
   :label: trees/problems/huffman/solution
   :class: dropdown

   #. Code 1 is *not* prefix-free: A = 0 is the prefix of B = 01, and
      N = 1 is the prefix of D = 10 and ␣ = 11. The bits 01 decode
      either as B, or as A followed by N. (Other answers work too,
      e.g., 10 is D or NA.)

      Codes 2 and 3 are prefix-free. For Code 3 it is immediate: All
      codes have the same length and are different, so none can be the
      beginning of another.

      .. figure:: _static/solutions/huffman-codes.svg

         Left: The tree of Code 2. Right: The tree of Code 3, where two
         nodes have a single child.

      With Code 2, 110000100 splits as 110 · 00 · 01 · 00, that is,
      D, A, N, A: "DANA".

   #. The text has 14 symbols: A occurs 6 times, N 4 times, B twice,
      and D and ␣ once each. Code 2 takes
      :math:`6 \cdot 2 + 4 \cdot 2 + 2 \cdot 2 + 1 \cdot 3 + 1 \cdot 3
      = 30` bits, and Code 3 takes :math:`14 \cdot 3 = 42` bits.

   #. Writing every tree with its weight, the queue evolves as follows
      (D␣ is the tree joining D and ␣, and so on):

      .. list-table::
         :header-rows: 1

         * - Step
           - Dequeued
           - Queue afterwards
         * - Start
           -
           - D:1, ␣:1, B:2, N:4, A:6
         * - 1
           - D:1, ␣:1
           - B:2, D␣:2, N:4, A:6
         * - 2
           - B:2, D␣:2
           - N:4, BD␣:4, A:6
         * - 3
           - N:4, BD␣:4
           - A:6, NBD␣:8
         * - 4
           - A:6, NBD␣:8
           - ANBD␣:14

      .. figure:: _static/solutions/huffman.svg

         The Huffman tree of "BANANA BANDANA". Internal nodes show
         their weight.

      The codes are A = 0, N = 10, B = 110, D = 1110, and ␣ = 1111.
      The text takes :math:`6 \cdot 1 + 4 \cdot 2 + 2 \cdot 3 + 1
      \cdot 4 + 1 \cdot 4 = 28` bits, a third less than Code 3, and 2
      bits less than Code 2.

      Here, the ties do not change the code lengths: At each step,
      exactly two trees have the smallest weights, so the only choice
      is which one goes left, which swaps 0s and 1s. In general, ties
      can change the code lengths, but never the total. For the
      weights 1, 1, 2, 2, joining the two leaves of weight 2 gives four
      codes of length 2, whereas joining the tree of weight 2 with a
      leaf gives lengths 1, 2, 3, 3. Both take 12 bits.

   #. *Every internal node has two children.* Assume an internal node
      :math:`v` has a single child. Remove :math:`v`, and hang its
      child in its place. The code stays prefix-free (symbols are
      still in the leaves), and every symbol below :math:`v` loses one
      bit. Since every symbol occurs at least once, the total
      decreases, so the tree was not a best one. Code 3 shows this:
      Replacing ␣ = 100 by ␣ = 1 saves 2 bits.

      *The two rarest symbols can be deepest siblings.* Take a best
      tree, and a leaf :math:`a` at the largest depth. Its parent has
      two children, and the other one, :math:`b`, is also a leaf:
      Otherwise, there would be a deeper leaf. Let :math:`x` and
      :math:`y` be the two rarest symbols, with frequencies
      :math:`f(x) \leq f(a)` and depths :math:`d(x) \leq d(a)`.
      Swapping :math:`x` and :math:`a` changes the total by

      .. math::

         f(x)\,d(a) + f(a)\,d(x) - f(x)\,d(x) - f(a)\,d(a)
         = -\big(f(a) - f(x)\big)\big(d(a) - d(x)\big) \leq 0

      So the swap cannot make the tree worse, and the tree stays a best
      one. Swapping :math:`y` and :math:`b` the same way puts
      :math:`x` and :math:`y` side by side at the deepest level. (If
      :math:`x` or :math:`y` is already :math:`a` or :math:`b`, skip
      the corresponding swap.)

      *To finish the proof:* The rest is an induction on the
      number of symbols. Merging :math:`x` and :math:`y` into a single
      symbol of frequency :math:`f(x) + f(y)` gives a smaller problem,
      and any tree :math:`T` for the original symbols where they are
      siblings costs exactly :math:`f(x) + f(y)` more than the merged
      tree :math:`T'`. This is what Huffman's first step does.

   #. The queue starts with :math:`m` trees, and every step replaces
      two trees by one, so there are :math:`m - 1` steps. Each one
      makes two dequeues and one enqueue, in :math:`O(\log m)` each.
      In total: :math:`O(m \log m)`. (Filling the queue with
      :math:`m` insertions also takes :math:`O(m \log m)`, or
      :math:`O(m)` with heapify.)

      With four symbols that occur equally often, e.g., "ABCD",
      Huffman joins A with B, then C with D, then the two trees: Every
      symbol gets 2 bits, exactly as with a fixed-length code. In
      general, a fixed-length code is already optimal when the
      frequencies are close to each other: With 3, 3, 2, 2, Huffman
      also gives every symbol 2 bits.

   **Common mistakes**

   - Forgetting the space, or counting it twice, and working with 13
     or 15 symbols.
   - Claiming that Code 3 is not prefix-free because "000 starts with
     0". Prefix-free is about whole codes, not about single bits.
   - Dequeuing the trees by number of symbols instead of by weight.
   - Claiming that the Huffman tree is unique. It is not, but its
     total cost is.
   - In Question 4, swapping in the wrong direction (moving the rare
     symbol up), and concluding that the total increases.


.. exercise:: Scapegoat Trees ★★★★
   :label: trees/problems/scapegoat

   **Background.** AVL trees stay balanced by storing extra
   information in every node, and by fixing the tree with rotations
   after every insertion and deletion. Scapegoat trees take a lazier
   approach: Nodes store nothing but their item and their two
   children, and the tree is a plain BST most of the time. Only when a
   new node lands too deep do we pick one subtree, the *scapegoat*,
   and rebuild it from scratch.

   We fix a parameter :math:`\alpha` with :math:`1/2 < \alpha < 1`. In
   this problem, :math:`\alpha = 2/3`. The *size* of a node is the
   number of nodes in its subtree, as in
   :numref:`trees/problems/counting`, and the root has depth 0. A node
   :math:`w` is *weight-balanced* when each of its children has a size
   of at most :math:`\alpha \cdot \mathrm{size}(w)`: Neither side holds
   much more than its share of the nodes.

   A scapegoat tree with :math:`n` nodes handles an insertion as
   follows:

   #. Insert the new node :math:`x` as in a plain BST (see
      :doc:`Lecture 5.2 </trees/bst/index>`).
   #. If the depth of :math:`x` is at most :math:`\log_{1/\alpha} n`,
      where :math:`n` now counts :math:`x`, stop here.
   #. Otherwise, walk up from :math:`x` towards the root, and stop at
      the first ancestor :math:`w` that is *not* weight-balanced. This
      node is the scapegoat.
   #. Rebuild the subtree rooted at :math:`w` into a perfectly
      balanced tree: List its :math:`m` items in order (with an
      in-order traversal), make the item at position
      :math:`\lceil m/2 \rceil` the new root, and build its left and
      right subtrees the same way, from the items on each side.

   **Problem.**

   #. Starting from an empty scapegoat tree, insert the keys 10, 20,
      30, 40, 50, 60, and 70, in this order. Draw the tree after every
      insertion. Whenever the new node lands too deep, give the size
      of every ancestor you check on the way up, say which node is the
      scapegoat, and draw the tree after the rebuild.

      Compare the final height with that of a plain BST built from the
      same insertions.

   #. Show that, whenever the new node :math:`x` lands too deep, the
      walk up always finds a scapegoat.

      *Hint:* Assume that every ancestor of :math:`x` is
      weight-balanced. Going down one step from the root, how much can
      the size shrink at most? What does this give for the size of
      :math:`x`?

      One can show that the rebuild always brings :math:`x` back within
      the bound. What is then the largest possible height of a
      scapegoat tree with :math:`n` nodes, built by insertions only?
      Compare it with the bound :math:`1.44 \log_2 n` of AVL trees.

   #. How long does it take to rebuild a subtree with :math:`m` nodes?
      Find a sequence of insertions where a single insertion triggers
      a rebuild of :math:`\Theta(n)` nodes.

      Since the nodes do not store their size, the walk up must compute
      it. Show that finding the scapegoat takes
      :math:`O(\mathrm{size}(w))` time, so it costs no more than the
      rebuild itself.

      *Hint:* When you step up from a child :math:`u` to its parent,
      you already know the size of :math:`u`. Which subtree do you
      still need to count?

   #. Rebuilding is expensive, but it should not happen often. Right
      after a rebuild, the scapegoat :math:`w` has :math:`m` nodes in
      its subtree and is perfectly balanced. Show that at least
      :math:`\Omega(m)` insertions into the subtree of :math:`w` must
      happen before :math:`w` can be a scapegoat again.

      Deduce that :math:`n` insertions into an empty scapegoat tree
      take :math:`O(n \log n)` time in total, so that each insertion
      costs :math:`O(\log n)` on average.

      *Hint:* Pay for each rebuild with the insertions that made it
      necessary. Under how many scapegoats can a single inserted node
      sit?

.. solution:: trees/problems/scapegoat
   :label: trees/problems/scapegoat/solution
   :class: dropdown

   #. With :math:`\alpha = 2/3`, the bound is
      :math:`\log_{3/2} n`, which gives 0, 1.71, 2.71, 3.42, 3.97,
      4.42, and 4.80 for :math:`n = 1, \ldots, 7`. Every key is larger
      than the previous ones, so it always goes to the right.

      - Inserting 10, 20, 30, and 40 gives a single branch to the
        right, where 40 sits at depth :math:`3 \leq 3.42`. No rebuild.

      - 50 lands at depth :math:`4 > 3.97`. Walking up, we check 40
        (size 2, child 50 of size 1, limit 1.33: balanced), then 30
        (size 3, child 40 of size 2, limit 2: balanced, just), then
        20 (size 4, child 30 of size 3, limit 2.67: *not* balanced).
        The scapegoat is 20. Its items are 20, 30, 40, 50, so the new
        root is the 2nd one, 30. Its left subtree is 20, and its right
        subtree is 40 with the right child 50. Node 50 now sits at
        depth 3.

      - 60 lands at depth :math:`4 \leq 4.42`. No rebuild.

      - 70 lands at depth :math:`5 > 4.80`. Walking up, we check 60
        (size 2, limit 1.33: balanced), 50 (size 3, child of size 2,
        limit 2: balanced), and 40 (size 4, child of size 3, limit
        2.67: not balanced). The scapegoat is 40. Rebuilding 40, 50,
        60, 70 makes 50 the root, with 40 on its left, and 60 on its
        right, which has 70 as right child.

      .. figure:: _static/solutions/scapegoat.svg

         (a) After inserting 50: 20 is the scapegoat. (b) After the
         rebuild. (c) After inserting 70: 40 is the scapegoat. (d) The
         final tree.

      The final tree has height 4, against 6 for the plain BST, which
      is a single branch. Note that the root 10 is *not*
      weight-balanced (its right child has size 6), yet nothing forces
      us to fix it: A scapegoat tree only enforces the depth bound,
      not weight balance everywhere.

   #. Let :math:`u_0, u_1, \ldots, u_d = x` be the path from the root
      to :math:`x`, where :math:`d > \log_{1/\alpha} n`. Assume that
      every ancestor :math:`u_0, \ldots, u_{d-1}` is weight-balanced.
      Then :math:`\mathrm{size}(u_{i+1}) \leq \alpha \cdot
      \mathrm{size}(u_i)` at every step, and

      .. math::

         1 = \mathrm{size}(x) \leq \alpha^d \cdot \mathrm{size}(u_0)
         = \alpha^d \, n

      that is, :math:`(1/\alpha)^d \leq n`, or
      :math:`d \leq \log_{1/\alpha} n`. This contradicts the
      assumption, so some ancestor is not weight-balanced, and the walk
      up finds it.

      If every insertion leaves the new node within the bound, no node
      ever sits deeper than :math:`\log_{1/\alpha}` of the number of
      nodes at the time, and that number only grows. With
      :math:`\alpha = 2/3`, the height is at most

      .. math::

         \log_{3/2} n = \frac{\log_2 n}{\log_2 (3/2)}
         \approx 1.71 \log_2 n

      This is a looser bound than the :math:`1.44 \log_2 n` of AVL
      trees, but still :math:`O(\log n)`, without storing anything in
      the nodes. Choosing :math:`\alpha` closer to :math:`1/2` tightens
      the bound, at the price of more frequent rebuilds.

   #. The in-order traversal lists the :math:`m` items into an array in
      :math:`O(m)`. Building the balanced tree creates one node per
      item, and each call does a constant amount of work besides its
      recursive calls (picking the middle of a slice of the array, not
      copying it), so it also takes :math:`O(m)`. A rebuild takes
      :math:`\Theta(m)` time.

      Inserting the keys 1, 2, 3, … in increasing order triggers ever
      larger rebuilds: Every key goes to the right-most branch, which
      keeps growing until a node high up becomes the scapegoat. For
      instance, the 24th insertion rebuilds a subtree of 23 nodes, the
      413th rebuilds 363 nodes, and the 880th rebuilds 648 nodes.
      (These figures come from a simulation; it is enough to argue
      that a subtree holding a constant fraction of the tree
      gets rebuilt.)

      To find the scapegoat, we know that :math:`\mathrm{size}(x) = 1`.
      Stepping up from a child :math:`u` to its parent :math:`p`, we
      only need to count the *other* child :math:`s` of :math:`p`:
      :math:`\mathrm{size}(p) = \mathrm{size}(u) + \mathrm{size}(s) +
      1`, which costs :math:`O(\mathrm{size}(s))` with the ``size``
      procedure from Problem 1. All these siblings lie in the subtree
      of the scapegoat :math:`w`, and they are disjoint, so the walk
      costs :math:`O(\mathrm{size}(w))` in total, plus one step per
      level.

   #. Right after the rebuild, each child of :math:`w` has at most
      :math:`m/2` nodes. Assume :math:`k` insertions then land in the
      subtree of :math:`w` before it becomes a scapegoat again (with
      insertions only, nothing ever leaves it). Its size is then
      :math:`m + k`, and its heavy child holds at most :math:`m/2 + k`
      nodes. For :math:`w` to be a scapegoat, we need

      .. math::

         \frac{m}{2} + k > \frac{2}{3}(m + k)
         \quad\Longleftrightarrow\quad
         k > \frac{m}{2}

      So more than :math:`m/2` insertions must land below :math:`w`.
      This also gives :math:`m + k < 3k`: The rebuild of :math:`w`,
      which costs :math:`O(m + k)`, costs :math:`O(k)`. The same holds
      for a node that has never been rebuilt: It was created as a leaf,
      so we can apply the argument with :math:`m = 1`.

      We can thus pay for each rebuild by charging a constant amount to
      each of the :math:`k` insertions that landed below the scapegoat
      since its last rebuild. A given insertion of :math:`x` is charged
      at most once by each of its ancestors at the time it was
      inserted: Once an ancestor is rebuilt, it starts counting from
      zero again, and the nodes created by a rebuild above :math:`x`
      only count insertions made after :math:`x`. Since the height is
      :math:`O(\log n)`, each insertion is charged :math:`O(\log n)`.

      In total, :math:`n` insertions cost :math:`O(n \log n)` for the
      walks down (each one is :math:`O(\log n)` deep), plus
      :math:`O(n \log n)` for all the rebuilds, so :math:`O(\log n)`
      per insertion on average. A single insertion can still cost
      :math:`\Theta(n)`, as Question 3 shows: Unlike AVL trees,
      scapegoat trees only guarantee a good *average* cost.

   **Common mistakes**

   - Checking the depth against :math:`\log_{3/2}` of the size
     *before* the insertion. With :math:`n = 3` instead of 4, the
     trace already rebuilds when inserting 40.
   - Stopping at the first node whose children have different sizes,
     instead of the first one that breaks the :math:`\alpha` limit. In
     Question 1, this wrongly picks 40 as the first scapegoat.
   - Rebuilding the whole tree instead of the scapegoat's subtree, or
     picking the upper middle (:math:`\lfloor m/2 \rfloor + 1`) when
     :math:`m` is even.
   - In Question 4, charging every insertion to every rebuild, which
     only gives :math:`O(n)` per insertion.
