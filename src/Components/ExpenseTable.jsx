import React from "react";

const ExpenseTable = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-[#a93f48] text-left">Amount</th>
            <th className="py-2 px-4 text-[#a93f48] text-left">Date</th>
            <th className="py-2 px-4 text-[#a93f48] text-left">Category</th>
            <th className="py-2 px-4 text-[#a93f48] text-left">Description</th>
            <th className="py-2 px-4 text-[#a93f48] text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                No expenses added yet.
              </td>
            </tr>
          ) : (
            expenses.map((expense, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-[#a93f48]">{expense.amount}</td>
                <td className="py-2 px-4 text-[#a93f48]">{expense.date}</td>
                <td className="py-2 px-4 text-[#a93f48]">{expense.category}</td>
                <td className="py-2 px-4 text-[#a93f48]">{expense.description || "N/A"}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onDeleteExpense(index)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete ${expense.description || "expense"}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
