import React, { useState } from "react";

const AddExpense = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddExpense) {
      onAddExpense(expense);
    }
    setExpense({
      amount: "",
      date: "",
      category: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center space-y-4"
    >
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <label htmlFor="amount" className="text-[#a93f48] my-2 block font-bold">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          aria-required="true"
          className="border-2 border-[#a93f48] rounded-md w-full outline-none p-3"
          required
        />
      </div>

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <label htmlFor="date" className="text-[#a93f48] mb-2 block font-bold">
          Date:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="border-2 border-[#a93f48] rounded-md w-full outline-none p-3"
          required
        />
      </div>

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <label htmlFor="category" className="text-[#a93f48] mb-2 block font-bold">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="border-2 border-[#a93f48] rounded-md w-full outline-none p-3"
          required
        >
          <option value="" className="text-[#a93f48]">Select Category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <label htmlFor="description" className="text-[#a93f48] mb-2 block font-bold">
          Description (optional):
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={expense.description}
          onChange={handleChange}
          placeholder="Optional description"
          className="border-2 border-[#a93f48] rounded-md w-full outline-none p-3"
        />
      </div>

      <button
        type="submit"
        className="bg-[#efc6c4] text-[#a93f48] font-bold rounded-md border-2 border-[#a93f48] p-3 w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpense;
