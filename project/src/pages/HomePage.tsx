import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/ui/Hero';
import Features from '../components/ui/Features';
import HowItWorks from '../components/ui/HowItWorks';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
    </Layout>
  );
};

export default HomePage;