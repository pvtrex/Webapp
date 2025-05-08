import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BudgetImpact } from '../../types';
import { formatCurrency } from '../../utils/calculations';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetImpactChartProps {
  budgetImpact: BudgetImpact;
  monthlyIncome: number;
  monthlyExpenses: number;
}

const BudgetImpactChart: React.FC<BudgetImpactChartProps> = ({
  budgetImpact,
  monthlyIncome,
  monthlyExpenses
}) => {
  // Calculate remaining expense amount after the purchase
  const currentExpenses = monthlyExpenses;
  const purchasePayment = budgetImpact.monthlyPayment;
  const remaining = monthlyIncome - currentExpenses - purchasePayment;
  
  const data = {
    labels: ['Current Expenses', 'New Purchase', 'Remaining Budget'],
    datasets: [
      {
        data: [currentExpenses, purchasePayment, remaining > 0 ? remaining : 0],
        backgroundColor: [
          'rgba(107, 114, 128, 0.8)', // Gray for current expenses
          'rgba(59, 130, 246, 0.8)',  // Blue for new purchase
          'rgba(16, 185, 129, 0.8)'   // Green for remaining budget
        ],
        borderColor: [
          'rgba(107, 114, 128, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = formatCurrency(context.raw);
            const percentage = Math.round((context.raw / monthlyIncome) * 100);
            return `${label}: ${value} (${percentage}% of income)`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: '40%',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Budget Allocation</h2>
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="p-3 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-500">Current Expenses</p>
          <p className="text-lg font-semibold text-gray-700">{formatCurrency(currentExpenses)}</p>
          <p className="text-xs text-gray-500">({Math.round((currentExpenses / monthlyIncome) * 100)}% of income)</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-500">New Purchase</p>
          <p className="text-lg font-semibold text-primary-600">{formatCurrency(purchasePayment)}</p>
          <p className="text-xs text-gray-500">({Math.round((purchasePayment / monthlyIncome) * 100)}% of income)</p>
        </div>
        <div className={`p-3 ${remaining > 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
          <p className="text-sm text-gray-500">Remaining</p>
          <p className={`text-lg font-semibold ${remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(remaining > 0 ? remaining : 0)}
          </p>
          <p className="text-xs text-gray-500">
            ({Math.round((remaining > 0 ? remaining : 0) / monthlyIncome * 100)}% of income)
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetImpactChart;