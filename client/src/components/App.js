import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import BooksList from "../pages/BooksList";
import Books from "../pages/Books";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
        
            {/* <Route path="/new">
              <Books user={user} />
            </Route> */}
            <Route path="/new" element={<Books />} />
            {/* <Route path="/">
              <BooksList />
            </Route> */}
            <Route path="/" element={<BooksList />} />
        </Routes>
      </main>
    </>
  );
}

export default App;