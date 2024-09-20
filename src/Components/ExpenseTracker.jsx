import React, { useState, useEffect } from "react";
import AddExpense from "./AddExpense";
import ExpenseTable from "./ExpenseTable";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);

  // Add expense to the list and save in localStorage
  const handleAddExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Delete expense by index
  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Calculate total amount
  const totalAmount = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);

  // Load expenses from localStorage when the component mounts
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  // Prepare data for PieChart
  const categories = expenses.reduce((acc, expense) => {
    const category = expense.category || "Other";
    acc[category] = (acc[category] || 0) + parseFloat(expense.amount || 0);
    return acc;
  }, {});

  const chartData = Object.keys(categories).map((category) => ({
    name: category,
    value: categories[category],
  }));

  const COLORS = ["#a93f48", "#efc6c4", "#F08670", "#D74D3E"];

  // Generate CSV file from expenses
  // Generate CSV file from expenses
const downloadCSV = () => {
    const csvContent = [
      ["Amount", "Date", "Category", "Description"], // headers
      ...expenses.map((expense) => [
        expense.amount,
        new Date(expense.date).toLocaleDateString("en-IN"), // Format date as DD/MM/YYYY
        expense.category,
        expense.description || "N/A",
      ]),
    ]
      .map((row) => row.join(",")) // join each row's elements by commas
      .join("\n"); // join each row by newlines
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Add Expense Form */}
      <AddExpense onAddExpense={handleAddExpense} />

      {/* Expense Table */}
      <ExpenseTable expenses={expenses} onDeleteExpense={handleDeleteExpense} />

      {/* Total Amount */}
      <div className="mt-4 p-4 text-[#a93f48] font-bold text-xl">
        Total Amount: ₹{totalAmount.toFixed(2)}
      </div>

      {/* Download CSV Button */}
      <button
        onClick={downloadCSV}
        className="bg-[#efc6c4] text-[#a93f48] font-bold rounded-md border-2 border-[#a93f48] p-3 mb-3"
      >
        Download CSV
      </button>

      {/* PieChart */}
      {chartData.length > 0 && (
        <div className="w-full md:w-1/2 h-64 mt-6">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#a93f48"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
