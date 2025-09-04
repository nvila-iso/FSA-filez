import express from "express";
const router = express.Router();
export default router;

import { getFilesWithFolderName, createFile } from "#db/queries/files";
import { getFolders, getFolder } from "#db/queries/folders";

// FILES ------------------------------>
router.route("/files").get(async (req, res) => {
  const files = await getFilesWithFolderName();
  res.status(200).send(files);
});

// FOLDERS ------------------------------>
router.route("/folders").get(async (req, res) => {
  const folders = await getFolders();
  res.status(200).send(folders);
});

router.route("/folders/:id").get(async (req, res) => {
  const { id } = req.params;
  const response = await getFolder(id);
  try {
    if (!/^\d+$/.test(id) || id < 0) {
      return res.status(400).send("ID# is incorrect.");
    } else if (!response) {
      return res.status(404).send("ID# does not exist.");
    } else {
      return res.status(200).send(response);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.route("/folders/:id/files").post(async (req, res) => {
  const { id } = req.params;
  const response = await getFolder(id);
  if (!response) {
    return res.status(404).send("Folder ID doesn't exist.");
  } else if (!req.body) {
    return res.status(400).send("Body not provided...");
  } else if (!req.body.name || !req.body.size) {
    return res.status(400).send("You're missing either the name or file size.");
  } else {
    try {
      const { name, size } = req.body;
      const reply = await createFile(name, size);
      return res.status(201).send(reply);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
});
