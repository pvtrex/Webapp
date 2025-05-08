export type Income = {
  amount: number;
  frequency: 'monthly' | 'yearly';
};

export type Expense = {
  category: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
};

export type Budget = {
  income: Income;
  expenses: Expense[];
};

export type Purchase = {
  id: string;
  name: string;
  price: number;
  category: 'car' | 'house' | 'other';
  description?: string;
  financingYears?: number;
  interestRate?: number;
  downPayment?: number;
};

export type BudgetImpact = {
  affordable: boolean;
  monthlyPayment: number;
  totalCost: number;
  percentageOfIncome: number;
  remainingBudget: number;
  recommendation: string;
};