import * as db from "../db.ts";

interface AddClayParams {
  name: string;
  notes?: string;
}

const getAllClays = async () => {
  let result = await db.queryDb(`select * from clays;`);
  return result?.rows;
};

const addClay = async (params: AddClayParams) => {
  const { name, notes } = params;
  const query = `
   INSERT INTO clays (name, notes)
VALUES ('${name}', '${notes}');
    `;
  let result = await db.queryDb(query);

  const rowCount = result?.rowCount;
  return rowCount;
};

/**
 * This is a HARD delete and will delete all clays + glaze tests where the clay is used. Probably want to think about a soft delete
 * @param id
 * @returns
 */
const hardDeleteClay = async (id: number) => {
  const query = `
    DELETE from clays where id = ${id} 
    `;
  let result = await db.queryDb(query);

  const rowCount = result?.rowCount;
  return rowCount;
};

export { getAllClays, addClay, hardDeleteClay };
