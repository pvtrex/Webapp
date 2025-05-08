import React from 'react';
import { Budget, Purchase, BudgetImpact } from '../../types';
import { formatCurrency, formatPercentage, calculateMonthlyIncome, calculateTotalMonthlyExpenses } from '../../utils/calculations';
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from 'lucide-react';

interface BudgetSummaryProps {
  budget: Budget;
  purchase: Purchase;
  budgetImpact: BudgetImpact;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ budget, purchase, budgetImpact }) => {
  const monthlyIncome = calculateMonthlyIncome(budget);
  const monthlyExpenses = calculateTotalMonthlyExpenses(budget);
  const currentRemainingBudget = monthlyIncome - monthlyExpenses;
  
  const getStatusIcon = () => {
    if (budgetImpact.affordable && budgetImpact.percentageOfIncome < 20) {
      return <CheckCircleIcon size={48} className="text-green-500" />;
    } else if (budgetImpact.affordable) {
      return <AlertCircleIcon size={48} className="text-yellow-500" />;
    } else {
      return <XCircleIcon size={48} className="text-red-500" />;
    }
  };
  
  const getStatusClass = () => {
    if (budgetImpact.affordable && budgetImpact.percentageOfIncome < 20) {
      return 'border-green-200 bg-green-50';
    } else if (budgetImpact.affordable) {
      return 'border-yellow-200 bg-yellow-50';
    } else {
      return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`border-2 p-6 rounded-lg ${getStatusClass()}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {budgetImpact.affordable 
                ? 'You can afford this purchase' 
                : 'This purchase exceeds your budget'}
            </h2>
            <p className="text-gray-700">{budgetImpact.recommendation}</p>
          </div>
          <div>
            {getStatusIcon()}
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Purchase Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Purchase Details</h3>
            <dl className="space-y-2">
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Item</dt>
                <dd className="text-sm text-gray-900 font-semibold">{purchase.name}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="text-sm text-gray-900 capitalize">{purchase.category}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Purchase Price</dt>
                <dd className="text-sm text-gray-900 font-semibold">{formatCurrency(purchase.price)}</dd>
              </div>
              {purchase.downPayment > 0 && (
                <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Down Payment</dt>
                  <dd className="text-sm text-gray-900">{formatCurrency(purchase.downPayment)}</dd>
                </div>
              )}
              {purchase.interestRate && (
                <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
                  <dd className="text-sm text-gray-900">{purchase.interestRate}%</dd>
                </div>
              )}
              {purchase.financingYears && (
                <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Financing Term</dt>
                  <dd className="text-sm text-gray-900">{purchase.financingYears} years</dd>
                </div>
              )}
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
                <dd className="text-sm text-gray-900 font-semibold">{formatCurrency(budgetImpact.totalCost)}</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Budget Impact</h3>
            <dl className="space-y-2">
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                <dd className="text-sm text-gray-900">{formatCurrency(monthlyIncome)}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Current Expenses</dt>
                <dd className="text-sm text-gray-900">{formatCurrency(monthlyExpenses)}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Current Remaining</dt>
                <dd className="text-sm text-gray-900">{formatCurrency(currentRemainingBudget)}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Monthly Payment</dt>
                <dd className="text-sm text-primary-600 font-semibold">{formatCurrency(budgetImpact.monthlyPayment)}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">% of Income</dt>
                <dd className="text-sm text-gray-900">{formatPercentage(budgetImpact.percentageOfIncome)}</dd>
              </div>
              <div className="grid grid-cols-2 py-2 border-b border-gray-200">
                <dt className="text-sm font-medium text-gray-500">New Remaining Budget</dt>
                <dd className={`text-sm font-semibold ${budgetImpact.remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(budgetImpact.remainingBudget)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;