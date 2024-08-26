import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { getAllCategory } from "../controllers/Category/getAll.js";
import { createCategory } from "../controllers/Category/create.js";

const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(checkAuth, getAllCategory)
  .get(checkAuth, createCategory);

export { categoryRouter };
