import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function EditDeletbook({ setCart, cart, user }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      .then(setBooks);
  }, []);

   const deleteBook = (bookId) => {
    fetch(`/booksbyid/${bookId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            const updatedBooks = books.filter((book) => book.id !== bookId);
            setBooks(updatedBooks);
          } else {
            console.error("Failed to delete book.");
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
    };

  return (
    <Wrapper>
      {books.length > 0 ? (
        books.map((book) => (
          <Book key={book.id}>
            <Box>
              <h2>{book.title}</h2>
              <p>
                <em>Category: {book.category}</em> &nbsp;·&nbsp; Price: {book.price}
              </p>
              <p>
                <em>Description: {book.description}</em>
                &nbsp;·&nbsp;
                <cite>By {book.author}</cite>
              </p>
              <ActionButtons>
                <Link to={`/edit/${book.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </ActionButtons>
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

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

export default EditDeletbook;