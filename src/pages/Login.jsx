import React, { useState } from 'react';

const Login = ({ setPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setFormData({ email: '', password: '' });
    if (setPage) {
      setPage('home');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 flex flex-col justify-center min-h-[60vh] relative">
      <div className="bg-slate-50 dark:bg-zinc-800 p-8 rounded-2xl border border-slate-100 dark:border-zinc-700/60 shadow-sm flex flex-col gap-6 transition-all">
        
        <h1 className="text-3xl font-serif font-bold text-center text-slate-900 dark:text-zinc-100">
          Sign In
        </h1>

        <form onSubmit={handleLoginSubmit} noValidate className="flex flex-col gap-5">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-200">
              Email Address *
            </label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="alex@example.com" 
              className={`w-full p-2.5 rounded-lg border ${errors.email ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-600'} bg-white dark:bg-zinc-900 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-2 focus:outline-[#495E57]`} 
            />
            {errors.email && (
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {errors.email}
              </span>
            )}
          </div>
          
          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-200">
              Password *
            </label>
            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                placeholder="••••••••" 
                className={`w-full p-2.5 pr-10 rounded-lg border ${errors.password ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-300 dark:border-zinc-600'} bg-white dark:bg-zinc-900 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-2 focus:outline-[#495E57]`} 
              />
              
              {/* Interactive Vector Eye Graphic Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 dark:text-zinc-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {errors.password}
              </span>
            )}
          </div>

          <button type="submit" className="w-full bg-[#495E57] text-[#F4CE14] dark:bg-[#F4CE14] dark:text-slate-950 font-bold p-3 rounded-xl text-sm shadow-md cursor-pointer hover:opacity-90 mt-2 transition-all">
            Sign In
          </button>
        </form>
        
        <div className="text-center text-sm font-medium border-t border-slate-200 dark:border-zinc-700 pt-4">
          <p className="text-slate-600 dark:text-zinc-300">
            Don't have an account?{' '}
            <button 
              type="button" 
              onClick={() => setPage && setPage('register')} 
              className="text-[#495E57] dark:text-[#F4CE14] font-bold hover:underline cursor-pointer"
            >
              Sign-up here
            </button>
          </p>
        </div>

      </div>

      {/* Login Success Popup Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">
              Welcome Back!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              You have signed in as <span className="font-semibold text-slate-900 dark:text-white">{formData.email}</span>.
            </p>
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3 rounded-xl shadow-sm transition-all cursor-pointer uppercase tracking-wider text-xs"
            >
              Continue to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
