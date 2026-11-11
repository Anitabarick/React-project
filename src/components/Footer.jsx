import React from 'react';
import assets from '../assets/assets';

const Footer = ({ setPage }) => {
  const footerLinks = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Menu', path: 'menu' },
    { name: 'Reservations', path: 'reservations' },
    { name: 'Order Online', path: 'order-online' },
    { name: 'Login', path: 'login' },
    { name: 'Contact', path: 'contact' },
  ];

  return (
    <footer className="bg-[#495E57] text-white py-12 px-6 sm:px-12 lg:px-24 xl:px-32 border-t border-emerald-800/40 dark:border-zinc-800/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Column 1: Logo */}
        <div className="flex flex-col items-start gap-4">
         <img 
  src={assets.footer_logo} 
  alt="Little Lemon Footer logo" 
  /* 
    FIXED: 'contrast-[1.1] brightness-[3] saturate-[1.2]' 
    This boosts the black text to crisp light-gray while preserving your beautiful yellow lemon! 
  */
  className="h-24 w-auto object-contain contrast-[1.1] brightness-[3] saturate-[1.2]" 
/>

        </div>

        {/* Column 2: Sitemap Navigation */}
        <div>
          <h4 className="font-bold text-sm text-[#F4CE14] uppercase tracking-wider mb-4">
            Sitemap
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-200 items-start">
            {footerLinks.map((link, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => setPage ? setPage(link.path) : null} 
                  className="hover:text-[#F4CE14] transition-colors duration-200 cursor-pointer text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="font-bold text-sm text-[#F4CE14] uppercase tracking-wider mb-4">
            Contact
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-200 leading-relaxed">
            <li>📍 123 Mediterranean Way, Chicago, IL</li>
            <li>📞 (312) 555-0199</li>
            <li>✉️ contact@littlelemon.com</li>
          </ul>
        </div>

        {/* Column 4: Social Portals */}
        <div>
          <h4 className="font-bold text-sm text-[#F4CE14] uppercase tracking-wider mb-4">
            Social Media
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-200">
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#F4CE14] transition-colors">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#F4CE14] transition-colors">Instagram</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#F4CE14] transition-colors">Twitter</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 text-center text-[10px] text-slate-300 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
