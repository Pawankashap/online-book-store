import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button,Label } from "../styles";


function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <Wrapper>
      <Logo>
        <Link to="/">Book Store</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/">Home</Button>
        <Button as={Link} to="/books">Books</Button>
        <Button as={Link} to="/order">Order</Button>
        <Button as={Link} to="/new">New Book  </Button>
        <Button variant="outline" as={Link} to="/cart" >Cart Items</Button>
        <Link className="cartitem" to="/cart">Cart Items</Link>
        <Label htmlFor="title">{user.username}</Label>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 8px;
`;



export default NavBar;