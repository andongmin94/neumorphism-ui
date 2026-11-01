import assert from "node:assert/strict";
import test from "node:test";
import { exampleRecords, upsertRecord, removeRecords, parseRecordDate, formatRecordDate } from "../src/components/blocks/data-manager-model.ts";

test("editing preserves stable IDs and does not mutate initial records", () => {
  const initial = structuredClone(exampleRecords); const next = { ...initial[0], title: "Edited" }; const updated = upsertRecord(initial, next, next.id);
  assert.equal(updated.length, initial.length); assert.equal(updated[0].id, initial[0].id); assert.equal(updated[0].title, "Edited"); assert.notEqual(initial[0].title, "Edited");
  const added = upsertRecord(initial, { ...next, id: "new-record" }, "client-draft"); assert.equal(added.length, initial.length + 1);
});
test("server-saved IDs and fields replace the requested record for later edits and deletion", () => {
  const initial = structuredClone(exampleRecords);
  const saved = { ...initial[0], id: "server-record", title: "Normalized title" };
  const updated = upsertRecord(initial, saved, initial[0].id);
  assert.equal(updated.length, initial.length);
  assert.deepEqual(updated[0], saved);
  assert.ok(updated.every(record => record.id !== initial[0].id));
  assert.deepEqual(initial, exampleRecords);
  const edited = upsertRecord(updated, { ...saved, title: "Updated normalized title" }, saved.id);
  assert.equal(edited.length, initial.length);
  assert.equal(edited[0].title, "Updated normalized title");
  assert.deepEqual(removeRecords(edited, [saved.id]), initial.slice(1));
});
test("bulk deletion removes only the confirmed stable IDs", () => {
  const initial = structuredClone(exampleRecords); const deleted = removeRecords(initial, [initial[1].id, initial[6].id]);
  assert.equal(deleted.length, initial.length - 2); assert.ok(deleted.every(record => record.id !== initial[1].id && record.id !== initial[6].id)); assert.equal(initial.length, exampleRecords.length);
});
test("date-only model rejects invalid dates and round-trips local calendar values", () => {
  for (const value of ["2026-02-28", "2028-02-29", "2026-12-31"]) assert.equal(formatRecordDate(parseRecordDate(value)), value);
  for (const value of ["", "2026-02-29", "2026-13-01", "not-a-date", "2026-01-00"]) assert.equal(parseRecordDate(value), undefined);
  assert.equal(formatRecordDate(new Date(NaN)), "");
});
