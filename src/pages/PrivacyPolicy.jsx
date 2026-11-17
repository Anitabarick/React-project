import React from 'react';

const PrivacyPolicy = ({ setPage }) => {
  const sections = [
    {
      title: '1. Information We Collect',
      content:
        'When you reserve a table, place an online order, or register an account with Little Lemon, we collect personal details including your full name, email address, phone number, reservation preferences (date, time, party size, indoor/outdoor seating), and any special dietary or allergy instructions you provide.'
    },
    {
      title: '2. How We Use Your Information',
      content:
        'We use your information strictly to confirm and manage your table bookings, fulfill online delivery or pickup orders, accommodate special seating or allergy requests, and send important service notifications regarding your reservation.'
    },
    {
      title: '3. Local Storage & Site Preferences',
      content:
        'Our application uses browser storage to remember your interface preferences—such as Light Mode or Dark Mode—and temporarily hold your active booking details so you do not lose progress while navigating the site.'
    },
    {
      title: '4. Data Protection & Third Parties',
      content:
        'Little Lemon never sells, rents, or trades your personal data to third-party marketers. Information is shared only with trusted service providers (such as payment processors or delivery couriers) strictly as required to complete your request.'
    },
    {
      title: '5. Your Rights & Contact Us',
      content:
        'You have the right to review, update, or request the permanent deletion of your personal information at any time. To make a privacy request or ask questions, please reach out to our team at contact@littlelemon.com or call (312) 555-0199.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-14 px-6 sm:px-12 lg:px-24 xl:px-32">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Banner with Close Cross Mark (✕) */}
        <div className="bg-[#495E57] rounded-3xl p-8 md:p-12 text-white shadow-xl mb-10 relative">
          
          {/* Top-Right Close Cross Button */}
          <button
            type="button"
            onClick={() => setPage && setPage('reservations')}
            aria-label="Close Privacy Policy"
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 hover:bg-[#F4CE14] text-white hover:text-slate-900 flex items-center justify-center text-xl font-bold transition-all cursor-pointer"
          >
            ✕
          </button>

          <p className="text-xs uppercase tracking-widest text-[#F4CE14] font-bold mb-2">
            Legal & Transparency
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#F4CE14] font-bold mb-3 pr-10">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
            At Little Lemon, we respect your privacy and are committed to protecting the personal information you share when dining with us or using our online services.
          </p>
          <p className="text-xs text-slate-300 mt-4">
            Last Updated: November 2026 • Chicago, IL
          </p>
        </div>

        {/* Policy Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-xs transition-colors duration-300"
            >
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-[#F4CE14] mb-2">
                {sec.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
