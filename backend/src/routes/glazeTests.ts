import express from "express";
const router = express.Router();
import * as db from "../db.js";

router.get("/", async (req, res) => {
  console.log("will return all glaze tests");
  const tests = await db.getAllGlazeTests();
  console.log("tests: ", tests);
  res.send(tests);
});

router.post("/", async (req, res) => {
  const { name, notes, clayId, glazes } = req.body;
  const { rowCount, id: glazeTestId } = await db.addGlazeTest(
    name,
    notes,
    clayId
  );

  const result = await db.addGlazeTestRelationship(glazeTestId, glazes);
  res.send(`Inserted ${rowCount} rows`);
});

export default router;
