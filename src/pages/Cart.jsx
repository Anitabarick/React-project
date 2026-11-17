import React, { useState } from 'react';
import assets from '../assets/assets';

const Cart = ({ setPage, cartItems, setCartItems }) => {
  // Fallback sample items 
  const [localItems, setLocalItems] = useState([
    {
      id: 1,
      name: 'Greek Salad',
      price: 12.99,
      quantity: 1,
      image: assets.greek_salad || assets.grilledOctopus,
      notes: 'Extra feta cheese'
    },
    {
      id: 2,
      name: 'Bruschetta',
      price: 5.99,
      quantity: 2,
      image: assets.bruchetta || assets.grilledOctopus,
      notes: 'Toasted sourdough'
    },
    {
      id: 3,
      name: 'Lemon Dessert',
      price: 5.00,
      quantity: 1,
      image: assets.lemonDessert || assets.grilledOctopus,
      notes: ''
    }
  ]);

  const items = cartItems !== undefined ? cartItems : localItems;
  const updateItems = setCartItems !== undefined ? setCartItems : setLocalItems;

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [orderType, setOrderType] = useState('delivery');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleIncrease = (id) => {
    updateItems(items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id) => {
    updateItems(
      items
        .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    updateItems(items.filter(item => item.id !== id));
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LEMON10') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setDiscountApplied(false);
      setPromoError('Invalid code. Try "LEMON10" for 10% off.');
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;
  const deliveryFee = items.length === 0 || orderType === 'pickup' || discountedSubtotal >= 35 ? 0 : 4.99;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    setShowCheckoutModal(true);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    updateItems([]);
    setDiscountApplied(false);
    setPromoCode('');
    if (setPage) {
      setPage('home');
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-12 px-6 sm:px-12 lg:px-24 xl:px-32 relative">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Your Cart
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review your dishes before placing your Little Lemon order.
            </p>
          </div>
          {setPage && (
            <button
              type="button"
              onClick={() => setPage('menu')}
              className="text-xs font-bold uppercase tracking-wider text-[#495E57] dark:text-[#F4CE14] hover:underline cursor-pointer self-start sm:self-auto"
            >
              ← Continue Browsing Menu
            </button>
          )}
        </div>

               {/* Empty Cart State */}
        {items.length === 0 ? (
          <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-12 text-center shadow-xs">
            
            <div className="w-10 h-16 mx-auto mb-5 overflow-hidden flex items-center justify-start">
              <img
                src={assets.Logo}
                alt="Little Lemon"
                className="h-14 w-auto max-w-none object-left object-contain"
              />
            </div>

            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              Looks like you haven't added any Mediterranean favourites yet. Explore our menu to get started!
            </p>
            <button
              type="button"
              onClick={() => setPage && setPage('menu')}
              className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-xs uppercase tracking-wider"
            >
              Explore Menu
            </button>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs transition-colors"
                >
                  {/* Item Image & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-zinc-700"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm font-bold text-amber-600 dark:text-[#F4CE14]">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>

                     <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.id)}
                        aria-label="Decrease quantity"
                        className="px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="px-3.5 py-1.5 text-sm font-bold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.id)}
                        aria-label="Increase quantity"
                        className="px-3 py-1.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-bold text-base text-slate-900 dark:text-white min-w-[64px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        aria-label="Remove item"
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="bg-[#495E57] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
              <h2 className="text-2xl font-serif font-bold text-[#F4CE14]">
                Order Summary
              </h2>

              {/* Delivery vs Pickup Toggle */}
              <div className="grid grid-cols-2 gap-2 bg-black/20 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-[#F4CE14] text-slate-900 shadow-xs'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-[#F4CE14] text-slate-900 shadow-xs'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  Pickup
                </button>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                  Promo Code (Try LEMON10)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      if (promoError) setPromoError('');
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-black/30 hover:bg-black/50 text-[#F4CE14] font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <span className="text-xs text-rose-300 font-semibold">{promoError}</span>
                )}
                {discountApplied && (
                  <span className="text-xs text-emerald-300 font-semibold">
                    ✓ 10% discount applied!
                  </span>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="border-t border-white/15 pt-4 flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-slate-200">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-300 font-medium">
                    <span>Discount (10%)</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-200">
                  <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/15 pt-3 mt-1 flex justify-between text-lg font-bold text-[#F4CE14]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPage && setPage('checkout')}
                className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-sm uppercase tracking-wider"
              >
                Proceed to Checkout →
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
               