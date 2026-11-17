import React, { useState } from 'react';

const Checkout = ({ setPage, cartItems = [], setCartItems }) => {
  const [orderType, setOrderType] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Chicago',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState({});

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length === 0 || orderType === 'pickup' || subtotal >= 35 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const validateCheckout = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (orderType === 'delivery') {
      if (!formData.address.trim()) {
        newErrors.address = 'Street address is required for delivery.';
      }
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'ZIP / Postal code is required.';
      }
    }

    if (paymentMethod === 'card') {
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Name on card is required.';
      }
      const cardDigits = formData.cardNumber.replace(/\D/g, '');
      if (cardDigits.length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number.';
      }
      if (formData.expiry.length !== 5) {
        newErrors.expiry = 'Enter MM/YY.';
      }
      if (formData.cvc.length < 3) {
        newErrors.cvc = 'Enter 3–4 digits.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteOrder = (e) => {
    if (e) e.preventDefault();
    if (validateCheckout()) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      setOrderNumber(`LL-${randomNum}`);
      setShowReceiptModal(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePostOrderAction = (destination) => {
    setShowReceiptModal(false);
    if (setCartItems) {
      setCartItems([]);
    }
    if (setPage) {
      setPage(destination);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-12 px-6 sm:px-12 lg:px-24 xl:px-32 relative">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">
              Checkout
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Complete your delivery and payment details to place your order.
            </p>
          </div>
          {setPage && (
            <button
              type="button"
              onClick={() => setPage('cart')}
              className="text-xs font-bold uppercase tracking-wider text-[#495E57] dark:text-[#F4CE14] hover:underline cursor-pointer self-start sm:self-auto"
            >
              ← Back to Cart
            </button>
          )}
        </div>

        <form onSubmit={handleCompleteOrder} noValidate className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Column (2/3 Width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Section 1: Delivery or Pickup */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#495E57] dark:text-[#F4CE14] mb-4">
                1. Fulfillment Method
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-[#495E57] text-[#F4CE14] border-[#495E57]'
                      : 'bg-white dark:bg-zinc-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-zinc-700'
                  }`}
                >
                  🛵 Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-[#495E57] text-[#F4CE14] border-[#495E57]'
                      : 'bg-white dark:bg-zinc-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-zinc-700'
                  }`}
                >
                  🛍️ Store Pickup
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Adrian Mario"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.fullName ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm focus:outline-none`}
                  />
                  {errors.fullName && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.fullName}</span>}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="(312) 555-0199"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.phone ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm focus:outline-none`}
                  />
                  {errors.phone && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.phone}</span>}
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    Email for Receipt *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.email ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm focus:outline-none`}
                  />
                  {errors.email && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.email}</span>}
                </div>

                {orderType === 'delivery' && (
                  <>
                    <div className="sm:col-span-2 flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="123 Mediterranean Way, Apt 4B"
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          if (errors.address) setErrors({ ...errors, address: '' });
                        }}
                        className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.address ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm focus:outline-none`}
                      />
                      {errors.address && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.address}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-sm focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                        ZIP / Postal Code *
                      </label>
                      <input
                        type="text"
                        placeholder="60601"
                        value={formData.zipCode}
                        onChange={(e) => {
                          setFormData({ ...formData, zipCode: e.target.value });
                          if (errors.zipCode) setErrors({ ...errors, zipCode: '' });
                        }}
                        className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.zipCode ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm focus:outline-none`}
                      />
                      {errors.zipCode && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.zipCode}</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Section 2: Payment Method */}
            <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#495E57] dark:text-[#F4CE14] mb-4">
                2. Payment Details
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#495E57] text-[#F4CE14] border-[#495E57]'
                      : 'bg-white dark:bg-zinc-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-zinc-700'
                  }`}
                >
                  💳 Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'bg-[#495E57] text-[#F4CE14] border-[#495E57]'
                      : 'bg-white dark:bg-zinc-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-zinc-700'
                  }`}
                >
                  💵 {orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      placeholder="ADRIAN MARIO"
                      value={formData.cardName}
                      onChange={(e) => {
                        setFormData({ ...formData, cardName: e.target.value });
                        if (errors.cardName) setErrors({ ...errors, cardName: '' });
                      }}
                      className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.cardName ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm focus:outline-none`}
                    />
                    {errors.cardName && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.cardName}</span>}
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) });
                        if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
                      }}
                      className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.cardNumber ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm font-mono focus:outline-none`}
                    />
                    {errors.cardNumber && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.cardNumber}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => {
                        setFormData({ ...formData, expiry: formatExpiry(e.target.value) });
                        if (errors.expiry) setErrors({ ...errors, expiry: '' });
                      }}
                      className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.expiry ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm font-mono focus:outline-none`}
                    />
                    {errors.expiry && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.expiry}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                      Security Code (CVC) *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="123"
                      value={formData.cvc}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setFormData({ ...formData, cvc: digits });
                        if (errors.cvc) setErrors({ ...errors, cvc: '' });
                      }}
                      className={`w-full py-2.5 px-3.5 rounded-lg bg-white dark:bg-zinc-950 border ${errors.cvc ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-700'} text-sm font-mono focus:outline-none`}
                    />
                    {errors.cvc && <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{errors.cvc}</span>}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-zinc-950 p-4 rounded-xl border border-slate-200 dark:border-zinc-800">
                  Please have your payment ready upon {orderType === 'delivery' ? 'driver arrival' : 'pickup at our Chicago counter'}.
                </p>
              )}
            </div>

          </div>
          {/* Right Column (1/3 Width): Final Order Summary */}
          <div className="bg-[#495E57] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
            <h2 className="text-2xl font-serif font-bold text-[#F4CE14]">
              Final Summary
            </h2>

            <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-3 border-b border-white/15 pb-4">
              {cartItems.length === 0 ? (
                <p className="text-xs text-slate-300">No items in cart.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-xs gap-2">
                    <div>
                      <p className="font-bold text-white">
                        {item.quantity} × {item.name}
                      </p>
                      {item.notes && (
                        <p className="text-[11px] text-slate-300">Note: {item.notes}</p>
                      )}
                    </div>
                    <span className="font-semibold text-[#F4CE14] shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-slate-200">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/15 pt-3 mt-1 flex justify-between text-lg font-bold text-[#F4CE14]">
                <span>Total Due</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompleteOrder}
              className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-sm uppercase tracking-wider mt-1"
            >
              Confirm & Pay ${total.toFixed(2)}
            </button>
          </div>

        </form>
      </div>

      {/* Thank You Receipt Popup Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              ✓
            </div>

            <span className="inline-block bg-[#495E57] text-[#F4CE14] text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-2">
              Order #{orderNumber}
            </span>

            <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              Thank You, {formData.fullName.split(' ')}!
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              Your Little Lemon order has been received and sent to our Chicago kitchen. A receipt was sent to{' '}
              <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>.
            </p>

            <div className="bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 mb-6 text-xs flex justify-between items-center">
              <div className="text-left">
                <p className="text-slate-400 uppercase font-bold text-[10px]">Estimated Time</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">25 – 35 Minutes</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 uppercase font-bold text-[10px]">Total Paid</p>
                <p className="font-bold text-[#495E57] dark:text-[#F4CE14] text-sm">${total.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handlePostOrderAction('menu')}
                className="w-full bg-[#495E57] hover:opacity-90 text-[#F4CE14] font-bold py-3 rounded-xl shadow-sm transition-all cursor-pointer uppercase tracking-wider text-xs"
              >
                + Order More Food
              </button>
              <button
                type="button"
                onClick={() => handlePostOrderAction('home')}
                className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3 rounded-xl shadow-sm transition-all cursor-pointer uppercase tracking-wider text-xs"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
