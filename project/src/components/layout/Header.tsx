import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BarChart3Icon, GanttChartIcon, InfoIcon, MenuIcon, XIcon, MoonIcon, SunIcon } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-100 shadow-lg' : 'bg-transparent'
      }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="https://canyoubuyit.netlify.app/"
            className="flex items-center space-x-2"
            
            rel="noopener noreferrer" // Security feature for new tab
          >
            <HomeIcon className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-white">Canyoubuyit</span>
          </a>



          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                {...link}
                active={isActive(link.path)}
              />
            ))}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 bg-dark-100 rounded-lg p-4">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.path}
                {...link}
                active={isActive(link.path)}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

const navLinks = [
  { path: '/', icon: HomeIcon, label: 'Home' },
  { path: '/results', icon: BarChart3Icon, label: 'Results' },
  { path: '/comparison', icon: GanttChartIcon, label: 'Compare' },
  { path: '/about', icon: InfoIcon, label: 'About' },
];

interface NavLinkProps {
  path: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ path, icon: Icon, label, active }) => (
  <Link
    to={path}
    className={`nav-link ${active ? 'active' : ''}`}
  >
    <Icon className="h-5 w-5 mr-2" />
    {label}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ path, icon: Icon, label, active, onClick }) => (
  <Link
    to={path}
    className={`nav-link block w-full mb-2 ${active ? 'active' : ''}`}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 mr-2" />
    {label}
  </Link>
);

export default Header;