import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createFolder } from "./queries/folders.js";
import { createFile } from "./queries/files.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    const folderName = faker.music.artist();
    const makeFolders = await createFolder(folderName);
  }

  for (let j = 0; j < 5; j++) {
    const fileName = faker.music.album({ max: 100 });
    const size = faker.number.int({ max: 300 });
    const makeFiles = await createFile(fileName, size);
  }
}
