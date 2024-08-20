import express from "express";
const router = express.Router();
import * as db from "../db.js";

router.get("/", async (req, res) => {
  console.log("will return all glaze tests");
  const tests = await db.getAllGlazeTests();
  console.log("tests: ", tests);
  res.send(tests);
});

export default router;
