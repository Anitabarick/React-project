import React, { useState } from 'react';
import assets from '../assets/assets'; 

const Navbar = ({ theme, setTheme, currentPage, setPage, cartCount = 0 }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'menu', name: 'Menu' },
    { id: 'reservations', name: 'Reservations' },
    { id: 'order-online', name: 'Order Online' },
    { id: 'login', name: 'Login' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleMobileLinkClick = (id) => {
    setPage(id);
    setIsMobileOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full transition-colors duration-300">
      
      {/* --- Main Navigation Top Ribbon bar --- */}
      <div className="flex justify-between items-center p-4 sm:px-12 lg:px-24 xl:px-32 py-4 sticky top-0 z-20 backdrop-blur-xl font-medium bg-white/80 navbar-bg border-b border-gray-200/50 transition-colors duration-300">
        
        {/* Brand Logo */}
        <img
          src={theme === 'dark' ? assets.Logo_dark : assets.Logo}
          alt="Little Lemon Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => handleMobileLinkClick('home')}
        />

        {/* Desktop View Center Link Items Grid (Hidden on Mobile) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`cursor-pointer transition-colors duration-200 hover:text-amber-500
                ${currentPage === link.id ? 'text-amber-600 dark:text-amber-400 font-bold underline underline-offset-4' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Functional Control Action Utility Buttons Box */}
        <div className="flex items-center gap-3">
          
          {/* Shopping Cart Icon & Live Counter Badge */}
          <button
            type="button"
            onClick={() => handleMobileLinkClick('cart')}
            aria-label="View Shopping Cart"
            className={`relative p-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 ${
              currentPage === 'cart'
                ? 'text-amber-600 dark:text-[#F4CE14]'
                : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#F4CE14] text-slate-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Light/Dark Toggle Switcher */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Toggle Theme"
          >
            <img 
              src={theme === 'dark' ? assets.sun_icon : assets.moon_icon} 
              alt={theme === 'dark' ? "Sun Icon" : "Moon Icon"} 
              className="h-6 w-6"
            />
          </button>

          {/* RESPONSIVE MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex lg:hidden p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-800/50 focus:outline-none cursor-pointer text-slate-700 dark:text-slate-200"
            aria-label="Open Navigation Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* ---  RESPONSIVE MOBILE EXPANDABLE LINK OVERLAY DRAWER PANEL --- */}
      <div 
        className={`lg:hidden w-full border-b border-gray-200/50 dark:border-zinc-800 transition-all duration-300 ease-in-out overflow-hidden shadow-lg bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md
          ${isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 text-left">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleMobileLinkClick(link.id)}
              className={`w-full text-left py-2 text-base font-medium transition-colors cursor-pointer
                ${currentPage === link.id ? 'text-amber-600 dark:text-amber-400 font-bold border-l-4 border-amber-500 pl-2' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Navbar;
