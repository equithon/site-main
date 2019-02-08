import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const SignUpFormComponent = ({ signUp }) => (
  <Formik
    initialValues={{name: '', email: '', password: ''}}
    onSubmit={(values, actions) => {
      signUp(values)
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
);

export default SignUpFormComponent;
