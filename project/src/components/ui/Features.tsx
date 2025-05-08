import React from 'react';
import { DollarSignIcon, BarChart3Icon, LineChartIcon, PanelLeftIcon } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Make Smart Financial Decisions</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our tools help you understand the real impact of big purchases on your monthly budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<DollarSignIcon className="h-8 w-8 text-primary-400" />}
            title="Cost Calculator"
            description="Calculate the true cost of your purchase, including financing, interest, and long-term expenses."
          />
          
          <FeatureCard 
            icon={<BarChart3Icon className="h-8 w-8 text-primary-400" />}
            title="Budget Impact Analysis"
            description="See how a purchase affects your monthly budget with detailed breakdowns and visualizations."
          />
          
          <FeatureCard 
            icon={<LineChartIcon className="h-8 w-8 text-primary-400" />}
            title="Personalized Recommendations"
            description="Get personalized advice based on your financial situation and purchase goals."
          />
          
          <FeatureCard 
            icon={<PanelLeftIcon className="h-8 w-8 text-primary-400" />}
            title="Comparison Tool"
            description="Compare multiple potential purchases side-by-side to find the best option for your budget."
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-dark-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 hover:bg-dark-300 animate-slide-up">
      <div className="p-2 w-fit rounded-full bg-dark-300 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Features;