import React, { useState } from 'react';
import assets from '../assets/assets';

const Reservations = () => {
  const [seating, setSeating] = useState('indoor');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-12 px-6 sm:px-12 lg:px-24 xl:px-32">
      <div className="max-w-4xl mx-auto">
        
        {/* ================= CONTAINER FORM BLOCK ================= */}
        <form onSubmit={handleSubmit} className="bg-[#495E57] rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden mb-12">
          <h1 className="text-4xl font-serif text-[#F4CE14] font-bold mb-8">Reservations</h1>
          
          {/* ================= TWO-COLUMN GRID LAYOUT ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* --- LEFT COLUMN: INDOOR SEATING & DATE --- */}
            <div className="flex flex-col gap-6">
              <label className="flex items-center gap-3 text-lg font-semibold cursor-pointer select-none h-7">
                <input 
                  type="radio" 
                  name="seating" 
                  value="indoor" 
                  checked={seating === 'indoor'}
                  onChange={() => setSeating('indoor')}
                  className="w-5 h-5 accent-[#F4CE14] cursor-pointer"
                />
                <span>Indoor seating</span>
              </label>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Select Date</label>
                <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center px-3">
                  <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input 
                    type="date" 
                    required
                    className="w-full py-3 bg-transparent text-slate-900 dark:text-white dark:[color-scheme:dark] pl-8 focus:outline-none font-medium cursor-pointer"
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: OUTDOOR SEATING & DINERS --- */}
            <div className="flex flex-col gap-6">
              <label className="flex items-center gap-3 text-lg font-semibold cursor-pointer select-none h-7">
                <input 
                  type="radio" 
                  name="seating" 
                  value="outdoor" 
                  checked={seating === 'outdoor'}
                  onChange={() => setSeating('outdoor')}
                  className="w-5 h-5 accent-[#F4CE14] cursor-pointer"
                />
                <span>Outdoor seating</span>
              </label>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Number of Diners</label>
                <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center px-3">
                  <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <select 
                    required
                    className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
                    onChange={e => setFormData({...formData, guests: e.target.value})}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>No of Diners</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">{i+1} Diner{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                  <span className="absolute right-4 pointer-events-none text-xs text-slate-400">▼</span>
                </div>
              </div>
            </div>

            {/* --- BOTTOM ROW: OCCASION --- */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Occasion</label>
              <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center px-3">
                <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <select 
                  className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
                  onChange={e => setFormData({...formData, occasion: e.target.value})}
                  defaultValue=""
                >
                  <option value="" disabled hidden>Occasion</option>
                  <option value="None" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">None</option>
                  <option value="Birthday" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Birthday</option>
                  <option value="Anniversary" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Anniversary</option>
                  <option value="Engagement" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Engagement</option>
                </select>
                <span className="absolute right-4 pointer-events-none text-xs text-slate-400">▼</span>
              </div>
            </div>

            {/* --- BOTTOM ROW: TIME --- */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Select Time</label>
              <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center px-3">
                <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <select 
                  required
                  className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  defaultValue=""
                >
                  <option value="" disabled hidden>Select Time</option>
                  <option value="17:00" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">17:00</option>
                  <option value="18:00" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">18:00</option>
                  <option value="19:00" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">19:00</option>
                  <option value="20:00" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">20:00</option>
                  <option value="21:00" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">21:00</option>
                </select>
                <span className="absolute right-4 pointer-events-none text-xs text-slate-400">▼</span>
              </div>
            </div>

          </div>

          {/* Centralized Action Button */}
          <div className="w-full flex justify-center mt-10">
            <button 
              type="submit" 
              className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-16 py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-base uppercase tracking-wider"
            >
              Reserve a Table
            </button>
          </div>
        </form>

        {/* ================= IMAGES GRID VISUALS ================= */}
                {/* ================= IMAGES GRID VISUALS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="h-64 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-zinc-800/50">
            <img src={assets.HeroImage_mid || assets.grilledOctopus} alt="Little Lemon layout visual 1" className="w-full h-full object-cover" />
          </div>
          <div className="h-64 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-zinc-800/50">
            <img src={assets.chefs_mario_and_adrian || assets.grilledOctopus} alt="Little Lemon layout visual 2" className="w-full h-full object-cover" />
          </div>
          <div className="h-64 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-zinc-800/50">
            <img src={assets.grilledOctopus} alt="Little Lemon layout visual 3" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reservations;
