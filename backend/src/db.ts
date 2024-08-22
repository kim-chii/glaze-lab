// db.js

import pg from "pg";
import * as DBUtils from "./dbUtils.ts";

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

const addGlaze = async (name: string, notes: string) => {
  try {
    const query = `
   INSERT INTO glazes (name, notes)
VALUES ('${name}', '${notes}');
    `;
    let result = await pool.query(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in addGlaze!! ", e);
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
/**
 * This is a HARD delete and will delete all clays + glaze tests where the clay is used. Probably want to think about a soft delete
 * @param id
 * @returns
 */
const hardDeleteClay = async (id: number) => {
  try {
    const query = `
    DELETE from clays where id = ${id} 
    `;
    let result = await pool.query(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in addClay!! ", e);
  }
};

const hardDeleteGlaze = async (id: number) => {
  try {
    const query = `
    DELETE from glazes where id = ${id} 
    `;
    let result = await pool.query(query);

    console.log("result: ", result);
    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in hardDeleteGlaze!! ", e);
  }
};

export {
  getAllClays,
  getAllGlazes,
  getAllGlazeTests,
  getAllGlazesForTest,
  addClay,
  addGlaze,
  addGlazeTest,
  hardDeleteClay,
  hardDeleteGlaze,
  addGlazeTestRelationship,
};
