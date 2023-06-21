import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "../../../styles-form.css";
import { useDarkModeContext } from "../../../context/DarkModeContext";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;


// Form function
const OrderForm = ({sendOrder}) => {
  const {darkMode} = useDarkModeContext()
  return (
    <>
      <h1 className={`${darkMode ? 'text-light' : 'text-dark'}`}>Por favor completa tus datos para finalizar tu compra:</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          email2: "",
          dni: "",
          cel: "",
          direccion: "",
          acceptedTerms: false, // added for our checkbox
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .max(15, "Debe contener 15 caracteres o menos")
            .required("Nombre requerido"),
          lastName: Yup.string()
            .max(20, "Debe contener 20 caracteres o menos")
            .required("Apellido requerido"),
          email: Yup.string()
            .email("Debe ser un email válido")
            .required("Email requerido"),
          email2: Yup.string()
            .oneOf([Yup.ref('email'), null], "Debe coincidir con el mail ingresado")
            .required("Repita el email ingresado"),
          dni: Yup.string()
            .min(7, "Debe contener al menos 7 números")
            .required("DNI requerido"),
          cel: Yup.string()
            .min(10, "Debe contener al menos 10 números")
            .required("Celular requerido"),
          direccion: Yup.string()
            .required("Dirección requerida"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "Debes aceptar los términos y condiciones para continuar."),
        })}
        onSubmit={(values) => sendOrder(values)}
      >
        <Form>
          <MyTextInput
            label="Nombre"
            name="firstName"
            type="text"
            placeholder="Juan"
          />
          <MyTextInput
            label="Apellido"
            name="lastName"
            type="text"
            placeholder="Perez"
          />
          <MyTextInput
            label="Email"
            name="email"
            type="email"
            placeholder="juanperez@gmail.com"
          />
          <MyTextInput
            label="Confirmar Email"
            name="email2"
            type="email"
            placeholder="juanperez@gmail.com"
          />
          <MyTextInput
            label="DNI"
            name="dni"
            type="text"
            placeholder="12345678"
          />
          <MyTextInput
            label="Celular"
            name="cel"
            type="text"
            placeholder="1100001111"
          />
          <MyTextInput
            label="Dirección"
            name="direccion"
            type="text"
            placeholder="Av. Siempreviva 1234"
          />
          <MyCheckbox name="acceptedTerms">
            Acepto los términos y condiciones.
          </MyCheckbox>
          <div>
            <button type="reset">Borrar Formulario</button>
            <button type="submit">Finalizar Compra</button>
          </div>
          
        </Form>
      </Formik>
    </>
  );
};

export default OrderForm;