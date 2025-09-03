import db from "#db/client";

export async function createFile(name, size) {
  const SQL = `
  INSERT INTO files (name, size, folder_id)   
    SELECT $1, $2, id FROM folders LIMIT 5
  RETURNING *
  `;
  const { rows: files } = await db.query(SQL, [name, size]);
  return files[0];
}
