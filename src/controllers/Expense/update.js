import { ApiResponse } from "../../utils/ApiResponse.js";
import { Expense } from "../../model/expense.model.js";

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const { amount, date, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Required field id missing!" });
    }

    const exists = await Expense.findById(id);

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Expense with provided id does not exists!"
          )
        );
    }

    const updated = await Expense.findByIdAndUpdate(
      id,
      { amount, date, description },
      { new: true }
    );

    res.status(200).send(200, updated, "Expense updated successfully!");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update expense"));
  }
};
export { updateExpense };
