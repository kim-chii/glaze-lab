import express from "express";
import clayRouter from "./routes/clays.js";
import glazeRouter from "./routes/glazes.js";
import glazeTestsRouter from "./routes/glazeTests.js";
// set up connection to postgres
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
// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.end("Welcome to our home page");
//   } else if (req.url === "/about") {
//     res.end("here is our short history");
//   } else {
//     res.end(`<h1>Page not found </h1>`);
//   }
// });

// server.listen(3000);

// import { ClayBody } from "./clayBody.js";

// console.log("testing endpoint");

// const result = await ClayBody.getAllTables();

// console.log("result: ", result);
