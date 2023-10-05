import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label,Box,Textarea} from "../styles";

function Cart({ user,setCart,cart }) {
  const [shippinginfo, setShippingInfo] = useState('');  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [author, setAuthor] = useState();
  const [image_url, setImage_url] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  // const [sold, setSold] = useState("n");
  // const [user,setUser]= useState()

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  // console.log(cart);
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log({user})
    console.log(cart)
    console.log(shippinginfo)

    const dataToSave = cart.map((item) => ({
      orderdt: currentDate.toDateString(),
      book_id: item.id,
      user_id: item.user_id,
      shippinginfo,
    }))
    // shippinginfo:shipinfo,
    // setCart([...cart, book]);

    console.log(dataToSave)

    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        shippinginfo : dataToSave.shippinginfo || '', 
        orderdt: dataToSave.orderdt,
        book_id: dataToSave.book_id,
        user_id: dataToSave.user_id
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        // history.push("/");
        history('/');
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  const removeFromCart = (book) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== book.id);
    setCart(updatedCart);
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
      <Textarea
        id="shippinginfo" 
        rows="4"
        value={shippinginfo}
        onChange={(e) => setShippingInfo(e.target.value)}
      >

      </Textarea>
      <button onClick={handleSubmit}>Place Order</button>
      {/* <Button as={Link} to="/order">
            Place Order
          </Button> */}
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