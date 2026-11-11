import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-16">
      <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">Connect With Us</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">Reach out to our customer care team or find our exact physical coordinates.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-50 dark:bg-zinc-800/60 p-6 rounded-xl border border-slate-100 dark:border-zinc-800 flex flex-col gap-4 text-sm">
          <h3 className="font-bold text-lg text-[#495E57] dark:text-amber-400">Chicago Headquarters</h3>
          <p>📍 123 Mediterranean Way, Chicago, IL 60601</p>
          <p>📞 Office Helpdesk: (312) 555-0199</p>
          <p>✉️ Electronic Mail: help@littlelemon.com</p>
        </div>
        <div className="bg-slate-100 dark:bg-zinc-950/40 h-60 rounded-xl flex items-center justify-center border border-dashed border-slate-300 dark:border-zinc-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
          Interactive Spatial Map Placeholder
        </div>
      </div>
    </div>
  );
};

export default Contact;
