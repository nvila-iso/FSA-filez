import db from "#db/client";

export async function createFolder(name) {
  const SQL = `INSERT INTO folders (name) VALUES($1) RETURNING *;`;
  const { rows: folders } = await db.query(SQL, [name]);
  return folders;
}
