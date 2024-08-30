import express from "express";
const router = express.Router();
import * as db from "../db.js";
import * as clays from "../database/clays.db.ts";

// get all clay bodies
router.get("/", async (req, res) => {
  console.log("will return all clay bodies");
  const result = await clays.getAllClays();
  res.send(result);
});

// get one clay body
router.get("/:id", async (req, res) => {
  const result = await clays.getClayById(req.params.id);
  if (result.length === 0) {
    res.send(`There is no clay with id ${req.params.id}`);
  }
  res.send(result);
  // req.params.id
});

// create one clay body
// result = rows Inserted
router.post("/", async (req, res) => {
  const { name, notes } = req.body;
  const result = await clays.addClay({ name, notes });
  res.send(`Inserted ${result} rows`);
});

// delete one
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await clays.deleteClay(id);
  res.send(`Deleted ${result} rows`);
});

export default router;
