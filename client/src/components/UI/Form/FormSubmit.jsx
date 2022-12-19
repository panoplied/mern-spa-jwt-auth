import { useContext, useEffect, useState } from "react";
import { FormContext } from "./Form";

const FormSubmit = (props) => {
  const {
    type = "submit",
    form,
    formNoValidate = true, // don't use browser validation by default
    disabled,
    disabledOnInvalid = true,
  } = props;

  const [isDisabled, setIsDisabled] = useState(false);
  const { formIsValid } = useContext(FormContext);

  useEffect(() => {
    if (disabled || (disabledOnInvalid && !formIsValid)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [disabled, disabledOnInvalid, formIsValid]);

  return (
    <button
      type={type}
      form={form}
      formNoValidate={formNoValidate}
      disabled={isDisabled}
    >
      {props.children}
    </button>
  );
};

export default FormSubmit;
