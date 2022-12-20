import { useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";

const FormField = (props) => {
  const {
    id,
    type = "text",
    label = id,
    name = id,
    placeholder,
    required = false,
    validator = () => true, // if no validator provided, the field is always valid
  } = props;

  const { fields, dispatch } = useContext(FormContext);

  // Register field in Form context on mount
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    dispatch({ type: "REGISTER", payload: { id, isRequired: required } });
    setIsRegistered(true);
  }, [dispatch, id, required]);

  // When registered in context init with shared form state, else init by default
  const { value, isTouched, isValid } = isRegistered
    ? fields[id]
    : {
        value: "",
        isTouched: false,
        isValid: true,
      };
  const error = isRegistered && isTouched && !isValid;

  const focusHandler = () => {
    dispatch({
      type: "FOCUS",
      payload: id,
    });
  };

  const changeHandler = (event) => {
    dispatch({
      type: "INPUT",
      payload: { id, value: event.target.value },
    });
  };

  const blurHandler = (event) => {
    dispatch({
      type: "VALIDATE",
      payload: { id, value: event.target.value, validator },
    });
  };

  // Instant validation - every `debounceRate` milliseconds dispatch `VALIDATE` action
  // if the field is touched and being edited by the user
  const debounceRate = 1000;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRegistered && isTouched) {
        dispatch({
          type: "VALIDATE",
          payload: { id, value: fields[id].value, validator },
        });
      }
    }, debounceRate);
    return () => {
      clearTimeout(timer);
    };
  }, [isRegistered, isTouched, dispatch, fields, id, validator]);

  const classes = isValid ? "form-field" : "form-field invalid";

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onFocus={focusHandler}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {/* TODO validation error handling */}
      {error && <span>{id} hint here</span>}
    </div>
  );
};

export default FormField;
