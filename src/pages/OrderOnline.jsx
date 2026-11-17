import React, { useState } from 'react';
import { menuItems, menuCategories } from '../data/menuData'
const OrderOnline = ({ setPage, addToCart, cartItems = [], setCartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dishNotes, setDishNotes] = useState({});

  const filteredDishes = menuItems.filter((dish) => {
    const matchesCategory =
      selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemQuantity = (id) => {
    const found = cartItems.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const handleAddItem = (dish) => {
    if (addToCart) {
      addToCart({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.img,
        notes: dishNotes[dish.id] || ''
      });
    }
  };

  const handleDecrease = (id) => {
    if (!setCartItems) return;
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-12 px-6 sm:px-12 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">

        {/* Top Banner */}
        <div className="bg-[#495E57] rounded-3xl p-8 md:p-10 text-white shadow-xl mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F4CE14]">
              Delivery & Pickup • 25–35 Mins
            </span>
            <h1 className="text-4xl font-serif text-[#F4CE14] font-bold mt-1 mb-2">
              Order Online
            </h1>
            <p className="text-sm text-slate-200 max-w-xl leading-relaxed">
              Every dish and refreshing drink from our culinary menu is available for fast delivery or pickup in Chicago.
            </p>
          </div>

          {setPage && (
            <button
              type="button"
              onClick={() => setPage('cart')}
              className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer text-xs uppercase tracking-wider self-start md:self-auto shrink-0"
            >
              View Cart →
            </button>
          )}
        </div>

        {/* Search Bar & Category Filter Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#495E57] text-[#F4CE14] dark:bg-[#F4CE14] dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks, ingredients..."
              className="w-full py-2.5 pl-10 pr-9 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#495E57] dark:focus:ring-[#F4CE14]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

            {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-10 text-center">
            <p className="text-lg font-serif font-bold text-slate-900 dark:text-white mb-1">
              No items found for "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Try searching for another ingredient or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-5 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => {
              const quantity = getItemQuantity(dish.id);

              return (
                <div
                  key={dish.id}
                  className="group bg-slate-50 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 flex flex-col h-full shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-black/65 backdrop-blur-xs text-[#F4CE14] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {dish.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
                        {dish.name}
                      </h3>
                      <span className="text-amber-600 dark:text-[#F4CE14] font-bold shrink-0">
                        ${dish.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-grow">
                      {dish.desc}
                    </p>

                    <input
                      type="text"
                      placeholder="Optional note (e.g., extra ice, no olives)"
                      value={dishNotes[dish.id] || ''}
                      onChange={(e) =>
                        setDishNotes({ ...dishNotes, [dish.id]: e.target.value })
                      }
                                            className="w-full py-2 px-3 mb-4 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                    />

                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAddItem(dish)}
                        className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                      >
                        Add to Cart +
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between bg-[#495E57] dark:bg-zinc-950 border border-[#495E57] dark:border-zinc-700 rounded-xl overflow-hidden shadow-xs">
                        <button
                          type="button"
                          onClick={() => handleDecrease(dish.id)}
                          aria-label={`Decrease ${dish.name} quantity`}
                          className="px-5 py-2 text-base font-extrabold text-[#F4CE14] hover:bg-black/20 transition-colors cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-xs font-extrabold text-white">
                          {quantity} in Cart
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddItem(dish)}
                          aria-label={`Increase ${dish.name} quantity`}
                          className="px-5 py-2 text-base font-extrabold text-[#F4CE14] hover:bg-black/20 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderOnline;
