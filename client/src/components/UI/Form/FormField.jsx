import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { FormContext } from "./Form";

const FormField = (props) => {
  const {
    id,
    type = "text",
    label = id,
    name = id,
    placeholder,
    required = false,
    hint,
    resetterElement,
    additionalElements,
    validator = () => true, // if no validator provided, the field is always valid
  } = props;

  const { fields, dispatch } = useContext(FormContext);

  // Register field in Form context on mount
  const [isRegistered, setIsRegistered] = useState(false);
  useEffect(() => {
    dispatch({ type: "REGISTER", payload: { id, isRequired: required } });
    setIsRegistered(true);
  }, [dispatch, id, required]);

  // When registered in context, init with shared form state, else init with defaults
  const { value, isTouched, isValid } = isRegistered
    ? fields[id]
    : {
        value: "",
        isTouched: false,
        isValid: true,
      };

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

  const blurHandler = async () => {
    await validate(value);
  };

  const validate = useCallback(
    async (value) => {
      dispatch({
        type: "VALIDATE",
        payload: { id, value, isValid: await validator(value) },
      });
    },
    [value, validator]
  );

  // Instant validation on input: if the field is being edited,
  // then validate every `debounceRate` milliseconds
  const debounceRate = 500;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRegistered && isTouched) {
        validate(value);
      }
    }, debounceRate);
    return () => {
      clearTimeout(timer);
    };
  }, [isRegistered, isTouched, dispatch, id, value, validate]);

  const inputRef = useRef(null);
  const resetHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({
      type: "RESET",
      payload: id,
    });
    inputRef.current.focus();
  };

  let styles = "form-field";
  if (isValid && isTouched && value) {
    styles = "form-field valid";
  }
  if (!isValid && isTouched) {
    styles = "form-field invalid";
  }

  return (
    <div className={styles}>
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
        ref={inputRef}
      />
      <label htmlFor={id}>{label}</label>
      <div className="reset" onClick={resetHandler}>
        {resetterElement}
      </div>
      <div className="hint">{hint}</div>
      {additionalElements}
    </div>
  );
};

export default FormField;
