import React from 'react';

const OrderOnline = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-center">
      <div className="max-w-md mx-auto bg-slate-50 dark:bg-zinc-800 p-8 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-xs">
        <span className="text-4xl">🛵</span>
        <h1 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mt-4 mb-2">Order Online</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          On-demand local Mediterranean meal delivery services are launching soon. Check back shortly to order directly to your door!
        </p>
        <button className="bg-[#495E57] text-[#F4CE14] font-semibold px-6 py-2 rounded-lg text-sm">Notify Me</button>
      </div>
    </div>
  );
};

export default OrderOnline;
