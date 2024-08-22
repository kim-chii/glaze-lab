import express from "express";
const router = express.Router();
import * as db from "../db.js";

router.get("/", async (req, res) => {
  console.log("will return all glazes");
  const glazes = await db.getAllGlazes();
  console.log("glazes: ", glazes);
  res.send(glazes);
});

/**
 * Create one base glaze
 */
router.post("/", async (req, res) => {
  const { name, notes } = req.body;
  const result = await db.addGlaze(name, notes);
  res.send(`Inserted ${result} rows`);
});

/**
 * HARD delete a specific glaze
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.hardDeleteGlaze(id);
});

export default router;
