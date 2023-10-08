import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Error, Input, FormField, Label } from "../styles";

function LoginForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          setSubmitting(false);
          if (response.ok) {
            response.json().then((user) => onLogin(user));
          } else {
            response.json().then((err) => {
              setErrors({ serverError: err.error }); // Update errors state
            });
              debugger
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username ? (
          <Error>{formik.errors.username}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Button variant="fill" color="primary" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors.serverError && <Error>{formik.errors.serverError}</Error>}
      </FormField>
    </form>
  );
}

export default LoginForm;