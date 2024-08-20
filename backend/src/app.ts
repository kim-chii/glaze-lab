import express from "express";
import clayRouter from "./routes/clays.js";
import glazeRouter from "./routes/glazes.js";
import glazeTestsRouter from "./routes/glazeTests.js";

const app = express();

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

// set upClient connection to postgres

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>"); // displays on page
});

app.use("/clays", clayRouter);
app.use("/glazes", glazeRouter);
app.use("/glazeTests", glazeTestsRouter);
