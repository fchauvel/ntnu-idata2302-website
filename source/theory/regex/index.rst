===================
Regular Expressions
===================

:Lecture: Lecture 8.1 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/ESOpzEspsN5Dk-IdmSry_rwBDfjkWiBK7ToMb6JAnaXldQ?e=y4Wpsk>`
:Objectives: Understand what is a regular expression, an automaton and a
             grammar, and how trees, recursion and graphs come together to
             connect them
:Concepts: Regular expression, language, grammar, expression tree, finite
           automaton, non-determinism, determinisation, hierarchy of languages

..
   OUTLINE. This page is an expanded outline of the lecture notes, to be
   turned into prose, figures and code. Hand-offs between sections are in
   italics. Items marked (optional) are the first to cut.

   The point of this lecture is NOT to make students experts in automata.
   It is to show how concepts they have already studied come together:

   - the expression is a *tree* (Trees module),
   - the construction of the automaton is a *recursion* on that tree
     (Recursion module),
   - the automaton is a *graph* (Graphs module),
   - determinisation is a *graph search* over sets of states, with a work list
     and a hash set (Graphs and Hashing modules).

   The story of the three lectures is "machine, resource, bound". Here, the
   machine is the simplest one, an automaton, the resource is its memory, and
   the bound is a constant.

   What students should take away:

   - A pattern is a set of words, a language, and matching is a membership
     problem.
   - A pattern is a tree, which a grammar describes.
   - An automaton, which is a graph, can be built from a pattern by recursion
     on that tree.
   - Guessing does not make an automaton more powerful (determinisation).
   - Some languages are out of reach of automata, and there is a hierarchy
     of languages, each level needing a stronger machine.


Introduction
============

Patterns Everywhere
-------------------

- Hook: A date, an e-mail address or a phone number typed in a form. ``grep``
  in a terminal. A compiler reading ``x1 = 42`` and splitting it in an
  identifier, a symbol and a number.
- The question: How do we describe a set of strings, possibly infinite, with a
  short and precise description? And how does a machine check it?

*Hand-off: Let us start with the smallest possible example.*


Automata and Regular Expressions
================================

A First Example
---------------

- One small pattern, and its automaton, side by side. For instance ``a*|b``, or
  something funnier, such as the "sheep language" ``baa*!`` (``baa!``,
  ``baaaaa!``, but not ``ba!``).
- Choose an example whose automaton is *deterministic*, so that running it is
  easy.
- The automaton, as a machine: States, transitions, an initial state, accepting
  states. A trace on a word.
- The automaton as a *program on the RAM*: A loop with one variable,
  ``state ← table[state][symbol]``, then check that the final state accepts.
- What it costs: One pass, and only the state to remember, whatever the length
  of the word. The resource is *memory*, and the bound is a *constant*.

*Hand-off: Which words does this pattern describe, exactly?*


Words and Languages
-------------------

- The vocabulary, as at the very start of the course: *symbols*, an *alphabet*
  (a set of symbols), a *word* (a sequence of symbols), and a *language* (a set
  of words). A caution: This "word" is not the machine word of the RAM.
- A pattern describes a language, which may be infinite. We cannot list it, so
  we need a notation: This is what a regular expression is.
- Matching a word is answering a yes/no question: Is this word in the
  language? **A problem is a language**: Deciding membership.
- The building blocks, which are enough: a symbol, two expressions in a row
  (concatenation), an alternative (``|``), and a repetition (``*``).

*Hand-off: The tools offer many more operators.*


Wildcards
---------

- ``+`` (one or more), ``?`` (optional), ``[a-z]`` (a class), ``.`` (anything).
- They are only *sugar*: Each one is rewritten with the building blocks.
  ``E+`` is ``E E*``, ``E?`` is ``E`` or nothing, ``[a-z]`` is
  ``a|b|...|z``.
- So the core is small, and it is what we work with from now on.
- A taste of compilation: New notation, with no new machine, by rewriting to
  the core.

*Hand-off: To build an automaton for any pattern, we need to describe all
possible patterns.*


Grammars
========

Operator Precedence and the Expression Tree
-------------------------------------------

- Parentheses and precedence: Repetition binds tighter than concatenation, which
  binds tighter than the alternative. ``ab*|c`` means ``(a(b*))|c``.
- Figure: The *expression tree* of ``ab*|c``. The leaves are symbols, the other
  nodes are operators. (Trees module.)

Tree Folding and Grammars
-------------------------

- How do we describe *all* the possible patterns? With a **grammar**: A few
  recursive rules. An expression is a symbol, or two expressions in a row, or two
  expressions joined by ``|``, or an expression followed by ``*``, or an
  expression in parentheses.
- The grammar says which trees are valid. A pattern is a tree.
- *Folding* a tree: Compute a value from the leaves up, combining the results of
  the children. (Recursion module.)
- A tiny fold as a warm-up: Can this expression match the empty word? A symbol:
  no. ``E*``: yes. ``E F``: if both can. ``E|F``: if one can.
- The same shape, the same code, with a richer result: Next, the value we
  compute is a *machine*.

*Hand-off: Let us fold an expression into an automaton.*


Building an Automaton for a Regular Expression
==============================================

One Piece per Rule
------------------

- Four constructions, one per rule: A symbol (two states and one transition),
  concatenation, alternative, repetition.
- The pieces are glued with *ε-transitions*, moves that read nothing.
- Figures: The four pieces, and the automaton of ``ab*|c`` assembled.

The Construction Is a Recursion on the Tree
-------------------------------------------

- Base case: a symbol. Recursive cases: the operators. Same code as the tiny
  fold, with automata as values. (Recursion and Graphs modules: The result is a
  graph.)
- This is an *algorithm that manipulates machines*.

The Result Is Non-Deterministic
-------------------------------

- The alternative and the repetition offer *choices*: Several possible next
  states. A word is accepted if *some* sequence of choices ends in an accepting
  state: a lucky guess.
- This is a *non-deterministic* automaton. It is easy to build, but we cannot
  run a machine that guesses.

*Hand-off: Can we get rid of the guessing?*


Determinisation
===============

- Instead of following one branch, follow *all of them at once*: Keep track of
  the *set* of states where we could be. This set is the state of a new,
  deterministic automaton.
- The ε-closure: All the states reachable without reading a symbol. It is a
  graph traversal. (Graphs module.)
- The construction: Start from the closure of the initial state, and explore the
  sets reachable by each symbol, with a work list and a set of the sets already
  seen. It is a search over an implicit graph. (Graphs and Hashing modules.)
- Worked example on a small pattern: The table of sets, and the resulting
  automaton.
- Result: Same language, and a machine that does not guess. **Guessing does not
  add power to an automaton.**
- The price: The deterministic automaton can have exponentially more states.
  The classic example: "the n-th letter from the end is an a".
- (Optional) There is a smallest automaton for every regular language
  (*minimisation*). One sentence, no algorithm.
- Foreshadowing, said out loud: A lucky guess does not help an automaton. We
  will see what it does for other machines.

*Hand-off: Automata are simple and cheap. Are they enough?*


Limits
======

What an Automaton Cannot Do
---------------------------

- The language of ``aⁿbⁿ``: some ``a``, then the same number of ``b``. Balanced
  brackets are the same problem.
- Intuition, with no proof: An automaton with ``k`` states cannot tell ``aᵏ⁺¹``
  from a shorter run of ``a``, because it has to reuse a state. To count, we need
  memory that grows with the word.
- This is not a corner case: Nested structure, as in a program, is made of
  balanced brackets.

A Hierarchy of Languages
------------------------

- Figure: Nested sets, with an example at each level.
- **Regular** (an automaton, or a regular expression): identifiers, numbers,
  dates, the patterns of ``grep``.
- **Context-free** (a grammar, or an automaton with a stack, next lecture):
  balanced brackets, arithmetic expressions. The *syntax* of C, Java, JSON or
  HTML.
- **Beyond context-free**: "a variable must be declared before it is used",
  ``aⁿbⁿcⁿ``. A compiler checks these after reading the program.
- **Anything a Turing machine can recognize** (next lecture): Programming
  languages, seen as a way to *write programs*. C, Java and TeX can compute
  anything a computer can.
- Warning, on one slide: *Language* has two meanings here. A *set of words*
  (what a machine recognizes), and a *notation to program a machine*. The syntax
  of C is a set of words in the middle of the ladder. The language C, as a whole,
  is at the top.
- **Closing the loop:** The grammar of regular expressions, written earlier,
  needs balanced parentheses. So the *language of regular expressions is not
  regular*: It is context-free. Grammars are the next level up.
- The table so far: (automaton, memory, constant) is the class of the *regular
  languages*.

*Hand-off: Each level needs a stronger machine. What is a machine, and which ones
exist? This is the next lecture.*
