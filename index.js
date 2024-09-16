import { createApp } from "./config.js";

const app = createApp({
  user: "nadyar",
  host: "bbz.cloud",
  database: "nadyar",
  password: "PJm{R$9p[a!#3k;+",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/news", async function (req, res) {
  res.render("news", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
