import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';



const LoginSignupViewComponent = ({ logInUser, signUpUser }) => (
  <div>
    Log in or sign up to continue.

    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={(values, actions) => {
        logInUser(values)
        .then(() => {
          actions.setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          actions.setSubmitting(false);
        })
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <Form>

          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Log In
          </button>

        </Form>
      )}
    />

    <Formik
      initialValues={{name: '', email: '', password: ''}}
      onSubmit={(values, actions) => {
        signUpUser(values)
        .then(() => {
          actions.setSubmitting(false);
        })
        .catch(err => {
          console.log(err);
          actions.setSubmitting(false);
        })
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <Form>

          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />

          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Sign Up
          </button>

        </Form>
      )}
    />
  </div>
);

export default LoginSignupViewComponent;
