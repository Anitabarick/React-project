import React, { useState } from 'react';
import assets from '../assets/assets';

const Reservations = ({ setPage }) => {
  const [step, setStep] = useState('booking');
  const [showPopup, setShowPopup] = useState(false);

  const [seating, setSeating] = useState('indoor');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });

  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequest: '',
    agreePrivacy: false
  });
const [showPrivacy, setShowPrivacy] = useState(false);

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const validateBooking = () => {
    const newErrors = {};
    if (!formData.date) {
      newErrors.date = 'Please select a reservation date.';
    } else if (formData.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    if (!formData.guests) {
      newErrors.guests = 'Please select the number of diners.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a reservation time.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };
  const validateSignup = () => {
    const newErrors = {};
    if (!customerData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (customerData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(customerData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

        const digitsOnly = customerData.phone.replace(/\D/g, '');
    if (!digitsOnly) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number (e.g., (312) 555-0199).';
    }

    if (!customerData.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to our Privacy Policy to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateBooking()) {
      setStep('signup');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateSignup()) {
      setStep('review');
    }
  };

  const handleConfirmBooking = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setStep('booking');
    setErrors({});
    if (setPage) {
      setPage('home');
    }
  };
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-slate-900 dark:text-white transition-colors duration-300 py-12 px-6 sm:px-12 lg:px-24 xl:px-32 relative">
      <div className="max-w-4xl mx-auto">

        {/* ================= STEP 1: TABLE RESERVATION FORM ================= */}
        {step === 'booking' && (
          <form onSubmit={handleBookingSubmit} noValidate className="bg-[#495E57] rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden mb-12">
            <h1 className="text-4xl font-serif text-[#F4CE14] font-bold mb-8">Reservations</h1>

            <div className="(flex flex-col gap-3), (md:grid md:grid-cols-2 md:gap-x-12), mb-8 text-lg font-semibold">
              <label className="flex items-center gap-3 cursor-pointer select-none h-7">
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

              <label className="flex items-center gap-3 cursor-pointer select-none h-7">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* 1. Select Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Select Date *</label>
                <div className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border ${errors.date ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} flex items-center px-3`}>
                  <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="date"
                    min={today}
                    value={formData.date}
                    className="w-full py-3 bg-transparent text-slate-900 dark:text-white dark:[color-scheme:dark] pl-8 focus:outline-none font-medium cursor-pointer"
                    onChange={e => {
                      setFormData({ ...formData, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: '' });
                    }}
                  />
                </div>
                {errors.date && <span className="text-xs font-semibold text-rose-300">{errors.date}</span>}
              </div>

              {/* 2. Number of Diners */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Number of Diners *</label>
                <div className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border ${errors.guests ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} flex items-center px-3`}>
                  <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <select
                    value={formData.guests}
                    className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
                    onChange={e => {
                      setFormData({ ...formData, guests: e.target.value });
                      if (errors.guests) setErrors({ ...errors, guests: '' });
                    }}
                  >
                    <option value="" disabled hidden>No of Diners</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                        {i + 1} Diner{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 pointer-events-none text-xs text-slate-400">▼</span>
                </div>
                {errors.guests && <span className="text-xs font-semibold text-rose-300">{errors.guests}</span>}
              </div>
              {/* 3. Occasion */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Occasion (Optional)</label>
                <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center px-3">
                  <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <select
                    value={formData.occasion}
                    className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
                    onChange={e => setFormData({ ...formData, occasion: e.target.value })}
                  >
                    <option value="" disabled hidden>Select Occasion</option>
                    <option value="None" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">None</option>
                    <option value="Birthday" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Birthday</option>
                    <option value="Anniversary" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Anniversary</option>
                    <option value="Engagement" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Engagement</option>
                  </select>
                  <span className="absolute right-4 pointer-events-none text-xs text-slate-400">▼</span>
                </div>
              </div>

              {/* 4. Select Time */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Select Time *</label>
                <div className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border ${errors.time ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} flex items-center px-3`}>
                  <svg className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <select
                    value={formData.time}
                    className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
                    onChange={e => {
                      setFormData({ ...formData, time: e.target.value });
                      if (errors.time) setErrors({ ...errors, time: '' });
                    }}
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
                {errors.time && <span className="text-xs font-semibold text-rose-300">{errors.time}</span>}
              </div>
            </div>

            <div className="w-full flex justify-center mt-10">
              <button
                type="submit"
                className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-16 py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-base uppercase tracking-wider"
              >
                Reserve a Table
              </button>
            </div>
          </form>
        )}
        {/* ================= STEP 2: CUSTOMER DETAILS / SIGN UP ================= */}
        {step === 'signup' && (
          <form onSubmit={handleSignupSubmit} noValidate className="bg-[#495E57] rounded-3xl p-8 md:p-12 shadow-xl text-white mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-serif text-[#F4CE14] font-bold">Customer Details </h2>
              <button
                type="button"
                onClick={() => {
                  setErrors({});
                  setStep('booking');
                }}
                className="text-xs underline text-slate-200 hover:text-[#F4CE14] cursor-pointer"
              >
                ← Back to Table Selection
              </button>
            </div>

            <p className="text-sm text-slate-200 mb-8">
              Please complete your contact details below to finalize your table reservation.
            </p>

            <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={customerData.fullName}
                  onChange={e => {
                    setCustomerData({ ...customerData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full py-3 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.fullName ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none font-medium`}
                />
                {errors.fullName && <span className="text-xs font-semibold text-rose-300">{errors.fullName}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Email Address *</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={customerData.email}
                  onChange={e => {
                    setCustomerData({ ...customerData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full py-3 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.email ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none font-medium`}
                />
                {errors.email && <span className="text-xs font-semibold text-rose-300">{errors.email}</span>}
              </div>

              {/* Phone Number */}
                            {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">Phone Number *</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="(312) 555-0199"
                  value={customerData.phone}
                  onChange={e => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setCustomerData({ ...customerData, phone: formatted });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full py-3 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.phone ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none font-medium`}
                />
                {errors.phone && <span className="text-xs font-semibold text-rose-300">{errors.phone}</span>}
              </div>


              {/* Special Instructions (Now aligned inside the exact same max-w-xl column) */}
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
                  Special Instructions (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Add any allergies, dietary restrictions, or seating comments..."
                  value={customerData.specialRequest}
                  onChange={e => setCustomerData({ ...customerData, specialRequest: e.target.value })}
                  className="w-full py-3 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 focus:outline-none font-medium resize-none"
                />
              </div>
                                          {/* Privacy Policy Agreement Checkbox & Inline Dropdown */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-3 cursor-pointer select-none text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={customerData.agreePrivacy}
                    onChange={e => {
                      setCustomerData({ ...customerData, agreePrivacy: e.target.checked });
                      if (errors.agreePrivacy) setErrors({ ...errors, agreePrivacy: '' });
                    }}
                    className="w-4 h-4 accent-[#F4CE14] rounded cursor-pointer"
                  />
                  <span>
                    You agree to our friendly{' '}
                                        <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacy(!showPrivacy);
                      }}
                      className="text-[#F4CE14] hover:text-yellow-200 font-semibold cursor-pointer inline-flex items-center gap-1"
                    >
                      <span className="underline">Privacy policy</span>
                      <span className="text-[10px] no-underline">{showPrivacy ? '▲' : '▼'}</span>
                    </button>

                    *
                  </span>
                </label>

                {errors.agreePrivacy && (
                  <span className="text-xs font-semibold text-rose-300">{errors.agreePrivacy}</span>
                )}

                {/* Collapsible Privacy Policy Dropdown Box */}
                {showPrivacy && (
                  <div className="mt-2 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-md text-xs leading-relaxed relative">
                    <div className="flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 pb-2 mb-2">
                      <span className="font-bold text-slate-900 dark:text-[#F4CE14] uppercase tracking-wider text-[11px]">
                        Little Lemon Privacy Policy
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPrivacy(false)}
                        aria-label="Close Privacy Policy"
                        className="text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold text-sm cursor-pointer px-1"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="max-h-40 overflow-y-auto pr-1 flex flex-col gap-2">
                      <p>
                        <strong className="text-slate-900 dark:text-white">1. Data We Collect:</strong> We collect your name, email, phone number, and reservation preferences solely to manage your booking.
                      </p>
                      <p>
                        <strong className="text-slate-900 dark:text-white">2. How We Use It:</strong> Your details are used only to confirm your table, send reminders, and accommodate allergy or seating notes.
                      </p>
                      <p>
                        <strong className="text-slate-900 dark:text-white">3. Security:</strong> We never sell or share your personal information with third-party marketers. Contact <span className="underline">contact@littlelemon.com</span> anytime to remove your data.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            <div className="w-full flex justify-center mt-10">
              <button
                type="submit"
                className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-14 py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-base uppercase tracking-wider"
              >
                Continue to Review
              </button>
            </div>
          </form>
        )}
        {/* ================= STEP 3: REVIEW & EDIT RESERVATION DETAILS ================= */}
        {step === 'review' && (
          <div className="bg-[#495E57] rounded-3xl p-8 md:p-12 shadow-xl text-white mb-12">
            <h2 className="text-3xl font-serif text-[#F4CE14] font-bold mb-6">Review Your Reservation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/20 p-6 rounded-2xl border border-white/10">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <h3 className="font-bold text-[#F4CE14] uppercase text-xs tracking-wider">Table Details</h3>
                  <button
                    type="button"
                    onClick={() => setStep('booking')}
                    className="text-xs font-bold underline text-[#F4CE14] hover:text-yellow-200 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm"><span className="text-slate-300">Seating:</span> <span className="font-semibold capitalize">{seating} Seating</span></p>
                <p className="text-sm"><span className="text-slate-300">Date:</span> <span className="font-semibold">{formData.date}</span></p>
                <p className="text-sm"><span className="text-slate-300">Time:</span> <span className="font-semibold">{formData.time}</span></p>
                <p className="text-sm"><span className="text-slate-300">Diners:</span> <span className="font-semibold">{formData.guests} Guest(s)</span></p>
                <p className="text-sm"><span className="text-slate-300">Occasion:</span> <span className="font-semibold">{formData.occasion || 'None'}</span></p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <h3 className="font-bold text-[#F4CE14] uppercase text-xs tracking-wider">Customer Details</h3>
                  <button
                    type="button"
                    onClick={() => setStep('signup')}
                    className="text-xs font-bold underline text-[#F4CE14] hover:text-yellow-200 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm"><span className="text-slate-300">Full Name:</span> <span className="font-semibold">{customerData.fullName}</span></p>
                <p className="text-sm"><span className="text-slate-300">Email:</span> <span className="font-semibold">{customerData.email}</span></p>
                <p className="text-sm"><span className="text-slate-300">Phone:</span> <span className="font-semibold">{customerData.phone}</span></p>
                                
                <p className="text-sm"><span className="text-slate-300">Special Request:</span> <span className="font-semibold">{customerData.specialRequest || 'None'}</span></p>

              </div>
            </div>

            <div className="w-full flex justify-center mt-10">
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold px-16 py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-base uppercase tracking-wider"
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
        {/* ================= IMAGES GRID VISUALS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div
            onClick={() => setPage && setPage('menu')}
            className="h-64 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-zinc-800/50 cursor-pointer group"
          >
            <img
              src={assets.restaurant3 || assets.grilledOctopus}
              alt="Little Lemon layout visual 1"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            onClick={() => setPage && setPage('menu')}
            className="h-64 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-zinc-800/50 cursor-pointer group"
          >
            <img
              src={assets.restaurantChef || assets.grilledOctopus}
              alt="Little Lemon layout visual 2"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            onClick={() => setPage && setPage('menu')}
            className="h-64 rounded-xl overflow-hidden shadow-md border border-slate-100 dark:border-zinc-800/50 cursor-pointer group"
          >
            <img
              src={assets.insideRest }
              alt="Little Lemon layout visual 3"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

      </div>

      {/* ================= STEP 4: BOOKING CONFIRMATION POPUP MODAL ================= */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              ✓
            </div>
            <h3 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              Your Table is Booked!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Thank you, <span className="font-bold text-slate-900 dark:text-white">{customerData.fullName}</span>! Your <span className="capitalize">{seating}</span> table for <span className="font-semibold">{formData.guests}</span> on <span className="font-semibold">{formData.date}</span> at <span className="font-semibold">{formData.time}</span> is confirmed.
            </p>
            <button
              type="button"
              onClick={handleClosePopup}
              className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3 rounded-xl shadow-sm transition-all cursor-pointer uppercase tracking-wider text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Reservations;
