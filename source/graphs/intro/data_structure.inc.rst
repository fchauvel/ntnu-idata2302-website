Graphs as Data Structures
=========================

.. index:: Data Structure ; Graph, Graph ; Data Structure

Besides being a mathematical concept, a graph is also a data
structure. To use it in a program, we first need to decide which
operations it offers.


Graph ADT
---------

.. index:: Abstract Data Type ; Graph

There is no agreement on what the graph abstract data type should
be. There are indeed many operations that one can perform on a graph:
finding cycles, components, unreachable vertices, etc. Graphs are highly
application dependent. We describe below a minimal set of operations,
enough to run the algorithms of this module.

Our ADT is made of three types: the *graph*, its *vertices* and its
*edges*. The graph owns the vertices and the edges: They only exist
inside a graph, which creates them (see ``create_vertex`` and
``connect``) and deletes them. What a vertex or an edge *carries* (a
name, coordinates, a weight, etc.) depends on the application. A vertex
is just an identity: We can compare two vertices to know whether they are
the same, and nothing else. An edge, for its part, can tell us which are
its two ends.

.. module:: graph

.. function:: create() -> Graph

   Create a new empty graph, denoted as :math:`g`.

   Preconditions:
      None

   Postconditions:
    - The resulting graph :math:`g` has neither vertex nor edge.

      .. math::
         g = create() \implies vertices(g) = \emptyset \, \land \,
         edges(g) = \emptyset

.. function:: vertices(g: Graph) -> Sequence[Vertex]

   Return the vertices of the graph :math:`g`, each of them once, in no
   particular order.

   Preconditions:
      None

   Postconditions:
    - The graph :math:`g` is not changed.

.. function:: edges(g: Graph) -> Sequence[Edge]

   Return the edges of the graph :math:`g`, each of them once, in no
   particular order.

   Preconditions:
      None

   Postconditions:
    - The graph :math:`g` is not changed.

.. function:: create_vertex(g: Graph) -> Graph, Vertex

   Add a new vertex to the graph :math:`g`. The operation returns the
   updated graph and the new vertex, so that we can refer to it later.

   Preconditions:
      None

   Postconditions:
    - The new vertex :math:`v` is not one of the previous vertices, and
      is now a vertex of the updated graph :math:`g'`. The edges do not
      change.

      .. math::
         create\_vertex(g) = (g', v) \implies v \notin vertices(g)
         \, \land \, vertices(g') = vertices(g) \cup \{v\}
         \, \land \, edges(g') = edges(g)

.. function:: remove_vertex(g: Graph, v: Vertex) -> Graph

   Delete the vertex :math:`v` from the graph :math:`g`.

   Preconditions:
    - The vertex :math:`v` is a vertex of the graph :math:`g`.

      .. math::
         v \in vertices(g)

    - No edge is connected to the vertex :math:`v`. If there are some,
      we must first remove them with ``disconnect``.

      .. math::
         \nexists e \in edges(g), \, source(e) = v \, \lor \, target(e) = v

   Postconditions:
    - The vertex :math:`v` is no longer a vertex of the updated graph
      :math:`g'`. The edges do not change.

      .. math::
         remove\_vertex(g, v) = g' \implies vertices(g') = vertices(g)
         \setminus \{v\} \, \land \, edges(g') = edges(g)

.. function:: connect(g: Graph, s: Vertex, t: Vertex) -> Graph, Edge

   Create a new edge from the vertex :math:`s` (its *source*) to the
   vertex :math:`t` (its *target*), in the graph :math:`g`. The operation
   returns the updated graph and the new edge. In an undirected graph, the
   order of :math:`s` and :math:`t` does not matter.

   Preconditions:
    - Both vertices are vertices of the graph :math:`g`.

      .. math::
         s \in vertices(g) \, \land \, t \in vertices(g)

   Postconditions:
    - The new edge :math:`e` goes from :math:`s` to :math:`t`, and is now
      an edge of the updated graph :math:`g'`. The vertices do not
      change.

      .. math::
         connect(g, s, t) = (g', e) \implies source(e) = s \, \land \,
         target(e) = t \, \land \, edges(g') = edges(g) \cup \{e\}
         \, \land \, vertices(g') = vertices(g)

   Nothing prevents us from connecting the same two vertices twice: We then
   get two *parallel* edges. In a weighted graph, ``connect`` also takes
   the weight of the new edge, as a fourth argument.

.. function:: disconnect(g: Graph, e: Edge) -> Graph

   Remove the edge :math:`e` from the graph :math:`g`.

   Preconditions:
    - The edge :math:`e` is an edge of the graph :math:`g`.

      .. math::
         e \in edges(g)

   Postconditions:
    - The edge :math:`e` is no longer an edge of the updated graph
      :math:`g'`. The vertices do not change.

      .. math::
         disconnect(g, e) = g' \implies edges(g') = edges(g) \setminus
         \{e\} \, \land \, vertices(g') = vertices(g)

.. function:: edges_from(g: Graph, v: Vertex) -> Sequence[Edge]

   Return the edges of the graph :math:`g` that start from the vertex
   :math:`v`, that is, whose *source* is :math:`v`. In an undirected
   graph, we can follow an edge from either of its ends: The operation then
   returns all the edges that have :math:`v` as one of their ends, each of
   them seen from :math:`v`, so that its source is :math:`v` and its
   target is the vertex at the other end.

   Preconditions:
    - The vertex :math:`v` is a vertex of the graph :math:`g`.

   Postconditions:
    - The graph :math:`g` is not changed.

.. function:: edges_to(g: Graph, v: Vertex) -> Sequence[Edge]

   Return the edges of the graph :math:`g` that lead to the vertex
   :math:`v`, that is, whose *target* is :math:`v`. In an undirected
   graph, this is the same as ``edges_from``.

   Preconditions:
    - The vertex :math:`v` is a vertex of the graph :math:`g`.

   Postconditions:
    - The graph :math:`g` is not changed.

.. function:: is_adjacent(g: Graph, s: Vertex, t: Vertex) -> Boolean

   Tell whether there is an edge from the vertex :math:`s` to the vertex
   :math:`t` in the graph :math:`g` (in either direction, if the graph is
   undirected).

   Preconditions:
    - Both vertices are vertices of the graph :math:`g`.

   Postconditions:
    - The graph :math:`g` is not changed.

An edge only offers queries. These tell us its two ends, which are always
vertices of the graph that owns the edge, and, in a weighted graph, its
weight.

.. module:: edge

.. function:: source(e: Edge) -> Vertex

   Return the vertex where the edge :math:`e` starts.

.. function:: target(e: Edge) -> Vertex

   Return the vertex where the edge :math:`e` ends.

.. function:: weight(e: Edge) -> Real

   Return the weight of the edge :math:`e`. This only exists in weighted
   graphs.


Graph Representations
---------------------

There are many ways to implement the graph ADT above, from a simple
list of edges to more complicated structures using hashing. As always,
the one to use depends on the problem at hand. Let see the most common
ones.

In the general case, there is some information attached to either the
vertex, the edges, or to both. The internal representation we choose
impact however the implementation (and the efficiency) of the
operations.

.. _graph_representation:

+------------------+-------------+-------------------+-----------------------+
| Operations       | Edge List   | Adjacency List    | Adjacency Matrix      |
+==================+=============+===================+=======================+
| create_vertex    | O(1)        | O(1)              |                       |
+------------------+-------------+-------------------+-----------------------+
| remove_vertex    | O(V)        | O(V)              |                       |
+------------------+-------------+-------------------+-----------------------+
| connect          | O(1)        | O(1)              |                       |
+------------------+-------------+-------------------+-----------------------+
| disconnect       | O(E)        | O(V+E)            |                       |
+------------------+-------------+-------------------+-----------------------+
| edges_from       | O(E)        | O(deg(v))         |                       |
+------------------+-------------+-------------------+-----------------------+
| edges_to         | O(E)        | O(deg(v))         |                       |
+------------------+-------------+-------------------+-----------------------+
| is_adjacent      | O(E)        | O(1)              |                       |
+------------------+-------------+-------------------+-----------------------+


Edge List
~~~~~~~~~

The simplest solution is simply to store a sequence of edges, where
each edge includes a source vertex, a target vertex and a label. With
this design a vertex is identified by its index in the underlying list
of vertices, and an edge by its index in the underlying list of edges.

.. figure:: _static/images/edge_list.svg
   :align: center

   Overview of an edge list implementation. Vertices and edges are
   records, stored into separate sequences.

While simple, the main downside of this scheme is that most of
operations on graphs rely on linear search to find either the vertex
or the edge of interest. :numref:`graphs/intro/edge_list/code`
illustrates this issue on the ``edgesFrom`` method, where we have to
iterate through all the edges to find those whose source vertex match
the given one.

.. code-block:: java
   :caption: Skeleton to implement a graph using an *edge list* in Java
   :name: graphs/intro/edge_list/code

   public class EdgeList<V, E> {
   
      class Edge {
         private int source;
         private int target;
         private E label;  
      }
      
      private List<V> vertices;
      private List<Edge> edges;

      public List<Integer> edgesFrom(int source) {
          final var result = new ArrayList<Integer>();
          for(var edge: this.edges) {
             if (edge.source == source) {
                result.add(edge);
             }
          }
          return result;
      }

      // Etc.
   }

   
Adjacency List
~~~~~~~~~~~~~~

Another possible representation is the *adjacency list*: Each vertex
gets its own list of incident edges. Often, store a hash table to
retrieve specific vertex faster. When edges have no label/payload,
each vertex is associated with the list of adjacent vertices (so the
name "adjacency list").

The benefit of the this adjacency list is that is speed up the
retrieval of incoming and outgoing edges. These are often very useful
operation, for example, to traverse the graph (see
:ref:`Graph Traversals <graph_traversals>`)

.. _adjacency_list_code:

.. code-block:: java
   :caption: Skeleton to implement a graph using an *adjacency list* in Java

   public class AdjacencyList<V, E> {

      class Edge {
         int source;
         int target;
         E payload;

         // etc.
      }
   
      class Vertex {
         V payload;
         List<Edge> incidentEdges;

         // etc.
      }

      private List<Vertex> vertices;
      private List<Edge> edges;

      public List<Integer> edgesFrom(int source) {
          final var result = new ArrayList<Integer>();
          for(var edge: this.vertices[source].incidentEdges) {
             if (edge.source == source) {
                result.add(edge);
             }
          }
          return result;
      }

      // etc.
   }


Adjacency Matrix
~~~~~~~~~~~~~~~~


.. note:: Graphs can quickly become very large. Take social media for
          instance with millions of users, or package dependencies in
          Python or JavaScript. Such large graphs requires dedicated
          storage solution, more like databases. Relational databases
          such as MySQL are however inappropriate and dedicated
          solution exists such as such as `Neo4j
          <https://neo4j.com/>`_ for instance.

          
.. _graph_traversals:
          
Graph Traversals
----------------

As we have seen for trees, one may need to *navigate* through the
structure of the graph, for instance to find whether there is a path
between two vertices.

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

Depth-first Traversal
~~~~~~~~~~~~~~~~~~~~~

.. index:: Depth-first ; Graph Traversal

Intuitively, a depth-first traversal never turns back, except once it
reaches a dead-end, either because the vertex it has reached has no
outgoing edge, or because it has already "visited" all the surrounding
vertices.  The depth-first traversal would proceed as follows:

1. Add the entry vertex to the sequence of *pending* vertices

2. While there are pending vertices,

   1. Take out the *last* pending vertex added

   2. If that vertex is not in the set of *visited* ones

      1. Add it to the set of *visited* vertices

      2. Add all vertices that can be reached from there

:numref:`depth_first_alg` below shows a Java implementation of this
algorithm. Note the use of a stack (see Line 3) which forces the
extraction of the *last* inserted pending vertex.

.. _depth_first_alg:
   
.. code-block:: java
   :caption: Java implementation of a depth-first traversal 
   :linenos:
   :emphasize-lines: 3,7,10-12
                     
   public void depthFirstTraversal(Graph graph, Vertex entry) {
      final var visited = new HashSet<Vertex>();
      final var pending = new Stack<Vertex>();
      pending.push(entry);
      while (!pending.isEmpty()) {
          var current = pending.pop();
          if (!visited.contains(current)) {
              System.out.println(current);
              visited.add(current);
              for (var eachEdge: graph.edgesFrom(current)) {
                  pending.push(eachEdge.target)
              }
          }
      }   
   }

  
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
   

Breadth-first Traversal
~~~~~~~~~~~~~~~~~~~~~~~

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
