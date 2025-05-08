import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSignIcon, BarChart3Icon, CheckCircleIcon } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-dark-300 to-dark-100 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px] opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight animate-slide-up">
              Can you <span className="text-primary-400">really</span> afford that purchase?
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl animate-slide-up delay-100">
              Make smart financial decisions with our budget impact calculator. See how big purchases like houses and cars affect your monthly budget before you buy.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
              <Link
                to="/start"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/30 transition-all duration-300"
              >
                <DollarSignIcon className="mr-2 h-5 w-5" />
                Check Affordability
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 transition-colors duration-300"
              >
                <BarChart3Icon className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative lg:mt-0 hidden lg:block">
            <div className="bg-dark-100 rounded-lg shadow-2xl p-8 max-w-md mx-auto animate-float">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400">Budget Impact</div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Monthly Income</span>
                    <span className="text-sm font-medium text-white">$5,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Current Expenses</span>
                    <span className="text-sm font-medium text-white">$3,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full w-3/5"></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">New Car Payment</span>
                    <span className="text-sm font-medium text-white">$400</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-accent-500 h-2 rounded-full w-[8%]"></div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-dark-300 rounded-lg">
                  <div className="flex">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-green-400">This purchase is affordable!</span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs text-green-400/80">
                      You'll still have $1,600 left in your monthly budget.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;