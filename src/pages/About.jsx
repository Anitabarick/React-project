import React from 'react';
import assets from '../assets/assets';

const About = ({ setPage }) => {
  const highlights = [
    {
      image:
        'https://unsplash.com',
      fallback: assets.greek_salad || assets.HeroImage_mid,
      title: 'Fresh & Organic',
      desc: 'We partner with local Midwest farms to source crisp produce, herbs, and seasonal ingredients every morning.'
    },
    {
      image:
        'https://unsplash.com',
      fallback: assets.chefs_mario_and_adrian || assets.bruchetta,
      title: 'Family Heritage',
      desc: 'Every sauce, marinade, and dessert follows authentic recipes passed down through three generations.'
    },
    {
      image:
        'https://unsplash.com',
      fallback: assets.grilledOctopus || assets.lemonDessert,
      title: 'Modern Twist',
      desc: 'Traditional Greek and coastal Italian dishes reimagined for casual, memorable dining in the heart of Chicago.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-16 px-6 sm:px-12 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">

        {/* Top Story & Overlapping Collage Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-[#F4CE14]">
              Est. 1996 • Chicago, IL
            </span>
            <h1 className="text-5xl font-serif text-[#495E57] dark:text-[#F4CE14] font-bold mt-1 mb-2">
              Our Story
            </h1>
            <h2 className="text-2xl text-slate-700 dark:text-slate-300 font-medium mb-6">
              Adrian & Mario
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Little Lemon was founded in 1996 by two brothers, Adrian and Mario. Drawing inspiration from traditional family recipes handed down by their grandmother, they blended coastal Italian flavors with rustic Greek elements to form Chicago’s favorite neighborhood gem.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Every dish we prepare uses locally harvested organic vegetables, imported feta cheeses, and extra-virgin cold-pressed olive oils to deliver absolute culinary authenticity to your table.
            </p>

            {/* Quick Action Buttons */}
            {setPage && (
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setPage('reservations')}
                  className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-6 py-3 rounded-xl shadow-sm transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  Reserve a Table
                </button>
                <button
                  type="button"
                  onClick={() => setPage('menu')}
                  className="bg-[#495E57] hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl shadow-sm transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  Explore Menu
                </button>
              </div>
            )}
          </div>

          {/* Overlapping Two-Image Collage with Hover Zoom */}
          <div className="relative w-full h-96 sm:h-[430px]">
            <img
              src={assets.insideRest || assets.HeroImage_mid}
              alt="Founders Adrian and Mario in the kitchen"
              className="w-60 sm:w-72 h-64 sm:h-72 object-cover rounded-2xl shadow-md hover:shadow-2xl absolute right-0 top-0 z-10 hover:z-30 transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
            />
            <img
              src={assets.outdoorRest || assets.grilledOctopus}
              alt="Signature Little Lemon bruschetta dish"
              className="w-60 sm:w-72 h-64 sm:h-72 object-cover rounded-2xl shadow-xl hover:shadow-2xl absolute left-0 sm:left-6 md:left-4 bottom-0 z-20 transition-all duration-300 ease-out hover:scale-105 cursor-pointer"
            />
          </div>
        </div>

        {/* Three Pillars / Highlights Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="group bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.image}
                  onError={(e) => {
                    e.currentTarget.src = item.fallback;
                  }}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex-grow">
                <h3 className="font-serif font-bold text-2xl text-[#495E57] dark:text-[#F4CE14] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
