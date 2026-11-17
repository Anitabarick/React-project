# Little Lemon — Mediterranean Restaurant Web Application

A modern, responsive, and accessible web application built for **Little Lemon**, a family-owned Mediterranean restaurant in Chicago. Developed with **React**, **Vite**, and **Tailwind CSS** as part of the Meta Front-End Developer Capstone.

---

##  Key Features

- **Interactive Culinary Menu & Online Ordering:** Browse 40+ traditional Mediterranean dishes, desserts, and drinks with real-time keyword search and category filtering.
- **Full Shopping Cart & Checkout Flow:** Add or adjust item quantities across pages with a live navigation badge, apply promo codes (`LEMON10`), toggle between Delivery and Store Pickup, and complete validated card or cash checkout with instant order receipts.
- **Table Reservations:** Multi-step table booking workflow allowing guests to select dates, available dining times, party size, and special occasions with form validation.
- **Light & Dark Mode Support:** Seamless theme switching across every page, tailored for WCAG AA contrast compliance.
- **Accessibility & Automated Testing:** Built with semantic HTML landmarks, sequential heading hierarchy, keyboard-friendly focus states, and automated **Vitest + vitest-axe** unit and WCAG accessibility tests.

---

##  Tech Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS v4
- **Testing & Accessibility:** Vitest, React Testing Library, `jest-dom`, `vitest-axe`

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com
cd little-lemon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open the local URL shown in your terminal (typically `http://localhost:5173`) to view the app in your browser.

---

##  Running Unit & Accessibility Tests

This project includes automated unit tests for component rendering, search filtering, form validation, and WCAG accessibility checks:

```bash
npm test
```

---

##  Project Structure

```text
Little-lemon/
├── src/
│   ├── assets/          # Brand logos, icons, and dish photography
│   ├── components/      # Reusable Navbar and Footer components
│   ├── data/            # Shared menu items and category definitions
│   ├── pages/           # Home, About, Menu, Reservations, OrderOnline, Cart, Checkout, Contact, Login, Register
│   ├── App.jsx          # Main application state, routing, and theme management
│   ├── App.test.jsx     # Vitest unit and vitest-axe accessibility test suite
│   ├── index.css        # Tailwind imports and light-mode contrast enhancements
│   └── setupTests.js    # Testing environment matchers and mocks
├── package.json
└── vite.config.js
```

---

##  License

Created for educational and portfolio demonstration purposes.
