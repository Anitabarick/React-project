
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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Smoothly scrolls to top whenever the user switches pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Adds a dish to the cart or increments its quantity if it already exists
  const addToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  // Total number of items for the Navbar badge
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const renderMainContent = () => {
    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "about":
  return <About setPage={setPage} />;

           case "menu":
        return (
          <Menu
            setPage={setPage}
            addToCart={addToCart}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        );

      case "reservations":
        return <Reservations setPage={setPage} />;
      case "order-online":
        return <OrderOnline setPage={setPage} addToCart={addToCart} />;
      case "login":
        return <Login setPage={setPage} />;
      case "register":
        return <Register setPage={setPage} />;
      case "contact":
        return <Contact />;
      case "cart":
        return <Cart setPage={setPage} cartItems={cartItems} setCartItems={setCartItems} />;
              case "cart":
        return <Cart setPage={setPage} cartItems={cartItems} setCartItems={setCartItems} />;
      case "checkout":
        return <Checkout setPage={setPage} cartItems={cartItems} setCartItems={setCartItems} />;

      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100 canvas-bg min-h-screen transition-colors duration-300 relative flex flex-col justify-between">
      <div>
        <Navbar
          theme={theme}
          setTheme={setTheme}
          currentPage={page}
          setPage={setPage}
          cartCount={cartCount}
        />
        <main className="flex-grow">
          {renderMainContent()}
        </main>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

export default App;
