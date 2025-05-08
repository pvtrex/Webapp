import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PurchaseForm from '../components/forms/PurchaseForm';
import ComparisonTable from '../components/comparison/ComparisonTable';
import { useBudget } from '../context/BudgetContext';
import { ArrowLeftIcon, PlusIcon } from 'lucide-react';

const ComparisonPage: React.FC = () => {
  const { budget, comparisonPurchases, addComparisonPurchase, removeComparisonPurchase } = useBudget();
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  
  const handleAddPurchase = (purchase: any) => {
    addComparisonPurchase(purchase);
    setShowAddForm(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Purchase Comparison
          </h1>
          
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/results')}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Results
            </button>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              {showAddForm ? 'Cancel' : 'Add Purchase'}
            </button>
          </div>
        </div>
        
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Add Purchase for Comparison
            </h2>
            <PurchaseForm onSubmit={handleAddPurchase} />
          </div>
        )}
        
        <ComparisonTable 
          budget={budget}
          purchases={comparisonPurchases}
          onRemoveItem={removeComparisonPurchase}
        />
        
        {comparisonPurchases.length === 0 && !showAddForm && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              No Purchases to Compare
            </h2>
            <p className="text-gray-600 mb-8">
              Add purchases to see how they compare side by side. You can add your first purchase by clicking the "Add Purchase" button.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Your First Purchase
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ComparisonPage;