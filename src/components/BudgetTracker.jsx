import { useMemo } from "react";

function BudgetTracker({ totalBudget = 0, expenses = [] }) {
  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  }, [expenses]);

  const remaining = totalBudget - totalSpent;
  const spentPercentage =
    totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Budget Tracker</h2>

      <div className="space-y-2">
        <p><strong>Total Budget:</strong> ₹{totalBudget}</p>
        <p><strong>Total Spent:</strong> ₹{totalSpent}</p>
        <p className={remaining < 0 ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
          <strong>Remaining:</strong> ₹{remaining}
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${spentPercentage}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {spentPercentage.toFixed(1)}% of budget used
      </p>
    </div>
  );
}

export default BudgetTracker;