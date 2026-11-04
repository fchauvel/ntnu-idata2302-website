===================
Regular Expressions
===================

:Lecture: Lecture 8.1 :download:`(slides)
          <https://studntnu-my.sharepoint.com/:p:/g/personal/franckc_ntnu_no/ESOpzEspsN5Dk-IdmSry_rwBDfjkWiBK7ToMb6JAnaXldQ?e=y4Wpsk>`
:Objectives: Understand what is a language, a regular expression and an
             automaton, and why some languages need more than that
:Concepts: Language, regular expression, finite automaton,
           non-determinism, determinisation, hierarchy of languages

..
   OUTLINE. This page is an expanded outline of the lecture notes, to be
   turned into prose, figures and code. Hand-offs between sections are in
   italics. Items marked (optional) are the first to cut.

   Where this lecture stands: It starts the last module. The story of the
   three lectures is "machine, resource, bound": Here the machine is the
   simplest one, an automaton, the resource is its memory, and the bound is
   a constant.

   What students should take away:

   - A pattern is a set of words, a language.
   - An automaton is a machine with a constant amount of memory.
   - Guessing does not make an automaton more powerful (determinisation).
   - Some languages are out of reach of automata: They need more memory.
   - There is a hierarchy of languages, each level needing a stronger machine.


Recognizing Patterns
====================

- Hook: Pattern are everywhere. A phone number or an e-mail address typed in
  a form. ``grep`` in a terminal. A compiler reading ``x1 = 42`` and
  splitting it in an identifier, a symbol and a number.
- The question: How do we describe a set of words (possibly infinite) with a
  finite description?
- Vocabulary, on one slide: an *alphabet*, a *word*, a *language* (a set of
  words).
- A language can be infinite: All the identifiers of a program. We cannot list
  them, so we need a notation.

*Hand-off: Regular expressions are such a notation.*


Regular Expressions
===================

- The building blocks: a letter, a concatenation, an alternative (``|``), a
  repetition (``*``).
- Three examples, built step by step: ``ab*``, ``(a|b)*abb``, and an
  identifier, ``[a-z][a-z0-9]*``.
- The usual shorthands (``+``, ``?``, ``[0-9]``) are only sugar.
- Matching a word is answering a yes/no question: Is this word in the
  language? **First appearance of "a problem is a language"**: Deciding whether
  a word belongs to a set is a *membership problem*.

*Hand-off: How does a machine answer this question?*


The Automaton
=============

- A machine that reads a word one letter at a time, and keeps track of a
  *state*. States, transitions, an initial state and accepting states.
- Figure: the automaton of ``(a|b)*abb``, and a trace on a word.
- The automaton as a *program on the RAM*: A loop with a single variable.
  The code is ``state ← table[state][letter]``, then check that the final state
  is accepting.
- What it costs: One pass over the word, and only the state to remember, whatever
  the length of the word. The resource is *memory*, and the bound is a
  *constant*. First row of the table (machine, resource, bound).
- (Optional) A prefix tree is an automaton that does not loop.

*Hand-off: It is hard to build such an automaton by hand. Can we make it easier
by allowing the machine to guess?*


Guessing: Non-Deterministic Automata
====================================

- A *non-deterministic* automaton may have several possible next states, or
  none. It accepts a word if *some* sequence of choices ends in an accepting
  state: a lucky guess.
- Why: It is much easier to build one from a regular expression. Each operator
  is a small picture (an alternative is two branches, a repetition is a loop).
- Figure: the non-deterministic automaton of ``(a|b)*abb``.
- The problem: We cannot run a machine that guesses. Which branch do we follow?

*Hand-off: Can we get rid of the guessing?*


Determinisation
===============

- Instead of following one branch, follow *all of them at once*: Keep track of
  the *set* of states where we could be. This set is the state of a new,
  deterministic automaton.
- Worked example on ``(a|b)*abb``: the table of sets, and the resulting
  automaton.
- Result: Same language, and a machine that does not guess. **Guessing does not
  add power to an automaton.**
- The price: The deterministic automaton can have exponentially more states.
  The classic example: "the n-th letter from the end is an a".
- (Optional) There is a smallest automaton for every regular language, and tools
  find it (*minimisation*). One sentence, no algorithm.
- Foreshadowing, said out loud: A lucky guess does not help an automaton. We
  will see what it does for other machines.

*Hand-off: Automata are simple and cheap. Are they enough?*


What an Automaton Cannot Do
===========================

- The language of ``aⁿbⁿ``: some ``a``, then the same number of ``b``. Balanced
  brackets are the same problem.
- Intuition, with no proof: An automaton with ``k`` states cannot tell ``aᵏ⁺¹``
  from a shorter run of ``a``, because it has to reuse a state. To count, we
  need memory that grows with the word.
- This is not a corner case: Nested structure, as in a program, is made of
  balanced brackets.

*Hand-off: So some languages need more memory. How many kinds are there?*


A Hierarchy of Languages
========================

- Figure: nested sets, with an example at each level.
- **Regular** (an automaton): identifiers, numbers, dates, the patterns of
  ``grep``.
- **Context-free** (an automaton with a stack, next lecture): balanced brackets,
  arithmetic expressions. The *syntax* of C, Java, JSON or HTML.
- **Beyond context-free**: "a variable must be declared before it is used",
  ``aⁿbⁿcⁿ``. A compiler checks these after reading the program.
- **Anything a Turing machine can recognize** (next lecture): Programming
  languages, seen as a way to *write programs*. C, Java and TeX can compute
  anything a computer can.
- Warning, on one slide: *Language* has two meanings here. A *set of words*
  (what a machine recognizes), and a *notation to program a machine*. The syntax
  of C is a set of words in the middle of the ladder. The language C, as a whole,
  is at the top.
- (Optional) The compiler pipeline: The lexer is a regular expression, the
  parser needs a stack, and the code then runs on the RAM, as in the
  Foundations module.
- The table so far: (automaton, memory, constant) is the class of the *regular
  languages*.

*Hand-off: Each level needs a stronger machine. What is a machine, and which
ones exist? This is the next lecture.*
