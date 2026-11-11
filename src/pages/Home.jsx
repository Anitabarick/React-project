import React, { useState, useEffect } from 'react';
import assets from '../assets/assets';

const Home = ({ setPage }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const specials = [
    { id: 1, name: 'Greek Salad', image: assets.greek_salad, price: '$12.99', description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.' },
    { id: 2, name: 'Bruschetta', image: assets.bruchetta, price: '$5.99', description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.' },
    { id: 3, name: 'Lemon Dessert', image: assets.lemonDessert, price: '$5.00', description: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.' }
  ];

  const testimonials = [
    { name: 'Groot', image: 'https://unsplash.com', review: 'Delicious food served in a cozy ambiance, great experience.' },
    { name: 'Superman', image: 'https://unsplash.com', review: 'Tasty dishes, cozy vibe, highly recommended spot.' },
    { name: 'Štefan Štefančík', image: 'https://unsplash.com', review: 'Yummy food, friendly staff, definitely worth trying.' },
    { name: 'Jake Nackos', image: 'https://unsplash.com', review: 'Outstanding cuisine, attentive staff, perfect spot for any occasion.' }
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-950 transition-colors duration-300 relative">
      {/* ================= HERO BANNER ================= */}
      <section className="bg-[#495E57] text-white py-12 px-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-start pt-4">
            <h1 className="text-5xl font-serif text-[#F4CE14] font-medium tracking-wide mb-1">Little Lemon</h1>
            <h2 className="text-2xl font-sans font-normal text-slate-200 mb-6">Chicago</h2>
            <p className="text-base text-slate-200 max-w-sm leading-relaxed mb-8">
              We are a family owned mediterranean restaurant focused on traditional recipes served with a modern twist.
            </p>
            <button onClick={() => setPage ? setPage('reservations') : null} className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-semibold px-5 py-2.5 rounded-lg transition-all text-sm shadow-sm cursor-pointer" >
              Reserve a Table
            </button>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <img src={assets.HeroImage_mid || assets.grilledOctopus} alt="Little Lemon presentation layout" className="w-full max-w-sm h-64 md:h-72 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* ================= SPECIALS ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-16">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">Specials</h3>
          <button onClick={() => setPage ? setPage('menu') : null} className="bg-black text-white dark:bg-white dark:text-black text-xs font-semibold px-5 py-2.5 rounded-sm hover:opacity-80 transition-all cursor-pointer" >
            Online Menu
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specials.map((dish) => (
            <div key={dish.id} className="bg-slate-100 dark:bg-zinc-900 rounded-t-xl rounded-b-md overflow-hidden flex flex-col h-full shadow-xs transition-colors duration-300">
              <div className="h-44 w-full"><img src={dish.image} alt={dish.name} className="w-full h-full object-cover" /></div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">{dish.name}</h4>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{dish.price}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">{dish.description}</p>
                <div className="flex flex-col gap-2 mt-auto">
                  <button onClick={() => setPage ? setPage('menu') : null} className="text-xs font-bold text-blue-600 dark:text-blue-400 text-left underline cursor-pointer" >
                    Showmore
                  </button>
                  <button onClick={() => setPage ? setPage('order-online') : null} className="text-xs font-bold text-slate-900 dark:text-white text-left flex items-center gap-1.5 cursor-pointer" >
                    Order a delivery <span>🛵</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-slate-200 dark:bg-zinc-900 py-16 px-6 sm:px-12 lg:px-24 xl:px-32 text-center transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-10">Testimonials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white dark:bg-zinc-800 p-5 rounded-md shadow-sm border border-gray-100 dark:border-zinc-700/50 flex flex-col items-center text-center transition-colors duration-300">
                <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover mb-3 border border-slate-200 dark:border-zinc-700" />
                <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-3">{t.name}</h5>
                <div className="w-full text-left bg-slate-50 dark:bg-zinc-950 p-3 rounded-xs flex flex-col gap-1.5 transition-colors duration-300">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Review</span>
                  <p className="text-xs text-slate-600 dark:text-slate-200 min-h-[48px] leading-normal">{t.review}</p>
                  <div className="flex justify-between items-center border-t border-slate-100 dark:border-zinc-800 pt-1.5 mt-1">
                    <span className="text-[10px] text-slate-400 font-medium">Rating</span>
                    <span className="text-xs text-rose-500">★★★★★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start">
            <h3 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-1">Little Lemon</h3>
            <h4 className="text-2xl font-sans text-slate-700 dark:text-slate-300 mb-6">Chicago</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Located in Chicago, Little Lemon is renowned for its delectable dishes made from fresh, local ingredients. Offering a cozy ambiance and attentive service, it's an ideal destination for casual dining or memorable gatherings. Enjoy delicious cuisine and traditional hospitality.
            </p>
          </div>
          <div className="w-full flex justify-center md:justify-end">
            <img src={assets.chefs_mario_and_adrian || assets.grilledOctopus} alt="Our Founders" className="w-full max-w-sm h-64 md:h-72 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* ================= SCROLL TO TOP BUTTON ================= */}
      {showButton && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-[#F4CE14] text-slate-900 p-3 rounded-full shadow-lg hover:bg-[#e2be0d] transition-all cursor-pointer z-50 font-bold" >
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
