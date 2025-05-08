import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BudgetImpactChart from '../components/results/BudgetImpactChart';
import BudgetSummary from '../components/results/BudgetSummary';
import { useBudget } from '../context/BudgetContext';
import { calculateMonthlyIncome, calculateTotalMonthlyExpenses } from '../utils/calculations';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const { budget, purchase, budgetImpact, addComparisonPurchase } = useBudget();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If we don't have the necessary data, redirect to start
    if (!budget?.income || !purchase || !budgetImpact) {
      navigate('/start');
    }
  }, [budget, purchase, budgetImpact, navigate]);
  
  if (!budget?.income || !purchase || !budgetImpact) {
    return null; // Will redirect in useEffect
  }
  
  const monthlyIncome = calculateMonthlyIncome(budget);
  const monthlyExpenses = calculateTotalMonthlyExpenses(budget);
  
  const handleAddToComparison = () => {
    if (purchase) {
      addComparisonPurchase(purchase);
      navigate('/comparison');
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Budget Impact Analysis
          </h1>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/start')}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Calculator
            </button>
            
            <button
              onClick={handleAddToComparison}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Add to Comparison
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <BudgetImpactChart 
              budgetImpact={budgetImpact}
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
            />
          </div>
          
          <div className="lg:col-span-2">
            <BudgetSummary 
              budget={budget}
              purchase={purchase}
              budgetImpact={budgetImpact}
            />
          </div>
        </div>
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            What Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Try Another Purchase</h3>
              <p className="text-gray-600 mb-4">See how a different purchase would impact your budget.</p>
              <button
                onClick={() => navigate('/start')}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                New Calculation
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Compare Options</h3>
              <p className="text-gray-600 mb-4">Add this purchase to the comparison tool to evaluate multiple options.</p>
              <button
                onClick={handleAddToComparison}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Compare Options
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Learn More</h3>
              <p className="text-gray-600 mb-4">Read about our methodology and get more financial tips.</p>
              <button
                onClick={() => navigate('/about')}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultsPage;