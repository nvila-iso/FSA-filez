import express from "express";
const app = express();
export default app;
import stuffRoute from "./api/stuff.js";

app.use(express.json());

// app.route("/").get((req, res) => {
//   res.send("...how did you get here?");
// });

app.use(("/things", stuffRoute));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("GET OUT OF HERE!!1! (ノಠ益ಠ)ノ彡┻━┻");
});
