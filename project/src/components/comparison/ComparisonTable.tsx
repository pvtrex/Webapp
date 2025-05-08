import React from 'react';
import { Purchase, Budget, BudgetImpact } from '../../types';
import { calculateBudgetImpact, formatCurrency, formatPercentage } from '../../utils/calculations';
import { TrashIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from 'lucide-react';

interface ComparisonTableProps {
  budget: Budget;
  purchases: Purchase[];
  onRemoveItem: (id: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ budget, purchases, onRemoveItem }) => {
  // No purchases to compare
  if (purchases.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Add purchases to compare them side by side.</p>
      </div>
    );
  }

  // Get impacts for all purchases
  const purchaseImpacts = purchases.map(purchase => ({
    purchase,
    impact: calculateBudgetImpact(budget, purchase)
  }));

  const getAffordabilityIcon = (impact: BudgetImpact) => {
    if (impact.affordable && impact.percentageOfIncome < 20) {
      return <CheckCircleIcon size={20} className="text-green-500" />;
    } else if (impact.affordable) {
      return <AlertCircleIcon size={20} className="text-yellow-500" />;
    } else {
      return <XCircleIcon size={20} className="text-red-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Purchase Comparison</h2>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Purchase
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monthly Payment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              % of Income
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remaining Budget
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Affordable?
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {purchaseImpacts.map(({ purchase, impact }) => (
            <tr key={purchase.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">{purchase.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatCurrency(purchase.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-primary-600 font-medium">{formatCurrency(impact.monthlyPayment)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatPercentage(impact.percentageOfIncome)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium ${impact.remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(impact.remainingBudget)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getAffordabilityIcon(impact)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onRemoveItem(purchase.id)}
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
  );
};

export default ComparisonTable;