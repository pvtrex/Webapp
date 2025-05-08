import React, { useState, useEffect } from 'react';
import { Purchase } from '../../types';
import { ShoppingCartIcon, CarIcon, HomeIcon, PackageIcon } from 'lucide-react';

interface PurchaseFormProps {
  initialPurchase?: Purchase | null;
  onSubmit: (purchase: Purchase) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ initialPurchase, onSubmit }) => {
  const [purchase, setPurchase] = useState<Purchase>(initialPurchase || {
    id: `purchase-${Date.now()}`,
    name: '',
    price: 0,
    category: 'other',
    description: '',
    financingYears: 5,
    interestRate: 5,
    downPayment: 0
  });

  const [showFinancingOptions, setShowFinancingOptions] = useState(true);

  useEffect(() => {
    // Update financing options visibility based on price
    if (purchase.price > 1000) {
      setShowFinancingOptions(true);
    }
  }, [purchase.price]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convert numeric values
    if (['price', 'financingYears', 'interestRate', 'downPayment'].includes(name)) {
      setPurchase(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setPurchase(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getCategoryIcon = () => {
    switch (purchase.category) {
      case 'car':
        return <CarIcon size={20} className="text-primary-500" />;
      case 'house':
        return <HomeIcon size={20} className="text-primary-500" />;
      default:
        return <PackageIcon size={20} className="text-primary-500" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(purchase);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <ShoppingCartIcon className="mr-2 text-primary-500" size={20} />
          Purchase Information
        </h2>
        
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
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
              placeholder="e.g., New Car, Dream House"
              required
            />
          </div>
          
          <div>
            <label htmlFor="purchase-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <select
                id="purchase-category"
                name="category"
                value={purchase.category}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2 pl-8"
                required
              >
                <option value="car">Car</option>
                <option value="house">House</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                {getCategoryIcon()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="purchase-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="purchase-description"
            name="description"
            value={purchase.description}
            onChange={handleChange}
            rows={2}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
            placeholder="Describe your purchase..."
          />
        </div>
        
        <div className="mt-4">
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
              onChange={handleChange}
              min="0"
              step="100"
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
              placeholder="0.00"
              required
            />
          </div>
        </div>
      </div>

      {showFinancingOptions && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <DollarSignIcon className="mr-2 text-secondary-500" size={20} />
            Financing Options
          </h2>
          
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-md"
        >
          Calculate Budget Impact
        </button>
      </div>
    </form>
  );
};

// Add missing import
import { DollarSignIcon } from 'lucide-react';

export default PurchaseForm;