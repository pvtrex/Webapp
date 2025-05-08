import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Budget, Purchase, BudgetImpact } from '../types';
import { calculateBudgetImpact } from '../utils/calculations';

type BudgetContextType = {
  budget: Budget;
  purchase: Purchase | null;
  comparisonPurchases: Purchase[];
  budgetImpact: BudgetImpact | null;
  updateBudget: (budget: Budget) => void;
  updatePurchase: (purchase: Purchase) => void;
  addComparisonPurchase: (purchase: Purchase) => void;
  removeComparisonPurchase: (id: string) => void;
  calculateImpact: () => void;
  resetBudget: () => void;
};

const defaultBudget: Budget = {
  income: {
    amount: 0,
    frequency: 'monthly'
  },
  expenses: []
};

const defaultPurchase: Purchase = {
  id: '',
  name: '',
  price: 0,
  category: 'other',
  financingYears: 5,
  interestRate: 5,
  downPayment: 0
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = useState<Budget>(defaultBudget);
  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [comparisonPurchases, setComparisonPurchases] = useState<Purchase[]>([]);
  const [budgetImpact, setBudgetImpact] = useState<BudgetImpact | null>(null);

  const updateBudget = (newBudget: Budget) => {
    setBudget(newBudget);
  };

  const updatePurchase = (newPurchase: Purchase) => {
    setPurchase(newPurchase);
  };

  const addComparisonPurchase = (newPurchase: Purchase) => {
    // Generate a unique ID if not provided
    const purchaseWithId = {
      ...newPurchase,
      id: newPurchase.id || `purchase-${Date.now()}`
    };
    setComparisonPurchases([...comparisonPurchases, purchaseWithId]);
  };

  const removeComparisonPurchase = (id: string) => {
    setComparisonPurchases(comparisonPurchases.filter(p => p.id !== id));
  };

  const calculateImpact = () => {
    if (budget && purchase) {
      const impact = calculateBudgetImpact(budget, purchase);
      setBudgetImpact(impact);
    }
  };

  const resetBudget = () => {
    setBudget(defaultBudget);
    setPurchase(null);
    setComparisonPurchases([]);
    setBudgetImpact(null);
  };

  const value = {
    budget,
    purchase,
    comparisonPurchases,
    budgetImpact,
    updateBudget,
    updatePurchase,
    addComparisonPurchase,
    removeComparisonPurchase,
    calculateImpact,
    resetBudget
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};