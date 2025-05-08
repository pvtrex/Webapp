import React, { useState } from 'react';
import { Income, Expense } from '../../types';
import { DollarSignIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface IncomeFormProps {
  initialIncome?: Income;
  initialExpenses?: Expense[];
  onSubmit: (income: Income, expenses: Expense[]) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ 
  initialIncome, 
  initialExpenses = [],
  onSubmit 
}) => {
  const [income, setIncome] = useState<Income>(initialIncome || {
    amount: 0,
    frequency: 'monthly'
  });
  
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const [newExpense, setNewExpense] = useState<Expense>({
    category: '',
    amount: 0,
    frequency: 'monthly'
  });

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIncome(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleNewExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount > 0) {
      setExpenses([...expenses, { ...newExpense }]);
      setNewExpense({
        category: '',
        amount: 0,
        frequency: 'monthly'
      });
    }
  };

  const handleRemoveExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(income, expenses);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <DollarSignIcon className="mr-2 text-primary-500" size={20} />
          Income Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <label htmlFor="income-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Income Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="income-amount"
                name="amount"
                value={income.amount || ''}
                onChange={handleIncomeChange}
                min="0"
                step="100"
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="income-frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              id="income-frequency"
              name="frequency"
              value={income.frequency}
              onChange={handleIncomeChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
              required
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <DollarSignIcon className="mr-2 text-accent-500" size={20} />
          Monthly Expenses
        </h2>
        
        {expenses.length > 0 && (
          <div className="mb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expense.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${expense.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {expense.frequency === 'monthly' ? 'Monthly' : 'Yearly'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          type="button"
                          onClick={() => handleRemoveExpense(index)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
          <div className="md:col-span-3">
            <label htmlFor="expense-category" className="block text-sm font-medium text-gray-700 mb-1">
              Expense Category
            </label>
            <input
              type="text"
              id="expense-category"
              name="category"
              value={newExpense.category}
              onChange={handleNewExpenseChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
              placeholder="e.g., Rent, Utilities, Groceries"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="expense-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="expense-amount"
                name="amount"
                value={newExpense.amount || ''}
                onChange={handleNewExpenseChange}
                min="0"
                step="10"
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="expense-frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              id="expense-frequency"
              name="frequency"
              value={newExpense.frequency}
              onChange={handleNewExpenseChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={handleAddExpense}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
            >
              <PlusIcon size={18} className="mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-md"
        >
          Save Budget Information
        </button>
      </div>
    </form>
  );
};

export default IncomeForm;