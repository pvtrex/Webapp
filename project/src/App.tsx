import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';

// Pages
import HomePage from './pages/HomePage';
import StartPage from './pages/StartPage';
import ResultsPage from './pages/ResultsPage';
import ComparisonPage from './pages/ComparisonPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <div className="dark">
      <BudgetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </BudgetProvider>
    </div>
  );
}

export default App;