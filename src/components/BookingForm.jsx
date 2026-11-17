import React from 'react';

const BookingForm = ({
  seating,
  setSeating,
  formData,
  setFormData,
  errors,
  setErrors,
  today,
  availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
  onSubmit
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-[#495E57] rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden mb-12"
    >
      <h1 className="text-4xl font-serif text-[#F4CE14] font-bold mb-8">
        Reservations
      </h1>

      {/* Seating Radio Options */}
      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-x-12 mb-8 text-lg font-semibold">
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

      {/* Booking Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {/* 1. Select Date */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="res-date"
            className="text-xs font-semibold tracking-wide text-slate-200 uppercase"
          >
            Select Date *
          </label>
          <div
            className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border ${
              errors.date ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'
            } flex items-center px-3`}
          >
            <svg
              className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              id="res-date"
              type="date"
              min={today}
              value={formData.date}
              className="w-full py-3 bg-transparent text-slate-900 dark:text-white dark:[color-scheme:dark] pl-8 focus:outline-none font-medium cursor-pointer"
              onChange={(e) => {
                setFormData({ ...formData, date: e.target.value });
                if (errors.date) setErrors({ ...errors, date: '' });
              }}
            />
          </div>
          {errors.date && (
            <span role="alert" className="text-xs font-semibold text-rose-300">
              {errors.date}
            </span>
          )}
        </div>

        {/* 2. Number of Diners */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="res-guests"
            className="text-xs font-semibold tracking-wide text-slate-200 uppercase"
          >
            Number of Diners *
          </label>
          <div
            className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border ${
              errors.guests ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'
            } flex items-center px-3`}
          >
            <svg
              className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <select
              id="res-guests"
              value={formData.guests}
              className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
              onChange={(e) => {
                setFormData({ ...formData, guests: e.target.value });
                if (errors.guests) setErrors({ ...errors, guests: '' });
              }}
            >
              <option value="" disabled hidden>
                No of Diners
              </option>
              {[...Array(10)].map((_, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                  className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
                >
                  {i + 1} Diner{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
            <span className="absolute right-4 pointer-events-none text-xs text-slate-400">
              ▼
            </span>
          </div>
          {errors.guests && (
            <span role="alert" className="text-xs font-semibold text-rose-300">
              {errors.guests}
            </span>
          )}
        </div>

        {/* 3. Occasion */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="res-occasion"
            className="text-xs font-semibold tracking-wide text-slate-200 uppercase"
          >
            Occasion
          </label>
          <div className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-800 flex items-center px-3">
            <select
              id="res-occasion"
              value={formData.occasion}
              className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-2 focus:outline-none font-medium cursor-pointer appearance-none"
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
            >
              <option value="" disabled hidden>
                Select Occasion (Optional)
              </option>
              <option value="Birthday" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                Birthday
              </option>
              <option value="Anniversary" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                Anniversary
              </option>
              <option value="Engagement" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                Engagement
              </option>
              <option value="Casual Dining" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">
                Casual Dining
              </option>
            </select>
            <span className="absolute right-4 pointer-events-none text-xs text-slate-400">
              ▼
            </span>
          </div>
        </div>

        {/* 4. Select Time */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="res-time"
            className="text-xs font-semibold tracking-wide text-slate-200 uppercase"
          >
            Select Time *
          </label>
          <div
            className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-sm border ${
              errors.time ? 'border-rose-500 ring-2 ring-rose-500/40' : 'border-slate-200 dark:border-zinc-800'
            } flex items-center px-3`}
          >
            <svg
              className="w-5 h-5 text-[#F4CE14] absolute left-3 shrink-0 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <select
              id="res-time"
              value={formData.time}
              className="w-full py-3 bg-transparent text-slate-900 dark:text-white pl-8 focus:outline-none font-medium cursor-pointer appearance-none"
              onChange={(e) => {
                setFormData({ ...formData, time: e.target.value });
                if (errors.time) setErrors({ ...errors, time: '' });
              }}
            >
              <option value="" disabled hidden>
                Select Time
              </option>
              {availableTimes.map((time) => (
                <option
                  key={time}
                  value={time}
                  className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white"
                >
                  {time}
                </option>
              ))}
            </select>
            <span className="absolute right-4 pointer-events-none text-xs text-slate-400">
              ▼
            </span>
          </div>
          {errors.time && (
            <span role="alert" className="text-xs font-semibold text-rose-300">
              {errors.time}
            </span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          className="w-full md:w-auto bg-[#F4CE14] hover:bg-[#e2be0d] text-slate-900 font-bold py-3.5 px-10 rounded-xl shadow-md transition-all cursor-pointer text-sm uppercase tracking-wider"
        >
          Reserve a Table
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
