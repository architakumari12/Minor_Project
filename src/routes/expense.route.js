import express from "express";
import { createExpense } from "../controllers/Expense/create.js";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { deleteExpense } from "../controllers/Expense/delete.js";
import { updateExpense } from "../controllers/Expense/update.js";
import { getAllExpense } from "../controllers/Expense/getAll.js";
import { getOneExpense } from "../controllers/Expense/get.js";

const expenseRouter = express.Router();

expenseRouter
  .route("/")
  .post(checkAuth, createExpense)
  .get(checkAuth, getAllExpense);

expenseRouter
  .route("/:id")
  .put(checkAuth, updateExpense)
  .delete(checkAuth, deleteExpense)
  .get(checkAuth, getOneExpense);

export { expenseRouter };
