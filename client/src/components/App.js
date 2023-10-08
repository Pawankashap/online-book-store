import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "../pages/Login";
import BooksList from "../pages/BooksList";
import Books from "../pages/Books";
import Carts from "../pages/Cart";
import Order from "../pages/Order";
import DeleteBook from "../pages/DeleteBook";
import EditBook from "../pages/EditBook";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user)); 
      }
    });
  }, []);

debugger
  if (!user) return <Login onLogin={setUser} />;
  console.log(user)
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
            <Route path="/edit/:id" element={<EditBook user={user} / >} />
            <Route path="/delete" element={<DeleteBook/>} />
            <Route path="/orderbyid"  element={<Order user={user} />} />
            <Route path="/books"  element={<BooksList setCart={setCart} cart={cart} user={user} />} />
            <Route path="/order"  element={<Order user={user} />} />
            <Route path="/cart"  element={<Carts user={user} setCart={setCart} cart={cart}  />} />
            <Route path="/new"  element={<Books user={user} />} />
            <Route path="/" element={<Home setCart={setCart} cart={cart} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;