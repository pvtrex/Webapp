import React from 'react';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { UsersIcon, HeartIcon, ArrowRightIcon } from 'lucide-react';
import { color } from 'chart.js/helpers';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About Canyoubuyit.com</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our mission is to help people make smart financial decisions through 
            transparency and data-driven insights.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none" style={{ color: 'white' }}>
              <p>
                Canyoubuyit.com was founded by Shikher Sharma and Prince with a simple goal: to help people
                understand the true financial impact of their purchases before making them.
              </p>
              <p>
                After witnessing friends and family struggle with financial decisions around major purchases
                like homes and cars, we realized there was a need for a simple tool that could show the
                real impact of these decisions on monthly budgets.
              </p>
              <p>
                Our platform uses straightforward calculations to help you visualize how a purchase will
                affect your financial situation. We don't sell financial products or earn commissions -
                our only goal is to help you make informed decisions.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h3>
              <p>
                We believe that financial literacy should be accessible to everyone. Our mission is to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide easy-to-use tools that help people understand complex financial decisions</li>
                <li>Promote transparency in personal finance</li>
                <li>Empower individuals to make smart purchasing decisions</li>
                <li>Reduce financial stress and buyer's remorse</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h3>
              <p>
                At Canyoubuyit.com, we're guided by these core values:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Transparency:</strong> We're clear about how our calculations work and the factors we consider</li>
                <li><strong>Simplicity:</strong> We make complex financial concepts easy to understand</li>
                <li><strong>Empowerment:</strong> We give you the information you need to make decisions with confidence</li>
                <li><strong>Accessibility:</strong> Our tools are free and available to anyone who needs them</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex items-center mb-4">
                <UsersIcon className="h-6 w-6 text-primary-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Meet the Founders</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
                    <span className="text-xl font-semibold">SS</span>
                  </div>
                  <h4 className="text-lg font-medium">Shikher Sharma</h4>
                  <p className="text-gray-500 text-sm mb-2">Co-Founder</p>
                  <p className="text-center text-gray-600 text-sm">
                    Financial analyst with a passion for helping others make smart money decisions.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-400">
                    <span className="text-xl font-semibold">P</span>
                  </div>
                  <h4 className="text-lg font-medium">Prince</h4>
                  <p className="text-gray-500 text-sm mb-2">Co-Founder</p>
                  <p className="text-center text-gray-600 text-sm">
                    Tech entrepreneur focused on creating user-friendly financial tools.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
              <div className="flex items-center mb-4">
                <HeartIcon className="h-6 w-6 text-primary-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Support Our Mission</h3>
              </div>
              <p className="text-gray-600 mb-4">
                We're committed to keeping our tools free and accessible for everyone. 
                The best way to support us is to share Canyoubuyit.com with others who might benefit.
              </p>
              <Link
                to="/"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Try Our Calculator
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;