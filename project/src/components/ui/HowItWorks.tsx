import React from 'react';
import { ClipboardListIcon, CalculatorIcon, LineChartIcon, CheckIcon } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-dark-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Getting clarity on your purchase decisions is easy with our simple 4-step process.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 -translate-x-1/2"></div>
          
          <div className="space-y-16 relative">
            <Step 
              number={1}
              icon={<ClipboardListIcon className="h-8 w-8 text-white" />}
              title="Enter Your Budget"
              description="Start by entering your monthly income and expenses to establish your baseline budget."
              isLeft={true}
            />
            
            <Step 
              number={2}
              icon={<CalculatorIcon className="h-8 w-8 text-white" />}
              title="Add Purchase Details"
              description="Input information about the item you want to buy, including price, down payment, and financing terms."
              isLeft={false}
            />
            
            <Step 
              number={3}
              icon={<LineChartIcon className="h-8 w-8 text-white" />}
              title="Review Impact Analysis"
              description="See detailed charts and breakdowns of how the purchase will affect your monthly budget."
              isLeft={true}
            />
            
            <Step 
              number={4}
              icon={<CheckIcon className="h-8 w-8 text-white" />}
              title="Make an Informed Decision"
              description="Based on the analysis, determine if the purchase fits comfortably within your budget or requires adjustments."
              isLeft={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  isLeft: boolean;
}

const Step: React.FC<StepProps> = ({ number, icon, title, description, isLeft }) => {
  return (
    <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center animate-slide-up`}>
      <div className="md:w-2/5">
        <div className={`text-center ${isLeft ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 max-w-md mx-auto">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-6 md:my-0 relative z-10">
        <div className="bg-primary-600 rounded-full h-16 w-16 flex items-center justify-center shadow-lg relative">
          <span className="absolute -top-2 -right-2 bg-accent-500 text-white h-8 w-8 rounded-full flex items-center justify-center text-lg font-bold">
            {number}
          </span>
          {icon}
        </div>
      </div>
      
      <div className="md:w-2/5">
        <div className={`text-center ${isLeft ? 'md:text-left md:pl-10' : 'md:text-right md:pr-10'} md:hidden`}>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 max-w-md mx-auto">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;