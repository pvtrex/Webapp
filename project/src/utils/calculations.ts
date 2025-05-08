import { Budget, Purchase, BudgetImpact } from '../types';

/**
 * Calculate the monthly payment for a purchase with financing
 */
export const calculateMonthlyPayment = (
  principal: number,
  interestRate: number,
  years: number
): number => {
  // If any values are zero or undefined, return 0
  if (!principal || !interestRate || !years) return 0;
  
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  // Monthly payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const payment = 
    principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Number(payment.toFixed(2));
};

/**
 * Calculate total monthly expenses
 */
export const calculateTotalMonthlyExpenses = (budget: Budget): number => {
  const monthlyIncome = budget.income.frequency === 'yearly' 
    ? budget.income.amount / 12 
    : budget.income.amount;
  
  let total = 0;
  
  budget.expenses.forEach(expense => {
    const monthlyAmount = expense.frequency === 'yearly' 
      ? expense.amount / 12 
      : expense.amount;
    total += monthlyAmount;
  });
  
  return Number(total.toFixed(2));
};

/**
 * Calculate monthly income
 */
export const calculateMonthlyIncome = (budget: Budget): number => {
  const monthlyIncome = budget.income.frequency === 'yearly' 
    ? budget.income.amount / 12 
    : budget.income.amount;
  
  return Number(monthlyIncome.toFixed(2));
};

/**
 * Calculate yearly income
 */
export const calculateYearlyIncome = (budget: Budget): number => {
  const yearlyIncome = budget.income.frequency === 'monthly' 
    ? budget.income.amount * 12 
    : budget.income.amount;
  
  return Number(yearlyIncome.toFixed(2));
};

/**
 * Calculate budget impact of a purchase
 */
export const calculateBudgetImpact = (
  budget: Budget,
  purchase: Purchase
): BudgetImpact => {
  const monthlyIncome = calculateMonthlyIncome(budget);
  const monthlyExpenses = calculateTotalMonthlyExpenses(budget);
  const availableMonthly = monthlyIncome - monthlyExpenses;
  
  // Calculate principal after down payment
  const principal = purchase.downPayment 
    ? purchase.price - purchase.downPayment 
    : purchase.price;
  
  // Calculate monthly payment based on financing
  const monthlyPayment = purchase.financingYears && purchase.interestRate
    ? calculateMonthlyPayment(principal, purchase.interestRate, purchase.financingYears)
    : principal / 12; // Simple division if no financing details
  
  // Calculate total cost with interest
  const totalCost = purchase.financingYears && purchase.interestRate
    ? monthlyPayment * purchase.financingYears * 12
    : purchase.price;
  
  // Calculate percentage of income
  const percentageOfIncome = (monthlyPayment / monthlyIncome) * 100;
  
  // Calculate remaining budget
  const remainingBudget = availableMonthly - monthlyPayment;
  
  // Determine if affordable
  const affordable = remainingBudget > 0;
  
  // Generate recommendation
  let recommendation = '';
  if (affordable && percentageOfIncome < 20) {
    recommendation = 'This purchase is comfortably within your budget.';
  } else if (affordable && percentageOfIncome < 33) {
    recommendation = 'This purchase is affordable but will impact your monthly budget significantly.';
  } else if (affordable) {
    recommendation = 'This purchase is technically affordable but may put strain on your budget.';
  } else {
    recommendation = 'This purchase is not recommended as it exceeds your monthly budget.';
  }
  
  return {
    affordable,
    monthlyPayment,
    totalCost,
    percentageOfIncome: Number(percentageOfIncome.toFixed(2)),
    remainingBudget: Number(remainingBudget.toFixed(2)),
    recommendation,
  };
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage for display
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};