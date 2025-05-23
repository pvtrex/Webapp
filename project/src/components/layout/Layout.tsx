import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-200">
      <Header />
      <main className="flex-grow pt-20 pb-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;