===========
Problem Set
===========

:Objectives: Practice the concepts introduced in the *Graphs* module

This problem set is optional practice. Work on it wherever you like,
alone or in groups, and with any resources you find useful. Unless a
problem says otherwise, answer with pen and paper.

Problems are roughly ordered by difficulty, from ★ (warm-up) to ★★★★
(challenging). Every problem comes with a solution, hidden in a dropdown
below it. Give the problem a real try before you open it: Most of the
learning happens while you are stuck.


Spanning Trees
==============

.. exercise:: Prim and Kruskal by Hand ★★
   :label: graphs/problems/by-hand

   Consider the weighted graph shown on
   :numref:`graphs/problems/by-hand/graph`.

   .. figure:: _static/images/spanning_exercise.svg
      :name: graphs/problems/by-hand/graph

      A weighted graph with six vertices

   #. Trace Prim's algorithm, starting from A. List the edges in the
      order in which the algorithm adds them to the tree.

   #. Trace Kruskal's algorithm. List the edges in the order in which
      it adds them, and say which ones it skips.

   #. Do the two algorithms produce the same tree? Why, or why not?

.. solution:: graphs/problems/by-hand
   :label: graphs/problems/by-hand/solution
   :class: dropdown

   #. Starting from A, the edges leaving the tree are AB (6) and AC
      (4), so Prim's algorithm takes AC. It then takes the cheapest edge
      leaving {A, C}, which is CD (2), then BD (3), then DE (5), and
      finally EF (7). The edges are added in this order:

      AC (4), CD (2), BD (3), DE (5), EF (7).

   #. Kruskal's algorithm goes through the edges in increasing order of
      weight. It adds CD (2), BD (3), AC (4) and DE (5). It then skips AB
      (6), because A and B are already connected, through C and D: adding
      it would create a cycle. It adds EF (7), which gives the five edges
      we need for six vertices. The two remaining edges, CF (8) and BE
      (9), would both be skipped.

   #. Yes, they produce the same tree, which weighs 21 and is shown on
      :numref:`graphs/problems/by-hand/tree`. They only differ in the
      order in which they add the edges. This is no coincidence: all the
      weights in this graph are different, and then there is only *one*
      minimum spanning tree (see the last problem). Both algorithms must
      find it.

      .. figure:: _static/images/spanning_exercise_solution.svg
         :name: graphs/problems/by-hand/tree

         The minimum spanning tree (in bold), with a total weight of 21


.. exercise:: Network Design ★★★
   :label: graphs/problems/network

   A city wants to connect eight neighborhoods, A to H, with fiber optic
   cables. The table below gives the cost (in millions) of laying a cable
   directly between two neighborhoods. A dash means that no cable can be
   laid between them.

   .. list-table::
      :header-rows: 1
      :stub-columns: 1
      :align: center

      * - 
        - **A**
        - **B**
        - **C**
        - **D**
        - **E**
        - **F**
        - **G**
        - **H**
      * - **A**
        - ·
        - 13
        - 8
        - 26
        - 27
        - 14
        - –
        - 21
      * - **B**
        - 13
        - ·
        - –
        - –
        - –
        - 3
        - 2
        - 28
      * - **C**
        - 8
        - –
        - ·
        - –
        - –
        - –
        - 25
        - 18
      * - **D**
        - 26
        - –
        - –
        - ·
        - 19
        - –
        - 29
        - –
      * - **E**
        - 27
        - –
        - –
        - 19
        - ·
        - –
        - 4
        - –
      * - **F**
        - 14
        - 3
        - –
        - –
        - –
        - ·
        - –
        - –
      * - **G**
        - –
        - 2
        - 25
        - 29
        - 4
        - –
        - ·
        - –
      * - **H**
        - 21
        - 28
        - 18
        - –
        - –
        - –
        - –
        - ·

   Find a minimum spanning tree using Prim's algorithm, starting from A,
   and then using Kruskal's algorithm. What is the minimum total cost?

.. solution:: graphs/problems/network
   :label: graphs/problems/network/solution
   :class: dropdown

   **Prim's algorithm**, starting from A, adds the edges in this
   order:

   AC (8), AB (13), BG (2), BF (3), EG (4), CH (18), DE (19).

   For instance, the first step takes AC (8), the cheapest of the six
   cables leaving A. Once B is in the tree, the cheap edges BG (2) and BF
   (3) become available, and so does EG (4) after that.

   **Kruskal's algorithm** goes through the cables from the cheapest to
   the most expensive. It adds BG (2), BF (3), EG (4), AC (8) and AB (13).
   It skips AF (14), because A and F are already connected through B. It
   adds CH (18) and DE (19), which gives the seven edges we need for eight
   neighborhoods.

   Both algorithms find the same seven cables: AB, AC, BF, BG, CH, DE and
   EG. The minimum total cost is

   .. math::

      2 + 3 + 4 + 8 + 13 + 18 + 19 = 67 \text{ million.}


.. exercise:: Why Is the Cheapest Tree Unique? ★★★
   :label: graphs/problems/unique

   If all the edge weights in a connected graph are different, then there
   is only one minimum spanning tree. Explain, in your own words, why this
   is the case.

   *Hint*: Suppose there are two different minimum spanning trees, and
   think about swapping one edge for another.

.. solution:: graphs/problems/unique
   :label: graphs/problems/unique/solution
   :class: dropdown

   Suppose there are two different minimum spanning trees, :math:`T_1`
   and :math:`T_2`. Since they are different, one of them has an edge
   :math:`e` that the other does not. Say :math:`e` is in :math:`T_1`.

   If we remove :math:`e` from :math:`T_1`, the tree falls apart in two
   groups of vertices. But :math:`T_2` also connects the two ends of
   :math:`e`, through a path. This path has to go from one group to the
   other somewhere, through some edge :math:`f` of :math:`T_2`. The edge
   :math:`f` is not :math:`e`, since :math:`T_2` does not have :math:`e`.

   Now compare the weights of :math:`e` and :math:`f`. They are different,
   since all the weights are.

   - If :math:`e` is cheaper than :math:`f`, we can swap :math:`f` for
     :math:`e` in :math:`T_2`. We still have a spanning tree, but a
     cheaper one: :math:`T_2` was not a minimum spanning tree.

   - If :math:`f` is cheaper than :math:`e`, we can swap :math:`e` for
     :math:`f` in :math:`T_1`, and :math:`T_1` was not a minimum spanning
     tree.

   Either way, one of the two trees was not minimal, which contradicts
   our assumption. So there cannot be two different minimum spanning
   trees.
