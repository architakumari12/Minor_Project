import { ApiResponse } from "../../utils/ApiResponse";

const getAllTransactions = async (req, res) => {
  try {
    const id = req.user._id;

    if (!id) {
      return res.status(400).send(new ApiResponse(400, null, "Invalid ID"));
    }

    const expenses = await expenses
      .find({ user: id })
      .select("-user -__v")
      .lean();

    const expenseWithType = expenses.map((expenses) => ({
      ...expenseWithType,
      type: "expense",
    }));

    const incomeWithType = income.map((income) => ({
      ...income,
      type: "income",
    }));
    const transactions = [...expenseWithType, ...incomeWithType];
    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          transactions,
          "All transactions fetched successfully!"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to fetch all transactions!"));
  }
};

export { getAllTransactions };
