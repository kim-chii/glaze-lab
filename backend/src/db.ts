// db.js

import pg from "pg";
import * as DBUtils from "./dbUtils.ts";

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

const getAllGlazeTests = async () => {
  try {
    let dbResult = await pool.query(`SELECT * FROM glaze_tests;`);

    const tests = dbResult?.rows;
    let result = [];
    for (let i = 0; i < tests.length; i++) {
      const glazes = await getAllGlazesForTest(tests[i].id);
      result.push({
        ...tests[i],
        glazes,
      });
    }
    return result;
  } catch (e) {
    console.error("Issue in getAllGlazeTests!! ", e);
  }
};

// get all entries from table glazetests_glazes where glazeTestId = 1
const getAllGlazesForTest = async (glazeTestId) => {
  try {
    // returns all glazes for a specific test
    const query = `
    SELECT gtg.glaze_test_id, glazes.id as glaze_id, glazes.name 
    FROM glazes
    LEFT JOIN glazetests_glazes gtg ON glazes.id = gtg.glaze_id
    WHERE glaze_test_id = ${glazeTestId}`;
    let result = await pool.query(query);

    const rows = result?.rows;
    return rows;
  } catch (e) {
    console.error("Issue in getAllGlazeTests!! ", e);
  }
};

const addGlazeTestRelationship = async (
  glazeTestId: number,
  glazes: Array<number>
) => {
  const formattedPairs = DBUtils.formatGlazeTestRelationshipPairs(
    glazeTestId,
    glazes
  );
  try {
    const query = `
   INSERT INTO glazetests_glazes (glaze_test_id, glaze_id)
VALUES ${formattedPairs};
    `;
    let result = await pool.query(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in addGlazeTestRelationship!! ", e);
  }
};

const addGlazeTest = async (name: string, notes: string, clayId) => {
  try {
    const query = `
      INSERT INTO glaze_tests (name, notes, clay_id)
      VALUES ('${name}', '${notes}', ${clayId})  RETURNING id`;

    let result = await pool.query(query);
    let nextId = result.rows[0].id;
    const rowCount = result?.rowCount;
    return { rowCount, id: nextId };
  } catch (e) {
    console.error("Issue in addGlazeTest!! ", e);
  }
};

const hardDeleteGlazeTest = async (id: number) => {
  try {
    const query = `
    DELETE from glaze_tests where id = ${id} 
    `;
    let result = await pool.query(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in hardDeleteGlazeTest!! ", e);
  }
};

export {
  queryDb,
  getAllGlazeTests,
  getAllGlazesForTest,
  addGlazeTest,
  hardDeleteGlazeTest,
  addGlazeTestRelationship,
};
