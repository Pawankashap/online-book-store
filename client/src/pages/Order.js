import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button,Box} from "../styles";

function Order({ user }) {
  const [ordersbyid, setOrderbyId] = useState([]);

  useEffect(() => {
    fetch(`/ordersbyid/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        console.log("run user effect")
        console.log(data); // Log the data to the console
        setOrderbyId(data);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Wrapper>
      <h2>Orders</h2>
      {ordersbyid.length > 0 ? (
        ordersbyid.map((order) => (
          <Book key={order.id}>
            <Box>
              <h2>Order No. {order.id} &nbsp; Order Date: {formatDate(order.orderdt)}</h2>
              <h3>Book: {order.book.title}</h3>
              <p>
                <em>Description: {order.book.category}</em> &nbsp;·&nbsp; Price : {order.book.price}
              </p>
              <p>
                <em>Shipping info: {order.shippinginfo} minutes</em>
                &nbsp;·&nbsp;
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