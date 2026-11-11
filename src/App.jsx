import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import OrderOnline from "./pages/OrderOnline";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Contact from "./pages/Contact";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const renderMainContent = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "about":
        return <About />;
      case "menu":
        return <Menu />;
      case "reservations":
        return <Reservations />;
      case "order-online":
        return <OrderOnline />;
      case "login":
        return <Login setPage={setPage} />;
      case "register":
        return <Register setPage={setPage} />;
      case "contact":
        return <Contact />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    /* FIXED: Added dark:bg-zinc-950 and dark:text-slate-100 variants to the parent element wrapper */
    <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100 canvas-bg min-h-screen transition-colors duration-300 relative flex flex-col justify-between">
      <div>
        <Navbar theme={theme} setTheme={setTheme} currentPage={page} setPage={setPage} />
        <main className="flex-grow">
          {renderMainContent()}
        </main>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

export default App;
