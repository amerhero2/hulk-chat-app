import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// import axios from '../axios';
import Input from '../common/input/Input';
import Button from '../common/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css'
import { registerUser } from '../../redux/actions/authActions';



const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password required')
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values);
      dispatch(registerUser(values));
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      navigate('/dashboard');
    }
  };

  return (
    <div  className='HULK-register-form-wrapper'>
      <h2>Register</h2>
      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="HULK-register-form-namefields">
              <Input name="firstName" label="First Name *" />
              <Input name="lastName" label="Last Name *" />
            </div>
            <Input name="email" label="Email *" />
            <Input name="password" label="Password *" />
            <Button disabled={isSubmitting}>Register</Button>
          </Form>
        )}
      </Formik>
      <span className='HULK-register-form-account-question'>Already have an account? <Link to='/login'>Log in</Link></span>
    </div>
  );
};

export default RegisterForm;