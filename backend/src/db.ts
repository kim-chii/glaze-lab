// db.js

import pg from "pg";
import DBUtils from "./dbUtils.ts";

// set up Client connection to postgres
const { Pool } = pg;
const pool = new Pool({
  host: "localhost",
  user: "kimtan",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: "glazeapp",
});

pool.on("connect", (client) => {
  console.log("pool connected ===============");
});

const queryDb = async (query: string) => {
  try {
    let result = await pool.query(query);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export { queryDb };
