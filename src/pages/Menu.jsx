import React, { useState } from 'react';
import assets from '../assets/assets';
 
const Menu = ({ setPage, addToCart, cartItems = [], setCartItems }) => {
 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fullMenu = [
    {
      id: 1,
      name: 'Greek Salad',
      category: 'Starters & Dips',
      price: '$12.99',
      desc: 'Crispy lettuce, peppers, Kalamata olives, Chicago feta, and croutons.',
      img: assets.greek_salad || assets.HeroImage_mid
    },
    {
      id: 2,
      name: 'Bruschetta',
      category: 'Starters & Dips',
      price: '$5.99',
      desc: 'Grilled artisan bread smeared with fresh garlic, sea salt, and extra virgin olive oil.',
      img: assets.bruchetta || assets.HeroImage_mid
    },
    {
      id: 7,
      name: 'Caprese Crostini',
      category: 'Starters & Dips',
      price: '$8.25',
      desc: 'Fresh local vine tomatoes layered over house milk mozzarella and sweet basil glaze.',
      img: assets.capreseCrostini || assets.capreseSalad || assets.bruchetta
    },
    {
      id: 8,
      name: 'Caprese Salad',
      category: 'Starters & Dips',
      price: '$10.99',
      desc: 'A minimalist Italian salad showcasing the colors of the Italian flag with sliced fresh mozzarella, sweet tomatoes, and fragrant basil, drizzled with olive oil.',
      img: assets.capreseSalad || assets.caprese_salad || assets.caprese || assets.greek_salad
    },
    {
      id: 9,
      name: 'Tzatziki',
      category: 'Starters & Dips',
      price: '$6.50',
      desc: 'A refreshing, cool Greek dip made with thick strained yogurt, shredded cucumber, crushed garlic, and a hint of fresh dill or mint.',
      img: assets.tzatziki || assets.greek_salad
    },
    {
      id: 10,
      name: 'Falafel',
      category: 'Starters & Dips',
      price: '$8.99',
      desc: 'Deep-fried, crisp balls or patties made from ground chickpeas mixed with vibrant green herbs and spices, a street-food staple across the Levant.',
      img: assets.falafel || assets.bruchetta
    },
    {
      id: 11,
      name: 'Hummus',
      category: 'Starters & Dips',
      price: '$6.99',
      desc: 'A smooth, velvety dip crafted from blended chickpeas, tahini, garlic, and fresh lemon juice, typically served with a well of olive oil in the center.',
      img: assets.hummus || assets.bruchetta
    },
    {
      id: 12,
      name: 'Dolmas (Stuffed Grape Leaves)',
      category: 'Starters & Dips',
      price: '$7.99',
      desc: 'Edible grape vine leaves wrapped tightly around a filling of seasoned rice, fresh herbs, and occasionally minced meat, served chilled or warm.',
      img: assets.dolmas || assets.dolmas_stuffed_grape_leaves || assets.greek_salad
    },
    {
      id: 13,
      name: 'Meze Platter',
      category: 'Starters & Dips',
      price: '$16.99',
      desc: 'A colorful selection of small dishes served as an appetizer course, featuring an assortment of dips, cheeses, olives, pita bread, and vegetables.',
      img: assets.meze || assets.meze_platter 
    },
    {
      id: 14,
      name: 'Seafood Paella',
      category: 'Mains & Grains',
      price: '$24.99',
      desc: 'A vibrant Spanish rice dish cooked in a wide pan, flavored with saffron, and packed with seafood like shrimp, mussels, clams, and squid.',
      img: assets.seafoodPaella || assets.seafood_paella || assets.grilledOctopus
    },
    {
      id: 15,
      name: 'Greek Moussaka',
      category: 'Mains & Grains',
      price: '$18.99',
      desc: 'A baked, layered casserole combining tender fried eggplant, a rich spiced meat sauce, and a thick, creamy blanket of baked béchamel sauce.',
      img: assets.greekMoussaka || assets.greek_moussaka || assets.HeroImage_mid
    },
    {
      id: 16,
      name: 'Pizza Margherita',
      category: 'Mains & Grains',
      price: '$15.50',
      desc: 'The quintessential Neapolitan pizza, simply dressed with crushed San Marzano tomatoes, fresh mozzarella balls, basil leaves, and extra virgin olive oil.',
      img: assets.pizzaMargherita || assets.pizza_margherita || assets.bruchetta
    },
    {
      id: 17,
      name: 'Ratatouille',
      category: 'Mains & Grains',
      price: '$16.50',
      desc: 'A classic French Provençal vegetable stew made of thinly sliced zucchini, eggplant, bell peppers, onions, and tomatoes simmered with herbs.',
      img: assets.ratatouille || assets.HeroImage_mid
    },
    {
      id: 18,
      name: 'Gyros',
      category: 'Mains & Grains',
      price: '$13.99',
      desc: 'Seasoned meat cooked on a vertical rotisserie, sliced into thin shavings, and wrapped inside a warm flatbread with tomatoes, onions, fries, and tzatziki.',
      img: assets.gyros || assets.HeroImage_mid
    },
    {
      id: 19,
      name: 'Moroccan Tagine',
      category: 'Mains & Grains',
      price: '$21.50',
      desc: 'A slow-cooked North African stew prepared inside a unique, conical clay vessel, featuring tender meats, vegetables, and aromatic spices like cumin and cinnamon.',
      img: assets.moroccanTagine || assets.moroccan_tagine || assets.HeroImage_mid
    },
    {
      id: 20,
      name: 'Couscous',
      category: 'Mains & Grains',
      price: '$14.99',
      desc: 'Small, steamed grains of semolina that serve as a soft, fluffy foundation for rich vegetable, lamb, or chicken stews across North Africa.',
      img: assets.couscous || assets.HeroImage_mid
    },
    {
      id: 21,
      name: 'Shawarma',
      category: 'Mains & Grains',
      price: '$13.50',
      desc: 'Marinated strips of meat layered on a vertical spit, slowly roasted, shaved off, and packed into a flatbread wrap with garlic sauce and pickles.',
      img: assets.shawarma || assets.HeroImage_mid
    },
    {
      id: 3,
      name: 'Grilled Octopus',
      category: 'Seafood & Sides',
      price: '$22.50',
      desc: 'Tenderized octopus tentacles char-grilled over open flames until smoky, then dressed with fresh lemon juice, parsley, and olive oil.',
      img: assets.grilledOctopus || assets.grilled_octopus || assets.HeroImage_mid
    },
    {
      id: 6,
      name: 'Fried Calamari',
      category: 'Seafood & Sides',
      price: '$14.50',
      desc: 'Tender squid rings lightly dredged in seasoned flour, flash-fried to a crisp golden crunch, and served hot with lemon wedges.',
      img: assets.friedCalamari || assets.fried_calamari || assets.calamari || assets.grilledOctopus
    },
    {
      id: 5,
      name: 'Lemon Dessert',
      category: 'Desserts',
      price: '$5.00',
      desc: 'Straight from grandma’s recipe book, authentic puff pastry crust filled with rich cream.',
      img: assets.lemonDessert || assets.lemon_dessert
    },
    {
      id: 22,
      name: 'Baklava',
      category: 'Desserts',
      price: '$6.50',
      desc: 'A rich, sweet pastry made of multiple layers of crisp phyllo dough filled with chopped nuts and sweetened with honey or spiced sugar syrup.',
      img: assets.baklava || assets.lemonDessert
    },
    {
      id: 23,
      name: 'Gelato',
      category: 'Desserts',
      price: '$5.75',
      desc: 'Italian-style ice cream made with a higher proportion of milk to cream, churned at a slower speed for a dense, silkier texture and intense flavor.',
      img: assets.gelato || assets.lemonDessert
    },
    {
      id: 24,
      name: 'Knafeh',
      category: 'Desserts',
      price: '$7.50',
      desc: 'A Middle Eastern dessert featuring a layer of gooey, melted cheese topped with crispy, shredded pastry threads, soaked in sweet syrup, and dusted with pistachios.',
      img: assets.knafeh || assets.lemonDessert
    },
    {
      id: 25,
      name: 'Tiramisu',
      category: 'Desserts',
      price: '$7.99',
      desc: 'A famous Italian dessert made of layers of coffee-soaked ladyfingers and a rich, creamy mixture of mascarpone cheese, eggs, and sugar, dusted with cocoa powder.',
      img: assets.tiramisu || assets.lemonDessert
    },
      {
      id: 26,
      name: 'Panna Cotta',
      category: 'Desserts',
      price: '$6.99',
      desc: 'A smooth Italian pudding made of sweetened cream thickened with gelatin, molded, and chilled until firm, usually served with a fresh berry coulis.',
      img: assets.pannaCotta || assets.lemonDessert
    },
    {
      id: 27,
      name: 'Cannoli',
      category: 'Desserts',
      price: '$6.25',
      desc: 'Crispy, tube-shaped fried pastry shells from Sicily, filled with a sweet, creamy filling typically made from whipped ricotta cheese and chocolate chips.',
      img: assets.cannoli || assets.lemonDessert
    },
    {
      id: 28,
      name: 'Loukoumades',
      category: 'Desserts',
      price: '$6.50',
      desc: 'Golden, bite-sized Greek doughnut holes that are deep-fried until crisp, drenched in sweet honey syrup, and sprinkled with cinnamon and chopped walnuts.',
      img: assets.loukoumades || assets.lemonDessert
    },
    {
      id: 29,
      name: 'Churros con Chocolate',
      category: 'Desserts',
      price: '$7.25',
      desc: 'Popular Spanish fried dough pastries, dusted with sugar and cinnamon, served piping hot alongside a thick, rich cup of warm chocolate for dipping.',
      img: assets.churros || assets.lemonDessert
    },
    {
      id: 30,
      name: 'Crema Catalana',
      category: 'Desserts',
      price: '$6.99',
      desc: 'A classic custard dessert from the Catalonia region of Spain, flavored with orange zest and cinnamon, topped with a hard, crackly layer of caramelized sugar.',
      img: assets.creamaCatalana || assets.lemonDessert
    },
    {
      id: 31,
      name: 'Basbousa',
      category: 'Desserts',
      price: '$5.99',
      desc: 'A sweet, dense Egyptian cake made from semolina batter, soaked in a fragrant simple syrup flavored with rosewater or orange blossom, and topped with almonds.',
      img: assets.basbousa || assets.lemonDessert
    },
    {
      id: 32,
      name: 'Mahalabia',
      category: 'Desserts',
      price: '$5.75',
      desc: 'A silky, milk-based pudding popular across the Levant, thickened with cornstarch, delicately scented with orange blossom water, and garnished with crushed pistachios.',
      img: assets.mahalabia || assets.lemonDessert
    },
    
        // ================= DRINKS =================
    {
      id: 33,
      name: 'Fresh Mint Lemonade',
      category: 'Drinks',
      price: '$4.50',
      desc: 'Freshly squeezed Meyer lemons blended with crushed garden mint leaves and chilled sparkling water.',
      img: assets.mint_lemonade
    },
    {
      id: 34,
      name: 'Greek Frappé',
      category: 'Drinks',
      price: '$4.99',
      desc: 'Classic iced whipped Greek coffee topped with a thick, velvety foam layer.',
      img: assets.greek_frappe
    },
    {
      id: 35,
      name: 'Pomegranate & Hibiscus Iced Tea',
      category: 'Drinks',
      price: '$4.75',
      desc: 'Ruby-red steeped hibiscus petals balanced with tart pomegranate juice and a touch of honey.',
      img: assets.hibiscus_tea
    },
    {
      id: 36,
      name: 'Moroccan Mint Tea',
      category: 'Drinks',
      price: '$4.25',
      desc: 'Steaming green tea brewed with fresh spearmint leaves and lightly sweetened.',
      img: assets.moroccan_tea
    },
    {
      id: 37,
      name: 'Traditional Ayran',
      category: 'Drinks',
      price: '$3.99',
      desc: 'Chilled, frothy Mediterranean yogurt drink whisked with cold water and a pinch of sea salt.',
      img: assets.ayran
    },
    {
      id: 38,
      name: 'Blood Orange San Pellegrino',
      category: 'Drinks',
      price: '$3.75',
      desc: 'Sparkling Italian mineral water infused with sun-ripened Sicilian blood orange juice.',
      img: assets.blood_orange
    },
    {
      id: 39,
      name: 'Classic Cold Drink',
      category: 'Drinks',
      price: '$2.99',
      desc: 'Chilled sparkling soft drink served ice-cold with a fresh lemon wedge.',
      img: assets.cold_drink
    },
    {
      id: 40,
      name: 'Creamy Milk Tea',
      category: 'Drinks',
      price: '$4.50',
      desc: 'Richly brewed black tea blended with velvety steamed milk and a hint of cardamom.',
      img: assets.milk_tea
    },
    {
      id: 41,
      name: 'Hot Mediterranean Coffee',
      category: 'Drinks',
      price: '$3.50',
      desc: 'Freshly roasted aromatic dark-roast coffee brewed hot and served rich and smooth.',
      img: assets.coffee
    },
    {
      id: 42,
      name: 'Iced Cold Coffee',
      category: 'Drinks',
      price: '$4.75',
      desc: 'Chilled espresso shaken over ice with cold milk and a light touch of vanilla sweetness.',
      img: assets.cold_coffee
    },
    {
      id: 43,
      name: 'Rich Hot Chocolate',
      category: 'Drinks',
      price: '$4.50',
      desc: 'Velvety melted dark chocolate whisked into steamed whole milk.',
      img: assets.hotChoclate
    }
  ]
  const categories = ['All', 'Starters & Dips', 'Mains & Grains', 'Seafood & Sides', 'Desserts', 'Drinks'];

  const filteredMenu = fullMenu.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getItemQuantity = (id) => {
    const found = cartItems.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const handleAdd = (item) => {
    if (addToCart) {
      addToCart({
        id: item.id,
        name: item.name,
        price: Number(item.price.replace('$', '')),
        image: item.img,
        notes: ''
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
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">
            Our Culinary Menu
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Explore fresh, traditional Mediterranean dishes and drinks prepared daily.
          </p>
        </div>

        {setPage && (
          <button
            type="button"
            onClick={() => setPage('cart')}
            className="bg-[#495E57] hover:opacity-90 text-[#F4CE14] dark:bg-[#F4CE14] dark:text-slate-950 font-bold px-6 py-3 rounded-xl shadow-sm transition-all cursor-pointer text-xs uppercase tracking-wider self-start sm:self-auto shrink-0"
          >
            View Cart →
          </button>
        )}
      </div>

      {/* Search Bar & Category Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((cat) => (
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

      {/* Menu Grid or Empty Search Message */}
      {filteredMenu.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMenu.map((item) => {
            const quantity = getItemQuantity(item.id);

            return (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl items-start sm:items-center border border-slate-100 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-full sm:w-28 h-40 sm:h-28 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-[#495E57] dark:text-[#F4CE14] font-bold shrink-0">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold text-xs px-4 py-2 rounded-lg shadow-xs transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Add to Cart +
                    </button>
                  ) : (
                    <div className="inline-flex items-center bg-[#495E57] dark:bg-zinc-900 border border-[#495E57] dark:border-zinc-700 rounded-lg overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="px-3.5 py-1.5 text-sm font-extrabold text-[#F4CE14] hover:bg-black/20 transition-colors cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-3.5 py-1.5 text-xs font-extrabold text-white bg-black/15">
                        {quantity} in Cart
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="px-3.5 py-1.5 text-sm font-extrabold text-[#F4CE14] hover:bg-black/20 transition-colors cursor-pointer"
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
  );
};

export default Menu;
