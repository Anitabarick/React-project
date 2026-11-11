import React from 'react';
import assets from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-serif text-[#495E57] dark:text-[#F4CE14] font-bold mb-2">Our Story</h1>
          <h2 className="text-2xl text-amber-600 dark:text-amber-400 font-medium mb-6">Adrian & Mario</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Little Lemon was founded in 2023 by two brothers, Adrian and Mario. Drawing inspiration from traditional family recipes handed down by their grandmother, they blended coastal Italian flavors with rustic Greek elements to form Chicago’s favorite neighborhood gem.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Every dish we prepare uses locally harvested organic vegetables, imported feta cheeses, and extra-virgin cold-pressed olive oils to deliver absolute culinary authenticity to your table.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <img 
            src={assets.bruchetta || assets.HeroImage_mid} 
            alt="Founders Adrian and Mario discussing specialty menu item concepts" 
            className="w-full max-w-md h-80 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
