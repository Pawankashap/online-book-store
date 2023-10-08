import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Error, FormField, Label, Input} from "../styles";


function Books({ user }) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      image_url: "",
      category: "",
      description: "",
      price: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required"),
      author: Yup.string()
        .required("Author is required"),
      image_url: Yup.string()
        .url("Invalid URL format").required("Image URL is required"),
      category: Yup.string()
        .required("Category is required"),
      description: Yup.string()
        .required("Description is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be positive"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      fetch("/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          sold: "n",
          user_id: user.id,
        }),
      })
        .then((r) => {
          setSubmitting(false);
          if (r.ok) {
            navigate("/");
          } else {
            r.json().then((err) => {
              setErrors([err.error]);
            });
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          setSubmitting(false);
        });
        debugger
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
        <h2>Create Book</h2>
      {user.usertype === 'a' ? (  
        <form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input  
              type="text"
              id="title"
              name="title"
              autoComplete="off"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title ? (
              <Error>{formik.errors.title}</Error>
            ) : null}
          </FormField>

          <FormField>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              name="author"
              autoComplete="off"
              {...formik.getFieldProps("author")}
            />
            {formik.touched.author && formik.errors.author ? (
              <Error>{formik.errors.author}</Error>
            ) : null}
          </FormField>

          <FormField>
            <Label htmlFor="image_url">Image UR</Label>
            <Input
              type="text"
              id="image_url"
              name="image_url"
              autoComplete="off"
              {...formik.getFieldProps("image_url")}
            />
            {formik.touched.image_url && formik.errors.image_url ? (
              <Error>{formik.errors.image_url}</Error>
            ) : null}
          </FormField>

          <FormField>
            <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps("category")}
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
              as="textarea"
              rows="3"
              id="description"
              name="description"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description ? (
              <Error>{formik.errors.description}</Error>
            ) : null}
          </FormField>
          <FormField>
            <Label htmlFor="price">Price</Label>
            <Input
              type="text"
              id="price"
              name="price"
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <Error>{formik.errors.price}</Error>
            ) : null}
          </FormField>

          <FormField>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Loading..." : "Add New Book"}
            </Button>
            &nbsp;&nbsp;
            <Button onClick={() => navigate("/delete")}>Edit and Delete Books</Button>
            
          </FormField>
          <FormField>
            {formik.errors.serverError && <Error>{formik.errors.serverError}</Error>}
          </FormField>
        </form>
         ) : <Label>You are not authorized to create books.</Label> }
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

export default Books;