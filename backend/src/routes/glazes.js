import express from "express";
const router = express.Router();
import * as db from "../db.js";

router.get("/", async (req, res) => {
  console.log("will return all glazes");
  const glazes = await db.getAllGlazes();
  console.log("glazes: ", glazes);
  res.send(glazes);
});

export default router;
