import React, { useState } from 'react';

const Contact = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validateContact = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      newErrors.phone = 'Please enter a complete 10-digit phone number.';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a topic.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (validateContact()) {
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 py-16 relative">
      <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2">
        Connect With Us
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-10">
        Reach out to our customer care team or send us a direct message below.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Left Column: Location Details & Live Embedded Map */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-zinc-800/60 p-6 rounded-2xl border border-slate-100 dark:border-zinc-800 flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-200">
            <h3 className="font-bold text-xl font-serif text-[#495E57] dark:text-[#F4CE14]">
              Chicago Headquarters
            </h3>
            <p>📍 123 Mediterranean Way, Chicago, IL 60601</p>
            <p>📞 Office Helpdesk: (312) 555-0199</p>
            <p>✉️ Electronic Mail: help@littlelemon.com</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-zinc-700">
              Hours: Mon – Sun • 11:00 AM – 10:00 PM
            </p>
          </div>

                            {/* Visual Interactive Chicago Location Card (Zero External Iframe Blocking) */}
          <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm relative bg-[#e8ecea] dark:bg-zinc-900 flex items-center justify-center group">
            
            {/* Stylized Chicago Street Grid & River SVG Background */}
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-40"
              viewBox="0 0 600 320"
              fill="none"
              xmlns="http://w3.org"
            >
              {/* Chicago River Branch */}
              <path
                d="M140 0 L155 130 L420 145 L600 145"
                stroke="#93c5fd"
                strokeWidth="22"
                strokeLinecap="round"
              />
              {/* City Blocks & Streets */}
              <g stroke="#ffffff" strokeWidth="6">
                <line x1="0" y1="60" x2="600" y2="60" />
                <line x1="0" y1="210" x2="600" y2="210" />
                <line x1="0" y1="275" x2="600" y2="275" />
                <line x1="80" y1="0" x2="80" y2="320" />
                <line x1="230" y1="0" x2="230" y2="320" />
                <line x1="360" y1="0" x2="360" y2="320" />
                <line x1="490" y1="0" x2="490" y2="320" />
              </g>
              {/* Park Green Zone (Millennium / Grant Park) */}
              <rect x="505" y="165" width="85" height="140" rx="8" fill="#bbf7d0" opacity="0.7" />
            </svg>

            {/* Center Location Pin & Label */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <div className="bg-[#495E57] text-[#F4CE14] px-4 py-2 rounded-xl shadow-lg border-2 border-[#F4CE14] flex items-center gap-2 mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-base">🍋</span>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">Little Lemon Chicago</p>
                  <p className="text-[10px] text-slate-200">123 Mediterranean Way</p>
                </div>
              </div>

              {/* Pulsing Map Marker Dot */}
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#F4CE14] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#495E57] border-2 border-[#F4CE14]"></span>
              </div>
            </div>

            {/* Bottom-Right Direct Directions Link */}
            <a
              href="https://google.com"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 z-10 bg-white/95 dark:bg-zinc-950/95 hover:bg-[#F4CE14] text-slate-900 dark:text-white dark:hover:text-slate-900 text-[11px] font-bold px-3.5 py-2 rounded-lg shadow-md border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              Get Directions ↗
            </a>
          </div>

 
        </div>
        {/* Right Column: Validated Contact Form */}
        <div className="bg-[#495E57] rounded-3xl p-8 md:p-10 shadow-xl text-white">
          <h2 className="text-3xl font-serif text-[#F4CE14] font-bold mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleContactSubmit} noValidate className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full py-2.5 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.fullName ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none text-sm font-medium`}
              />
              {errors.fullName && (
                <span className="text-xs font-semibold text-rose-300">{errors.fullName}</span>
              )}
            </div>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.email ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none text-sm font-medium`}
                />
                {errors.email && (
                  <span className="text-xs font-semibold text-rose-300">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="(312) 555-0199"
                  value={formData.phone}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFormData({ ...formData, phone: formatted });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.phone ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none text-sm font-medium`}
                />
                {errors.phone && (
                  <span className="text-xs font-semibold text-rose-300">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
                Topic / Subject *
              </label>
              <div className="relative">
                <select
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.subject ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none text-sm font-medium appearance-none cursor-pointer`}
                >
                  <option value="" disabled hidden>Select a topic</option>
                  <option value="General Inquiry" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">General Inquiry</option>
                  <option value="Table Reservation" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Table Reservation Help</option>
                  <option value="Catering & Events" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Catering & Private Events</option>
                  <option value="Feedback" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">Dining Feedback</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-slate-400">
                  ▼
                </span>
              </div>
              {errors.subject && (
                <span className="text-xs font-semibold text-rose-300">{errors.subject}</span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
                Message *
              </label>
              <textarea
                rows="4"
                placeholder="How can our team help you?"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                className={`w-full py-2.5 px-4 rounded-lg bg-white dark:bg-zinc-900 text-slate-900 dark:text-white border ${errors.message ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'} focus:outline-none text-sm font-medium resize-none`}
              />
              {errors.message && (
                <span className="text-xs font-semibold text-rose-300">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-sm uppercase tracking-wider mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>

      {/* Contact Success Popup Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>! We have received your message regarding <span className="font-semibold">{formData.subject}</span> and will reply to <span className="font-semibold">{formData.email}</span> shortly.
            </p>
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3 rounded-xl shadow-sm transition-all cursor-pointer uppercase tracking-wider text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
