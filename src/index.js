import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

const handleHome = (req, res) => {
  return res.send("<h1>helloo! u entered awesomeey area🤗!</h1>");
};

app.get("/", handleHome);

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));
