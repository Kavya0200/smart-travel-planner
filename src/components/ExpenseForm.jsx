import { useState } from "react";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      createdAt: new Date().toISOString(),
    };

    onAddExpense(newExpense);
    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Hotel">Hotel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;