import express from "express";
import { engine } from "express-handlebars";
import pg from "pg";
const { Pool } = pg;
import cookieParser from "cookie-parser";
import multer from "multer";
const upload = multer({ dest: "public/uploads/" });
import sessions from "express-session";
import bbz307 from "bbz307";

export function createApp(dbconfig) {
  const app = express();

  const pool = new Pool(dbconfig);
  const login = new bbz307.Login(
    "users",
    ["username", "passwort", "email"],
    pool
  );

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", "./views");

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    sessions({
      secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
      saveUninitialized: true,
      cookie: { maxAge: 86400000, secure: false },
      resave: false,
    })
  );

  /* Registrierungscode */
  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", upload.none(), async (req, res) => {
    const user = await login.registerUser(req);
    if (user) {
      res.redirect("/login");
      return;
    } else {
      res.redirect("/register");
      return;
    }
  });

  /* Login */
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.post("/login", upload.none(), async (req, res) => {
    const user = await login.loginUser(req);
    if (!user) {
      res.redirect("/login");
      return;
    } else {
      res.redirect("/intern");
      return;
    }
  });

  app.get("/intern", async (req, res) => {
    const user = await login.loggedInUser(req); // <--
    if (!user) {
      // <--
      res.redirect("/login"); // <--
      return; // <--
    } // <--
    res.render("intern", { user: user });
  });

  /* Formulare (ohne Dateiupload) */
  app.get("/event_formular", function (req, res) {
    res.render("event_formular");
  });

  app.get("/new_post", function (req, res) {
    res.render("new_post");
  });

  app.post("/create_post", upload.single("image"), async function (req, res) {
    await pool.query(
      "INSERT INTO posts (title, caption, image ) VALUES ($1, $2, $3)",
      [req.body.title, req.body.caption, req.file.filename]
    );
    res.redirect("/");
  });

  /* Favoriten */
  app.post("/like/:id", upload.none(), async function (req, res) {
    const user = await login.loggedInUser(req);
    if (!user) {
      res.redirect("/login");
      return;
    }
    await pool.query("INSERT INTO likes (posts_id, users_id) VALUES ($1, $2)", [
      req.params.id,
      users.id,
    ]);
  });

  app.locals.pool = pool;

  return app;
}

export { upload };
