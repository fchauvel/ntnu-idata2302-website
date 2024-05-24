import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.210.0/assert/mod.ts"

import { OrderedSet } from "./avl.ts"


Deno.test("cardinal is zero on create", () => {
  const tree = new OrderedSet<number>((l, r) => l <= r, null);
  assertEquals(tree.cardinal(), 0);
});

Deno.test("cardinal increases after add", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);
  assertEquals(oset.cardinal(), 0);
  oset.add(25);
  assertEquals(oset.cardinal(), 1);
});

Deno.test("cardinal does not increases when adding duplicate", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);
  assertEquals(oset.cardinal(), 0);
  oset.add(25);
  oset.add(25);
  assertEquals(oset.cardinal(), 1);
});

Deno.test("contains reveals added and missing items", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(25, 27, 12, 32, 12);

  assertEquals(oset.contains(25), true);
  assertEquals(oset.contains(27), true);
  assertEquals(oset.contains(32), true);
  assertEquals(oset.contains(12), true);

  assertEquals(oset.contains(13), false);
  assertEquals(oset.contains(26), false);
  assertEquals(oset.contains(0), false);
  assertEquals(oset.contains(999), false);
});

Deno.test("maximum returns the largest item", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertEquals(oset.maximum(), 58);
});

Deno.test("mminimum returns the smallest item", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertEquals(oset.minimum(), 12);
});

Deno.test("predecessor when the reference exists", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertEquals(oset.predecessorOf(23), 12);
  assertEquals(oset.predecessorOf(12), undefined);
  assertEquals(oset.predecessorOf(58), 28);
});

Deno.test("predecessor when the reference does not exists", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertThrows(() => oset.predecessorOf(0), Error);
  assertThrows(() => oset.predecessorOf(25), Error);
  assertThrows(() => oset.predecessorOf(99), Error);
});

Deno.test("successor when the reference exists", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertEquals(oset.successorOf(12), 23);
  assertEquals(oset.successorOf(23), 28);
  assertEquals(oset.successorOf(58), undefined);
});

Deno.test("successor when the reference does not exists", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertThrows(() => oset.successorOf(0), Error);
  assertThrows(() => oset.successorOf(25), Error);
  assertThrows(() => oset.successorOf(99), Error);
});

Deno.test("remove when the target does not exist", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);

  oset.addMany(23, 12, 58, 28);

  assertThrows(() => oset.remove(0), Error);
});

Deno.test("removed minimum are not available anymore", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);
  oset.addMany(23, 12, 58, 28);

  oset.remove(12);

  assertEquals(oset.contains(12), false);
  assertEquals(oset.containsMany(23, 28, 58), true);
});

Deno.test("removed root are not available anymore", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);
  oset.addMany(23, 12, 58, 28);

  oset.remove(23);

  assertEquals(oset.contains(23), false);
  assertEquals(oset.containsMany(12, 28, 58), true);
});

Deno.test("removed maximum is not available anymore", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);
  oset.addMany(23, 12, 58, 28);

  oset.remove(58);

  assertEquals(oset.contains(58), false);
  assertEquals(oset.containsMany(12, 23, 28), true);
});

Deno.test("remove singleton yields the empty set", () => {
  const oset = new OrderedSet<number>((l, r) => l <= r, null);
  oset.add(1);

  oset.remove(1);

  assertEquals(oset.contains(1), false);
  assertEquals(oset.cardinal(), 0);
});
