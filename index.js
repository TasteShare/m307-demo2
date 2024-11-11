import { createApp, upload } from "./config.js";

const app = createApp({
  user: "nadyar",
  host: "bbz.cloud",
  database: "nadyar",
  password: "PJm{R$9p[a!#3k;+",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("start", { posts: posts.rows });
});

app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/news", async function (req, res) {
  res.render("news", {});
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
