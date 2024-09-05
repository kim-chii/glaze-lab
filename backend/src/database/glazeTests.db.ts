import * as db from "../db.ts";
import DBUtils from "../dbUtils.ts";

const getAllGlazeTests = async () => {
  try {
    let dbResult = await db.queryDb(`SELECT * FROM glaze_tests;`);

    const tests = dbResult?.rows;
    let result: Array<number> = [];
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
    SELECT gtg.glaze_test_id, gtg.glaze_order, glazes.id as glaze_id, glazes.name 
    FROM glazes
    LEFT JOIN glazetests_glazes gtg ON glazes.id = gtg.glaze_id
    WHERE glaze_test_id = ${glazeTestId}`;
    let result = await db.queryDb(query);

    const rows = result?.rows;
    return rows;
  } catch (e) {
    console.error("Issue in getAllGlazeTests!! ", e);
  }
};

/**
 *
 * @param glazeTestId
 * @param glazes
 * @returns query output (glaze_test_id, glaze_id, glaze_order), (etc)
 */
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
   INSERT INTO glazetests_glazes (glaze_test_id, glaze_id, glaze_order)
VALUES ${formattedPairs};
    `;
    let result = await db.queryDb(query);

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

    let result = await db.queryDb(query);
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
    let result = await db.queryDb(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in hardDeleteGlazeTest!! ", e);
  }
};

export default {
  getAllGlazeTests,
  addGlazeTest,
  addGlazeTestRelationship,
  hardDeleteGlazeTest,
};
