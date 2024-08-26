import { ApiResponse } from "../../utils/ApiResponse.js";
import { Expense } from "../../model/expense.model.js";

const getOneExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Invalid Id" });
    }

    const expense = await Expense.findById(id);

    res
      .status(200)
      .send(new ApiResponse(200, expense, "Fetched Successfully!"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to fetch expense!"));
  }
};
export { getOneExpense };
