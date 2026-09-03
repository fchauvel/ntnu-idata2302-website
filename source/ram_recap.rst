==================
RAM Assembly Recap
==================

:Concepts: Instruction set, program layout, compilation patterns

This page is a quick reference for the RAM assembly language introduced
in :doc:`foundations/ram`. It summarizes the instruction set, the layout of a
program, and the standard "recipes" used to translate pseudo code
constructs (assignment, sequence, conditional, loop) into assembly. It
matches the assembly language accepted by the `RAM simulator
<https://github.com/fchauvel/ram-web>`_ we use in the labs, so you can
follow along in the tool while you read.

.. important::

   The simulator only provides **one** conditional jump,
   ``JUMP_ZERO``, which jumps only when ``ACC`` is exactly zero. There
   is no generic ``JUMP`` or "greater than" test. Every conditional or
   loop below is built out of this single building block, together
   with a trick to force an unconditional jump: ``LOAD 0`` followed by
   ``JUMP_ZERO target`` always jumps, because ``ACC`` is guaranteed to
   be zero. This differs slightly from the simplified ``JUMP``
   instruction shown in :numref:`foundations/computer/ram_instructions`.

Machine Code vs. Assembly Code
================================

.. index:: RAM ; machine code
.. index:: RAM ; assembly code

The RAM only ever sees **machine code**: a flat sequence of numbers
sitting in memory. Every instruction is a pair ``(opcode, operand)``
(just an opcode for ``HALT``), and every operand that refers to a
memory location is a raw *address*, i.e. a plain number such as ``23``.
There is nothing else in memory — code and data are both just numbers,
and nothing distinguishes one from the other except how the ``IP``
happens to read them.

**Assembly code** is the human-friendly version of the same program: we
write *mnemonics* (``LOAD``, ``ADD``, …) instead of numeric opcodes,
and *names* — variables and labels — instead of raw addresses. Nothing
new happens at runtime; the **assembler** simply decides where each
variable and each instruction will live in memory, then substitutes
every name with the address it computed. See
:numref:`ram_recap/instructions` below for the opcode ↔ mnemonic
mapping every assembler relies on.

:numref:`ram_recap/asm_vs_machine` shows both views of the very same
tiny program, with the simulator's default memory layout: the data
segment starts at address 0, the code segment at address 20.

.. list-table:: The same program, as assembly and as machine code
   :name: ram_recap/asm_vs_machine
   :widths: 50 50
   :header-rows: 1

   * - Assembly code (what we write)
     - Machine code (what is stored, and what the machine executes)
   * - .. code-block:: asm

          .data
              value   5
              one     1
              result  0

          .code
              LOAD   3
              ADD    value
              STORE  result
              PRINT  result
              HALT
     - .. code-block:: text

          Addr  Value   Meaning
          ----  -----   -------------------
             0      5   value
             1      1   one
             2      0   result

            20      6   LOAD   (opcode)
            21      3   3      (constant)
            22      1   ADD    (opcode)
            23      0   value's address
            24      4   STORE  (opcode)
            25      2   result's address
            26      8   PRINT  (opcode)
            27      2   result's address
            28      0   HALT   (opcode)

.. important::

   Machine code has **no** ``value``, ``one``, ``result`` or ``LOAD`` —
   only the numbers on the right. Assembly code exists purely for us:
   the names and mnemonics are erased once the assembler has resolved
   them into numbers. This is exactly why we need the instruction set
   table below and a symbol table (kept by the assembler) mapping
   names to addresses — together they let us go back and forth between
   the two views.

Instruction Set
================

.. index:: RAM ; instructions

Every instruction is a pair ``(opcode, operand)``. ``LOAD`` interprets
its operand as an immediate constant; every other instruction (besides
``HALT``) interprets it as a memory address. ``ACC`` is the
accumulator and ``IP`` the instruction pointer.

.. list-table:: The eight instructions understood by the simulator
   :name: ram_recap/instructions
   :widths: 10 20 15 30
   :header-rows: 1

   * - Opcode
     - Mnemonic
     - Operand
     - Effect
   * - 0
     - ``HALT``
     - —
     - Stops the machine.
   * - 1
     - ``ADD A``
     - address
     - ``ACC := ACC + Mem[A]``
   * - 2
     - ``SUBTRACT A``
     - address
     - ``ACC := ACC - Mem[A]``
   * - 3
     - ``JUMP_ZERO A``
     - address
     - ``if ACC = 0 then IP := A``
   * - 4
     - ``STORE A``
     - address
     - ``Mem[A] := ACC``
   * - 6
     - ``LOAD c``
     - constant
     - ``ACC := c``
   * - 7
     - ``READ A``
     - address
     - ``Mem[A] := input``
   * - 8
     - ``PRINT A``
     - address
     - ``output := Mem[A]``

.. note::

   There is no instruction that loads a value *from* an address
   directly into ``ACC``. To copy a variable into ``ACC``, reset it
   first with ``LOAD 0`` and then ``ADD`` the variable, e.g. ``LOAD 0``
   followed by ``ADD counter``.

Anatomy of a Program
=====================

.. index:: RAM ; assembly code

A program has a data segment and a code segment, introduced by the
``.data`` and ``.code`` directives.

.. code-block:: asm
   :caption: Skeleton of an assembly program
   :name: ram_recap/skeleton

   .data
       name1   value1      ; one variable per line: name and initial value
       name2   value2

   .code
   label: INSTRUCTION operand   ; a colon defines a label
          INSTRUCTION operand   ; comments start with ";"
          HALT                  ; always end with HALT

-  **Variables** are declared once in ``.data`` with a name and an
   initial value; each occupies one memory word.

-  **Labels** (``label:``) name the address of the instruction that
   follows. They can be used wherever an instruction expects an
   address, in particular as the target of a ``JUMP_ZERO``.

-  **Comments** start with ``;`` and run to the end of the line.

-  The assembler places the data segment first, then the code segment,
   so addresses of variables and labels are computed automatically —
   you never write raw addresses by hand.

Cheat Sheet: Pseudo Code → Assembly
=====================================

.. index:: RAM ; assembly code

The recipes below match those developed in :doc:`foundations/ram`, adapted to the
``JUMP_ZERO``-only instruction set above.

Assignment
----------

:math:`v \gets e` evaluates ``e`` in ``ACC``, then stores it.

.. code-block:: asm
   :caption: Assigning a constant or a variable to ``v``

          LOAD  0          ; v <- x   (copy a variable)
          ADD   x
          STORE v

          LOAD  42         ; v <- 42  (a constant needs no ADD)
          STORE v

Sequence
--------

:math:`c_1 \, ; \, c_2` is simply the assembly code of :math:`c_1`
immediately followed by the assembly code of :math:`c_2` — no jump
needed, execution falls through.

Conditional
-----------

:math:`\mathbf{if} \; e = 0 \; \mathbf{then} \; c_1 \; \mathbf{else} \; c_2`
evaluates ``e`` into ``ACC`` and lets ``JUMP_ZERO`` pick the branch. An
unconditional jump (``LOAD 0`` + ``JUMP_ZERO``) skips over the
``else`` branch once ``c1`` is done.

.. code-block:: asm
   :caption: Compiling a conditional

            ; ... code that leaves e in ACC ...
            JUMP_ZERO then
            ; ... code for c2 (else branch) ...
            LOAD      0
            JUMP_ZERO done      ; force an unconditional jump
   then:    ; ... code for c1 (then branch) ...
   done:

Loop
----

:math:`\mathbf{while} \; e = 0 \; \mathbf{do} \; c` re-evaluates the
guard ``e`` before every iteration and exits as soon as it is no
longer zero — but since we can only test for zero, the guard
expression itself (e.g. a subtraction) is what encodes the actual
comparison.

.. code-block:: asm
   :caption: Compiling a while loop

   loop:    ; ... code that leaves e in ACC ...
            JUMP_ZERO body       ; e = 0 => keep looping
            LOAD      0
            JUMP_ZERO done       ; otherwise force exit
   body:    ; ... code for c ...
            LOAD      0
            JUMP_ZERO loop       ; force jump back to the guard
   done:

Worked Example
================

.. index:: RAM ; assembly code

:numref:`ram_recap/countdown` reads a number and prints it,
then counts down to zero, printing every step — a small but complete
program that exercises ``READ``, ``PRINT``, ``ADD``, ``SUBTRACT``,
``STORE`` and ``JUMP_ZERO`` together.

.. code-block:: asm
   :caption: Counting down from a number given by the user
   :name: ram_recap/countdown

           .data
           counter 0
           one     1

           .code
   main:   READ         counter    ; counter <- user input
   loop:   LOAD         0
           ADD          counter
           PRINT        counter
           JUMP_ZERO    done       ; stop as soon as counter = 0
           SUBTRACT     one
           STORE        counter
           LOAD         0
           JUMP_ZERO    loop       ; force jump back to loop
   done:   HALT

.. admonition:: Step-by-step trace (for :math:`counter = 2`)
   :class: toggle

   .. list-table::
      :header-rows: 1
      :widths: 20 20 20 40

      * - Instruction
        - ``ACC``
        - ``counter``
        - Output so far
      * - ``READ counter``
        - —
        - 2
        - —
      * - ``LOAD 0`` ; ``ADD counter``
        - 2
        - 2
        - —
      * - ``PRINT counter``
        - 2
        - 2
        - 2
      * - ``JUMP_ZERO done`` (not taken)
        - 2
        - 2
        - 2
      * - ``SUBTRACT one`` ; ``STORE counter``
        - 1
        - 1
        - 2
      * - ``LOAD 0`` ; ``JUMP_ZERO loop`` (taken)
        - 0
        - 1
        - 2
      * - ``LOAD 0`` ; ``ADD counter`` ; ``PRINT counter``
        - 1
        - 1
        - 2, 1
      * - ``JUMP_ZERO done`` (not taken)
        - 1
        - 1
        - 2, 1
      * - ``SUBTRACT one`` ; ``STORE counter``
        - 0
        - 0
        - 2, 1
      * - ``LOAD 0`` ; ``JUMP_ZERO loop`` (taken)
        - 0
        - 0
        - 2, 1
      * - ``LOAD 0`` ; ``ADD counter`` ; ``PRINT counter``
        - 0
        - 0
        - 2, 1, 0
      * - ``JUMP_ZERO done`` (taken)
        - 0
        - 0
        - 2, 1, 0
      * - ``HALT``
        - 0
        - 0
        - 2, 1, 0

Macros
========

.. index:: RAM ; macros

Beyond the eight core instructions, the simulator also accepts
*macros*: named, parameterized blocks of assembly that let you factor
out a repeated instruction sequence — much like extracting a procedure
in a high-level language, but resolved entirely by the assembler,
before the program ever runs.

.. code-block:: asm
   :caption: A one-parameter macro that increments a variable
   :name: ram_recap/macro_increment

   .data
       one      1
       counter  0

   .macro INCREMENT address
       LOAD   0
       ADD    {address}
       ADD    one
       STORE  {address}
   .end

   .code
       INCREMENT counter   ; expands to the 4 instructions above,
                            ; with {address} -> counter
       INCREMENT counter   ; each call gets its own copy of them
       PRINT counter
       HALT

Macros can take several parameters, one per argument at the call site,
as :numref:`ram_recap/macro_copy` shows.

.. code-block:: asm
   :caption: Declaring and calling a two-parameter macro
   :name: ram_recap/macro_copy

   .macro COPY source target
       LOAD   0
       ADD    {source}
       STORE  {target}
   .end

   .code
       COPY  a  b        ; expands to the 3 instructions above,
                          ; with {source} -> a and {target} -> b
       HALT

-  A macro is declared with ``.macro NAME p1 p2 ...`` / body / ``.end``,
   *before* the ``.code`` section.
-  Inside the body, ``{p}`` stands for parameter ``p``; it is replaced
   with whatever argument is passed at the call site.
-  A macro is *called* just like an instruction: ``NAME arg1 arg2``.
-  A macro body can itself contain labels and jumps. Each call site
   gets its own, automatically renamed copy of these labels ("hygienic"
   expansion), so the same macro can be called several times without
   its internal loops colliding — as
   :numref:`ram_recap/macro_decr` shows.

.. code-block:: asm
   :caption: A macro with an internal loop, called twice
   :name: ram_recap/macro_decr

   .data
       one  1
       a    2
       b    1

   .macro DECRTOZERO var
     loop: LOAD       0
           ADD        {var}
           SUBTRACT   one
           STORE      {var}
           JUMP_ZERO  done
           LOAD       0
           JUMP_ZERO  loop
     done: LOAD        0
   .end

   .code
       DECRTOZERO a      ; gets its own loop/done labels
       DECRTOZERO b      ; gets another, freshly-renamed pair
       HALT

.. important:: Macros are **not** function calls

   A macro *looks* like a function call — a name plus parameters — but
   the assembler treats it very differently from an actual procedure
   call:

   -  **Expansion, not a jump.** The assembler *copies* the macro body
      into the code segment at every call site, before the program
      even runs. In :numref:`ram_recap/macro_decr` above,
      ``DECRTOZERO`` ends up stored **twice** in memory — once per
      call, 16 instructions in total. A real procedure call keeps a
      single copy of the code in memory and *jumps* to it.

   -  **No return, no call stack.** Since nothing is ever jumped to,
      there is nothing to jump back from either — macros need neither
      a return address nor a call stack. A genuine procedure call
      does: see :doc:`recursion/procedure_calls` for how a
      call stack lets many call sites share one copy of the code, and
      how that, in turn, makes recursion possible.

   -  **No recursion.** Because expansion happens once, at assembly
      time, a macro cannot call itself — the assembler would try to
      expand it forever.

   In short: macros buy you *readability and code reuse while writing*
   the program, at the price of *duplicating* the generated code.
   Procedure calls buy you *one shared copy of the code, reused at run
   time*, at the price of the bookkeeping — a call stack — needed to
   jump back to the right place.

Try It Yourself
==================

The examples on this page run as-is in the RAM simulator used in
:doc:`labs/foundations`. Head over to

    https://franckc.folk.ntnu.no/idata2302/ram/

paste the code above into the editor, click **Load Program**, and step
through it with **Step** to watch ``ACC``, ``IP`` and memory change
instruction by instruction.

.. seealso::

   The simulator is open source. To run it locally instead, or to hack
   on it:

   .. code-block:: shell

      $ git clone https://github.com/fchauvel/ram-web.git
      $ cd ram-web
      $ npx tsc            # compile the TypeScript sources
      $ ./serve.sh          # serve on http://localhost:8000
