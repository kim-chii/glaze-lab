import * as db from "./db.ts";

const getAllGlazes = async () => {
  try {
    let result = await db.queryDb(`SELECT * FROM glazes;`);

    console.log("result: ", result);
    const glazes = result?.rows;
    return glazes;
  } catch (e) {
    console.error("Issue in getAllGlazes!! ", e);
  }
};

const addGlaze = async (name: string, notes: string) => {
  try {
    const query = `
   INSERT INTO glazes (name, notes)
VALUES ('${name}', '${notes}');
    `;
    let result = await db.queryDb(query);

    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in addGlaze!! ", e);
  }
};

const hardDeleteGlaze = async (id: number) => {
  try {
    const query = `
    DELETE from glazes where id = ${id} 
    `;
    let result = await db.queryDb(query);

    console.log("result: ", result);
    const rowCount = result?.rowCount;
    return rowCount;
  } catch (e) {
    console.error("Issue in hardDeleteGlaze!! ", e);
  }
};

export default { getAllGlazes, addGlaze, hardDeleteGlaze };
