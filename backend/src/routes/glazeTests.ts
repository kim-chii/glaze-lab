import express from "express";
const router = express.Router();
import GlazeTests from "../database/glazeTests.db.ts";

router.get("/", async (req, res) => {
  console.log("will return all glaze tests");
  const tests = await GlazeTests.getAllGlazeTests();
  console.log("tests: ", tests);
  res.send(tests);
});

router.post("/", async (req, res) => {
  const { name, notes, clayId, glazes } = req.body;
  const { rowCount, id: glazeTestId } = await GlazeTests.addGlazeTest(
    name,
    notes,
    clayId
  );

  const result = await GlazeTests.addGlazeTestRelationship(glazeTestId, glazes);
  res.send(`Inserted ${rowCount} rows`);
});

/**
 * HARD delete a specific glaze test
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const rowCount = await GlazeTests.hardDeleteGlazeTest(id);
  res.send(`Deleted ${rowCount} rows`);
});

export default router;
