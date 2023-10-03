import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      .then(setBooks);
  }, []);

  return (
    <Wrapper>
      {books.length > 0 ? (
        books.map((book) => (
          <Book key={book.id}>
            <Box>
              <h2>{book.title}</h2>
              <p>
                <em>Time to Complete: {book.minutes_to_complete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {book.user.username}</cite>
              </p>
              {/* <ReactMarkdown>{recipe.instructions}</ReactMarkdown> */}
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