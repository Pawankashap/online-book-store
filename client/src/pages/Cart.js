import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Textarea} from "../styles";

function Cart({ user,setCart,cart }) {
  const [shippinginfo, setShippingInfo] = useState('');  
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    setCart((cart) => []);
    fetch(`/citemsbyid/${user.id}`) 
      .then((response) => response.json())
      .then((data) => {
        const titlesToAdd = data.map((item) => ({
          id: item.book_id,
          price: item.book.price,
          title: item.book.title
        }));
        setCart([...titlesToAdd]);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [user.id, setCart]);

  function clearCartInDatabase(userId) {
    console.log(`/citemsbyid/${user.id}`)
    fetch(`/citemsbyid/${user.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCart([]);
        } else {
          console.error("Failed to clear cart in the database.");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const newDataToSave = cart.map((item) => ({
      shippinginfo: shippinginfo,
      book_id: item.id,
      user_id: user.id
    }));
    console.log(newDataToSave)
    
    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDataToSave),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        setCart([]);
        clearCartInDatabase(newDataToSave.user_id);
        console.log(cart)
        history('/');
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const removeFromCart = (book) => {
    DeleteCartItems(book);
  };
  const DeleteCartItems = (book) => {
    fetch(`/citemsdel/${user.id}/${book.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedCart = cart.filter((cartItem) => cartItem.id !== book.id);
          setCart(updatedCart);
        } else {
          console.error("Failed to delete book.");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  };
  
  return (
    <CartWrapper>
      <h2>Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <p>{item.title}</p>
              <p>Price: {item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h3>Shipping Address</h3>
      <Textarea
        id="shippinginfo" 
        rows="4"
        value={shippinginfo}
        onChange={(e) => setShippingInfo(e.target.value)}
      >
      </Textarea>
      <button  onClick={handleSubmit}>{isLoading ? "Loading..." : "Place Order"}</button>
    </CartWrapper>
  );
}

const CartWrapper = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background-color: #ff4444;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }
`;


export default Cart;