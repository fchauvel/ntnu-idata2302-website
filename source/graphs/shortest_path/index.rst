=============================
Reachability & Shortest Paths
=============================

:Lecture: Lecture 6.2 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/EQ6yH_nhcy1Nhqj-3Z5vChQBVc7cGucX8MYtoivL1Gdi2g?e=Ds7Feq>`
:Objectives: Understand reachability in graphs and how to find shortest
             paths between vertices in weighted and unweighted graphs
:Concepts: Reachability, path length, weighted paths, negative cycles,
           BFS shortest path, Dijkstra's algorithm, Bellman-Ford
           algorithm, Floyd-Warshall algorithm, relaxation

One of the most fundamental questions we ask about graphs is whether we
can get from one vertex to another: Can I travel from Oslo to Bergen?
Can a message reach its destination in a network? Can a player win a
game from the current state? Once we know a path exists, we often want
to find the *best* one: What's the fastest route? The cheapest
connection? The most reliable path?

These questions lead us to two related problems: *reachability* (does a
path exist?) and *shortest paths* (which path is best?). As we'll see,
answering these questions requires different approaches depending on
whether edges have weights and what kinds of weights they have.


Part I: Paths and Reachability
===============================

Before we can find the *shortest* path, we need to understand what
paths are and how to determine if they exist at all. Let's connect the
traversal algorithms from the introduction to the path-finding problem.


What is a Path?
---------------

.. index:: path, walk, cycle

Recall from the introduction that a **path** in a graph is a sequence
of vertices where each consecutive pair is connected by an edge, and no
vertex appears more than once. More formally, given a graph :math:`G =
(V, E)`, a path from vertex :math:`\alpha` to vertex :math:`\omega` is
a sequence of vertices :math:`v_1, v_2, \ldots, v_n` such that:

- :math:`v_1 = \alpha` (starts at the source)
- :math:`v_n = \omega` (ends at the target)
- For all :math:`i \in [1, n-1]`, there exists an edge :math:`(v_i,
  v_{i+1}) \in E`
- All vertices in the sequence are distinct (no repeats)

The **length** of a path in an unweighted graph is simply the number of
edges it contains, which is :math:`n - 1` for a path with :math:`n`
vertices.

.. note::

   Don't confuse a **path** with a **walk**. A walk allows vertices to
   repeat, while a path does not. A **cycle** is a special walk that
   starts and ends at the same vertex.

Consider the friendship graph from the introduction, shown again in
:numref:`sp_friendship_graph`. How many paths exist from Denis to Peter?
Is there a path from Denis to Thomas?

.. _sp_friendship_graph:

.. figure:: ../intro/_static/images/friendship_graph.svg
   :align: center

   A friendship graph where edges represent acquaintance relationships.


The Reachability Problem
-------------------------

.. index:: reachability

The **reachability problem** asks a simple yes-or-no question: Given
two vertices :math:`\alpha` and :math:`\omega`, does there exist a path
from :math:`\alpha` to :math:`\omega`?

We write :math:`\alpha \rightarrow \omega` to denote that
:math:`\omega` is *reachable* from :math:`\alpha`. Formally:

.. math::

   \alpha \rightarrow \omega \iff \exists \, (v_1, v_2, \ldots, v_n)
   \text{ such that } v_1 = \alpha \land v_n = \omega \land \forall i
   \in [1, n-1], \; (v_i, v_{i+1}) \in E

This problem appears everywhere in Computer Science and beyond:

- **Network connectivity**: Can data packets reach their destination?
- **Social networks**: Are two people connected through mutual friends?
- **State-space search**: Can we reach a winning game state from the
  current position?
- **Compiler analysis**: Can control flow reach a certain line of code?
- **Model checking**: Can a system reach an error state?

In :numref:`sp_friendship_graph`, we can verify that Denis
:math:`\rightarrow` Peter (there exists a path through Frank, Lisa,
John, and Mary), but Denis :math:`\not\rightarrow` Thomas because
Thomas is isolated from Denis's connected component.


Using Traversal for Reachability
---------------------------------

.. index:: depth-first search, breadth-first search, graph traversal

In the introduction, we learned about **depth-first** (DFS) and
**breadth-first** (BFS) traversals for exploring all vertices reachable
from a starting point. These traversal algorithms are exactly what we
need to solve the reachability problem!

Both algorithms maintain two sets:

- **Pending vertices**: Discovered but not yet processed
- **Visited vertices**: Already processed

The key difference is the order in which they process pending vertices:

- **DFS** uses a **stack** (LIFO): Process the *most recently*
  discovered vertex
- **BFS** uses a **queue** (FIFO): Process the *earliest* discovered
  vertex

:numref:`sp_reachability_dfs` shows how we can adapt DFS to check
reachability.

.. _sp_reachability_dfs:

.. code-block:: java
   :caption: Depth-first search for reachability
   :linenos:
   :emphasize-lines: 3,7,10

   public boolean hasPath(Graph graph, Vertex source, Vertex target) {
       var visited = new HashSet<Vertex>();
       var pending = new Stack<Vertex>();
       pending.push(source);

       while (!pending.isEmpty()) {
           var current = pending.pop();

           if (current.equals(target)) {
               return true;  // Found a path!
           }

           if (!visited.contains(current)) {
               visited.add(current);
               for (var edge : graph.edgesFrom(current)) {
                   pending.push(edge.target);
               }
           }
       }

       return false;  // No path exists
   }

Both DFS and BFS can solve reachability with :math:`O(V + E)`
complexity: we visit each vertex at most once and examine each edge at
most once.


BFS Discovers Shortest Paths
-----------------------------

.. index:: shortest path, breadth-first search

While both DFS and BFS can determine whether a path exists, BFS has a
special property: **it discovers vertices in order of their distance
from the source**. This means BFS naturally finds the *shortest* path
in terms of edge count.

.. _sp_bfs_levels:

.. figure:: ../intro/_static/images/breadth_first_traversal.svg
   :align: center

   BFS explores vertices level by level, discovering them in order of
   increasing distance from the source.

Consider :numref:`sp_bfs_levels`. Starting from Denis, BFS discovers:

1. **Distance 0**: Denis (the source)
2. **Distance 1**: Frank, Olive (one edge away)
3. **Distance 2**: Lisa, Thomas, Erik, Mary (two edges away)
4. **Distance 3**: John, Peter (three edges away)

This level-by-level exploration guarantees that when BFS first visits a
vertex, it has found the shortest path to that vertex.

.. important::

   **BFS finds shortest paths in unweighted graphs**: When all edges
   have the same "cost" (or equivalently, weight 1), the path with the
   fewest edges is the shortest path. BFS guarantees to find this path.


Why BFS Finds Shortest Paths
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**The Intuition**: BFS is like throwing a stone into a pond—the ripples
spread outward uniformly. Vertices at distance :math:`d` are all
discovered before any vertex at distance :math:`d+1`.

**The Correctness Argument**: We can prove BFS finds shortest paths
using a loop invariant.

**Loop Invariant**: After processing all vertices at distance
:math:`d`, the algorithm has:

1. Discovered all vertices at distances :math:`0, 1, 2, \ldots, d+1`
2. Computed the correct shortest distance for all vertices at distances
   :math:`0, 1, 2, \ldots, d`

**Proof sketch**:

- **Base case** (:math:`d = 0`): The source is at distance 0, and its
  neighbors are all at distance 1. Both are correctly discovered.

- **Inductive step**: Assume the invariant holds for distance
  :math:`d`. When we process a vertex :math:`v` at distance :math:`d`,
  we examine all its neighbors. Any unvisited neighbor :math:`w` must
  be at distance :math:`d+1` (it can't be closer, or we would have
  visited it already). We add :math:`w` to pending with distance
  :math:`d+1`, maintaining the invariant.

- **Termination**: When the queue is empty, we've processed all
  reachable vertices with their correct shortest distances.


BFS Shortest Path Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To actually recover the shortest path (not just its length), we need to
remember how we reached each vertex. :numref:`sp_bfs_shortest` shows
this implementation.

.. _sp_bfs_shortest:

.. code-block:: java
   :caption: BFS that computes shortest paths
   :linenos:
   :emphasize-lines: 5,14,21-27

   public List<Vertex> shortestPath(Graph graph, Vertex source, Vertex target) {
       var distance = new HashMap<Vertex, Integer>();
       var parent = new HashMap<Vertex, Vertex>();
       var pending = new LinkedList<Vertex>();

       distance.put(source, 0);
       parent.put(source, null);
       pending.add(source);

       while (!pending.isEmpty()) {
           var current = pending.removeFirst();

           if (current.equals(target)) {
               return reconstructPath(parent, target);
           }

           for (var edge : graph.edgesFrom(current)) {
               var neighbor = edge.target;
               if (!distance.containsKey(neighbor)) {
                   distance.put(neighbor, distance.get(current) + 1);
                   parent.put(neighbor, current);
                   pending.add(neighbor);
               }
           }
       }

       return null;  // No path exists
   }

   private List<Vertex> reconstructPath(Map<Vertex, Vertex> parent, Vertex target) {
       var path = new ArrayList<Vertex>();
       var current = target;

       while (current != null) {
           path.add(0, current);  // Add to front
           current = parent.get(current);
       }

       return path;
   }

**Time Complexity**: :math:`O(V + E)` — we visit each vertex once and
examine each edge once.

**Space Complexity**: :math:`O(V)` — for the distance, parent, and
pending data structures.


.. exercise:: BFS Shortest Path Trace

   Given the graph in :numref:`sp_friendship_graph`, trace the BFS
   algorithm to find the shortest path from Denis to Peter. Show the
   state of the ``distance``, ``parent``, and ``pending`` variables
   after processing each vertex.

.. solution::
   :class: dropdown

   Starting from Denis, the BFS proceeds as follows:

   **Initial state**:

   - ``distance``: {Denis: 0}
   - ``parent``: {Denis: null}
   - ``pending``: [Denis]

   **After processing Denis**:

   - ``distance``: {Denis: 0, Frank: 1, Olive: 1}
   - ``parent``: {Denis: null, Frank: Denis, Olive: Denis}
   - ``pending``: [Frank, Olive]

   **After processing Frank**:

   - ``distance``: {Denis: 0, Frank: 1, Olive: 1, Lisa: 2, Thomas: 2}
   - ``parent``: {Denis: null, Frank: Denis, Olive: Denis, Lisa:
     Frank, Thomas: Frank}
   - ``pending``: [Olive, Lisa, Thomas]

   **After processing Olive**:

   - ``distance``: {Denis: 0, Frank: 1, Olive: 1, Lisa: 2, Thomas: 2,
     Erik: 2, Mary: 2}
   - ``parent``: {Denis: null, Frank: Denis, Olive: Denis, Lisa:
     Frank, Thomas: Frank, Erik: Olive, Mary: Olive}
   - ``pending``: [Lisa, Thomas, Erik, Mary]

   **After processing Lisa**:

   - ``distance``: {Denis: 0, Frank: 1, Olive: 1, Lisa: 2, Thomas: 2,
     Erik: 2, Mary: 2, John: 3}
   - ``parent``: {Denis: null, Frank: Denis, Olive: Denis, Lisa:
     Frank, Thomas: Frank, Erik: Olive, Mary: Olive, John: Lisa}
   - ``pending``: [Thomas, Erik, Mary, John]

   Continue until we reach Peter at distance 4. The shortest path is:
   **Denis → Frank → Lisa → John → Mary → Peter** (5 edges).


Part II: Weighted Paths and Edge Cases
=======================================

So far, we've considered graphs where all edges are equal—getting from
one vertex to another costs the same regardless of which edge we take.
But in the real world, not all connections are equal. Some roads are
longer, some flights are more expensive, some network links are slower.
This is where **edge weights** come in, and they fundamentally change
the shortest path problem.


Introducing Edge Weights
-------------------------

.. index:: weighted graph, edge weight

A **weighted graph** associates a numerical value with each edge,
representing distance, cost, time, or any other quantity relevant to
the problem. Recall from the introduction that a weighted graph is a
structure :math:`G = (V, E, \phi)` where :math:`\phi: E \to
\mathbb{R}` maps each edge to its weight.

Consider the Norwegian cities graph from :numref:`sp_norwegian_cities`.
The weights represent road distances in kilometers.

.. _sp_norwegian_cities:

.. figure:: ../intro/_static/images/norway_cities.svg
   :align: center

   Norwegian cities connected by roads. Edge weights represent
   distances in kilometers.

The **length** (or **cost**) of a path in a weighted graph is the
**sum of its edge weights**, not the number of edges. For a path
:math:`p = (v_1, v_2, \ldots, v_n)`, the length is:

.. math::

   \text{length}(p) = \sum_{i=1}^{n-1} \phi(v_i, v_{i+1})

This fundamentally changes what we mean by "shortest path": we now seek
the path with minimum total weight, which may not be the path with the
fewest edges.


Fewest Edges ≠ Shortest Path
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. index:: shortest path, weighted graph

This is where students often struggle: in weighted graphs, the path
with the fewest edges is **not necessarily** the shortest path!

.. _sp_weight_vs_edges:

.. figure:: _static/images/weight_vs_edges.svg
   :align: center

   The path with fewer edges (Oslo → Ålesund → Bergen, total: 707 km)
   is longer than the path with more edges (Oslo → Molde → Trondheim →
   Ålesund → Bergen, total: 672 km).

.. warning::

   **BFS fails on weighted graphs**: BFS finds the path with the fewest
   edges, not the path with minimum total weight. We need different
   algorithms for weighted shortest paths.


The Weighted Shortest Path Problem
-----------------------------------

.. index:: shortest path problem, weighted shortest path

We can now formally state the shortest path problem for weighted
graphs:

.. admonition:: Single-Source Shortest Path Problem

   **Input**: A weighted graph :math:`G = (V, E, \phi)` and a source
   vertex :math:`s \in V`

   **Output**: For each vertex :math:`v \in V`, the minimum total
   weight of any path from :math:`s` to :math:`v`, or :math:`\infty`
   if no such path exists

There's also the **all-pairs shortest path** problem, which asks for
shortest paths between *every* pair of vertices. We'll address this
later with the Floyd-Warshall algorithm.


When Shortest Paths Don't Exist
--------------------------------

.. index:: negative cycle, cycle, shortest path existence

In unweighted graphs, if a path exists, there's always a *shortest*
path (one with the fewest edges). But in weighted graphs, things get
more complicated. Edge weights can fundamentally break the notion of a
"shortest" path.


Positive Cycles: Annoying but Harmless
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. index:: positive cycle

Consider a graph with a cycle whose total weight is positive. Can we
use this cycle to make paths shorter? No! Adding a positive-weight
cycle to any path only makes it longer.

.. _sp_positive_cycle:

.. figure:: _static/images/positive_cycle.svg
   :align: center

   A positive-weight cycle. Traversing the cycle A → B → C → A adds 15
   to the path length, so it's never beneficial.

If we're looking for shortest paths, we simply avoid positive cycles.
Any shortest path in a graph can be chosen to be **simple** (no
repeated vertices), because if it contained a positive cycle, we could
remove the cycle to get a shorter path.


Negative Cycles: Breaking Shortest Paths
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. index:: negative cycle, shortest path problem

Now consider a cycle whose total weight is **negative**. This is where
things break down completely.

.. _sp_negative_cycle:

.. figure:: _static/images/negative_cycle.svg
   :align: center

   A negative-weight cycle X → Y → Z → X with total weight -5. Each
   traversal reduces path length by 5.

If there's a path from source :math:`s` to some vertex :math:`v` that
goes through a negative cycle, we can traverse that cycle as many times
as we want, making the "shortest" path arbitrarily short:

- First path: :math:`s \to \ldots \to X \to Y \to Z \to X \to \ldots
  \to v` (length :math:`L`)
- Second path: :math:`s \to \ldots \to X \to Y \to Z \to X \to Y \to Z
  \to X \to \ldots \to v` (length :math:`L - 5`)
- Third path: :math:`s \to \ldots \to (X \to Y \to Z)^3 \to X \to
  \ldots \to v` (length :math:`L - 10`)
- ...and so on to :math:`-\infty`

**There is no shortest path** when a negative cycle is reachable from
the source and can reach the target!

.. important::

   The shortest path problem is only well-defined when there are **no
   negative cycles reachable** from the source vertex.

   Some algorithms (like Bellman-Ford) can **detect** negative cycles,
   which is itself a useful capability for finding arbitrage
   opportunities in currency exchange, detecting inconsistencies in
   constraint systems, etc.


Negative Edges vs. Negative Cycles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. index:: negative edge, negative cycle

It's crucial to distinguish between:

- **Negative edges**: Individual edges with negative weight (these are
  fine!)
- **Negative cycles**: Cycles whose total weight is negative (these
  break shortest paths)

A graph can have negative edges without having negative cycles.
:numref:`sp_negative_edges_ok` shows such a graph.

.. _sp_negative_edges_ok:

.. figure:: _static/images/negative_edges_ok.svg
   :align: center

   A graph with negative edges but no negative cycles. Shortest paths
   are well-defined.

Negative edges are common in practice:

- **Financial markets**: Currency exchange rates can have negative
  "costs" (profits)
- **Game theory**: Some actions have negative cost (gain resources)
- **Optimization**: Penalties and rewards in scheduling problems


When Can We Guarantee a Shortest Path Exists?
----------------------------------------------

To summarize, a shortest path from :math:`s` to :math:`v` is
guaranteed to exist if:

1. There is a path from :math:`s` to :math:`v` (reachability), **AND**
2. There is no negative cycle reachable from :math:`s` that can reach
   :math:`v`

If these conditions hold, we can always find a shortest path that is
**simple** (visits each vertex at most once). Since there are at most
:math:`|V|` vertices, any simple path has at most :math:`|V| - 1`
edges.

This observation is key to the correctness of the Bellman-Ford
algorithm, which we'll explore next.


.. exercise:: Negative Cycle Detection

   Consider a graph representing currency exchange rates, where an edge
   from currency A to currency B with weight :math:`w` means you can
   exchange 1 unit of A for :math:`e^w` units of B. A negative cycle in
   this graph represents an arbitrage opportunity (a way to make money
   by exchanging currencies in a loop).

   Given the following exchange rates, construct the weighted graph and
   determine if an arbitrage opportunity exists:

   - USD to EUR: 0.85 (weight: :math:`\ln(0.85) \approx -0.163`)
   - EUR to GBP: 0.90 (weight: :math:`\ln(0.90) \approx -0.105`)
   - GBP to USD: 1.35 (weight: :math:`\ln(1.35) \approx 0.300`)

   Is there a negative cycle?

.. solution::
   :class: dropdown

   The cycle USD → EUR → GBP → USD has total weight:

   .. math::

      -0.163 + (-0.105) + 0.300 = 0.032 > 0

   This is a **positive** cycle, so there's no arbitrage opportunity.
   Starting with 1 USD:

   - USD → EUR: :math:`1 \times 0.85 = 0.85` EUR
   - EUR → GBP: :math:`0.85 \times 0.90 = 0.765` GBP
   - GBP → USD: :math:`0.765 \times 1.35 \approx 1.033` USD

   You end up with slightly more than you started (due to rounding), but
   in reality, transaction fees would eliminate this small gain.

   For a negative cycle, you'd need the product of exchange rates around
   the cycle to exceed 1: :math:`0.85 \times 0.90 \times 1.35 \approx
   1.033`, which corresponds to :math:`\ln(1.033) \approx 0.032 > 0`.


Part III: Shortest Path Algorithms
===================================

Now that we understand the landscape—reachability, weighted paths, and
their edge cases—we're ready to explore algorithms that find shortest
paths. As we'll see, all three algorithms we study share a common idea:
the **relaxation** principle.


The Relaxation Principle
-------------------------

.. index:: relaxation, edge relaxation

All shortest path algorithms we'll study share the same core operation:
**edge relaxation**. The idea is simple: we maintain an estimate
``dist[v]`` of the shortest distance from the source to each vertex
:math:`v`, and we iteratively improve these estimates.

**Relaxation** asks: "Can I improve my path to :math:`v` by going
through :math:`u`?"

.. code-block:: java
   :caption: The relaxation operation
   :linenos:

   void relax(Vertex u, Vertex v, double weight) {
       if (dist[v] > dist[u] + weight) {
           dist[v] = dist[u] + weight;
           parent[v] = u;  // Remember how we got here
       }
   }

This simple operation is the heart of all shortest path algorithms. The
algorithms differ in **when** and **how often** they relax edges:

- **BFS**: Relaxes edges in breadth-first order (implicit, since all
  weights are 1)
- **Dijkstra**: Relaxes edges from the closest unvisited vertex
  (greedy)
- **Bellman-Ford**: Relaxes all edges repeatedly (brute force)
- **Floyd-Warshall**: Relaxes all pairs through intermediate vertices
  (dynamic programming)


Algorithm 1: BFS for Unweighted Graphs
---------------------------------------

.. index:: breadth-first search, shortest path, unweighted graph

We've already seen that BFS finds shortest paths in unweighted graphs.
Let's revisit it in the context of relaxation to see how it fits the
pattern.

The Intuition
~~~~~~~~~~~~~

BFS explores the graph level by level, like ripples spreading outward
from a stone thrown into a pond. Vertices at distance :math:`d` are all
discovered before any vertex at distance :math:`d+1`.

In the language of relaxation: BFS processes vertices in order of
increasing distance, and when we process a vertex :math:`u`, we relax
all edges leaving :math:`u`.


Why is it Correct?
~~~~~~~~~~~~~~~~~~

BFS is correct because it processes vertices in **non-decreasing order
of distance**. When we first visit a vertex :math:`v`, we've found the
shortest path to :math:`v`.

**Key insight**: In an unweighted graph (or equivalently, all weights
are 1), if we've found a path of length :math:`d` to vertex :math:`v`,
there cannot be a shorter path, because all paths are made of edges of
weight 1.


How Efficient is it?
~~~~~~~~~~~~~~~~~~~~

- **Time complexity**: :math:`O(V + E)`

  - Each vertex is enqueued and dequeued once: :math:`O(V)`
  - Each edge is examined once: :math:`O(E)`
  - Total: :math:`O(V + E)`

- **Space complexity**: :math:`O(V)` for the queue, distance array, and
  parent array

- **Optimal**: You can't do better than :math:`O(V + E)` because you
  must at least look at all edges to find paths.


Limitation
~~~~~~~~~~

BFS **only works when all edges have equal weight**. As soon as we
introduce varying weights, BFS fails to find shortest paths because it
doesn't account for the total weight—only the number of edges.


Algorithm 2: Dijkstra's Algorithm
----------------------------------

.. index:: Dijkstra's algorithm, shortest path, greedy algorithm

Dijkstra's algorithm extends BFS to handle graphs with **non-negative**
edge weights. It's one of the most elegant and widely used graph
algorithms, discovered by Edsger Dijkstra in 1956.


The Intuition
~~~~~~~~~~~~~

Imagine you're planning the shortest route from your home to various
destinations in a city. You might think: "Let me first visit the
closest place, then the next closest, and so on." This greedy strategy
is exactly what Dijkstra's algorithm does.

Like BFS, Dijkstra explores the graph in "waves," but instead of
processing vertices by edge count, it always processes the **closest
unvisited vertex** (by total distance from the source).

**The key idea**: Always pick the vertex with the smallest known
distance that hasn't been processed yet. When you process a vertex, its
distance is final—you've found the shortest path to it.

Here's the algorithm in pseudocode:

.. code-block:: text
   :caption: Dijkstra's algorithm (pseudocode)

   function dijkstra(G, source):
       dist[source] ← 0
       for each vertex v ≠ source:
           dist[v] ← ∞

       pending ← priority queue containing all vertices by dist

       while pending is not empty:
           u ← extract vertex with minimum dist from pending

           for each edge (u, v) with weight w:
               if dist[v] > dist[u] + w:
                   dist[v] ← dist[u] + w
                   parent[v] ← u
                   update v's priority in pending

       return dist, parent


A Concrete Example
~~~~~~~~~~~~~~~~~~

Let's trace Dijkstra's algorithm on the Norwegian cities graph from
:numref:`sp_norwegian_cities`, finding shortest paths from Oslo.

.. TO DO: Add a detailed step-by-step visualization showing:
   - Initial state: dist[Oslo] = 0, all others = ∞
   - After processing Oslo: update neighbors
   - After processing Molde: update neighbors
   - etc.

:numref:`sp_dijkstra_example` shows the state after each vertex is
processed.

.. _sp_dijkstra_example:

.. figure:: _static/images/dijkstra_trace.svg
   :align: center

   Tracing Dijkstra's algorithm on Norwegian cities starting from Oslo.

Initial state:

- ``dist``: {Oslo: 0, others: ∞}
- ``pending``: all vertices, prioritized by distance

**Step 1**: Process Oslo (dist = 0)

- Relax edge to Molde: ``dist[Molde] = 0 + 220 = 220``
- Relax edge to Trondheim: ``dist[Trondheim] = 0 + 260 = 260``
- ``pending``: {Molde: 220, Trondheim: 260, others: ∞}

**Step 2**: Process Molde (dist = 220)

- Relax edge to Ålesund: ``dist[Ålesund] = 220 + 82 = 302``
- ``pending``: {Trondheim: 260, Ålesund: 302, others: ∞}

**Step 3**: Process Trondheim (dist = 260)

- Relax edge to Hamar: ``dist[Hamar] = 260 + 260 = 520``
- ``pending``: {Ålesund: 302, Hamar: 520, others: ∞}

...and so on until all reachable vertices are processed.


Implementation
~~~~~~~~~~~~~~

Here's a Java implementation of Dijkstra's algorithm:

.. _sp_dijkstra_code:

.. code-block:: java
   :caption: Dijkstra's algorithm in Java
   :linenos:
   :emphasize-lines: 4,10,15-19

   public Map<Vertex, Double> dijkstra(Graph graph, Vertex source) {
       var dist = new HashMap<Vertex, Double>();
       var parent = new HashMap<Vertex, Vertex>();
       var pending = new PriorityQueue<Vertex>(
           Comparator.comparingDouble(dist::get)
       );

       // Initialize distances
       for (var v : graph.vertices()) {
           dist.put(v, Double.POSITIVE_INFINITY);
       }
       dist.put(source, 0.0);
       pending.add(source);

       while (!pending.isEmpty()) {
           var u = pending.poll();  // Extract minimum

           for (var edge : graph.edgesFrom(u)) {
               var v = edge.target;
               var newDist = dist.get(u) + edge.weight;

               if (newDist < dist.get(v)) {
                   dist.put(v, newDist);
                   parent.put(v, u);

                   // Update priority queue
                   pending.remove(v);  // Remove old priority
                   pending.add(v);     // Re-add with new priority
               }
           }
       }

       return dist;
   }

.. note::

   The implementation above uses a simple approach for updating
   priorities in the queue (remove and re-add). More sophisticated
   implementations use a priority queue that supports efficient
   ``decreaseKey`` operations, such as a Fibonacci heap.


Why is it Correct?
~~~~~~~~~~~~~~~~~~

Dijkstra's algorithm relies on a **greedy choice property**: when we
select the closest unvisited vertex :math:`u`, we've found the shortest
path to :math:`u`.

**Proof by contradiction**:

Suppose when we process vertex :math:`u` with distance ``dist[u]``,
there exists a shorter path to :math:`u`. This path must go through
some unvisited vertex :math:`v` before reaching :math:`u`.

.. _sp_dijkstra_correctness:

.. figure:: _static/images/dijkstra_correctness.svg
   :align: center

   Proof structure: If a shorter path to u existed through v, we would
   have processed v first.

Let the shorter path be :math:`s \to \ldots \to v \to \ldots \to u`.
Let's denote:

- :math:`d(v)` = length of path from :math:`s` to :math:`v`
- ``dist[u]`` = our current distance estimate for :math:`u`

Since all edge weights are non-negative:

.. math::

   d(v) + \text{(path from } v \text{ to } u) \geq d(v)

If this path were shorter than ``dist[u]``, then :math:`d(v) <
\text{dist}[u]`. But this contradicts our choice of :math:`u` as the
closest unvisited vertex—we would have chosen :math:`v` instead!

Therefore, no shorter path to :math:`u` exists, and ``dist[u]`` is
optimal.

.. important::

   This proof **requires non-negative edge weights**. If we had negative
   weights, a path through a later vertex could indeed be shorter,
   breaking the greedy choice.


How Efficient is it?
~~~~~~~~~~~~~~~~~~~~

The time complexity depends on how we implement the priority queue,
but here we assume we are using a :doc:`binary heap <trees/heaps>`.

- :math:`O(V)` extract-min operations: :math:`O(V \log V)`
- :math:`O(E)` decrease-key operations: :math:`O(E \log V)` (remove and
  re-add)
- **Total**: :math:`O((V + E) \log V)`

For connected graphs where :math:`E \geq V - 1`, this simplifies to
:math:`O(E \log V)`.

Limitation
~~~~~~~~~~

Dijkstra's algorithm **fails with negative edge weights**. The greedy
assumption—that the closest unvisited vertex has its final
distance—breaks down when negative edges can create shorter paths
through "farther" vertices.

:numref:`sp_dijkstra_fails` shows a simple counterexample.

.. _sp_dijkstra_fails:

.. figure:: _static/images/dijkstra_fails.svg
   :align: center

   Dijkstra fails with negative edges. It would finalize dist[B] = 5
   before discovering the shorter path A → C → B with length 1.

In this graph:

1. Dijkstra processes A first (dist = 0)
2. Updates dist[B] = 5, dist[C] = 3
3. Processes C next (dist = 3)
4. Would update dist[B] through C: :math:`3 + (-4) = -1`
5. But B might already be processed with dist[B] = 5!

The greedy choice fails because the negative edge creates a shorter
path through a "farther" vertex.


.. exercise:: Dijkstra's Algorithm Trace

   Run Dijkstra's algorithm on the following graph starting from vertex A.
   Show the state of ``dist`` and ``parent`` after processing each vertex.

   .. TO DO: Insert a small weighted graph diagram

.. solution::
   :class: dropdown

   .. TO DO: Provide detailed trace


Algorithm 3: Bellman-Ford Algorithm
------------------------------------

.. index:: Bellman-Ford algorithm, shortest path, negative weights

The Bellman-Ford algorithm handles what Dijkstra cannot: graphs with
**negative edge weights**. It also detects negative cycles, which is
valuable in many applications.


The Intuition
~~~~~~~~~~~~~

Dijkstra's algorithm fails with negative weights because it makes a
greedy choice: "the closest vertex must have its final distance." When
negative edges exist, this assumption breaks.

Bellman-Ford takes a different approach: **brute force relaxation**.
Instead of carefully choosing which vertex to process next, it simply
relaxes *all* edges, repeatedly, until distances stabilize.

**The key insight**: If the shortest path from source to vertex
:math:`v` has :math:`k` edges, then after :math:`k` rounds of relaxing
all edges, ``dist[v]`` will be correct.

Since any simple path has at most :math:`|V| - 1` edges, we relax all
edges :math:`|V| - 1` times to guarantee correctness.

Here's the algorithm:

.. code-block:: text
   :caption: Bellman-Ford algorithm (pseudocode)

   function bellmanFord(G, source):
       dist[source] ← 0
       for each vertex v ≠ source:
           dist[v] ← ∞

       // Relax all edges |V| - 1 times
       for i from 1 to |V| - 1:
           for each edge (u, v) with weight w:
               if dist[v] > dist[u] + w:
                   dist[v] ← dist[u] + w
                   parent[v] ← u

       // Check for negative cycles
       for each edge (u, v) with weight w:
           if dist[v] > dist[u] + w:
               return "negative cycle detected"

       return dist, parent


A Concrete Example
~~~~~~~~~~~~~~~~~~

Consider a graph with negative edges but no negative cycles:

.. _sp_bellman_ford_example:

.. figure:: _static/images/bellman_ford_example.svg
   :align: center

   A graph with negative edges. Bellman-Ford correctly finds shortest
   paths.

Starting from vertex A, let's trace the distance updates:

**Initial state**:

- ``dist``: {A: 0, B: ∞, C: ∞, D: ∞}

**Round 1** (relax all edges):

- Edge A→B (weight 4): ``dist[B] = 0 + 4 = 4``
- Edge A→C (weight 3): ``dist[C] = 0 + 3 = 3``
- Edge B→D (weight 2): ``dist[D] = 4 + 2 = 6``
- Edge C→B (weight -2): ``dist[B] = 3 + (-2) = 1`` ✓ (improvement!)
- State: {A: 0, B: 1, C: 3, D: 6}

**Round 2**:

- Edge B→D (weight 2): ``dist[D] = 1 + 2 = 3`` ✓ (improvement!)
- (Other edges don't improve distances)
- State: {A: 0, B: 1, C: 3, D: 3}

**Round 3**:

- No changes (distances have stabilized)
- State: {A: 0, B: 1, C: 3, D: 3}

**Negative cycle check** (round 4):

- No edge can improve any distance → no negative cycle


Implementation
~~~~~~~~~~~~~~

Here's a Java implementation:

.. _sp_bellman_ford_code:

.. code-block:: java
   :caption: Bellman-Ford algorithm in Java
   :linenos:
   :emphasize-lines: 10-18,21-26

   public Map<Vertex, Double> bellmanFord(Graph graph, Vertex source)
           throws NegativeCycleException {
       var dist = new HashMap<Vertex, Double>();
       var parent = new HashMap<Vertex, Vertex>();

       // Initialize distances
       for (var v : graph.vertices()) {
           dist.put(v, Double.POSITIVE_INFINITY);
       }
       dist.put(source, 0.0);

       // Relax all edges |V| - 1 times
       int V = graph.vertices().size();
       for (int i = 0; i < V - 1; i++) {
           for (var edge : graph.edges()) {
               var u = edge.source;
               var v = edge.target;
               var newDist = dist.get(u) + edge.weight;

               if (newDist < dist.get(v)) {
                   dist.put(v, newDist);
                   parent.put(v, u);
               }
           }
       }

       // Check for negative cycles
       for (var edge : graph.edges()) {
           var u = edge.source;
           var v = edge.target;

           if (dist.get(u) + edge.weight < dist.get(v)) {
               throw new NegativeCycleException(
                   "Graph contains a negative cycle reachable from source"
               );
           }
       }

       return dist;
   }


Why is it Correct?
~~~~~~~~~~~~~~~~~~

Bellman-Ford's correctness relies on a simple but powerful invariant:

**Loop Invariant**: After :math:`k` rounds of relaxing all edges,
``dist[v]`` equals the length of the shortest path from source to
:math:`v` that uses **at most** :math:`k` edges.

**Proof**:

- **Base case** (:math:`k = 0`): ``dist[source] = 0`` is the shortest
  path with 0 edges. All other distances are :math:`\infty` (no path).

- **Inductive step**: Assume the invariant holds after :math:`k`
  rounds. In round :math:`k+1`, consider any vertex :math:`v` and its
  shortest path with :math:`k+1` edges: :math:`s \to \ldots \to u \to
  v`.

  - The subpath :math:`s \to \ldots \to u` has :math:`k` edges
  - By the inductive hypothesis, ``dist[u]`` is correct after :math:`k`
    rounds
  - When we relax edge :math:`(u, v)` in round :math:`k+1`, we compute
    ``dist[u] + weight(u,v)``, which is the length of the path with
    :math:`k+1` edges
  - This updates ``dist[v]`` to the correct value

- **Termination**: After :math:`|V| - 1` rounds, all shortest simple
  paths are covered (they have at most :math:`|V| - 1` edges).

**Negative cycle detection**: If we can still improve distances in
round :math:`|V|`, it means we found a path with :math:`|V|` edges
that's shorter than a path with :math:`|V| - 1` edges. This is only
possible if the path contains a cycle (repeated vertex), and that cycle
must have negative total weight.


How Efficient is it?
~~~~~~~~~~~~~~~~~~~~

- **Time complexity**: :math:`O(V \times E)`

  - :math:`V - 1` rounds of relaxation
  - Each round examines all :math:`E` edges
  - Total: :math:`O(V \cdot E)`

- **Space complexity**: :math:`O(V)` for distance and parent arrays

For dense graphs where :math:`E \approx V^2`, this becomes
:math:`O(V^3)`, which is slower than Dijkstra's :math:`O(V^2)` or
:math:`O(E \log V)`.

**Best case = Worst case**: Unlike Dijkstra, Bellman-Ford always does
the same amount of work regardless of graph structure. It always runs
:math:`V - 1` iterations.

**Optimization**: We can terminate early if a round makes no changes
(distances have stabilized). In practice, this often happens much
earlier than :math:`V - 1` rounds.


When to Use Bellman-Ford
~~~~~~~~~~~~~~~~~~~~~~~~~

Use Bellman-Ford when:

1. **Negative edge weights exist** (Dijkstra would fail)
2. **Negative cycle detection is needed** (arbitrage, consistency
   checking)
3. **Graph is sparse** and :math:`V` is small (otherwise :math:`O(VE)`
   becomes prohibitive)

Avoid Bellman-Ford when:

1. **All edges are non-negative** (use Dijkstra instead—much faster)
2. **Graph is very large** (Bellman-Ford's :math:`O(VE)` complexity
   becomes impractical)


.. exercise:: Bellman-Ford with Negative Cycle

   Run Bellman-Ford on the following graph starting from vertex A. Does
   it detect a negative cycle?

   .. TO DO: Insert graph with a negative cycle

.. solution::
   :class: dropdown

   .. TO DO: Show trace and negative cycle detection


Algorithm 4: Floyd-Warshall Algorithm
--------------------------------------

.. index:: Floyd-Warshall algorithm, all-pairs shortest path, dynamic programming

The algorithms we've seen so far solve the **single-source** shortest
path problem: finding shortest paths from one vertex to all others. But
what if we need shortest paths between *all pairs* of vertices?

We could run Dijkstra or Bellman-Ford from every vertex, giving
:math:`O(V \cdot E \log V)` or :math:`O(V^2 \cdot E)` respectively. The
Floyd-Warshall algorithm offers a different approach with :math:`O(V^3)`
complexity, which can be faster for dense graphs.


The Intuition
~~~~~~~~~~~~~

Floyd-Warshall uses a clever idea: instead of thinking about shortest
paths from a specific source, think about shortest paths that use
**only a specific subset of vertices** as intermediate steps.

Imagine we number the vertices :math:`1, 2, 3, \ldots, n`. We build up
shortest paths incrementally:

- **Step 0**: Consider paths with no intermediate vertices (just direct
  edges)
- **Step 1**: Consider paths that can use vertex 1 as an intermediate
  vertex
- **Step 2**: Consider paths that can use vertices 1 or 2 as
  intermediates
- **Step k**: Consider paths that can use vertices :math:`1, 2, \ldots,
  k` as intermediates
- **Step n**: Consider paths that can use any vertex as an intermediate

For each pair of vertices :math:`(i, j)` and each step :math:`k`, we
ask:

   "Is it shorter to go from :math:`i` to :math:`j` directly (using
   vertices :math:`1, \ldots, k-1`), or to go through vertex :math:`k`
   (i.e., :math:`i \to k \to j`)?"

This gives us the **recurrence relation**:

.. math::

   \text{dist}^k[i][j] = \min(
       \text{dist}^{k-1}[i][j],
       \text{dist}^{k-1}[i][k] + \text{dist}^{k-1}[k][j]
   )

Where :math:`\text{dist}^k[i][j]` is the shortest distance from
:math:`i` to :math:`j` using only vertices :math:`\{1, 2, \ldots, k\}`
as intermediates.

.. note::

   This is a **dynamic programming** approach. We won't dive deep into
   DP theory here (that's Module 7), but the key idea is: solve smaller
   subproblems first, then combine their solutions.


The Algorithm
~~~~~~~~~~~~~

Here's the remarkably simple algorithm:

.. code-block:: text
   :caption: Floyd-Warshall algorithm (pseudocode)

   function floydWarshall(G):
       // Initialize distance matrix
       for each vertex i:
           for each vertex j:
               if i == j:
                   dist[i][j] ← 0
               else if edge (i, j) exists:
                   dist[i][j] ← weight(i, j)
               else:
                   dist[i][j] ← ∞

       // Consider each vertex as intermediate
       for k from 1 to n:
           for i from 1 to n:
               for j from 1 to n:
                   if dist[i][j] > dist[i][k] + dist[k][j]:
                       dist[i][j] = dist[i][k] + dist[k][j]

       return dist

The entire algorithm is just three nested loops! The outermost loop
considers each vertex :math:`k` as a potential intermediate vertex, and
the inner loops check all pairs :math:`(i, j)` to see if going through
:math:`k` improves the path.


A Concrete Example
~~~~~~~~~~~~~~~~~~

Consider this small weighted graph:

.. _sp_floyd_warshall_example:

.. figure:: _static/images/floyd_warshall_example.svg
   :align: center

   A small weighted graph for Floyd-Warshall.

**Initial distance matrix** (direct edges only):

.. math::

   D^0 = \begin{bmatrix}
   0 & 3 & \infty & 7 \\
   8 & 0 & 2 & \infty \\
   5 & \infty & 0 & 1 \\
   2 & \infty & \infty & 0
   \end{bmatrix}

**After considering k=1** (paths through vertex 1):

- Check if going through vertex 1 improves any pair:
- ``dist[2][4]``: :math:`\min(\infty, 8 + 7) = 15` ✓
- ``dist[3][4]``: :math:`\min(1, 5 + 7) = 1` (no improvement)
- etc.

.. math::

   D^1 = \begin{bmatrix}
   0 & 3 & \infty & 7 \\
   8 & 0 & 2 & 15 \\
   5 & 8 & 0 & 1 \\
   2 & 5 & \infty & 0
   \end{bmatrix}

Continue for :math:`k = 2, 3, 4` until all pairs are optimal.


Implementation
~~~~~~~~~~~~~~

Here's a Java implementation:

.. _sp_floyd_warshall_code:

.. code-block:: java
   :caption: Floyd-Warshall algorithm in Java
   :linenos:
   :emphasize-lines: 17-24

   public double[][] floydWarshall(Graph graph) {
       int n = graph.vertices().size();
       var dist = new double[n][n];

       // Initialize distance matrix
       for (int i = 0; i < n; i++) {
           for (int j = 0; j < n; j++) {
               if (i == j) {
                   dist[i][j] = 0;
               } else if (graph.hasEdge(i, j)) {
                   dist[i][j] = graph.weight(i, j);
               } else {
                   dist[i][j] = Double.POSITIVE_INFINITY;
               }
           }
       }

       // Consider each vertex as intermediate
       for (int k = 0; k < n; k++) {
           for (int i = 0; i < n; i++) {
               for (int j = 0; j < n; j++) {
                   if (dist[i][j] > dist[i][k] + dist[k][j]) {
                       dist[i][j] = dist[i][k] + dist[k][j];
                   }
               }
           }
       }

       return dist;
   }

.. warning::

   The order of loops matters! The outermost loop **must** be over
   :math:`k` (intermediate vertices), not :math:`i` or :math:`j`.
   Swapping the loop order will break the algorithm.


Why is it Correct?
~~~~~~~~~~~~~~~~~~

The correctness follows from the dynamic programming recurrence:

**Claim**: After iteration :math:`k`, ``dist[i][j]`` contains the
shortest distance from :math:`i` to :math:`j` using only vertices
:math:`\{1, 2, \ldots, k\}` as intermediates.

**Proof by induction**:

- **Base case** (:math:`k = 0`): No intermediate vertices allowed, so
  only direct edges count. This is our initialization.

- **Inductive step**: Assume the claim holds for :math:`k - 1`. For
  :math:`k`, consider the shortest path from :math:`i` to :math:`j`
  using vertices :math:`\{1, \ldots, k\}`:

  - **Case 1**: The path doesn't use vertex :math:`k`. Then it only
    uses :math:`\{1, \ldots, k-1\}`, and by the inductive hypothesis,
    ``dist[i][j]`` already contains this distance.

  - **Case 2**: The path does use vertex :math:`k`. Then it looks like
    :math:`i \to \ldots \to k \to \ldots \to j`. The subpath :math:`i
    \to k` only uses :math:`\{1, \ldots, k-1\}` (it can't use :math:`k`
    again without creating a cycle), so ``dist[i][k]`` is correct.
    Similarly, ``dist[k][j]`` is correct. The total distance is
    ``dist[i][k] + dist[k][j]``.

  The algorithm takes the minimum of these two cases, giving the
  optimal distance.


How Efficient is it?
~~~~~~~~~~~~~~~~~~~~

- **Time complexity**: :math:`O(V^3)`

  - Three nested loops, each running :math:`V` times
  - Constant work per iteration
  - Total: :math:`O(V^3)`

- **Space complexity**: :math:`O(V^2)` for the distance matrix

**Comparison with repeated Bellman-Ford**:

- Running Bellman-Ford from each vertex: :math:`O(V \cdot (V \cdot E))
  = O(V^2 \cdot E)`
- For dense graphs where :math:`E \approx V^2`: :math:`O(V^4)`
- Floyd-Warshall: :math:`O(V^3)` ✓ (better for dense graphs!)

**Comparison with repeated Dijkstra**:

- Running Dijkstra from each vertex: :math:`O(V \cdot E \log V)`
- For dense graphs: :math:`O(V^3 \log V)`
- Floyd-Warshall: :math:`O(V^3)` ✓ (slightly better, and handles
  negative edges!)


When to Use Floyd-Warshall
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use Floyd-Warshall when:

1. **All-pairs shortest paths needed** (not just single-source)
2. **Graph is dense** (:math:`E \approx V^2`)
3. **Graph is small enough** that :math:`O(V^3)` is acceptable
4. **Negative edges exist** (Dijkstra would fail)
5. **Simple implementation desired** (just 3 nested loops!)

Avoid Floyd-Warshall when:

1. **Only single-source paths needed** (use Dijkstra or Bellman-Ford)
2. **Graph is very large** (:math:`V > 1000` makes :math:`V^3`
   prohibitive)
3. **Graph is sparse** (:math:`E \ll V^2`, repeated Dijkstra may be
   faster)


Negative Cycle Detection
~~~~~~~~~~~~~~~~~~~~~~~~~

Like Bellman-Ford, Floyd-Warshall can detect negative cycles: after the
algorithm completes, check if any ``dist[i][i] < 0``. This indicates
vertex :math:`i` is part of a negative cycle.

.. code-block:: java
   :caption: Detecting negative cycles with Floyd-Warshall

   for (int i = 0; i < n; i++) {
       if (dist[i][i] < 0) {
           throw new NegativeCycleException(
               "Negative cycle detected involving vertex " + i
           );
       }
   }


.. exercise:: Floyd-Warshall Trace

   Run Floyd-Warshall on a 3-vertex graph. Show the distance matrix
   after considering each intermediate vertex :math:`k = 1, 2, 3`.

   .. TO DO: Insert small graph

.. solution::
   :class: dropdown

   .. TO DO: Show matrices for k=0,1,2,3


Comparison of Shortest Path Algorithms
=======================================

Now that we've studied all four algorithms, let's compare them across
key dimensions:

.. _sp_algorithm_comparison:

.. table:: Comparison of shortest path algorithms
   :align: center

   +----------------+-----------+-------------+--------------+-----------+-------------+
   | Algorithm      | Weights   | Scope       | Complexity   | Negative  | Detects     |
   |                |           |             |              | Weights?  | Neg Cycles? |
   +================+===========+=============+==============+===========+=============+
   | **BFS**        | Unweighted| Single-     | O(V + E)     | N/A       | No          |
   |                | (or all 1)| source      |              |           |             |
   +----------------+-----------+-------------+--------------+-----------+-------------+
   | **Dijkstra**   | Non-      | Single-     | O((V+E)log V)| ✗ No      | No          |
   |                | negative  | source      | or O(V²)     |           |             |
   +----------------+-----------+-------------+--------------+-----------+-------------+
   | **Bellman-**   | Any       | Single-     | O(V · E)     | ✓ Yes     | ✓ Yes       |
   | **Ford**       |           | source      |              |           |             |
   +----------------+-----------+-------------+--------------+-----------+-------------+
   | **Floyd-**     | Any       | All-pairs   | O(V³)        | ✓ Yes     | ✓ Yes       |
   | **Warshall**   |           |             |              |           |             |
   +----------------+-----------+-------------+--------------+-----------+-------------+


Decision Tree: Which Algorithm to Use?
---------------------------------------

.. figure:: _static/images/algorithm_decision_tree.svg
   :align: center

   Decision tree for choosing a shortest path algorithm.

1. **Do you need all-pairs shortest paths?**

   - Yes → Use **Floyd-Warshall** (if graph is small/dense)
   - No → Continue to question 2

2. **Are all edges unweighted (or same weight)?**

   - Yes → Use **BFS**
   - No → Continue to question 3

3. **Are there negative edge weights?**

   - No → Use **Dijkstra** (fastest for non-negative weights)
   - Yes → Use **Bellman-Ford**


Summary
=======

In this lecture, we've journeyed from the simple question "does a path
exist?" to sophisticated algorithms for finding optimal paths in
complex weighted graphs. Let's recap the key insights:

**Part I: Paths and Reachability**

- Paths are sequences of connected vertices without repetition
- Reachability asks whether a path exists between two vertices
- DFS and BFS solve reachability in :math:`O(V + E)` time
- BFS discovers vertices by distance, naturally finding shortest paths
  in unweighted graphs

**Part II: Weighted Paths and Edge Cases**

- In weighted graphs, path length = sum of edge weights, not edge count
- Fewest edges ≠ shortest path when weights vary
- Negative cycles break the notion of "shortest path" (length →
  :math:`-\infty`)
- Shortest paths are well-defined when no negative cycles are reachable
  from the source

**Part III: Shortest Path Algorithms**

All algorithms share the **relaxation principle**: iteratively improve
distance estimates by asking "can I get to :math:`v` more cheaply by
going through :math:`u`?"

- **BFS**: Implicit relaxation in breadth-first order; :math:`O(V + E)`
  for unweighted graphs
- **Dijkstra**: Greedy relaxation from closest vertices; :math:`O((V +
  E) \log V)` for non-negative weights
- **Bellman-Ford**: Brute-force relaxation of all edges; :math:`O(V
  \cdot E)` handles negative weights
- **Floyd-Warshall**: All-pairs via dynamic programming; :math:`O(V^3)`
  for dense graphs

The choice of algorithm depends on:

- Whether edges are weighted
- Whether negative weights exist
- Whether you need single-source or all-pairs paths
- The size and density of the graph


.. exercise:: Comprehensive Shortest Path Problem

   You're building a route planning system for a delivery company. The
   road network has:

   - 1000 cities (vertices)
   - 5000 roads (edges)
   - Road lengths in kilometers (positive weights)
   - Occasional toll roads with credits (negative weights)

   Questions:

   1. To find routes from the distribution center to all cities, which
      algorithm should you use? Why?

   2. If you need routes between all pairs of cities, which algorithm
      is most appropriate?

   3. How would you detect if the network has a "negative cycle"
      (arbitrage opportunity where driving in a circle gives you
      credits)?

.. solution::
   :class: dropdown

   1. **Single-source routes**: Use **Bellman-Ford** because:

      - Negative weights exist (toll credits)
      - Need paths from one source (distribution center) to all cities
      - Graph is sparse (5000 edges for 1000 vertices, E ≪ V²)
      - Complexity: :math:`O(1000 \times 5000) = O(5,000,000)` —
        acceptable

      Don't use Dijkstra (fails with negative weights) or Floyd-Warshall
      (overkill for single-source).

   2. **All-pairs routes**: Use **repeated Dijkstra** if you can ensure
      no negative weights affect reachability, or **Floyd-Warshall**:

      - Floyd-Warshall: :math:`O(1000^3) = O(1,000,000,000)` — might be
        too slow
      - Repeated Bellman-Ford: :math:`O(1000 \times 1000 \times 5000) =
        O(5,000,000,000)` — worse!
      - If negative weights are rare, preprocessing to handle them
        separately + Dijkstra might be best

   3. **Negative cycle detection**: Run Bellman-Ford from the
      distribution center. If it reports a negative cycle, investigate
      those edges for the arbitrage opportunity. The cycle itself can be
      reconstructed by following parent pointers when the algorithm
      detects the cycle.


Further Reading
===============

.. seealso::

   - **Cormen et al. (CLRS)**, *Introduction to Algorithms*, 4th ed.

     - Chapter 22: Elementary Graph Algorithms (BFS/DFS)
     - Chapter 24: Single-Source Shortest Paths (Bellman-Ford,
       Dijkstra)
     - Chapter 25: All-Pairs Shortest Paths (Floyd-Warshall)

   - **Sedgewick & Wayne**, *Algorithms*, 4th ed.

     - Section 4.4: Shortest Paths (excellent visualizations)

   - **Original papers**:

     - Dijkstra, E. W. (1959). "A note on two problems in connexion
       with graphs." *Numerische Mathematik*, 1, 269-271.
     - Bellman, R. (1958). "On a routing problem." *Quarterly of
       Applied Mathematics*, 16, 87-90.
     - Floyd, R. W. (1962). "Algorithm 97: Shortest path."
       *Communications of the ACM*, 5(6), 345.


What's Next?
============

In the next lecture, we'll explore **Minimum Spanning Trees**, another
fundamental graph problem. Instead of finding paths between vertices,
we'll find the cheapest way to connect *all* vertices with a tree
structure. This has applications in network design, clustering, and
approximation algorithms.
