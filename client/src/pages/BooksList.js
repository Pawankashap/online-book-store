import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function BooksList({setCart,cart,user}) {
  const [books, setBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/books")
      .then((r) => r.json())
      .then(setBooks);
  }, []);
  const addToCart = (book) => {
    UpdateCartItems(book);
  };
  const UpdateCartItems = (book) => {
    fetch(`/cartitems`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_id:book.id,
        user_id:user.id
      }),
    })
      .then((response) => {
        if (response.ok) {
          setCart([...cart, { id: book.id, title: book.title,price:book.price }]);
        } else {
          console.error("Failed to insert book data.");
        }
      })
      .catch((error) => {
        console.error("Error inserting book data:", error);
      });
  };

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

  const sortBooks = () => {
    const sortedBooks = [...books];
    sortedBooks.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setBooks(sortedBooks);
  };

  const filterBooks = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const resetBooks = () => {
    fetch("/books")
      .then((r) => r.json())
      .then(setBooks);
  };

  return (
    <Wrapper>
      <div>
        <SortDropdown>
          <label>Sort by:</label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button onClick={sortBooks}>Apply Sort</button>
        </SortDropdown>
        <SearchBar>
          <input
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={filterBooks}>Search</button>
          <button onClick={resetBooks}>Reset</button>
        </SearchBar>
      </div>
      {books.length > 0 ? (
        books.map((book) => (
          <Book key={book.id}>
            <Box>
              <Image src={book.image_url} alt={`Cover for ${book.title}`} />
              <h2>{book.title}</h2>
              <p>
                <em>Category: {book.category}</em> &nbsp;·&nbsp; Price : {book.price}
              </p>
              <p>
                <em>Description: {book.description} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {book.author}</cite>
              </p>
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
  display: flex; /* Make the book content flex to align image and details */
`;

const SortDropdown = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  select {
    margin-right: 10px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  input {
    margin-right: 10px;
  }
`;
const Image = styled.img`
  max-width: 200px; /* Adjust the maximum width as needed */
  max-height: 200px;
  height: auto;     /* Maintain the image's aspect ratio */
`;
export default BooksList;