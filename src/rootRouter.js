import express from "express";
import { uploadFile } from "./middleware";
import { getFileList, postFile, getfile } from "./fileController";

const rootRouter = express.Router();

rootRouter.route("/").get(getFileList).post(uploadFile.single("txt"), postFile);
rootRouter.route("/read").get(getfile);
rootRouter.get("/read/:id([0-9]{13})", getfile);

export default rootRouter;
