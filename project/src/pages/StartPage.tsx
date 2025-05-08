import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useBudget } from '../context/BudgetContext';
import { Income, Expense, Purchase } from '../types';
import { DollarSignIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

enum Step {
  INCOME = 'income',
  EXPENSES = 'expenses',
  PURCHASE = 'purchase'
}

const StartPage: React.FC = () => {
  const { updateBudget, updatePurchase, calculateImpact } = useBudget();
  const [currentStep, setCurrentStep] = useState<Step>(Step.INCOME);
  const navigate = useNavigate();

  // Form state
  const [income, setIncome] = useState<Income>({
    amount: 0,
    frequency: 'monthly'
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Expense>({
    category: '',
    amount: 0,
    frequency: 'monthly'
  });
  const [purchase, setPurchase] = useState<Purchase>({
    id: `purchase-${Date.now()}`,
    name: '',
    price: 0,
    category: 'other',
    description: '',
    financingYears: 5,
    interestRate: 5,
    downPayment: 0
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

  const handlePurchaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPurchase(prev => ({
      ...prev,
      [name]: ['price', 'financingYears', 'interestRate', 'downPayment'].includes(name) 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleNext = () => {
    if (currentStep === Step.INCOME && income.amount > 0) {
      setCurrentStep(Step.EXPENSES);
    } else if (currentStep === Step.EXPENSES) {
      updateBudget({ income, expenses });
      setCurrentStep(Step.PURCHASE);
    } else if (currentStep === Step.PURCHASE && purchase.price > 0) {
      updateBudget({ income, expenses });
      updatePurchase(purchase);
      calculateImpact();
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentStep === Step.EXPENSES) {
      setCurrentStep(Step.INCOME);
    } else if (currentStep === Step.PURCHASE) {
      setCurrentStep(Step.EXPENSES);
    }
  };

  const getProgress = () => {
    switch (currentStep) {
      case Step.INCOME:
        return 33;
      case Step.EXPENSES:
        return 66;
      case Step.PURCHASE:
        return 100;
    }
  };

  const monthlyIncome = income.frequency === 'yearly' ? income.amount / 12 : income.amount;
  const monthlyExpenses = expenses.reduce((total, expense) => {
    const amount = expense.frequency === 'yearly' ? expense.amount / 12 : expense.amount;
    return total + amount;
  }, 0);
  const remainingBudget = monthlyIncome - monthlyExpenses;

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Check If You Can Afford It
        </h1>
        
        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500 ease-in-out"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <div className={`text-sm font-medium ${currentStep === Step.INCOME ? 'text-primary-600' : 'text-gray-500'}`}>
                Step 1: Income
              </div>
              <div className={`text-sm font-medium ${currentStep === Step.EXPENSES ? 'text-primary-600' : 'text-gray-500'}`}>
                Step 2: Expenses
              </div>
              <div className={`text-sm font-medium ${currentStep === Step.PURCHASE ? 'text-primary-600' : 'text-gray-500'}`}>
                Step 3: Purchase
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {currentStep === Step.INCOME && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <DollarSignIcon className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">What's your income?</h2>
              </div>
              
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

              {income.amount > 0 && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-700">
                      Your monthly income: {formatCurrency(monthlyIncome)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === Step.EXPENSES && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <DollarSignIcon className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">What are your monthly expenses?</h2>
              </div>

              {expenses.length > 0 && (
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
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {monthlyExpenses > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly Income:</span>
                      <span className="font-medium">{formatCurrency(monthlyIncome)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monthly Expenses:</span>
                      <span className="font-medium">{formatCurrency(monthlyExpenses)}</span>
                    </div>
                    <div className="pt-2 border-t border-blue-100">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Remaining Budget:</span>
                        <span className={`font-medium ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(remainingBudget)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === Step.PURCHASE && (
            <div className="space-y-6">
              <div className="flex items-center mb-4">
                <DollarSignIcon className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">What would you like to buy?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="purchase-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Name
                  </label>
                  <input
                    type="text"
                    id="purchase-name"
                    name="name"
                    value={purchase.name}
                    onChange={handlePurchaseChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                    placeholder="e.g., New Car, Dream House"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="purchase-category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="purchase-category"
                    name="category"
                    value={purchase.category}
                    onChange={handlePurchaseChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                    required
                  >
                    <option value="car">Car</option>
                    <option value="house">House</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="purchase-price" className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="purchase-price"
                    name="price"
                    value={purchase.price || ''}
                    onChange={handlePurchaseChange}
                    min="0"
                    step="100"
                    className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {purchase.price >= 1000 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Financing Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="down-payment" className="block text-sm font-medium text-gray-700 mb-1">
                        Down Payment
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="down-payment"
                          name="downPayment"
                          value={purchase.downPayment || ''}
                          onChange={handlePurchaseChange}
                          min="0"
                          max={purchase.price}
                          step="100"
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 mb-1">
                        Interest Rate (%)
                      </label>
                      <input
                        type="number"
                        id="interest-rate"
                        name="interestRate"
                        value={purchase.interestRate || ''}
                        onChange={handlePurchaseChange}
                        min="0"
                        max="30"
                        step="0.1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                        placeholder="5.0"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="financing-years" className="block text-sm font-medium text-gray-700 mb-1">
                        Financing Term (Years)
                      </label>
                      <input
                        type="number"
                        id="financing-years"
                        name="financingYears"
                        value={purchase.financingYears || ''}
                        onChange={handlePurchaseChange}
                        min="1"
                        max="30"
                        step="1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          {currentStep !== Step.INCOME && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
          )}
          
          <button
            type="button"
            onClick={handleNext}
            className={`flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              currentStep === Step.INCOME ? 'ml-auto' : ''
            }`}
          >
            {currentStep === Step.PURCHASE ? 'Calculate Impact' : 'Continue'}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StartPage;