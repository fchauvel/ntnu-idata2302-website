=====
Trees
=====

:Lecture: Lecture 5.1 :download:`(slides) <_static/intro/trees.pptx>`
:Objectives: Understand the concept of trees and how to traverse a tree
:Concepts: Tree, Depth-first traversal, Breadth-first traversal


What Is a Tree?
===============

Examples
--------

* Family Tree

* Containment

* Taxonomy in Biology

* Decision Tree


Formal Definition
-----------------

Formally, a tree :math:`t` over a set :math:`S` is defined
[#definitions] as an ordered pair :math:`t = (r, s)` where:

 * :math:`r` is the *root* element of the tree

 * :math:`s=(t_1, t_2, \ldots, t_n)` is a sequence of :math:`n`
   sub-trees, possibly empty.

This recursive definition however lacks the following important
properties:

 * A tree has no cycle.

 * Node Uniqueness
   

.. [#definition] There are many ways to formalize the notion of
                 tree. I choose there recursive one, which I found
                 more concise and elegant.
                 
Tree Terminology
----------------

 * Child
 * Descendants   
 * Parent
 * Ancestors
 * Leaf
 * Root
 * Node
 * Degree
 * Subtree
 * Width
 * Level
 * Height
 * Depth 
   

Tree Representations
====================

List of Children
----------------

Left Child and First Sibling
----------------------------

Other Representations
---------------------


Tree Traversals
===============


Depth-first
-----------

* Pre order

* Post order

* In order traversal


Breadth-first
-------------
