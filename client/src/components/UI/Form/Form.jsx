import { createContext, useReducer } from "react";

const formReducer = (fields, action) => {
  const { type, payload } = action;
  if (type === "REGISTER") {
    const { id, isRequired } = payload;
    return {
      ...fields,
      [id]: { value: "", isTouched: false, isValid: true, isRequired },
    };
  }
  if (type === "FOCUS") {
    const id = payload;
    return {
      ...fields,
      [id]: { ...fields[id], isTouched: true },
    };
  }
  if (type === "INPUT") {
    const { id, value } = payload;
    return {
      ...fields,
      [id]: { ...fields[id], value },
    };
  }
  if (type === "VALIDATE") {
    const { id, value, isValid } = payload;
    return {
      ...fields,
      [id]: { ...fields[id], value, isValid },
    };
  }
  if (type === "RESET") {
    const id = payload;
    return {
      ...fields,
      [id]: { ...fields[id], value: "", isTouched: false, isValid: true },
    };
  }
  return fields;
};

export const FormContext = createContext({});

const Form = ({ children, id, onSubmit }) => {
  const [fields, dispatch] = useReducer(formReducer, {});

  // Consider form invalid when it has invalid fields or empty required fields
  const formIsValid = (() => {
    for (const f in fields) {
      if (
        !fields[f].isValid ||
        (fields[f].isRequired && fields[f].value === "")
      ) {
        return false;
      }
    }
    return true;
  })();

  // Only prevent page reload here, and let parent to handle submit
  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(fields);
  };

  return (
    <FormContext.Provider value={{ fields, formIsValid, dispatch }}>
      <form id={id} onSubmit={submitHandler}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
