import db from "#db/client";

export async function createFolder(name) {
  const SQL = `INSERT INTO folders (name) VALUES($1) RETURNING *;`;
  const { rows: folders } = await db.query(SQL, [name]);
  return folders;
}

export async function getFolders() {
  const SQL = `SELECT * FROM folders;`;
  const { rows: folders } = await db.query(SQL);
  return folders;
}

export async function getFolder(id) {
  const SQL = `SELECT * FROM folders WHERE id = $1`;
  const { rows: folder } = await db.query(SQL, [id]);
  return folder[0];
}
