import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Error, FormField, Label, Input} from "../styles";

function EditBook() {
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const initialValues = {
    title: '',
    author: '',
    category: '',
    description: '',
    price: 0,
  };
  
  useEffect(() => {
    fetch(`/booksbyid/${id}`)
      .then((response) => response.json())
      .then((data) => {
        formik.setValues(data);
      })
      .catch((error) => {
        console.error("Error fetching book data:", error);
      });
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be positive"),
  });
  
  const formik = useFormik({
    initialValues: {
      ...initialValues, 
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      fetch(`/booksbyid/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title:values.title,
          author:values.author,
          category: values.category,
          description: values.description,
          price: values.price
        }),
      })
        .then((response) => {
          if (response.ok) {
            navigate('/delete'); // Navigate back to book detail page
          } else {
            response.json().then((err) => {
              setErrors([err.error]);
            });
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    },
  });

  const categoryOptions = [
    "Biography",
    "Cooking",
    "Art & Photography",
    "Motivational/Inspirational",
    "Health & Fitness",
    "History",
    "Families & Relationships",
    "Humor & Entertainment",
    "Business & Money",
    "Law & Criminology",
    "Politics & Social Sciences",
    "Religion & Spirituality",
    "Education & Teaching",
    "Travel",
    "Childrens Fiction"
  ];

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Edit Book</h2>
        <form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              type="text"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title ? (
              <Error>{formik.errors.title}</Error>
            ) : null}
          </FormField>
          <FormField>
            <Label htmlFor="author">Author</Label>
            <Input
              name="author"
              type="text"
              id="author"
              value={formik.values.author}
              onChange={formik.handleChange}
            />
            {formik.touched.author && formik.errors.author ? (
              <Error>{formik.errors.author}</Error>
            ) : null}
          </FormField>
          <FormField>
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option value="">Select a category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {formik.touched.category && formik.errors.category ? (
              <Error>{formik.errors.category}</Error>
            ) : null}
          </FormField>
          <FormField>
            <Label htmlFor="description">Description</Label>
            <Input
              name="description"
              type="text"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description ? (
              <Error>{formik.errors.description}</Error>
            ) : null}
          </FormField>
          <FormField>
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="text"
              id="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price ? (
              <Error>{formik.errors.price}</Error>
            ) : null}
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Updating..." : "Edit Book"}
            </Button>{" "}
            <Button onClick={() => navigate(`/books/${id}`)}>Cancel</Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
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

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;
export default EditBook;
