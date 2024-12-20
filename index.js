import { createApp, upload } from "./config.js";

const app = createApp({
  user: "nadyar",
  host: "bbz.cloud",
  database: "nadyar",
  password: "PJm{R$9p[a!#3k;+",
  port: 30211,
});

/* Startseite */


app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/news", async function (req, res) {
  res.render("news", {});
});

app.get("/favorite", async function (req, res) {
  res.render("favorite", {});
});

app.post("/create_post", upload.single("image"), async function (req, res) {
  const result = await app.locals.pool.query(
    "INSERT INTO posts ( title, caption, image, user_id ) VALUES ($1, $2)",
    [req.body.text, req.file.filename]
  );
  console.log(result);
  res.redirect("/");
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

/*Faforiten anzeigen 
nach login dorthin geschickt 
login 1.
detail*/
