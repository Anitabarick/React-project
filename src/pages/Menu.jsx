import React from 'react';
import assets from '../assets/assets';

const Menu = () => {
  const fullMenu = [
    { name: 'Greek Salad', price: '$12.99', desc: 'Crispy lettuce, peppers, Kalamata olives, Chicago feta, and croutons.', img: assets.greek_salad },
    { name: 'Bruschetta', price: '$5.99', desc: 'Grilled artisan bread smeared with fresh garlic, sea salt, and extra virgin olive oil.', img: assets.bruchetta },
    { name: 'Lemon Dessert', price: '$5.00', desc: 'Straight from grandma’s recipe book, authentic puff pastry crust filled with rich cream.', img: assets.lemonDessert },
    { name: 'Calamari Fritti', price: '$14.50', desc: 'Lightly battered squid tossed with fresh parsley and served with fresh lemon slices.', img: assets.calamari || assets.greek_salad },
    { name: 'Caprese Crostini', price: '$8.25', desc: 'Fresh local vine tomatoes layered over house milk mozzarella and sweet basil glaze.', img: assets.caprese || assets.bruchetta }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-16">
      <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">Our Culinary Menu</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">Explore fresh, traditional Mediterranean selections prepared daily.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fullMenu.map((item, index) => (
          <div key={index} className="flex gap-4 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl items-center border border-slate-100 dark:border-zinc-800">
            <img src={item.img} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h4>
                <span className="text-[#495E57] dark:text-amber-400 font-bold">{item.price}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
