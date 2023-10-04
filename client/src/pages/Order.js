import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function Order({ user }) {
  const [title, setTitle] = useState();  
  const [author, setAuthor] = useState();
  const [image_url, setImage_url] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [sold, setSold] = useState("n");
  // const [user,setUser]= useState()

  const [minutesToComplete, setMinutesToComplete] = useState("30");
  const [instructions, setInstructions] = useState(`Here's how you make it.
  
## Ingredients

- 1c Sugar
- 1c Spice

## Instructions

**Mix** sugar and spice. _Bake_ for 30 minutes.
  `);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log({user})
    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        image_url,
        category,
        description,
        price,
        sold,  
        user_id:user.id
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

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create Book</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              type="text"
              id="image_url"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
            />
          </FormField>

          <FormField>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="price">Price</Label>
            <Input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormField>

          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Book"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{title}</h1>
        <p>
          <em>Time to Complete: {minutesToComplete} minutes</em>
          &nbsp;·&nbsp;
          {/* <cite>By {user.username}</cite> */}
        </p>
        {/* <ReactMarkdown>{instructions}</ReactMarkdown> */}
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default Order;