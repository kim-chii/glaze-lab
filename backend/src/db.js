// db.js

import pg from "pg";

// set upClient connection to postgres
const { Pool } = pg;
const pool = new Pool({
  host: "localhost",
  user: "kimtan",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: "glazeapp",
});

const getAllClays = async () => {
  console.log("called getAllClayBodies!!!!!!!!!!!!!!!");
  try {
    let result = await pool.query(`SELECT * FROM clays;`);

    const clays = result?.rows;
    return clays;
  } catch (e) {
    console.error("Issue!! ", e);
  }
};

const getAllGlazes = async () => {
  try {
    let result = await pool.query(`SELECT * FROM glazes;`);

    console.log("result: ", result);
    const glazes = result?.rows;
    return glazes;
  } catch (e) {
    console.error("Issue in getAllGlazes!! ", e);
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

const addClay = async (name, notes) => {
  try {
    const query = `
   INSERT INTO clays (name, notes)
VALUES ('${name}', '${notes}');
    `;
    let result = await pool.query(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in addClay!! ", e);
  }
};

export {
  getAllClays,
  getAllGlazes,
  getAllGlazeTests,
  getAllGlazesForTest,
  addClay,
};
