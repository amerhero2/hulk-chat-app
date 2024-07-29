import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./LoginForm.css";
import Input from "../common/input/Input";
import Button from "../common/button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      dispatch(loginUser(values));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="HULK-login-form-wrapper">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input
              label="Email *"
              name="email"
              placeholder="Enter email here"
            />
            <Input
              label="Password *"
              name="password"
              placeholder="Enter password here"
            />
            <Button disabled={isSubmitting}>Login</Button>
          </Form>
        )}
      </Formik>
      <span className="HULK-login-form-account-question">
        Don't have an account? <Link to="/register">Register</Link>
      </span>
    </div>
  );
};

export default LoginForm;
