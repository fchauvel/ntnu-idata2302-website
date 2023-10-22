=================
Reachability (CP)
=================

The first graph problem we will explore is the problem of
*reachability*, which checks whether there exists a path between two
given vertices. This applies to any species of graph.

There are many variation around this theme however. Here are a few
common ones:

- Find all the vertices that are reachable from a single source vertex;
- Find all the paths that connect two given vertices;
- Find the path that connect two vertices with the minimum number of edges.

Such path finding problems are very common in real life
applications. In Robotics for instance, some "path finding" algorithms
often govern what route the robot takes. In Computer Science, path
finding also serves `model-checking
<https://en.wikipedia.org/wiki/Model_checking>`_, where vertices
represent the internal states of the system, and path finding helps
proving there is no way the system an reach an undesirable path. In
games, if edges represents actions, path finding help decide whether
there exist a sequence of actions for a player to win. There are
applications nearly in every discipline.

Consider again for instance the "friendship graph", we introduced
earlier in :numref:`friendship_graph`. Finding a *path* from Denis to
Kevin would reveal whether they belong to the same "community". Here
there is no such path.

.. image:: _static/images/friendship_graph.svg

   A sample friendship graph (same as :numref:`friendship_graph`).


In the remainder, we shall discuss the simple variant: Given a graph
:math:`G = (V,E)` and two vertices :math:`\alpha` and :math:`\omega`,
check whether there exists a path that connects them. For the more
mathematically inclined, we shall denote the existence of such a path
using :math:`\alpha \rightarrow \omega`, and define it as follows:

.. math::
   \begin{split}
   \forall \, (\alpha, \omega) \in V^2, \; & \alpha \rightarrow \omega \iff \\
      & \exists \, (v_1, v_2, \ldots, v_n) \in V^n, \\
      & \qquad \alpha = v_1 \, \land \, \omega = v_n \\
      & \qquad \land \, \forall \, i \in [2, n], \; (v_{i-1}, v_i) \in E
   \end{split}

Concretely, we extend our graph ADT with an operation
``has_path(source, target)`` which returns true if there exists a path
from ``source`` to ``target``, and false otherwise.

We can adapt the two traversal strategies we have studied for trees,
namely, the *breadth-first* and the *depth-first* traversal. The only
difference is that graphs may contain cycles, and that we remember
which vertices we have already "visited" to avoid "looping" forever in a
cycle.

As we progress through a graph we need to keep track of two things:

- The vertices that we have discovered but not yet processed. We will
  name these ``pending`` vertices

- The vertices that we have already visited (i.e., processed). We will
  name these the ``visited`` vertices.

Depth-first Search
==================

.. index:: Depth-first ; Graph Traversal
           
Intuitively, a depth-first traversal never turns back, except once it
reaches a dead-end, either because the vertex it has reached has no
outgoing edge, or because it has already "visited" all the surrounding
vertices.  The depth-first traversal would proceed as follows:

#. Add the entry vertex to the sequence of *pending* vertices
   
#. While there are pending vertices,

   #. Take out the *last* pending vertex added

   #. If that vertex is not in the set of *visited* ones

      #. Add it to the set of *visited* vertices

      #. Add all vertices that can be reached from there

Example Implementation
----------------------
         
:numref:`depth_first_alg` below shows a Java implementation of this
algorithm. Note the use of a stack (see Line 3) which forces the
extraction of the *last* inserted pending vertex.

.. _depth_first_alg:
   
.. code-block:: ruby
   :caption: Ruby implementation of a depth-first search
   :linenos:
   :emphasize-lines: 3,7,10-12
                     
   def has_path(source, target)
     pending = [source]
     processed = {}
     while not pending.empty?
       vertex = pending.pop()
       if not processed.has_key?(vertex)
         processed[vertex] = true
         self.edges_from(vertex).each |edge| do
            if edge.target == target
               return true
            if not processed.has_key(edge.target) 
               pending.append(edge.target)
            end
         end
       end
     end
     return false
   end

.. seealso::

   See more about a graph implementation in Ruby in "Edge
   list pattern in Ruby".
   
  
Consider for example :numref:`depth_first_example` below, which shows
a "friendship" graph. Vertex represent persons, whereas an edge between two
persons indicates they know each other. Edges are bidirectional and
can be navigated both ways. Starting from "Denis", this depth-first
traversal will reach the vertices in the following order: Denis,
Frank, Lisa, John, Mary, Olive, Erik, Peter, and Thomas.

.. _depth_first_example:

.. figure:: _static/images/depth_first_traversal.png
   :align: center

   Traversing a graph "depth-first", starting from the vertex "Denis"
   (assuming neighbors are visited in alphabetical order). This
   yields the following order: Denis, Frank, Lisa, John, Mary, Olive,
   Erik, Peter, Thomas.
  
Let see how the ``visited`` and ``pending`` variables evolve in this
example.

.. include:: depth_first_run.rst

             
Why is it Correct?
------------------

             
Runtime Efficiency
------------------

What are the best cases and the worst cases

- best-case:  The  source  vertex  is not  connected.  The  two  given
  vertices  are adjacent  and we  return directly.  Besides the  first
  edges we explore is the right one.
  
- worst-case: The graph is a list-like object and we have to traverse
  the whole graph to reach the target.
  - In that case, we traverse E and V edges before to reach to the
    target, which gives us O(V vertex+V-1 edges) = O(V)
  - Worst-case the graph is meshed, so there us V + V^2 edges 


Breadth-first Search
====================

.. index:: Breadth-first ; Graph Traversal

The breadth-first traversal closely resembles the depth-first
traversal, but instead of pushing on forward until a dead-end, it
systematically explores all children, levels by levels. First, the
adjacent vertices, then the vertices two edges away, then those three
edges away, etc. It could be summarized as follows:

1. Add the entry vertex to the pending vertices

2. While there are pending vertices,

   1. Pick the first pending vertex (by order of insertion)

   2. If that vertex has not already been visited

      1. Mark it as visited

      2. Add to pending vertices, all vertices that can be reached
         from that vertex

The only difference with the depth-first traversal is the element we
pick from the list of pending vertices: The breadth-first traversal
uses the first inserted, whereas the depth-first traversal uses the
last inserted.

:numref:`breadth_first_java` below illustrates how a breadth-first
traversal could look like in Java. We use a ``Queue`` to ensure we
always pick the first pending vertex, by insertion order.

.. _breadth_first_java:
   
.. code-block:: java
   :caption: Java implementation of a breadth-first traversal 
   :linenos:
   :emphasize-lines: 3,7,10-12
                     
   public void breadthFirstTraversal(Graph graph, Vertex entry) {
      final var visited = new HashSet<Vertex>();
      final var pending = new Queue<Vertex>();
      pending.push(entry);
      while (!pending.isEmpty()) {
          var current = pending.remove(0);
          if (!visited.contains(current)) {
              System.out.println(current);
              visited.add(current);
              for (var eachEdge: graph.edgesFrom(current)) {
                  pending.push(eachEdge.target)
              }
          }
      }   
   }

Consider again the "friendship" graph introduced in above in
:numref:`depth_first_example` and reproduced below on
:numref:`breadth_first_example`. A breadth-first traversal starting
from "Denis" proceeds by "levels". First it looks at all the adjacent
vertices, namely Frank and Olive. Then, it looks at vertices that it
can reach from those, that is Lisa, Thomas, Mary, and Olive. And then
it continues exploring nodes one more edge away, namely John and
Peter.

.. _breadth_first_example:

.. figure:: _static/images/breadth_first_traversal.svg
   :align: center

   Traversing a graph "breadth-first". It enumerates vertices by
   "level", as follows: Denis, Frank, Olive, Lisa, Thomas, Erik, Mary,
   John, Peter.

