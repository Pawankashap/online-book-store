import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function BooksList({setCart,cart}) {
  const [books, setBooks] = useState([]);
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      .then(setBooks);
  }, []);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (book) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== book.id);
    setCart(updatedCart);
  };


  return (
    <Wrapper>
      {books.length > 0 ? (
        books.map((book) => (
          <Book key={book.id}>
            <Box>
              <h2>{book.title}</h2>
              <p>
                <em>Category: {book.category}</em> &nbsp;·&nbsp; Price : {book.price}
              </p>
              <p>
                <em>Description: {book.description} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {book.author}</cite>
              </p>
              {/* <b>{book.sold}</b> */}
              {/* <ReactMarkdown>{recipe.instructions}</ReactMarkdown> */}
              <Link >
                {cart.find((cartItem) => cartItem.id === book.id) ? (
                  <button onClick={() => removeFromCart(book)}>Remove from Cart</button>
                ) : (
                  <button onClick={() => addToCart(book)}>Add to Cart</button>
                )}
              </Link>
            </Box>
          </Book>
        ))
      ) : (
        <>
          <h2>No Books Found</h2>
          <Button as={Link} to="/new">
            Add New Book
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

export default BooksList;