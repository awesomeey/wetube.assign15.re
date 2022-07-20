import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import root from "./rootRouter";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: "hi",
	resave: true,
	saveUninitialized: true,
}));

app.use("/uploads", express.static("uploads"));
app.use("/", root);

// Codesanbox does not need PORT :)
// app.listen(4000, () => console.log(`Listening!`));
const PORT = 4000;

const handleListening = () => console.log(`✔ Server listening on port http://localhost:${PORT}!`);
app.listen(PORT, handleListening);
