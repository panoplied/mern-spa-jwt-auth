import { createContext, useReducer } from "react";

const formReducer = (fields, action) => {
  const { type, payload } = action;
  if (type === "REGISTER" || type === "RESET") {
    const id = payload;
    return {
      ...fields,
      [id]: { value: "", isTouched: false, isValid: true },
    };
  }
  if (type === "INPUT") {
    const { id, value } = payload;
    return {
      ...fields,
      [id]: { value, isTouched: fields[id].isTouched, isValid: fields[id].isValid },
    };
  }
  if (type === "VALIDATE") {
    const { id, value, validator } = payload;
    return {
      ...fields,
      [id]: { value, isTouched: true, isValid: validator(value) },
    };
  }
  return fields;
};

export const FormContext = createContext({});

const Form = ({ children, id, onSubmit }) => {
  const [fields, dispatch] = useReducer(formReducer, {});

  const formIsValid = (() => {
    for (const field in fields) {
      if (!fields[field].isValid) {
        return false;
      }
    }
    return true;
  })();

  const submitHandler = (event) => {
    // Only prevent page reload here,
    // and let parent to handle submit
    event.preventDefault();
    onSubmit(fields);
  };

  return (
    <FormContext.Provider value={{ fields, formIsValid, dispatch }}>
      <form id={id} onSubmit={submitHandler}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;