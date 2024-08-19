import express from "express";
const router = express.Router();
import * as db from "../db.js";

router.get("/", async (req, res) => {
  console.log("will return all glaze tests");
  const tests = await db.getAllGlazeTests();
  console.log("tests: ", tests);
  res.send(tests);
});

router.get("/:id", async (req, res) => {
  console.log("for now will return a  glazes for test");
  const test = await db.getAllGlazeTests(req.params.id);
  console.log("tests: ", test);
  res.send(test);
});
export default router;
