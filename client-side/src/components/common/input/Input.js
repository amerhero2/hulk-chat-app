import React from "react";
import { Field, ErrorMessage } from "formik";
import "./Input.css";

const Input = ({ label, name, placeholder = "" }) => {
  return (
    <div className="HULK-input-wrapper">
      <label htmlFor={name}>{label}</label>
      <Field type={name} name={name} placeholder={placeholder} />
      <ErrorMessage
        name={name}
        component="div"
        className="HULK-input-error-message"
      />
    </div>
  );
};

export default Input;
