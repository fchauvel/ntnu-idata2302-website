===========
Problem Set
===========

:Objectives: Practice the concepts introduced in the *Graphs* module

This problem set is optional practice. Work on it wherever you like,
alone or in groups, and with any resources you find useful. Unless a
problem says otherwise, answer with pen and paper or in pseudocode;
implementation tasks can be done in any programming language.

Problems are roughly ordered by difficulty, from ★ (warm-up) to ★★★★
(challenging). The last problem introduces a topic that is *not*
covered in the lectures: It starts with a short background that gives
you everything you need.

Every problem comes with a solution, hidden in a dropdown below it.
Give the problem a real try before you open it: Most of the learning
happens while you are stuck.

The set closes with three *case studies*. These are not exercises
with a single right answer, but open-ended explorations of famous
graph problems: Easy to state, sometimes very hard (or even
impossible, as far as anyone knows) to solve. Go as far as your
curiosity takes you. Instead of a solution, each one comes with a
dropdown of resources and ideas to help you dig further.


Core Problems
=============

.. exercise:: Handshakes ★
   :label: graphs/problems/handshakes

   Seven people meet at a party, and some of them shake hands. We
   model the party as a simple graph, where vertices are people and
   an edge means that two people shook hands, as shown on
   :numref:`graphs/problems/handshakes/graph`. Recall from
   :doc:`Lecture 6.1 </graphs/intro/index>` that the *degree* of a
   vertex is the number of edges incident to it.

   .. figure:: _static/images/handshakes.svg
      :name: graphs/problems/handshakes/graph

      Who shook hands with whom

   #. Give the degree of every vertex. Add them up, and compare the
      sum with the number of edges. Explain why, in *any* simple
      graph :math:`G = (V, E)`, we have

      .. math::

         \sum_{v \in V} \mathrm{degree}(v) = 2 \cdot |E|

   #. Deduce that every graph has an *even* number of vertices with
      an odd degree. Check it on the party. Could seven people each
      shake hands with exactly three others?

   #. At the next party, everyone shakes hands with everyone else
      exactly once. Which graph from the lecture's jargon is this? How
      many handshakes happen with seven people? With :math:`n`
      people?

   #. Now consider a *directed* graph, for instance the food web of
      :numref:`food_web`. What becomes of the formula from Question 1
      when we count in-degrees and out-degrees?

   #. Show that at *any* party with at least two people, two people
      shook the same number of hands.

      *Hint:* With :math:`n` people, which degrees are possible? Can
      someone who shook no hands be at the same party as someone who
      shook everyone's hand?

.. solution:: graphs/problems/handshakes
   :label: graphs/problems/handshakes/solution
   :class: dropdown

   #. The degrees are:

      .. list-table::
         :header-rows: 1

         * - Vertex
           - A
           - B
           - C
           - D
           - E
           - F
           - G
         * - Degree
           - 3
           - 2
           - 3
           - 2
           - 3
           - 2
           - 1

      They add up to 16, twice the 8 edges. This holds in general
      because every edge :math:`\{u, v\}` has exactly two ends: It
      counts once in the degree of :math:`u` and once in the degree of
      :math:`v`. Summing all the degrees counts every edge exactly
      twice. This result is known as the *handshake lemma*.

   #. Split the sum of the degrees into the vertices of even degree
      and those of odd degree. The total is even, and so is the sum
      over the even degrees. The sum over the odd degrees must
      therefore be even too, and a sum of odd numbers is even only if
      there is an even number of them. At the party, A, C, E, and G
      have an odd degree: Four of them.

      Seven people with three handshakes each would give a sum of
      degrees of :math:`7 \cdot 3 = 21`, which is odd. This is
      impossible: It would require 10.5 handshakes.

   #. Every pair of vertices is adjacent: This is the *complete
      graph*, often written :math:`K_n`. Each of the :math:`n` people
      shakes :math:`n - 1` hands, so the sum of the degrees is
      :math:`n(n-1)` and there are :math:`n(n-1)/2` handshakes, that
      is 21 for seven people. This is also the largest number of edges
      a simple graph with :math:`n` vertices can have.

   #. Every arc :math:`(u, v)` adds one to the out-degree of
      :math:`u` and one to the in-degree of :math:`v`. Therefore:

      .. math::

         \sum_{v \in V} \mathrm{in}(v) = \sum_{v \in V} \mathrm{out}(v) = |E|

      In the food web, there are 9 arcs, so both sums equal 9.

   #. With :math:`n` people, the possible degrees are :math:`0, 1,
      \ldots, n - 1`: That is :math:`n` values for :math:`n` people,
      which is not enough to force a repetition yet. But a person with
      degree 0 and a person with degree :math:`n - 1` cannot both be
      at the party: The second one shook *everyone's* hand, including
      the first one's. So at most :math:`n - 1` values are actually
      used by :math:`n` people, and by the *pigeonhole principle*, two
      people share the same degree.

   **Common mistakes**

   - Counting each edge once, and concluding that the sum of the
     degrees equals :math:`|E|`.
   - Answering :math:`n^2` or :math:`n(n-1)` handshakes in Question 3,
     forgetting that "A shakes B's hand" and "B shakes A's hand" are
     the same handshake.
   - In Question 5, stopping at ":math:`n` possible values for
     :math:`n` people", which does not force a repetition on its own.


.. exercise:: Reading the Matrix ★
   :label: graphs/problems/matrix

   :doc:`Lecture 6.1 </graphs/intro/index>` describes a graph by its
   *adjacency matrix*: The cell :math:`a_{ij}` holds the number of
   edges from vertex :math:`i` to vertex :math:`j`. Consider the
   following two matrices, where the vertices are ordered
   alphabetically, :math:`(A, B, C, D, E)` and :math:`(P, Q, R, S)`:

   .. math::

      A = \begin{bmatrix}
      0 & 1 & 0 & 0 & 1 \\
      1 & 0 & 1 & 0 & 1 \\
      0 & 1 & 0 & 1 & 0 \\
      0 & 0 & 1 & 0 & 1 \\
      1 & 1 & 0 & 1 & 0
      \end{bmatrix}
      \qquad
      M = \begin{bmatrix}
      0 & 1 & 1 & 0 \\
      0 & 0 & 1 & 0 \\
      1 & 0 & 1 & 1 \\
      0 & 1 & 0 & 0
      \end{bmatrix}

   #. Draw the graph of :math:`A`. Without drawing anything, how can
      you tell from the matrix alone that it is undirected, and that
      it has no loop? How do you read the degree of a vertex from the
      matrix?

   #. Draw the graph of :math:`M`. What do the sum of a row and the
      sum of a column tell you? Which features of :math:`M` prevent it
      from describing a simple graph? What would an entry equal to 2
      mean?

   #. Compute the matrix product :math:`A^2 = A \times A`. What does
      the entry in row B, column D count? What about the entries on
      the diagonal?

      *Hint:* Write down the formula for the entry :math:`(i, j)` of
      the product, :math:`\sum_k a_{ik} \cdot a_{kj}`, and ask when a
      term :math:`a_{ik} \cdot a_{kj}` equals 1.

   #. Generalise: What does the entry :math:`(i, j)` of :math:`A^k`
      count? Use :math:`A^3` to count the *triangles* (three vertices
      that are all adjacent to each other) in the graph of :math:`A`.

      *Hint:* You only need the diagonal of :math:`A^3`. How many times
      does each triangle show up there?

.. solution:: graphs/problems/matrix
   :label: graphs/problems/matrix/solution
   :class: dropdown

   #. The graph of :math:`A` has six edges: :math:`\{A,B\}`,
      :math:`\{A,E\}`, :math:`\{B,C\}`, :math:`\{B,E\}`,
      :math:`\{C,D\}`, and :math:`\{D,E\}`.

      .. figure:: _static/solutions/matrix-undirected.svg

         The graph of matrix :math:`A`

      The matrix is *symmetric* (:math:`a_{ij} = a_{ji}`): Whenever
      there is an edge from :math:`i` to :math:`j`, there is one from
      :math:`j` to :math:`i`, so we can read every pair as an
      undirected edge. Its diagonal holds only zeros, so no vertex is
      adjacent to itself. The degree of a vertex is the sum of its row
      (or column): A, C, and D have degree 2, B and E have degree 3.
      The total is 12, twice the 6 edges, as
      :numref:`graphs/problems/handshakes` predicts.

   #. The graph of :math:`M` has seven arcs: :math:`P \to Q`,
      :math:`P \to R`, :math:`Q \to R`, :math:`R \to P`, :math:`R \to
      R`, :math:`R \to S`, and :math:`S \to Q`.

      .. figure:: _static/solutions/matrix-directed.svg

         The graph of matrix :math:`M`, with a loop on R

      The sum of a row gives the out-degree of its vertex (P: 2, Q: 1,
      R: 3, S: 1), and the sum of a column its in-degree (P: 1, Q: 2,
      R: 3, S: 1). Both total 7, the number of arcs.

      :math:`M` is not symmetric (there is an arc :math:`Q \to R` but
      none :math:`R \to Q`), so the graph is directed. The 1 on the
      diagonal is a loop on R. An entry equal to 2 would mean two
      parallel edges between the same vertices: The graph would be a
      *multigraph*.

   #. The product gives:

      .. math::

         A^2 = \begin{bmatrix}
         2 & 1 & 1 & 1 & 1 \\
         1 & 3 & 0 & 2 & 1 \\
         1 & 0 & 2 & 0 & 2 \\
         1 & 2 & 0 & 2 & 0 \\
         1 & 1 & 2 & 0 & 3
         \end{bmatrix}

      A term :math:`a_{ik} \cdot a_{kj}` is 1 exactly when there is an
      edge from :math:`i` to :math:`k` *and* one from :math:`k` to
      :math:`j`. The entry :math:`(i, j)` of :math:`A^2` therefore
      counts the *walks of length 2* from :math:`i` to :math:`j`, that
      is, in an undirected graph, the common neighbours of :math:`i` and
      :math:`j`. The entry (B, D) is 2 because of the walks B–C–D and
      B–E–D. On the diagonal, a walk of length 2 from :math:`i` back to
      :math:`i` goes to a neighbour and returns, so the diagonal holds
      the degrees.

   #. By the same argument, applied :math:`k - 1` times, the entry
      :math:`(i, j)` of :math:`A^k` counts the walks of length
      :math:`k` from :math:`i` to :math:`j`.

      In a simple graph, a walk of length 3 from :math:`i` back to
      :math:`i` must visit two other vertices that are adjacent to
      :math:`i` and to each other: It goes around a triangle. Each
      triangle appears 6 times on the diagonal: Once for each of its
      three vertices, in each of the two directions. The diagonal of
      :math:`A^3` is :math:`(2, 2, 0, 0, 2)`, so the graph has
      :math:`6 / 6 = 1` triangle, namely A, B, E.

   **Common mistakes**

   - Reading a non-symmetric matrix as an undirected graph, and
     drawing a single line for :math:`R \to P` and :math:`P \to R`
     but also one for :math:`Q \to R` alone.
   - Mixing up rows and columns, which reverses every arc of
     :math:`M`. With the lecture's convention, row :math:`i` lists the
     arcs *leaving* :math:`i`.
   - Thinking that :math:`A^2` counts *paths* of length 2. Walks may
     repeat vertices: The diagonal entries are walks such as A–B–A.
   - Dividing the trace of :math:`A^3` by 3 instead of 6, forgetting
     that each triangle can be walked in two directions.


.. exercise:: Mind the Map ★
   :label: graphs/problems/subway

   In 1933, Harry Beck redrew the map of the London Underground. The
   new map ignored geography: Stations sit on a grid, lines only run
   horizontally, vertically, or at 45°, and the distances between
   stations are all roughly equal. It was a huge success, and most
   subway maps today, including the one of Oslo shown on
   :numref:`oslo_subway`, follow the same idea. A subway map is
   really a drawing of a *graph*.

   #. What information does such a map keep, and what does it throw
      away? Give at least two advantages and two drawbacks of drawing
      a transit network as a graph rather than as a geographic map.

   Consider now the fictional network shown on
   :numref:`graphs/problems/subway/map`, with three lines: Red
   (A–B–C–D–E), Green (A–F–J), and Blue (G–F–E–H). Riding between two
   neighbouring stations takes 2 minutes, and changing lines at a
   transfer station (double circles) takes 5 minutes.

   .. figure:: _static/images/subway.svg
      :name: graphs/problems/subway/map

      A fictional subway with three lines: Red (solid), Green
      (dashed), and Blue (dotted)

   2. Model the network as a simple graph whose vertices are the
      stations. Which algorithm finds the route from A to E with the
      fewest stops? Which route does it find, and how long does that
      trip really take? Is there a faster one?

   #. The station graph forgets which line an edge belongs to, so it
      cannot account for transfers. Design a better graph, where every
      vertex is a *platform*, that is, a pair (station, line). Which
      edges does it need, and with which weights? Use it to find the
      quickest trip from A to E, and from A to H. Which algorithm do
      you use?

      *Hint:* You may start your trip at A on any line, without
      paying for a transfer. How can the graph capture that?

   #. Real networks raise more modelling questions. For each of the
      following situations, explain how you would change the graph:

      - a circle line that runs in one direction only;
      - two lines that share the same track between two stations;
      - two stations that are far apart on the map, but a two-minute
        walk apart in the street;
      - waiting for the next train, which depends on how often each
        line runs.

.. solution:: graphs/problems/subway
   :label: graphs/problems/subway/solution
   :class: dropdown

   #. The map keeps the *topology* of the network: Which stations
      exist, in which order they come along each line, and where lines
      meet. It throws away the *geometry*: Real distances, directions,
      and the shape of the city.

      Advantages:

      - It is much easier to read. Stations in the crowded centre get
        as much room as those in the suburbs.
      - Planning a trip becomes a graph problem: Follow the lines and
        count the stops, or look for a path between two vertices.
      - The map stays valid when the city changes, as long as the
        network does not.

      Drawbacks:

      - Distances on the map do not match distances in reality. Two
        stations can look far apart and be a short walk away. In
        London, Leicester Square and Covent Garden are only a few
        hundred metres apart, yet many tourists ride the train
        between them.
      - Travellers trust the map more than they should. A study of
        London trips (Guo, 2011) found that the distance *on the map*
        influences the route people choose about twice as much as the
        real travel time.
      - It hides everything that is not part of the graph: Walking
        connections, travel times, how long a transfer takes, or how
        often trains run.

   #. The station graph has 9 vertices and 9 edges: A–B, B–C, C–D,
      D–E, A–F, F–J, G–F, F–E, and E–H. Every edge counts the same, so
      a breadth-first search from A finds the route with the fewest
      stops: A–F–E, with 2 stops. But it changes lines at F (Green to
      Blue), so the trip takes :math:`2 + 5 + 2 = 9` minutes. Staying
      on the Red line, A–B–C–D–E takes :math:`4 \cdot 2 = 8` minutes:
      It has more stops, but no transfer.

   #. The platform graph has one vertex per pair (station, line): A·R,
      A·G, B·R, C·R, D·R, E·R, E·B, F·G, F·B, G·B, H·B, and J·G. It has
      two kinds of edges:

      - *ride* edges, of weight 2, between consecutive platforms of
        the same line (e.g., A·R–B·R);
      - *transfer* edges, of weight 5, between the platforms of a same
        station (A·R–A·G, F·G–F·B, and E·R–E·B).

      Starting the trip at A·R or at A·G is free, so we add a vertex
      A* linked to both with edges of weight 0 (and the same for the
      destination). Without it, running the search from A·G would
      charge a transfer to any trip on the Red line.

      .. figure:: _static/solutions/subway-lines.svg

         The platform graph. Dashed edges are transfers, and dotted
         edges of weight 0 connect the entry vertex A* and the exit
         vertex E*.

      All weights are non-negative, so Dijkstra's algorithm applies.
      From A to E, it finds the Red line (8 minutes) rather than the
      route through F (9 minutes). From A to H, it finds Green to F,
      then Blue to H: :math:`2 + 5 + 2 + 2 = 11` minutes, against
      :math:`8 + 5 + 2 = 15` minutes on the Red line with a transfer
      at E.

   #. Some possible answers:

      - A one-way circle line needs *directed* edges, at least for
        that line.
      - Two lines on the same track give two edges between the same
        stations, one per line (a multigraph). In the platform graph,
        this is no problem: Each line has its own platforms, so there
        are two separate edges.
      - A short walk is an extra edge between the two stations,
        weighted by the walking time. It does not belong to any line.
      - The waiting time depends on the line you board, not on the
        station. In the platform graph, we can add it to the edges
        that *enter* a line: The weight-0 entry edges and the transfer
        edges. Frequent lines then get cheaper transfers.

   **Common mistakes**

   - Assuming that the route with the fewest stops is the fastest
     one. BFS minimises the number of edges, not the travel time.
   - In the platform graph, starting from a single platform of A, which
     either forbids or overcharges half of the trips.
   - Reading the drawbacks of the map as "the map is wrong". The map
     is a faithful drawing of the graph: The graph itself is what
     leaves out the geography.


.. exercise:: Lost in Traversal ★★
   :label: graphs/problems/traversal

   Consider the undirected graph shown on
   :numref:`graphs/problems/traversal/graph`.

   .. figure:: _static/images/traversal.svg
      :name: graphs/problems/traversal/graph

      An undirected graph with ten vertices

   #. Run the depth-first and the breadth-first traversals from
      :doc:`Lecture 6.1 </graphs/intro/index>`, starting from A, and
      give the order in which they visit the vertices. When several
      neighbours are pending, visit them in alphabetical order (for the
      depth-first traversal, push them on the stack in *reverse*
      alphabetical order, as in the lecture's example).

      For each traversal, draw its *traversal tree*: The tree whose
      edges are the ones through which each vertex was first
      reached. Add the other edges of the graph as dashed lines.

   #. Look at the dashed edges of each tree. In the breadth-first
      tree, how far apart can the two ends of a dashed edge be, in
      levels? In the depth-first tree, is one end of a dashed edge
      always an ancestor of the other? Explain why.

   #. Neither traversal reaches H, I, or J. Write a procedure
      ``components(graph)`` that returns the number of *connected
      components* of an undirected graph, in :math:`O(|V| + |E|)`
      time.

   #. A classmate suggests a way to detect cycles: "Run a traversal,
      and as soon as we meet a vertex that is already visited, there
      is a cycle". Run their idea on the component {H, I, J}, which
      is a tree. What goes wrong? Write a procedure
      ``hasCycle(graph)`` that works for any undirected graph,
      connected or not.

   #. Does your procedure still work on a *directed* graph? Find a
      small directed graph with no cycle on which it reports one.

.. solution:: graphs/problems/traversal
   :label: graphs/problems/traversal/solution
   :class: dropdown

   #. The breadth-first traversal visits A, B, C, D, E, F, G. The
      depth-first traversal visits A, B, C, D, F, E, G: From A it goes
      to B, then to C (the first unvisited neighbour of B), then to D,
      F, and E. At E, every neighbour is visited, so it backtracks to
      F and visits G.

      .. figure:: _static/solutions/traversal-trees.svg

         The breadth-first tree (left) and the depth-first tree
         (right) from A. Dashed lines are the edges outside the tree.

   #. In the breadth-first tree, the dashed edges are B–C (both on
      level 1), C–D (levels 1 and 2), and E–F (levels 2 and 3): Their
      ends are on the same level or on adjacent levels. This always
      holds. Assume an edge :math:`\{u, v\}` with :math:`u` on level
      :math:`k`. When the traversal processes :math:`u`, it adds
      :math:`v` to the pending vertices, so :math:`v` ends up on level
      :math:`k + 1` at the latest. It cannot be on a level smaller than
      :math:`k - 1` either, or the same argument applied to :math:`v`
      would put :math:`u` on a level smaller than :math:`k`.

      In the depth-first tree, the dashed edges are A–C, B–D, and C–E:
      Each one connects a vertex with one of its ancestors. This also
      always holds in an undirected graph. Assume an edge :math:`\{u,
      v\}`, where :math:`u` is visited first. The traversal does not
      leave :math:`u` for good before it has explored everything it
      can reach from :math:`u` through unvisited vertices, and
      :math:`v` is one of them. So :math:`v` gets visited while
      :math:`u` is still "open", that is, as a descendant of
      :math:`u`.

   #. We start a new traversal from every vertex that is still
      unvisited. Each start discovers exactly one new component:

      .. code-block:: text

         components(graph):
            visited = empty set
            count = 0
            for each vertex v in graph:
               if v not in visited:
                  count = count + 1
                  explore(graph, v, visited)
            return count

         explore(graph, v, visited):
            add v to visited
            for each neighbour w of v:
               if w not in visited:
                  explore(graph, w, visited)

      The graph has 2 components. Every vertex is explored once, and
      every edge is looked at twice (once from each end), so the total
      is :math:`O(|V| + |E|)`, even though there is a loop around the
      traversal.

   #. Starting from H, the traversal visits H, then I. From I, it sees
      its neighbour H, which is already visited, and wrongly reports a
      cycle. In an undirected graph, every edge can be followed both
      ways: The edge we just came through always leads back to a
      visited vertex. We must ignore the vertex we came from:

      .. code-block:: text

         hasCycle(graph):
            visited = empty set
            for each vertex v in graph:
               if v not in visited:
                  if cycleFrom(graph, v, null, visited):
                     return true
            return false

         cycleFrom(graph, v, parent, visited):
            add v to visited
            for each neighbour w of v:
               if w not in visited:
                  if cycleFrom(graph, w, v, visited):
                     return true
               else if w ≠ parent:
                  return true
            return false

      On the component {A, …, G}, it returns true when C sees A (C was
      reached from B). On {H, I, J}, it returns false.

   #. It does not. Consider :math:`A \to B`, :math:`A \to C`, and
      :math:`B \to C`. There is no directed cycle, but the traversal
      from A visits B, then C, and when it comes back to A it sees C
      again, already visited, and reports a cycle. In a directed graph,
      reaching a visited vertex only means that two paths lead to it.
      A real cycle needs an arc back to a vertex that is still
      *open*, that is, on the current path of the depth-first
      traversal. The usual fix gives every vertex three states:
      Unvisited, open, and closed (all descendants explored), and
      reports a cycle only when an arc leads to an open vertex.

   **Common mistakes**

   - Pushing neighbours in alphabetical order on the stack, which
     makes the depth-first traversal visit them in *reverse* order
     (A, C, E, F, G, D, B).
   - Drawing the breadth-first tree with one edge per pending vertex,
     instead of one edge per *first* visit. Each vertex has exactly
     one parent.
   - Forgetting the outer loop over all vertices, so that ``components``
     always returns 1 and ``hasCycle`` misses the cycles of the other
     components.
   - Ignoring *all* visited neighbours in ``hasCycle``, instead of only
     the parent, which never finds any cycle.


.. exercise:: Pick Your Path ★★
   :label: graphs/problems/pick

   :doc:`Lecture 6.2 </graphs/shortest_path/index>` presents four
   shortest-path algorithms: Breadth-first search (BFS), Dijkstra,
   Bellman-Ford, and Floyd-Warshall. This problem is about *choosing*
   between them, not about running them.

   #. For each of the following situations, pick the algorithm you
      would use, and justify your choice. Estimate the number of
      basic operations it needs.

      a. A social network with :math:`10^8` users and :math:`10^{10}`
         friendships wants to tell you how many "handshakes" separate
         you from another user.
      b. A car navigation app looks for the quickest route from your
         position to a destination, on a road network with
         :math:`10^6` junctions and :math:`2.5 \cdot 10^6` road
         segments, weighted by their travel times.
      c. A ferry company serves 15 ports and prints, in its timetable,
         the quickest connection between every pair of ports.
      d. An electric car spends energy driving uphill, but recovers
         some when it drives downhill (regenerative braking). We weigh
         each road segment by the energy it costs, which is negative
         downhill, and look for the route from Trondheim to Bergen
         that drains the battery the least.
      e. In the subway of :numref:`graphs/problems/subway`, a traveller
         does not care about time, but wants as few *transfers* as
         possible.
      f. An online game wants the number of hops between every pair of
         its 500 servers, which are connected by 2000 links.

   #. All four algorithms rely on *relaxation*, but they relax the
      edges in different orders. For each algorithm, explain in one or
      two sentences in which order it relaxes the edges, and why this
      order is enough to find the shortest paths.

   #. Run Dijkstra's algorithm on a graph where every edge has weight 1.
      Show that its priority queue then behaves exactly like the plain
      queue of BFS: Vertices come out in the same order.

      *Hint:* Show that, at any time, the priorities in the queue
      differ by at most 1, and that new vertices always enter with the
      largest priority.

   #. A classmate argues: "Bellman-Ford handles everything Dijkstra
      handles, and more. Floyd-Warshall even gives all the pairs at
      once. Why not always use Floyd-Warshall?" Answer them, using
      Situation b as an example. Assume a computer that relaxes
      :math:`10^8` edges per second.

.. solution:: graphs/problems/pick
   :label: graphs/problems/pick/solution
   :class: dropdown

   #. Possible answers:

      a. **BFS.** The graph is unweighted, and we need a single
         source. BFS takes :math:`O(|V| + |E|)`, about :math:`10^{10}`
         operations in the worst case. In practice, we can stop as soon
         as we reach the other user, and running two searches, one from
         each end, until they meet (*bidirectional search*) explores
         far fewer vertices.
      b. **Dijkstra.** Travel times are positive, and we need a single
         source. With a binary heap, it takes :math:`O((|V| + |E|)
         \log |V|)`, about :math:`3.5 \cdot 10^6 \cdot 20 = 7 \cdot
         10^7` operations, under a second. We can stop as soon as the
         destination leaves the queue.
      c. **Floyd-Warshall.** We need all the pairs, and the graph is
         tiny: :math:`15^3 = 3375` operations. Running Dijkstra from
         every port would work too, but Floyd-Warshall is simpler.
      d. **Bellman-Ford.** Some weights are negative, so Dijkstra is
         not safe. There is no negative cycle, though: Driving around a
         loop and back to where you started cannot recharge the
         battery, because some energy is always lost. With about
         :math:`10^6` junctions in Norway, :math:`O(|V| \cdot |E|)`
         is large, about :math:`2.5 \cdot 10^{12}`, but stopping early
         when a round changes nothing usually helps a lot.
      e. **Dijkstra**, on the platform graph of
         :numref:`graphs/problems/subway`, with weight
         1 on transfer edges and 0 on rides. The weights are not all
         equal, so plain BFS does not apply, but they are
         non-negative. (A variant of BFS that uses a double-ended
         queue, called *0-1 BFS*, handles weights 0 and 1 in linear
         time.)
      f. **BFS from every server.** The graph is unweighted and
         sparse. 500 runs of BFS take about :math:`500 \cdot (500 +
         2000) \approx 1.25 \cdot 10^6` operations, against
         :math:`500^3 = 1.25 \cdot 10^8` for Floyd-Warshall. Both are
         fast here, but the gap grows with the size of the network.

   #. - **BFS** processes the vertices in order of their number of
        edges from the source, and relaxes the edges of each one as it
        leaves the queue. With equal weights, a vertex reached through
        fewer edges is always closer.
      - **Dijkstra** processes the vertices in order of their
        distance, always taking the closest one that is not finished.
        With non-negative weights, no later vertex can lead to a
        shorter path, so each vertex is final when it leaves the
        queue, and its edges are relaxed once.
      - **Bellman-Ford** does not choose: It relaxes *every* edge, in
        any order, :math:`|V| - 1` times. After round :math:`k`, all
        shortest paths with at most :math:`k` edges are correct, and a
        shortest path never needs more than :math:`|V| - 1` edges.
      - **Floyd-Warshall** relaxes all pairs :math:`(i, j)` through
        one intermediate vertex :math:`k` at a time. After step
        :math:`k`, the distances are correct for all paths whose
        intermediate vertices are among the first :math:`k`.

   #. With weights 1, a vertex enters the queue (or gets a new
      priority) with :math:`d + 1`, where :math:`d` is the priority of
      the vertex being processed. Assume that, before an extraction,
      all priorities in the queue lie between :math:`d` and :math:`d
      + 1`, where :math:`d` is the smallest one. We extract a vertex
      with priority :math:`d`, and its neighbours get priority
      :math:`d + 1`, the largest value in the queue. The property
      therefore still holds after the extraction. (A vertex already
      in the queue never improves: It has priority :math:`d` or
      :math:`d + 1` already.) Since new vertices always enter with the
      largest priority, "smallest priority first" is the same as
      "first in, first out". BFS is Dijkstra, with a cheaper queue.

   #. On Situation b, Bellman-Ford needs about :math:`|V| \cdot |E| =
      2.5 \cdot 10^{12}` relaxations, that is about 7 hours, against
      less than a second for Dijkstra. Floyd-Warshall needs
      :math:`|V|^3 = 10^{18}` relaxations, more than 300 years. It
      also needs a matrix of :math:`|V|^2 = 10^{12}` distances, that
      is terabytes of memory. A more general algorithm is not a better
      one: Pick the cheapest algorithm whose assumptions hold.

   **Common mistakes**

   - Choosing Dijkstra for Situation d "because Dijkstra handles
     weighted graphs", without checking the sign of the weights.
   - Choosing Bellman-Ford for Situation d "because it detects negative
     cycles": Here, the point is that the weights are negative, and
     there are *no* negative cycles.
   - In Question 2, describing what each algorithm computes rather than
     the *order* in which it relaxes the edges.
   - Ignoring the size of the graph. :math:`O(|V|^3)` sounds harmless
     until :math:`|V| = 10^6`.


.. exercise:: When Dijkstra Lies ★★
   :label: graphs/problems/negative

   :doc:`Lecture 6.2 </graphs/shortest_path/index>` warns that
   Dijkstra's algorithm fails with negative weights, and that negative
   cycles break the very notion of shortest path. Let us look at both
   warnings more closely.

   #. Assume that, once Dijkstra's algorithm extracts a vertex from the
      queue, its distance is final and never changes again. Find a
      directed graph with as few vertices as possible on which the
      algorithm returns a wrong distance. Which step of the
      correctness proof in the lecture breaks?

      The pseudocode of the lecture keeps relaxing edges towards
      vertices that are already extracted, so it may still fix your
      example. Find a graph on which even that version returns a wrong
      distance.

   #. Consider the graph shown on
      :numref:`graphs/problems/negative/graph`. For each vertex, give
      its shortest distance from S, which is either a number,
      :math:`-\infty`, or :math:`+\infty` (unreachable). What does the
      Bellman-Ford algorithm of the lecture report from S?

      .. figure:: _static/images/negative.svg
         :name: graphs/problems/negative/graph

         A directed graph with negative weights

      Describe how to extend Bellman-Ford so that it computes the three
      kinds of answers, for every vertex, instead of stopping at
      "negative cycle detected".

   #. A classmate wants to find shortest paths with negative weights
      in an *undirected* road network, by replacing every undirected
      edge with two arcs, one in each direction, and running
      Bellman-Ford. Why is this hopeless as soon as a single edge has a
      negative weight?

   #. Another classmate wants to get rid of negative weights
      altogether: "Add the same constant to every edge, large enough to
      make all the weights non-negative, then run Dijkstra". Show, with
      a small example, that this does not work. Why does it fail?

   #. Here is a trick that does work. Give every vertex :math:`v` a
      number :math:`h(v)`, and replace the weight of each arc
      :math:`(u, v)` with

      .. math::

         w'(u, v) = w(u, v) + h(u) - h(v)

      Show that, for any two vertices :math:`s` and :math:`t`, every
      path from :math:`s` to :math:`t` changes by the *same* amount.
      Deduce that the shortest paths stay the same.

      *Hint:* Write the new length of a path :math:`s = v_0, v_1,
      \ldots, v_k = t`, and look at what happens to the :math:`h`
      terms.

.. solution:: graphs/problems/negative
   :label: graphs/problems/negative/solution
   :class: dropdown

   #. Three vertices are enough: :math:`S \to A` (2), :math:`S \to B`
      (3), and :math:`B \to A` (−2). The algorithm extracts S, sets
      :math:`\mathrm{dist}[A] = 2` and :math:`\mathrm{dist}[B] = 3`,
      then extracts A, which is closer, and finalises it at 2. When it
      finally extracts B, the path :math:`S \to B \to A` of length 1
      comes too late. Two vertices are not enough: With only S and A,
      the arc :math:`S \to A` is the only path.

      .. figure:: _static/solutions/dijkstra-counter.svg

         (a) A is finalised at 2, but :math:`S \to B \to A` has length
         1. (b) Even if :math:`\mathrm{dist}[A]` is corrected to 1, T
         keeps the stale value 3 instead of 2.

      The proof breaks at the inequality ":math:`d(v) + (\text{path
      from } v \text{ to } u) \geq d(v)`": It assumes that extending a
      path can only make it longer. Here, the path through B is longer
      than 2 *until* it takes the negative arc.

      If the algorithm keeps updating the distances of extracted
      vertices, example (a) gets fixed when B relaxes :math:`B \to A`.
      But A has already been processed with its old distance, so
      everything *after* A keeps a stale value. Adding an arc
      :math:`A \to T` (1) breaks it: T gets 3 from :math:`A`, and is
      never updated, while the true distance is 2.

   #. A, B, and C lie on the cycle :math:`A \to B \to C \to A`, of
      weight :math:`1 - 4 + 2 = -1`, which S can reach. Every extra
      turn around the cycle shortens the path, so their distance is
      :math:`-\infty`, and so is the distance of F, which the cycle
      reaches. D and E are not reachable from the cycle: Their
      distances are 3 and 1. G cannot be reached from S at all, so its
      distance is :math:`+\infty`.

      .. list-table::
         :header-rows: 1

         * - Vertex
           - S
           - A
           - B
           - C
           - D
           - E
           - F
           - G
         * - Distance
           - 0
           - :math:`-\infty`
           - :math:`-\infty`
           - :math:`-\infty`
           - 3
           - 1
           - :math:`-\infty`
           - :math:`+\infty`

      The lecture's Bellman-Ford reports "negative cycle detected",
      and nothing else: The correct distances of D and E get lost.

      To get all three answers, run the :math:`|V| - 1` rounds as
      usual, then one more round, and mark every vertex whose distance
      still decreases. Each marked vertex can be reached from a
      negative cycle, and each negative cycle reachable from S has at
      least one marked vertex. Then run a traversal (see
      :numref:`graphs/problems/traversal`) from all the marked
      vertices: Everything it reaches gets :math:`-\infty`. The other
      vertices keep their distance, which is either correct or still
      :math:`+\infty`.

   #. An undirected edge :math:`\{u, v\}` of weight :math:`w < 0`
      becomes two arcs :math:`u \to v` and :math:`v \to u`, which form
      a cycle of weight :math:`2w < 0`. Every vertex that can reach
      :math:`u` then has distance :math:`-\infty`: We can walk back and
      forth along the edge forever. In an undirected graph, a negative
      edge *is* a negative cycle. Negative weights only make sense for
      shortest paths in directed graphs.

   #. Take :math:`S \to T` (1), :math:`S \to A` (−2), and :math:`A \to
      T` (2). The shortest path from S to T goes through A, with
      length 0. Adding 2 to every edge gives :math:`S \to T` (3),
      :math:`S \to A` (0), and :math:`A \to T` (4). Now the direct arc
      (3) beats the path through A (4), and Dijkstra returns the wrong
      path. Adding a constant :math:`c` to every edge adds :math:`k
      \cdot c` to a path with :math:`k` edges: Paths with many edges
      are penalised more than short ones, which changes the order
      between them.

   #. The new length of a path :math:`s = v_0, v_1, \ldots, v_k = t`
      is:

      .. math::

         \sum_{i=1}^{k} \big( w(v_{i-1}, v_i) + h(v_{i-1}) - h(v_i) \big)
         = \sum_{i=1}^{k} w(v_{i-1}, v_i) + h(s) - h(t)

      The :math:`h` terms *telescope*: Each intermediate vertex appears
      once with a plus and once with a minus. Every path from
      :math:`s` to :math:`t` thus changes by the same amount
      :math:`h(s) - h(t)`, whatever its number of edges, and the
      shortest path stays the shortest.

      To make every new weight non-negative, we can add a vertex
      :math:`q` with an arc of weight 0 to every other vertex, run
      Bellman-Ford from :math:`q` once, and take :math:`h(v) =
      \mathrm{dist}(q, v)`. Since :math:`h(v) \leq h(u) + w(u, v)` for
      every arc, all :math:`w'(u, v) \geq 0`, and we can then run
      Dijkstra from every vertex. This is *Johnson's algorithm*, which
      computes all pairs of shortest paths faster than
      Floyd-Warshall on sparse graphs.

   **Common mistakes**

   - Concluding from Question 1 that Dijkstra always fails with
     negative weights. It *may* fail; on many graphs it still returns
     the right answer.
   - Giving :math:`-\infty` to every vertex once a negative cycle
     exists. Only the vertices that can be reached from the cycle are
     affected.
   - Confusing :math:`+\infty` (no path) with :math:`-\infty` (paths
     as short as we want).
   - In Question 5, assuming that :math:`h(s) - h(t)` must be 0. It
     does not matter: It is the same for all paths between the same
     two vertices.


.. exercise:: Cheapest Cables ★★★
   :label: graphs/problems/cables

   A company wants to connect six offices with network cables. The
   possible cables and their costs are shown on
   :numref:`graphs/problems/cables/graph`. The cheapest network that
   connects all the offices is a *minimum spanning tree* (MST), as
   explained in :doc:`Lecture 6.3 </graphs/mst/index>`.

   .. figure:: _static/images/cables.svg
      :name: graphs/problems/cables/graph

      Possible cables between six offices, with their costs

   #. Run Prim's algorithm from A, then Kruskal's algorithm. Give the
      edges in the order in which each algorithm adds them, and the
      total cost. Do they find the same tree? How many different MSTs
      does this graph have?

   #. The tree connects A and D. Is the path between them in the tree
      a shortest path from A to D in the graph? What does this tell
      you about the difference between an MST and the shortest paths
      of Lecture 6.2?

   #. Show that, when all the weights are *different*, the graph has
      exactly one MST.

      *Hint:* Assume two different MSTs :math:`T_1` and :math:`T_2`,
      and consider the lightest edge :math:`e` that belongs to one of
      them but not to the other. What happens if you add :math:`e` to
      the other tree?

   #. The lecture states the *cycle property*: The heaviest edge of a
      cycle cannot belong to an MST (if it is the only heaviest one).
      This suggests a third algorithm, sometimes called
      *reverse-delete*: Go through the edges from the heaviest to the
      lightest, and delete each one, unless deleting it would
      disconnect the graph. Run it on the offices. Explain why the
      result is an MST, and give its time complexity. How does it
      compare with Kruskal's?

   #. The network is built. A supplier now offers a new cable between
      two offices :math:`u` and :math:`v`, at cost :math:`w`. Explain
      how to update the MST in :math:`O(|V|)` time, without running
      Kruskal or Prim again. Apply it to a new cable A–D at cost 4,
      then to a new cable A–E at cost 5.

.. solution:: graphs/problems/cables
   :label: graphs/problems/cables/solution
   :class: dropdown

   #. Prim, from A, adds A–C (3), B–C (3), B–D (2), then faces a tie
      between C–E and D–E (both 6), and finally adds E–F (1). Kruskal
      adds E–F (1), B–D (2), A–C (3), B–C (3), skips A–B (4) and C–D
      (5), which would close cycles, adds C–E or D–E (6), whichever
      comes first, and skips the other one and D–F (7). Both cost
      :math:`3 + 3 + 2 + 6 + 1 = 15`.

      .. figure:: _static/solutions/cables-msts.svg

         The two MSTs of the offices. They only differ in the bold
         edge.

      The trees are the same when both algorithms break the tie the
      same way. There are exactly two MSTs: One with C–E and one with
      D–E. The other edges are forced: Each one is the only cheapest
      way out of some group of vertices.

   #. No. In the tree, A and D are connected through A–C–B–D, of
      length :math:`3 + 3 + 2 = 8`. In the graph, A–B–D has length
      :math:`4 + 2 = 6`. An MST minimises the *total* weight of the
      network, while a shortest path minimises the length of the route
      between two given vertices. The cheapest network to build is
      usually not the one with the shortest trips.

   #. Assume two different MSTs :math:`T_1` and :math:`T_2`. Among the
      edges that belong to exactly one of them, take the lightest,
      :math:`e`, and say it belongs to :math:`T_1`. Adding :math:`e` to
      :math:`T_2` creates a cycle. This cycle contains an edge
      :math:`f` that is not in :math:`T_1` (otherwise :math:`T_1`
      would contain the whole cycle). So :math:`f` belongs to
      :math:`T_2` only, and since :math:`e` is the lightest such edge
      and all weights differ, :math:`w(f) > w(e)`. Replacing :math:`f`
      with :math:`e` in :math:`T_2` gives a spanning tree that is
      strictly lighter than :math:`T_2`, which contradicts that
      :math:`T_2` is minimum.

   #. Going from the heaviest edge: D–F (7) is deleted (F stays
      connected through E–F). Then C–E and D–E (6) come: We can delete
      one of them, but not both, since the second one would then be
      the only connection between {E, F} and the rest. C–D (5) and
      A–B (4) are deleted. The other edges are all needed. We obtain
      one of the two MSTs again.

      Each deleted edge lies on a cycle of the current graph, since
      the graph stays connected without it. All the heavier edges
      still on that cycle were examined earlier and kept, so they were
      bridges at the time. But a bridge stays a bridge when we delete
      other edges, so it cannot lie on this cycle. The deleted edge is
      therefore a heaviest edge of the cycle, and the cycle property
      says that we lose nothing by dropping it. At the end, the graph
      is still connected, and has no cycle left (the heaviest edge of
      any cycle would have been deleted): It is a spanning tree, and an
      MST.

      Each deletion requires checking connectivity, for example with a
      traversal in :math:`O(|V| + |E|)`. Over all edges, this gives
      :math:`O(|E| \cdot (|V| + |E|))`, much slower than the
      :math:`O(|E| \log |E|)` of Kruskal. Reverse-delete is Kruskal
      backwards: Kruskal keeps the light edges that do not close a
      cycle, reverse-delete removes the heavy edges that sit on one.

   #. Adding the new edge :math:`\{u, v\}` to the tree creates exactly
      one cycle: The path from :math:`u` to :math:`v` in the tree,
      plus the new edge. Find this path with a traversal of the tree
      from :math:`u`, in :math:`O(|V|)` since the tree has
      :math:`|V| - 1` edges. If the heaviest edge on the path weighs
      more than :math:`w`, replace it with the new edge. Otherwise,
      keep the tree as it is.

      For A–D at cost 4, the path in the tree is A–C–B–D, whose
      heaviest edge costs 3: The new cable is not worth it. For A–E at
      cost 5, with the tree that uses C–E, the path is A–C–E, whose
      heaviest edge is C–E (6). We swap it for A–E, and the cost drops
      to 14. (With the tree that uses D–E, the path is A–C–B–D–E and
      we swap D–E, which also gives 14.)

   **Common mistakes**

   - Claiming that the MST is unique "because the algorithm is
     deterministic". Ties can be broken in different ways.
   - In Question 3, picking the lightest edge of :math:`T_1` instead of
     the lightest edge in which the two trees *differ*.
   - Using the MST to answer shortest-path questions, as in Question 2.
   - In Question 5, comparing :math:`w` with the edges incident to
     :math:`u` and :math:`v` only, instead of the whole path between
     them.


.. exercise:: Who's in Charge? ★★★
   :label: graphs/problems/unionfind

   Kruskal's algorithm needs to know whether two vertices already
   belong to the same component. :doc:`Lecture 6.3
   </graphs/mst/index>` introduces the *disjoint sets* abstract data
   type for this, with two operations: ``find(x)`` returns a
   representative of the set that contains :math:`x`, and
   ``union(x, y)`` merges the sets of :math:`x` and :math:`y`. Let us
   implement it on the elements :math:`1, \ldots, n`.

   The simplest idea, called *quick-find*, stores in an array the
   label of the set of every element: ``find`` reads the label, and
   ``union`` relabels every element of one set with the label of the
   other.

   #. What are the time complexities of ``find`` and ``union`` with
      quick-find? What does this give for Kruskal's algorithm?

   A better idea is a *forest*: Each set is a tree, whose root is the
   representative, and each element only stores its parent. A root is
   its own parent.

   .. code-block:: text

      find(x):
         while parent[x] ≠ x:
            x = parent[x]
         return x

      union(x, y):
         rx = find(x)
         ry = find(y)
         if rx ≠ ry:
            parent[rx] = ry

   2. Start with eight singletons, and run ``union(1, 2)``,
      ``union(1, 3)``, ``union(1, 4)``, and so on, up to
      ``union(1, 8)``. Draw the forest at the end. How many parent
      links does each call to ``find(1)`` follow? What is the total
      cost of these unions, for :math:`n` elements?

   #. *Union by size* changes one thing: Each root keeps the size of
      its tree, and ``union`` always attaches the root of the *smaller*
      tree under the root of the larger one (on a tie, ``rx`` goes
      under ``ry``). Run the same unions again, and draw the forest.
      Then find a sequence of unions on eight elements for which union
      by size still builds a tree of height 3.

      Show that, with union by size, a tree of :math:`n` elements
      never has a height larger than :math:`\log_2 n`.

      *Hint:* When does the depth of an element increase? What happens
      to the size of its tree at that moment?

   #. *Path compression* is another improvement: After ``find(x)``
      has found the root, it makes every element it went through point
      directly to the root. Write ``find`` with path compression, and
      run ``find(1)`` on the forest of Question 2. Draw the result.

   #. With both improvements, a sequence of :math:`m` operations on
      :math:`n` elements takes :math:`O(m \cdot \alpha(n))` time, where
      :math:`\alpha` grows so slowly that :math:`\alpha(n) \leq 4` for
      any :math:`n` you will ever meet (Tarjan, 1975). We do not ask
      you to prove it! But if Kruskal's algorithm has to sort the
      edges in :math:`O(|E| \log |E|)` anyway, does the choice of
      implementation matter at all? Describe a situation where it
      does.

      Finally, explain how to use disjoint sets to detect a cycle in
      an undirected graph, as in :numref:`graphs/problems/traversal`.

.. solution:: graphs/problems/unionfind
   :label: graphs/problems/unionfind/solution
   :class: dropdown

   #. ``find`` reads one cell: :math:`O(1)`. ``union`` must scan the
      whole array to relabel one set: :math:`O(n)`. Kruskal's algorithm
      calls ``find`` twice per edge, :math:`O(|E|)` in total, and
      makes exactly :math:`|V| - 1` successful unions, :math:`O(|V|^2)`
      in total. With the sorting, Kruskal then takes :math:`O(|E| \log
      |E| + |V|^2)`, which is fine for dense graphs, but poor for
      sparse ones.

   #. ``union(1, 2)`` makes 2 the parent of 1. ``union(1, 3)`` finds
      root 2 for element 1 and makes 3 its parent, and so on: Each union
      puts the old root under the new element. We end up with a chain
      :math:`1 \to 2 \to \cdots \to 8`, shown as (a) below. The call
      ``find(1)`` inside ``union(1, k)`` follows :math:`k - 2` links,
      so the total is :math:`0 + 1 + \cdots + (n - 2) = (n-1)(n-2)/2`,
      that is 21 links for :math:`n = 8`, and :math:`\Theta(n^2)` in
      general.

      .. figure:: _static/solutions/unionfind.svg

         Arrows go from an element to its parent. (a) The naive unions
         build a chain. (b) Union by size builds a star. (c) Union by
         size on pairs of equal sizes reaches height 3. (d) The chain
         (a) after ``find(1)`` with path compression.

   #. With union by size, ``union(1, 2)`` puts 1 under 2 (a tie). Then
      every new element is a singleton, smaller than the tree of 2, and
      goes under 2: We get a star of height 1, (b) above, and every
      ``find`` follows at most one link.

      To reach height 3, always merge trees of equal sizes:
      ``union(1, 2)``, ``union(3, 4)``, ``union(5, 6)``, ``union(7,
      8)``, then ``union(1, 3)``, ``union(5, 7)``, and finally
      ``union(1, 5)``, which gives (c).

      The depth of an element :math:`x` only increases when the root
      of its tree goes under another root. With union by size, this
      happens only when the other tree is at least as large, so the
      tree that contains :math:`x` at least *doubles* in size. It starts
      with size 1 and never exceeds :math:`n`, so it can double at most
      :math:`\log_2 n` times: The depth of :math:`x` never exceeds
      :math:`\log_2 n`. Every ``find`` then costs :math:`O(\log n)`.

   #. A recursive version makes every element on the way point to the
      root, on the way back:

      .. code-block:: text

         find(x):
            if parent[x] ≠ x:
               parent[x] = find(parent[x])
            return parent[x]

      On the chain (a), ``find(1)`` follows 7 links once, and every
      element from 1 to 7 then points directly to 8, as in (d). The
      next ``find`` on any of them follows a single link.

   #. With union by size alone, Kruskal makes :math:`O(|E|)` calls to
      ``find`` at :math:`O(\log |V|)` each, which is no worse than
      sorting, so the sorting dominates and both improvements bring
      little more. The implementation matters when the sorting is
      cheap or already done: The edges may come sorted, or the weights
      may be small integers that can be sorted in linear time (see
      counting sort in :doc:`Lecture 3.6 </recursion/radix_sort>`). Disjoint sets also serve
      many problems without any sorting, for example tracking the
      friend groups of a social network as friendships appear, where
      millions of unions and finds happen online.

      To detect a cycle, start with one set per vertex and go through
      the edges. For each edge :math:`\{u, v\}`, if ``find(u) =
      find(v)``, then :math:`u` and :math:`v` are already connected,
      and the edge closes a cycle. Otherwise, call ``union(u, v)``.

   **Common mistakes**

   - Linking :math:`x` itself under :math:`y`, as in
     ``parent[x] = y``, instead of linking the *roots*. This loses the
     rest of the tree of :math:`x`.
   - Comparing the heights of the trees instead of their sizes, and
     then forgetting to update them. (Union by *rank*, which uses
     heights, works too, but needs care with path compression.)
   - Thinking that path compression changes the result of ``find``.
     It only changes the shape of the tree, never which root an
     element leads to.


Going Further
=============

This problem goes beyond the lectures. The *assignment problem*
itself is fair game: It has come up on an earlier exam, and modelling
it as a graph (Questions 1 and 2) uses nothing but this module. The
*Hungarian algorithm*, however, is not part of the syllabus, and you
are not expected to know it by heart. The background below gives you
every step, and the exercise simply takes you through them, as a
guided tour of how a classic algorithm on a weighted *bipartite*
graph works and why it is correct.

.. exercise:: Mentor Matchmaking ★★★★
   :label: graphs/problems/mentors

   **Background.** Four students, Ada, Bo, Cy, and Dee, each need a
   mentor, and four mentors, Kari, Lars, Mia, and Nils, can each take
   one student. Every student ranks the mentors from 1 (favourite) to
   4:

   .. list-table::
      :header-rows: 1
      :stub-columns: 1

      * -
        - Kari
        - Lars
        - Mia
        - Nils
      * - Ada
        - 1
        - 2
        - 3
        - 4
      * - Bo
        - 4
        - 3
        - 1
        - 2
      * - Cy
        - 1
        - 3
        - 2
        - 4
      * - Dee
        - 1
        - 2
        - 3
        - 4

   We look for an *assignment*, which gives each student a different
   mentor, and we want the sum of the ranks to be as small as
   possible. This is the *assignment problem*. The *Hungarian
   algorithm* (Kuhn, 1955; Munkres, 1957) solves it on an :math:`n
   \times n` matrix of costs, here the ranks. There is no need to
   memorise it; just follow the steps:

   #. Subtract from every row its smallest entry.
   #. Subtract from every column its smallest entry.
   #. Cover all the zeros of the matrix with as few lines (whole rows
      or whole columns) as possible. If :math:`n` lines are needed,
      we can pick :math:`n` zeros, no two in the same row or column:
      This is an optimal assignment, and we stop.
   #. Otherwise, let :math:`m` be the smallest entry that no line
      covers. Subtract :math:`m` from every uncovered entry, add
      :math:`m` to every entry covered by *two* lines, and go back to
      Step 3.

   Step 3 relies on a theorem by Dénes Kőnig (1931), which gave the
   algorithm its name: The smallest number of lines that cover all
   the zeros equals the largest number of zeros we can pick with no
   two in the same row or column. In graph terms, take the bipartite
   graph whose edges are the zeros: Picking zeros is a *matching*,
   and covering them with lines is a *vertex cover*.

   **Problem.**

   #. Model the situation as a weighted graph. What are the vertices,
      the edges, and the weights? What does an assignment correspond
      to? How many different assignments are there for 4 students?
      For 20? How long would it take to try them all at :math:`10^9`
      assignments per second?

   #. Two natural strategies:

      - *First come, first served:* The students choose in
        alphabetical order, each one taking their favourite mentor
        among those still free.
      - *Happiest first:* Repeatedly assign the pair with the smallest
        rank among the students and mentors still free (break ties
        any way you like).

      Run both strategies. Then find the best assignment, by
      reasoning rather than by trying all of them.

      *Hint:* Three students rank Kari first. How many of them can
      have a rank of 1?

   #. Run the Hungarian algorithm on the table. Give the matrix after
      Steps 1 and 2, then after every round of Step 4, together with
      the lines you used. Give the final assignment and its total.

   #. Let us see why the algorithm is correct, in four steps.

      a. Show that subtracting the same number from every entry of a
         row (or of a column) does not change which assignments are
         optimal.
      b. Show that, if all entries are non-negative, an assignment
         that only uses zeros is optimal.
      c. Show that Step 4 has the same effect as subtracting :math:`m`
         from every *uncovered row* and adding :math:`m` to every
         *covered column*. Deduce that Step 4 never makes an entry
         negative, and that it does not change the optimal
         assignments either.
      d. Keep track of the total :math:`L` of everything subtracted
         so far (rows and columns, minus what was added back). Show
         that :math:`L` is a lower bound on the cost of any
         assignment, and that every round of Step 4 increases it.
         Deduce that the algorithm stops when the costs are integers.

      *Hint for d:* With :math:`r` covered rows and :math:`k` covered
      columns, we have :math:`r + k < n`. How many uncovered rows are
      there?

   #. Real life is messier. Explain how to adapt the method to each of
      the following situations:

      - Each mentor can take *two* students, and there are eight
        students.
      - There are five students but only four mentors, so one student
        gets none.
      - Three students rank the mentors exactly in the same order
        (Kari, Lars, Mia, Nils), and Dee ranks them Kari 2, Lars 4,
        Mia 1, Nils 3. Compute the best assignment. Is it *fair*?
        What would you minimise instead, and how?

.. solution:: graphs/problems/mentors
   :label: graphs/problems/mentors/solution
   :class: dropdown

   #. The vertices are the students on one side and the mentors on
      the other. Every student is linked to every mentor, with the
      rank as the weight: This is a *complete bipartite graph*,
      :math:`K_{4,4}`. An assignment is a set of edges that touches
      every vertex exactly once, called a *perfect matching*, and we
      look for one of minimum total weight.

      The first student has :math:`n` choices, the second :math:`n -
      1`, and so on: There are :math:`n!` assignments. That is 24 for
      4 students, but :math:`20! \approx 2.4 \cdot 10^{18}` for 20
      students, which takes about :math:`2.4 \cdot 10^9` seconds at
      :math:`10^9` per second, that is about 77 years.

   #. *First come, first served:* Ada takes Kari (1), Bo takes Mia
      (1), Cy finds Kari and Mia taken and takes Lars (3), and Dee is
      left with Nils (4). The total is 9.

      *Happiest first:* The pairs of rank 1 are Ada, Cy, and Dee with
      Kari, and Bo with Mia. Only one of the three gets Kari, and Bo
      gets Mia. Among the pairs of rank 2 still available, one of the
      two others (Ada or Dee) gets Lars. The last student is left with
      Nils, rank 4. Whatever the ties, the total is 8.

      The best assignment costs 7. Only one of Ada, Cy, and Dee can
      get Kari, so the two others get a rank of at least 2, and the
      total is at least :math:`1 + 1 + 2 + 2 = 6`. A total of 6 would
      need Bo with Mia, and two of the three with a rank of 2. But
      their rank 2 is Lars for Ada and Dee, and Mia (taken by Bo) for
      Cy: Only one of them can have it. So the total is at least 7,
      and Ada–Kari, Dee–Lars, Cy–Mia, Bo–Nils reaches it (as does the
      same with Ada and Dee swapped). Both greedy strategies go wrong
      by giving Bo their favourite, Mia, which Cy needed more.

   #. In the order (Ada, Bo, Cy, Dee) for rows and (Kari, Lars, Mia,
      Nils) for columns, every row has minimum 1. After Step 1, the
      columns have minima 0, 1, 0, 1, and Step 2 gives:

      .. math::

         \begin{bmatrix}
         0 & 1 & 2 & 3 \\
         3 & 2 & 0 & 1 \\
         0 & 2 & 1 & 3 \\
         0 & 1 & 2 & 3
         \end{bmatrix}
         \xrightarrow{\text{Step 2}}
         \begin{bmatrix}
         0 & 0 & 2 & 2 \\
         3 & 1 & 0 & 0 \\
         0 & 1 & 1 & 2 \\
         0 & 0 & 2 & 2
         \end{bmatrix}

      The zeros of Ada, Cy, and Dee all sit in the columns of Kari and
      Lars: At most two of them can be picked, so 3 lines are enough,
      namely the columns Kari and Lars, and the row Bo. The smallest
      uncovered entry is :math:`m = 1` (Cy–Mia). Step 4 gives:

      .. math::

         \begin{bmatrix}
         0 & 0 & 1 & 1 \\
         4 & 2 & 0 & 0 \\
         0 & 1 & 0 & 1 \\
         0 & 0 & 1 & 1
         \end{bmatrix}

      Now 4 lines are needed, and we can pick Cy–Mia, Bo–Nils, then
      Ada–Kari and Dee–Lars (or Ada–Lars and Dee–Kari). The total is
      7, as found in Question 2.

   #. a. Every assignment uses exactly one entry of each row.
         Subtracting :math:`c` from a row therefore lowers the cost of
         *every* assignment by exactly :math:`c`. Their order does not
         change, so the optimal ones stay optimal. The same holds for
         columns.
      b. If all entries are non-negative, every assignment costs at
         least 0. An assignment that only uses zeros costs 0, so none
         can beat it.
      c. Compare the two descriptions entry by entry. An entry in an
         uncovered row and an uncovered column gets :math:`-m` in
         both. An entry in an uncovered row and a covered column gets
         :math:`-m + m = 0`. An entry in a covered row and an
         uncovered column is untouched in both. An entry in a covered
         row and a covered column gets :math:`+m`. Only uncovered
         entries decrease, by their minimum :math:`m`, so none becomes
         negative. And Step 4 is now a series of row and column
         operations, so by (a), the optimal assignments do not change.
      d. Every assignment uses one entry per row and one per column,
         so its cost in the current matrix is its original cost minus
         :math:`L`. Since all current entries are non-negative, the
         original cost is at least :math:`L`. With :math:`r` covered
         rows and :math:`k` covered columns, there are :math:`n - r`
         uncovered rows, and :math:`r + k < n` gives :math:`n - r >
         k`. A round of Step 4 subtracts :math:`m` from :math:`n - r`
         rows and adds it back on :math:`k` columns: :math:`L`
         increases by :math:`m(n - r - k) \geq m > 0`. With integer
         costs, :math:`L` grows by at least 1 per round, and it can
         never exceed the cost of an optimal assignment, so the
         algorithm stops.

         On the mentors, :math:`L = 4 + 2 = 6` after Steps 1 and 2, and
         the round of Step 4 adds :math:`1 \cdot (3 - 2) = 1`. The final
         assignment costs 7 = :math:`L`: The lower bound itself proves
         that it is optimal.

      As described here, with the lines found by hand, the algorithm
      takes :math:`O(n^4)` time. Careful implementations bring it down
      to :math:`O(n^3)`, which handles thousands of students easily.

   #. - Duplicate every mentor: Kari 1 and Kari 2 get the same column
        of ranks. The matrix is :math:`8 \times 8`, and any assignment
        gives each mentor at most two students.
      - Add a fifth, imaginary mentor, "nobody", to make the matrix
        square. The cost of "nobody" is a penalty, for example 5 for
        every student (worse than any real mentor). The algorithm
        decides who goes without a mentor, at the lowest total cost.
      - The best total is 8: Dee gets Mia (1), and the three others
        share Kari, Lars, and Nils, with ranks 1, 2, and 4. Someone
        gets their *last* choice, even though giving Dee Nils (3) and
        the others Kari, Lars, and Mia would cap everyone at rank 3,
        for a total of 9. The sum of ranks only cares about the
        average. To protect the unluckiest student, we can minimise
        the *worst* rank: Try :math:`r = 1, 2, \ldots`, keep only the
        pairs with a rank of at most :math:`r`, and stop at the first
        :math:`r` for which a perfect matching exists (for example,
        with the Hungarian algorithm on costs 0 and 1). Here
        :math:`r = 3`. Another option is to make bad ranks more
        expensive, for example by using the square or the cube of the
        rank as the cost. Here the squares are not enough (22 against
        23), but the cubes are (74 against 63).

   **Common mistakes**

   - Stopping the Hungarian algorithm as soon as every row and every
     column contains a zero. What matters is whether we can pick
     :math:`n` zeros in *different* rows and columns.
   - In Step 4, adding :math:`m` to every covered entry instead of only
     those covered twice.
   - Covering the zeros with more lines than necessary. Too many lines
     leave fewer uncovered entries and can hide the next step.
   - In Question 4a, arguing about one assignment only. The point is
     that *all* assignments change by the same amount.


Case Studies
============

The problems above all have a solution. The three case studies below
are different: Each one is a famous graph problem that is easy to
explain at a dinner party, and surprisingly hard to solve. The first
questions are within reach; the last ones open onto problems that
keep researchers busy today. There is no solution to look up.
Instead, each case study comes with a dropdown of ideas and resources
to help you go further. Pick the one that tickles your curiosity.

.. exercise:: Exam Timetabling
   :label: graphs/problems/colouring
   :nonumber:

   Every semester, NTNU schedules thousands of exams. Two exams that
   share at least one student cannot take place at the same time. We
   can draw this as a *conflict graph*: Courses are the vertices, and
   an edge connects two courses that share a student. Giving each
   course a time slot such that adjacent courses get different slots
   is called *colouring* the graph, with slots as colours. The
   smallest number of colours a graph needs is its *chromatic number*,
   written :math:`\chi(G)`. Graph colouring appears on the list of
   graph problems in :doc:`Lecture 6.1 </graphs/intro/index>`, among
   the "difficult" ones.

   .. figure:: _static/images/exams.svg
      :name: graphs/problems/colouring/graph

      The conflict graph of eight courses

   #. Find a timetable for the eight courses of
      :numref:`graphs/problems/colouring/graph` with as few slots as
      you can. A friend says: "I cannot find four courses that all
      conflict with each other, so three slots must be enough". Are
      they right?

   #. The *greedy* strategy goes through the courses in some order,
      and gives each one the first slot that none of its scheduled
      neighbours uses. Try it with a few different orders. Show that
      it never needs more than :math:`\Delta + 1` slots, where
      :math:`\Delta` is the largest degree. Show also that, for every
      graph, *some* order makes greedy optimal. Why does this not
      solve the problem?

   #. When are two slots enough? Design an algorithm that decides it
      in :math:`O(|V| + |E|)` time.

      For three slots, nobody knows an efficient algorithm, and most
      researchers believe that none exists. How many timetables would
      a brute-force search try for 300 courses and 3 slots?

   #. A Sudoku is a colouring problem in disguise. Describe its graph:
      What are the vertices, the edges, and the colours? How many
      edges are there? Write a program that colours a graph by
      *backtracking* (try a colour, go on, undo it when you get stuck),
      and use it to solve a Sudoku.

   #. Colour a map of the counties of Norway, so that neighbouring
      counties get different colours. How many colours do you need?
      The *four colour theorem* says that four colours are enough for
      any map. Why does a map never need five colours, while some
      graphs do?

   #. Open-ended: Find real conflict data, or one of the benchmark
      graphs used by researchers (see the resources), and compare
      greedy with a smarter order, such as *largest degree first* or
      *DSatur*. How close to the best known answer do you get?

.. admonition:: Resources & Ideas
   :class: dropdown

   **Ideas**

   - *Question 1.* Four slots are enough (for example DB, PHY, and WEB
     in slot 1; MAT, NET, and SEC in slot 2; STA in slot 3; ALG in
     slot 4). Your friend is wrong: A group of courses that all
     conflict (a *clique*) gives a lower bound, but not always the
     right one. Look at the five courses around ALG: They form a cycle
     of *odd* length. Can two slots alternate around it?

     .. figure:: _static/solutions/exams-coloring.svg

        A timetable with four slots

   - *Question 2.* When greedy reaches a course, at most
     :math:`\Delta` of its neighbours already have a slot. For the
     second part, start from an optimal colouring and list the
     courses slot by slot. Then try greedy on the "crown" below, in
     the order u1, v1, u2, v2, …: Two colours suffice, yet greedy uses
     four. With :math:`n` pairs, it uses :math:`n`.

     .. figure:: _static/solutions/crown.svg

        A crown graph. Each u is linked to every v except the one
        below it.

   - *Question 3.* Two slots are enough exactly when the graph has no
     cycle of odd length: It is *bipartite*. Run a breadth-first
     traversal (see :numref:`graphs/problems/traversal`), give even
     levels one slot and odd levels the other, and check every edge.
     For three slots, brute force tries :math:`3^{300} \approx
     10^{143}` timetables. The problem is *NP-complete* (Karp, 1972):
     If you find an efficient algorithm, you also solve thousands of
     other problems, and win a million dollars.
   - *Question 4.* There are 81 cells and 9 colours. Each cell
     conflicts with 8 cells in its row, 8 in its column, and 4 more in
     its box, so there are :math:`81 \cdot 20 / 2 = 810` edges. The
     given digits are pre-coloured vertices.
   - *Question 5.* A map gives a *planar* graph: It can be drawn
     without crossing edges. Five counties that all touch each other
     would give :math:`K_5`, which cannot be drawn without a crossing
     (try it!). This alone does not prove the theorem, which resisted
     mathematicians for more than a century.
   - *Question 6.* DSatur always colours next the vertex whose
     neighbours already use the most different colours.

   **Resources**

   - `Graph coloring <https://en.wikipedia.org/wiki/Graph_coloring>`_
     and `Four color theorem
     <https://en.wikipedia.org/wiki/Four_color_theorem>`_ on
     Wikipedia. The theorem was first proved in 1976 by Appel and
     Haken, using a computer to check almost 2000 cases. It was the
     first major theorem proved this way, and it caused quite a
     debate.
   - G. Gonthier (2008). *Formal Proof—The Four-Color Theorem*.
     Notices of the AMS, 55(11), 1382–1393. How the proof was checked
     entirely by a computer, in the Coq proof assistant.
   - R. M. Karp (1972). *Reducibility Among Combinatorial Problems*.
     The paper that showed that graph colouring, and 20 other
     problems, are NP-complete.
   - D. Brélaz (1979). *New Methods to Color the Vertices of a Graph*.
     Communications of the ACM, 22(4), 251–256. The DSatur heuristic.
   - `COLOR02/03/04 <https://mat.tepper.cmu.edu/COLOR02/>`_: Benchmark
     graphs for colouring, many from real timetabling and scheduling
     problems, with the best known answers.


.. exercise:: Your Friends Are More Popular
   :label: graphs/problems/friendship
   :nonumber:

   In 1991, the sociologist Scott Feld published a paper with a
   provocative title: *Why Your Friends Have More Friends Than You
   Do*. Feld showed that, on average, your friends really do have more
   friends than you, and this has nothing to do with your personality. It is
   a property of graphs. Let us check it on the friendship graph of
   :doc:`Lecture 6.1 </graphs/intro/index>`, reproduced on
   :numref:`graphs/problems/friendship/graph`.

   .. figure:: _static/images/friendship.svg
      :name: graphs/problems/friendship/graph

      The friendship graph from Lecture 6.1

   #. What is the average number of friends per person? For each
      person, compute the average number of friends *of their
      friends*. How many people have fewer friends than their friends
      do on average?

   #. Here is another way to measure "the friends of my friends": Pick
      a friendship (an edge) at random, then one of its two ends at
      random, and count that person's friends. Show that the average
      result is :math:`\sum_v d(v)^2 / \sum_v d(v)`, where :math:`d(v)`
      is the degree of :math:`v`, and that it is always at least the
      average degree. When are they equal? Compute it on the graph.

   #. The average from Question 1 (per person first, then over
      everyone) is a different number. Is it also always at least the
      average degree?

   #. Feld's title suggests something stronger: That *most* people
      have fewer friends than their friends do. Find a graph where the
      friends are more popular on average, in the sense of Question 2,
      but where fewer than half of the people have fewer friends than
      their friends.

   #. Download a real social network, such as the Facebook graph from
      SNAP (see the resources), and compute the three numbers: The
      average degree, the average of Question 2, and the fraction of
      people who have fewer friends than their friends. How strong is
      the paradox in real life?

   #. Open-ended: The paradox has practical uses. During an epidemic,
      who gets infected first, a random person or a random person's
      friend? If you could vaccinate only 1% of a population whose
      graph you do not know, whom would you pick? Does the paradox
      hold for followers on a *directed* network, such as Instagram or
      Bluesky?

.. admonition:: Resources & Ideas
   :class: dropdown

   **Ideas**

   - *Question 1.* The degrees are Denis 2, Erik 1, Frank 3, John 2,
     Lisa 2, Mary 3, Olive 3, Peter 1, and Thomas 1: An average of 2.
     The averages of their friends range from 1.67 (Frank) to 3, with
     a mean of about 2.52. Six of the nine people have fewer friends
     than their friends.
   - *Question 2.* By the handshake lemma (see
     :numref:`graphs/problems/handshakes`), there are
     :math:`\sum_v d(v)` edge ends, and person :math:`v` owns
     :math:`d(v)` of them: Popular people get picked more often. To
     compare with the average degree, you need :math:`n \sum d^2 \geq
     (\sum d)^2`. Think of the variance of the degrees, which is never
     negative. On the graph, you should get :math:`42 / 18 \approx
     2.33`.
   - *Question 3.* Yes. Write the sum over all people as a sum over
     all edges :math:`\{u, v\}`: Each edge contributes
     :math:`d(u)/d(v) + d(v)/d(u)`. What is the smallest possible value
     of :math:`x/y + y/x` for positive :math:`x` and :math:`y`?
   - *Question 4.* Try small, simple graphs first: Paths, stars,
     cycles. Very few vertices are enough.
   - *Question 5.* Count degrees with a hash map while reading the edge
     list; no fancy library needed.
   - *Question 6.* In 2009, researchers followed the flu at Harvard
     among random students and among friends they named. The friends
     got sick about two weeks earlier. For vaccination, look up
     *acquaintance immunization*: Vaccinate a random friend of a
     random person.

   **Resources**

   - S. L. Feld (1991). `Why Your Friends Have More Friends Than You Do
     <https://www.jstor.org/stable/2781907>`_. American Journal of
     Sociology, 96(6), 1464–1477.
   - N. A. Christakis and J. H. Fowler (2010). `Social Network Sensors
     for Early Detection of Contagious Outbreaks
     <https://pmc.ncbi.nlm.nih.gov/articles/PMC2939797>`_. PLoS ONE,
     5(9), e12948.
   - R. Cohen, S. Havlin, and D. ben-Avraham (2003). *Efficient
     Immunization Strategies for Computer Networks and Populations*.
     Physical Review Letters, 91, 247901.
   - J. Ugander, B. Karrer, L. Backstrom, and C. Marlow (2011). `The
     Anatomy of the Facebook Social Graph
     <https://arxiv.org/abs/1111.4503>`_. The paradox, measured on the
     whole of Facebook.
   - `ego-Facebook <https://snap.stanford.edu/data/ego-Facebook.html>`_,
     from the Stanford Network Analysis Project (SNAP): 4039 people and
     88234 friendships, as a plain list of edges.
   - `Friendship paradox
     <https://en.wikipedia.org/wiki/Friendship_paradox>`_ on Wikipedia.


.. exercise:: The Party Problem
   :label: graphs/problems/ramsey
   :nonumber:

   Here is a game for two players, called *Sim*. Draw six dots on a
   sheet of paper. Each player has a pen of their own colour, say red
   and blue. Taking turns, each player draws a line between two dots
   that are not yet connected. The first player to complete a
   *triangle* of their own colour, with three dots as corners, loses.
   Lines of the other colour do not count.

   #. Play a few games of Sim with a friend. Did any game end in a
      draw, with all 15 lines drawn and no single-coloured triangle?
      Try to colour all the lines on purpose, with no single-coloured
      triangle.

   #. Show that Sim can never end in a draw. Said differently: At any
      party of six people, there are always three people who all know
      each other, or three who are all strangers.

      *Hint:* Pick one dot. It has five lines. What can you say about
      their colours?

   #. Would a game of Sim with *five* dots always have a loser?

   #. Look at the friendship graph of
      :numref:`graphs/problems/friendship/graph`. Are there three
      people who all know each other? Mathematicians know that, among
      any nine people, there are always three mutual friends or *four*
      mutual strangers. Find the four strangers. In the vocabulary of
      Lecture 6.1, what are three mutual friends and four mutual
      strangers?

   #. Programming challenge: Among any 18 people, there are always four
      mutual friends or four mutual strangers. But 17 people are not
      enough: Find a friendship graph on 17 people with neither. Write
      a program that checks a candidate graph, then one that looks for
      one, for instance by starting from a random graph and flipping
      the edges that take part in the most bad groups of four.

   #. The smallest number of people that guarantees :math:`k` mutual
      friends or :math:`k` mutual strangers is the *Ramsey number*
      :math:`R(k, k)`. We know that :math:`R(3,3) = 6` (Question 2) and
      :math:`R(4,4) = 18` (Question 5). For :math:`R(5,5)`, nobody
      knows: It lies somewhere between 43 and 46. How many ways are
      there to colour the lines between 43 dots in red and blue? Why
      can't we just check them all?

.. admonition:: Resources & Ideas
   :class: dropdown

   **Ideas**

   - *Questions 1 and 2.* Among the five lines of a dot, at least
     three have the same colour, say red. Now look at the three dots
     at the other ends of these red lines, and the lines between them.
   - *Question 3.* No: Colour the outline of a pentagon in one colour
     and the five diagonals (a star) in the other.

     .. figure:: _static/solutions/party-five.svg

        Five people with no three mutual friends (solid) and no three
        mutual strangers (dashed)

   - *Question 4.* There is no triangle in this graph. Three mutual
     friends form a *clique* (a complete subgraph), and mutual
     strangers form an *independent set*. Any graph with :math:`n`
     vertices is a colouring of the lines of :math:`K_n`: Edges are
     red, missing edges are blue.
   - *Question 5.* Checking a candidate means looking at all
     :math:`\binom{17}{4} = 2380` groups of four, which is fast. If
     your search gets stuck, look up the *Paley graph* of order 17:
     Number the people 0 to 16, and make :math:`i` and :math:`j`
     friends when :math:`i - j` is a square modulo 17, that is, one of
     1, 2, 4, 8, 9, 13, 15, 16.
   - *Question 6.* :math:`K_{43}` has :math:`43 \cdot 42 / 2 = 903`
     lines, so there are :math:`2^{903} \approx 10^{272}` colourings,
     far more than the number of atoms in the universe. Paul Erdős
     is said to have told this story, retold by Joel Spencer: If
     aliens threatened to destroy Earth unless we told them
     :math:`R(5,5)`, we should gather all our computers and
     mathematicians and try. If they asked for :math:`R(6,6)`, we
     should try to destroy the aliens instead.
   - *For the mathematically curious.* Pick one vertex, and split the
     others by the colour of their line to it. This shows that
     :math:`R(s, t) \leq R(s-1, t) + R(s, t-1)`, and therefore that
     :math:`R(k, k)` exists for every :math:`k` and is at most about
     :math:`4^k` (Erdős and Szekeres, 1935). Improving the 4 was open
     for almost 90 years.

   **Resources**

   - `Sim (game) <https://en.wikipedia.org/wiki/Sim_(game)>`_ on
     Wikipedia. Invented by Gustavus Simmons in 1969. A computer
     search showed in 1974 that the second player can always win, with
     a strategy too complicated to memorise.
   - S. Radziszowski. `Small Ramsey Numbers
     <https://www.combinatorics.org/ojs/index.php/eljc/article/view/DS1>`_.
     Electronic Journal of Combinatorics, Dynamic Survey DS1. The
     reference table of all the Ramsey numbers we know, updated every
     few years.
   - V. Angeltveit and B. D. McKay (2024). `R(5,5) ≤ 46
     <https://arxiv.org/abs/2409.15709>`_. The latest upper bound,
     obtained with a large computer search. The lower bound of 43 comes
     from a colouring of :math:`K_{42}` found by Exoo in 1989.
   - M. Campos, S. Griffiths, R. Morris, and J. Sahasrabudhe (2023).
     `An Exponential Improvement for Diagonal Ramsey
     <https://arxiv.org/abs/2303.09521>`_. The first improvement of
     the :math:`4^k` bound since 1935.
