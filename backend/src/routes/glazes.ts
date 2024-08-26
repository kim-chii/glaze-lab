import express from "express";
const router = express.Router();
import * as db from "../db.js";
import Glazes from "../database/glazes.db.ts";

router.get("/", async (req, res) => {
  console.log("will return all glazes");
  const result = await Glazes.getAllGlazes();
  console.log("glazes: ", result);
  res.send(result);
});

/**
 * Create one base glaze
 */
router.post("/", async (req, res) => {
  const { name, notes } = req.body;
  const result = await Glazes.addGlaze(name, notes);
  res.send(`Inserted ${result} rows`);
});

/**
 * HARD delete a specific glaze
 */
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Glazes.hardDeleteGlaze(id);
  res.send(`Deleted ${result} rows`);
});

export default router;
