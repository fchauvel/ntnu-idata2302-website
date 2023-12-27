======
Graphs
======

:Module: Graphs
:Git Repository: `Lab 05---Graphs <https://github.com/fchauvel/aldast-lab05>`_
:Objectives:
   - Apply graphs concepts using Mazes
   - Implement Path finding algorithms
     
A *maze* is a “confusing and intricated network of passages” [1]_. We
will play with simple two dimensional mazes as the one shown in
Figure :numref:`labs/graphs/large_maze`, but the idea generalizes to
3D, 4D grids, as well as to other shapes of grids, such as radial or
triangular grids. Our aim is modest however: See how we can find a
path that leads to the exit, and how we can generate “random” mazes of
various sizes.

.. margin::

   .. figure:: _static/images/large_maze.svg
      :name: labs/graphs/large_maze

      A sample maze based on a :math:`20 \times 10` grid

The `Lab 05 Github
repository <https://github.com/fchauvel/aldast-lab05>`__ contains a Java
project to make things more concrete. The Java application can load a
maze from a text file, solve a maze and generate SVG images (see the
Appendix `5 <#sec:cli>`__ for details on how to use it).

Mazes & Graphs
==============

As shown on Figure :numref:`labs/graphs/large_maze`, 2D mazes are
grids where the player can move in four directions: North, east, south
and west. Some moves are not possible, because of walls.

.. exercise::
   :label: labs/graphs/create-your-own
   :nonumber:

   Create your own :math:`5 \times 5` maze (with pen and paper). How
   did you proceed?


.. solution:: labs/graphs/create-your-own
   :class: dropdown

   Any maze would do, here. See for example
   :numref:`labs/graphs/sample-5x5-maze`. What is important is to
   identify its entry and exit.

   .. figure:: _static/images/sample_maze.svg
      :name: labs/graphs/sample-5x5-maze

      A sample :math:`5 \times 5` mazes

.. exercise::
   :label: labs/graphs/maze-as-graph
   :nonumber:

   Consider for instance the maze you just created: How would you
   represent it as a graph?

   #. How would you represents cells, walls and passages?

   #. Use a diagram, an adjacency list or a adjacency matrix to
      represent your maze.

.. solution:: labs/graphs/maze-as-graph
   :class: dropdown

   Mazes are graphs in disguise: Each cell is a node and walls represent
   the lack of edge between two adjacent cells. The only thing graphs
   lack is an entry and exit point. Consider the maze opposite for
   instance, it can be represented by the following adjacency matrix
   :math:`M`, where zeroes denote walls, and ones passages. Values on
   the diagonal can be either 0 or 1, depending on whether we allow the
   user to stay in the same cell without moving. Note that this matrix
   is symmetric as one can go back and forth between two adjacent cells.
   
   .. math::

      M =
          \begin{bmatrix}
            . & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ % (1,1)
            1 & . & 0 & 0 & 1 & 0 & 0 & 0 & 0 \\ % (1,2)
            0 & 0 & . & 0 & 0 & 1 & 0 & 0 & 0 \\ % (1,3)
            0 & 0 & 0 & . & 1 & 0 & 1 & 0 & 0 \\ % (2,1)
            0 & 1 & 0 & 1 & . & 1 & 0 & 0 & 0 \\ % (2,2)
            0 & 0 & 1 & 0 & 1 & . & 0 & 0 & 1 \\ % (2,3)
            0 & 0 & 0 & 1 & 0 & 0 & . & 1 & 0 \\ % (3,1)
            0 & 0 & 0 & 0 & 0 & 0 & 1 & . & 0 \\ % (3,2)
            0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & .    % (3.3)
          \end{bmatrix}

   Contrast this matrix with the equivalent graphical representation
   showing nodes and edges (see
   Figure :numref:`labs/graphs/maze_as_graph`)

   .. figure:: _static/images/maze_as_graph.svg
      :name: labs/graphs/maze_as_graph

      A simple :math:`3 \times 3` maze represented as an undirected
      graph
   
.. exercise::
   :label: labs/graphs/path-finding
   :nonumber:

   What algorithm(s) can we use to solve a maze?

   #. What is the solution of your maze? What is such a solution in
      terms of graphs?

   #. What graph algorithm can we use to solve mazes?

.. solution:: labs/graphs/path-finding
   :class: dropdown

   Figure :numref:`labs/graphs/sample-5x5-maze` shows the solution of
   the maze as a dashed green line. This solution is a *path* in the
   underlying graph, which connects the entry node to the exit. Any
   algorithm that find paths in a graph can therefore be used to solve
   a maze, depth-first search, Dijkstra’s, etc.

.. _`sec:escape`:

Maze Escape
===========

Your next task is to implement three algorithms that find how to reach
the exit of the maze, namely a depth-first search, a breadth-first
search and Dijkstra’s algorithm.

.. exercise::
   :label: labs/graphs/dfs
   :nonumber:

   Use the file ``DFS.java`` and write a depth-first search, which,
   given the entry of a maze, finds the sequence of moves that leads to
   the exit.

   #. Study and complete the file ``Search.java`` (from the ``solver``
      package).

   #. Complete the file ``DFS.java``

   #. The test suite ``DFSTest`` may be helpful.

.. solution:: labs/graphs/dfs
   :class: dropdown

   The simplest solution is to write the depth-first search using a
   loop, since the ``Search`` class provides all the necessary tooling.
   The code below shows a possible Java implementation. Note the use of
   the ``lastPending`` method, when picking up a new cell to visit.

   .. code:: java

          public List<Vector> solve(Maze maze, Search knownCells) {
            knownCells.markAsPending(maze.entry());
            while (knownCells.hasPendingCells()) {
              var position = knownCells.lastPending();
              for (var move : maze.validMovesAt(position)) {
                var end = position.add(move);
                knownCells.record(position, move, end);
                if (maze.isExit(end))
                return knownCells.movesTo(end);
              }
            }
            return null;
          }

.. exercise::
   :label: labs/graphs/bfs
   :nonumber:

   Use the file ``BFS.java`` and implement the breadth-first search
   (BFS), to find the sequence of moves that leads to the exit.

   #. Study and possibly modify the file ``Search.java`` (from the
      ``solver`` package).

   #. Complete the file ``BFS.java``

   #. The test suite ``BFSTest`` may be helpful.

.. solution:: labs/graphs/bfs
   :class: dropdown

   Starting from the DFS written, in the previous question, making a BFS
   only requires changing the method used to get a new cell to visit.
   The BFS uses ``firstPending`` (instead of ``lastPending`` for the
   DFS).

   .. code:: java

          public List<Vector> solve(Maze maze, Search knownCells) {
            knownCells.markAsPending(maze.entry());
            while (knownCells.hasPendingCells()) {
              var position = knownCells.firstPending();
              for (var move : maze.validMovesAt(position)) {
                var end = position.add(move);
                knownCells.record(position, move, end);
                if (maze.isExit(end))
                return knownCells.movesTo(end);
              }
            }
            return null;
          }

.. exercise::
   :label: labs/graphs/dijkstra
   :nonumber:

   Use the file ``Dijkstra.java`` and implement the Dijkstra’s
   algorithm, to to find the sequence of moves that leads to the exit.

.. solution:: labs/graphs/dijkstra
   :class: dropdown

   As for the DFS, the Dijkstra algorithm is just a slight modification,
   where the next cell we explore is the closest one so far. We thus use
   the ``closestPending`` method.

   .. code:: java

          public List<Vector> solve(Maze maze, Search knownCells) {
            knownCells.markAsPending(maze.entry());
            while (knownCells.hasPendingCells()) {
              var position = knownCells.closestPending();
              for (var move : maze.validMovesAt(position)) {
                var end = position.add(move);
                knownCells.record(position, move, end);
                if (maze.isExit(end))
                return knownCells.movesTo(end);
              }
            }
            return null;
          }

   For this to work we also have to implement the ``record`` method of
   the ``Search`` class. Below is one possible, which works with all
   DFS, BFS and Dijkstra’s algorithms.

   .. code-block:: none

          void record(Vector start, Vector move, Vector end) {
              var newDistance = distanceTo(start) + 1;
              var record = knownCells.get(end);
              if (record == null) {
                knownCells.put(end, new Record(end, move, newDistance));
                pendingCells.add(end);

              } else if (distanceTo(end) > newDistance) {
                   record.move = move;
                   record.distance = newDistance;
              }
          }

      
Analysis
========

Let us see how these search algorithms will perform on three mazes shown
by :numref:`labs/graphs/kind-of-mazes`. Maze A is no walls, Maze B is just
a long corridor, and Maze C is more like a real-life maze, with turns
and dead-ends.

.. list-table:: Sample Mazes
   :name: labs/graphs/kind-of-mazes
   :widths: 25 25 25
   :header-rows: 1

   * - (a) An empty Maze
     - (b) A long corridor
     - (c) A "regular" maze          
   * - .. image:: _static/images/maze_1.svg
     - .. image:: _static/images/maze_2.svg
     - .. image:: _static/images/maze_3.svg
             

Let us assume that these algorithms all explore possible moves in the
following order: North, East, South, West. For instance, at a cell with
a wall north and west, the algorithm would first explore east, and then
south.

.. exercise::
   :label: labs/graphs/empty-maze
   :nonumber:

   Consider first Maze A. Of the three search algorithms you
   implemented in Section `2 <#sec:escape>`__, which algorithm will
   find the exit first?

   #. In which order will the DFS visit the cells?

   #. In which order will the BFS visit the cells?

   #. In which order will Dijkstra’s algorithm visit the cells?

.. solution:: labs/graphs/empty-maze
   :class: dropdown

   As for Maze A, the DFS will be the fastest. It will go straight the
   solution. Let see how each would behave:

   -  The DFS would first head North and reach cell :math:`(1,2)`. From
      there it can explore West, South and East. So it will go east
      first and find the exit.

   -  The BFS would first head North as well, but then visit the other
      neighbors of cell :math:`(2,2)`, that is Cell :math:`(2,3)`, Cell
      :math:`(3,2)`, and Cell :math:`(2,1)`. It will then return to Cell
      :math:`(1,2)` and explore the neighbors. The first one is Cell
      :math:`(1,3)` where is the exit.

   -  Dijkstra’s algorithm would behave just as BFS.

.. exercise::
   :label: labs/graphs/corridor
   :nonumber:
              
   Consider now Maze B, the long corridor. Of the three search
   algorithms you implemented in Section `2 <#sec:escape>`__, which
   algorithm will find the exit first?

   #. In which order will the DFS visit the cells?

   #. In which order will the BFS visit the cells?

   #. In which order will Dijkstra’s algorithm visit the cells?

.. solution:: labs/graphs/corridor
   :class: dropdown

   As for Maze B, BFS and Dijkstra’s algorithm would be the fastest.

   -  The DFS would first visit Cell :math:`(2,3)` and then continue all
      the way to the end of the top corridor, before to backtrack and
      explore the bottom corridor.

   -  By contrast, the BFS would first explore the neighbors of the
      starting position (i.e., Cell :math:`(2,3)` and then Cell
      :math:`(2,1)`). Then, it continues with cells one step further,
      namely Cell :math:`(1,3)` and Cell :math:`(3,1)` where is the
      exit.

   -  Dijkstra’s solution behave just like the BFS.

.. exercise::
   :label: labs/graphs/random
   :nonumber:

   Finally, consider Maze C. Of the three search algorithms you
   implemented in Section `2 <#sec:escape>`__, which algorithm will
   find the exit first?

   #. In which order will the DFS visit the cells?

   #. In which order will the BFS visit the cells?

   #. In which order will Dijkstra’s algorithm visit the cells?

.. solution:: labs/graphs/random
   :class: dropdown

   Maze C is less straightforward. All these algorithms would have to
   explore the whole maze to find the solution. It contains three
   corridors, one that goes to the north-west corner, one that goes to
   the east, that goes to the south-west.

   -  The DFS would first engage into the north-west corridor, visiting
      cells :math:`(1,2)` and :math:`(1,1)`. Then, it would backtrack
      and explore the east corridor, visiting the cells :math:`(2,3)`,
      :math:`(1,3)` and :math:`(3,3)`. Finally, it would engage it the
      south-west corridor until it finds the solution, visiting cells
      :math:`(2,1)`, :math:`(3,1)`, and :math:`(3,2)`.

   -  The BFS would explore cells in rounds. First it would explore
      cells that are direct neighbors of the start position, that is
      cells :math:`(1,2)`, :math:`(2,3)`, and :math:`(2,1)`. Then it
      would continue with the cells further away, that is :math:`(1,1)`,
      :math:`(3,1)`, :math:`(3,3)`, and :math:`(3,1)`. Finally it would
      explore the only cells 3 steps away from the start, :math:`(3,2)`,
      where is the exit.

   -  Dijkstra’s algorithm would behave just like BFS.

Generating “Random” Mazes
=========================

Consider now how we could generate a “random” maze? Placing walls at
random would not yield a interesting mazes: Parts may not be reachable
or not constrained enough. A *perfect maze* is thus a maze that obeys to
the two following properties [#buck2015]_.

-  Every cell in the grid is reachable ;

-  There is exactly one path between every pair of cells (a path
   excludes reusing cells).

.. [#buck2015] Buck, J. (2015). Mazes for Programmers: Code Your Own
               Twisty Little Passages. Pragmatic Bookshelf.

   
.. exercise::
   :label: labs/graphs/is-perfect
   :nonumber:

   Sketch an algorithm that checks whether a given maze is perfect. How
   would you proceed?

   #. Look at the class ``PerfectionChecker`` and complete the
      ``isPerfect`` method.

   #. The ``PerfectionTest`` contains some test cases.

.. solution:: labs/graphs/is-perfect
   :class: dropdown

   The two properties that make a maze *perfect* requires in fact the
   maze to form a tree. If there exist multiple paths between to
   vertices, then the maze is not perfect, and, in turn, the underlying
   graph is not a tree. This hidden tree structure implies that we can
   use a depth-first search to check the perfection of a maze. If we
   find multiple path that leads to the same cell, then the maze is not
   perfect. Finally, if there are cells that we could not reach, the
   maze is not perfect either. That gives us the following algorithm,
   shown below in Java.

   .. code:: java

      public boolean isPerfect(Maze maze) {
        var visited = new LinkedList<Vector>();
        var pending = new LinkedList<Vector>();
        pending.addFirst(maze.entry());
        while (!pending.isEmpty()) {
          var lastVisited = visited.isEmpty()
          ? null
          : visited.getLast();
          var currentPosition = pending.removeLast();
          visited.add(currentPosition);
          for (var move : maze.validMovesAt(currentPosition)) {
            var destination = currentPosition.add(move);
            if (lastVisited != null
            && destination.equals(lastVisited)) continue;
            if (!visited.contains(destination)) {
              pending.addLast(destination);
            } else {
              return false;
            }
          }
        }
        return visited.size() == maze.dimension().allPositions().size();
      }

There are many algorithms to generate such perfect mazes. One of them,
the `Aldous-Broder algorithm
<https://weblog.jamisbuck.org/2011/1/17/maze-generation-aldous-broder-algorithm>`_
[#buck2015]_ uses the idea of “random walk”. It proceeds as follows:

#. Create a grid full of walls.

#. Pick a cell :math:`c` at random.

#. Move to a neighbor :math:`n` cell of your choice. If it has not yet
   been visited, dig a passage back to Cell :math:`c`, and mark Cell
   :math:`n` as visited.

#. If any cell has not yet been visited, return to Step 3.

This algorithm is *non-deterministic*: Every run on the same input is
likely to be different because we pick cells at random (so the name
“random-walk”).

.. exercise::
   :label: labs/graphs/aldous-broder
   :nonumber:
           
   How many cells will this algorithms visit in the best case? How many
   in the worst case? Explain why.

.. solution:: labs/graphs/aldous-broder
   :class: dropdown

   The challenge with such an algorithm is the random choices it makes.
   Every run is different, although the overall procedure remains the
   same. In such a situation, the best and worst cases result from these
   random choices.

   In the *best case*, the algorithm will visit exactly once every cell.
   For example, it could be “lucky enough” to navigate row by row, or
   column by column. That would give linear runtime in the best case.

   In the *worst case* however, it might never terminate and wander
   forever in the grid, visiting again and again the same cells. That is
   very unlikely though, but in practice, on large grids, this algorithm
   would start fast and then struggle to reach the last few unvisited
   cells. The mathematics behind such random walks are beyond the scope
   of this course: The number of steps a random walk needs to cover all
   vertices in a graph is known as the *covering time*. I refer the
   curious to the following for a detailed analysis.

      Dembo, A., Peres, Y., Rosen, J., & Zeitouni, O. (2004). Cover
      times for brownian motion and random walks in two
      dimensions. Annals of mathematics, 433--464.


.. exercise::
   :label: labs/graphs/roll-your-own
   :nonumber:

   What would be *your* solution to generate a random perfect maze? How
   would you approach this problem.

.. solution:: labs/graphs/roll-your-own
   :class: dropdown

   My first attempt at generating a random maze would be to
   *recursively* divide an “empty” maze (a room) by a straight wall with
   a single passage (either an horizontal or vertical wall). That would
   yield two smaller rooms, which I would, in turn, divide by a straight
   wall with a single passage, until the remaining rooms are either
   single rows or columns. That gives me the following algorithm:

   #. Start with an “empty” maze (i.e., maze without any walls).

   #. Choose either a random column or a random row and build a wall all
      the way, with a single door at a random position.

   #. If the rooms on both sides of this wall can be further divided,
      return to Step 2 with these rooms.

   This guarantees the “perfection” of the maze by construction. Both
   constraints are preserved at every step:

   -  All cells are reachable. This true on an empty maze: The division
      yields two new rooms with a door to go from one to the other.

   -  There is a single path from each cell to every other cells. As we
      stop recursing when cells are single rows, there is always a way
      to escape, even the smallest rooms.

      .. list-table:: Generating a random maze
         :widths: 25 25 25 25
         :header-rows: 1

         * - (a) Step 1
           - (b) Step 2
           - (c) Step 3
           - (d) Step 4
         * - .. image:: _static/images/rd_3x3_1.svg
           - .. image:: _static/images/rd_3x3_2.svg
           - .. image:: _static/images/rd_3x3_3.svg
           - .. image:: _static/images/rd_3x3_4.svg

   I found that this algorithm is fact documented under the name
   `recursive
   division <https://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm>`__.

.. exercise::
   :label: labs/graphs/roll-your-own/impl
   :nonumber:

   Implement your solution and generate a few mazes. Can you see some
   sort or recurrent patterns? If so, what could lead to that?

   #. Complete the class ``MyGenerator``.

   #. Generate a few mazes from various size, say :math:`5 \times 5` and
      :math:`10 \times 20` for instance.

   #. Can you see a pattern?

.. solution:: labs/graphs/roll-your-own/impl
   :class: dropdown

   Below is one possible implementation of the recursive division
   algorithm.

   .. code:: java

          @Override
          public Maze generate(Factory factory, Dimension dimension) {
            var maze = factory.fullyConnected(dimension);
            split(maze, 1, 1, dimension.getRowCount(), dimension.getColumnCount(), 0);
            return maze;
          }

          private void split(Maze maze, int firstRow, int firstColumn,
          int lastRow, int lastColumn, int depth) {
            if (lastRow <= firstRow
            || lastColumn <= firstColumn) return;
            var draw = random.nextFloat();
            if (draw < 0.5) {
              int wallColumn = buildWestEastRooms(maze, firstRow, firstColumn,
              lastRow, lastColumn, depth);
              split(maze, firstRow, firstColumn, lastRow, wallColumn, depth + 1);
              split(maze, firstRow, wallColumn + 1, lastRow, lastColumn, depth + 1);
            } else {
              int wallRow = buildNorthSouthRooms(maze, firstRow, firstColumn,
              lastRow, lastColumn, depth);
              split(maze, firstRow, firstColumn, wallRow, lastColumn, depth + 1);
              split(maze, wallRow + 1, firstColumn, lastRow, lastColumn, depth + 1);
            }
          }

          private int buildWestEastRooms(Maze maze, int firstRow, int firstColumn,
          int lastRow, int lastColumn, int depth) {
            int wallColumn = firstColumn + random.nextInt(lastColumn - firstColumn);
            int passage = firstRow + random.nextInt(lastRow - firstRow);
            var eastWall = new Vector(0, 1);
            for (int eachRow = firstRow; eachRow <= lastRow; eachRow++) {
              if (eachRow != passage) {
                maze.buildWall(new Vector(eachRow, wallColumn),
                eastWall);   
              }
            }
            return wallColumn;
          }

   :numref:`labs/graphs/random/example` shows an example of maze generated
   with the random division. We see somehow that there are many more
   long walls than with the Aldous-Broder algorithm. This is the
   *bias* inherent to the recursive division algorithm.

   .. figure:: _static/images/rd_example.svg
      :name: labs/graphs/random/example

      A random maze generated by recursive division.

.. _`sec:cli`:

Using the CLI
=============

.. margin::

   .. figure:: _static/images/sample_maze.svg
      :name: labs/graphs/sample_maze2

      A sample :math:`5 \times 5` mazes

The code in the companion repository will help you work with mazes
stored in text file. Consider the following example (also shown on
:numref:`labs/graphs/sample_maze2`), which describes a :math:`5 \times
5` maze: We store mazes as a grid of characters, where ’S’ stands for
the starting point and ’E’ for the exit. Below is a sample :math:`5
\times 5` maze shown as a text file:

.. code:: shell

     $ cat sample_maze.txt
     +-+-+-+-+-+
     |S|       |
     + + +-+ + +
     |   | | | |
     + + + + +-+
     | | | | | |
     + +-+ + + +
     | |       |
     + +-+-+-+ +
     | |      E|
     +-+-+-+-+-+

The Github repository contains a command-line interface application
(CLI), which you can use to manipulate maze. Here are the three main
features:

-  Solve the maze tored in a text file, using the ``solve`` command. For
   instance

   .. code:: shell

          $ ./maze.sh solve sample_maze.txt 
          5 x 5 grid loaded from sample_maze.txt
          Solution: [south, east, north, east, east, south, south, south,
          east, south]

   You can select a specific algorithm option the ``--algorithm=DFS``
   for instance.

-  Export a maze (in a given text file) into an SVG picture using the
   command ``export``. For instance, to get the SVG file shown as
   :numref:`labs/graphs/sample_maze2`, you can run the
   command

   .. code:: shell

          $ ./maze.sh export --solution sample_maze.txt sample_maze.svg
          5 x 5 grid loaded from sample_maze.txt
          Solution: [(1, 0), (0, 1), (-1, 0), (0, 1), (0, 1), (1, 0),
          (1, 0), (1, 0), (0, 1), (1, 0)]
           

-  Generate a new random maze using the ``generate`` command. For
   instance, to generate a maze over a :math:`15 \times 3` grid, you use
   the following:

   .. code:: shell

          $ ./maze.sh generate -c=15 -r=3 test.txt
          +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
          |S  |   |       |             |
          + + + + + +-+ + + +-+ +-+ + + +
          | | | |   |   |   |   | | | | |
          o+ +-+ +-+-+-+-+-+-+ +-+ + +-+ +
          |       |           |     |  E|
          +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

.. [1]
   see `Merriam Webster
   dictionary <https://www.merriam-webster.com/dictionary/maze>`__
