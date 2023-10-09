// import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Error, Input, FormField, Label } from "../styles";

function SignUpForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",
      usertype: "u",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      usertype: Yup.string().required("User type is required"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          username: values.username,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          email: values.email,
          usertype: values.usertype,
  
        }),
      })
        .then((response) => {
          setSubmitting(false);
          if (response.ok) {
            response.json().then((user) => onLogin(user));
          } else {
            response.json().then((err) => {
              setErrors(err.errors || {});
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setSubmitting(false);
        });
        debugger
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
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
              name="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
            />
             {formik.touched.password && formik.errors.password ? (
              <Error>{formik.errors.password}</Error>
            ) : null}
          </FormField>

          <FormField>
            <Label htmlFor="passwordConfirmation">Password Confirmation</Label>
            <Input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              autoComplete="current-password"
              {...formik.getFieldProps("passwordConfirmation")}
            />
             {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
              <Error>{formik.errors.passwordConfirmation}</Error>
            ) : null}
          </FormField>

          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="text" 
              id="email" 
              name="email" 
              {...formik.getFieldProps("email")} 
            />
            {formik.touched.email && formik.errors.email ? (
              <Error>{formik.errors.email}</Error>
            ) : null}
          </FormField>
          {/* <FormField>
            <Label htmlFor="usertype">User Type</Label>
            <Input
              as="textarea"
              rows="3"
              id="usertype"
              name="usertype"
              {...formik.getFieldProps("usertype")}
            />
            {formik.touched.usertype && formik.errors.usertype ? (
              <Error>{formik.errors.usertype}</Error>
            ) : null}
          </FormField> */}
          <FormField>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Loading..." : "Sign Up"}
            </Button>
          </FormField>
          <FormField>
            {formik.errors.serverError && <Error>{formik.errors.serverError}</Error>}
          </FormField>
        </form>
  );
}

export default SignUpForm;