import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button,Box} from "../styles";

function Order({ user }) {
  const [ordersbyid, setOrderbyId] = useState([]);
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/ordersbyid")
      .then((r) => r.json())
      .then((data) => {
        console.log("run user effect")
        console.log(data); // Log the data to the console
        setOrderbyId(data);
      });
  }, []);

  // const addToCart = (book) => {
  //   setCart([...cart, book]);
  // };

  // const removeFromCart = (book) => {
  //   const updatedCart = cart.filter((cartItem) => cartItem.id !== book.id);
  //   setCart(updatedCart);
  // };
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  debugger

  return (
    <Wrapper>
      <h2>Orders</h2>
      {ordersbyid.length > 0 ? (
        ordersbyid.map((order) => (
          <Book key={order.id}>
            <Box>
              <h2>Order No. {order.id}            Order Date: {formatDate(order.orderdt)}</h2>
              <h3>Book: {order.book.title}</h3>
              <p>
                <em>Description: {order.book.category}</em> &nbsp;·&nbsp; Price : {order.book.price}
              </p>
              <p>
                <em>Shipping info: {order.shippinginfo} minutes</em>
                &nbsp;·&nbsp;
                {/* <cite>By {order.author}</cite> */}
              </p>
            </Box>
          </Book>
        ))
      ) : (
        <>
          <h2>No Books Found</h2>
          <Button as={Link} to="/new">
            Order Not Found
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Book = styled.article`
  margin-bottom: 24px;
`;

export default Order;