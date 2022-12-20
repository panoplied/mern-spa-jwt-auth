import { Link } from "react-router-dom";

import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import { Form, FormField, FormSubmit } from "../UI/Form";
import Panel from "../UI/Panel";
import styles from "./AuthForm.module.css";

const AuthForm = ({ mode }) => {
  const { login, isPending: loginIsPending, error: loginError } = useLogin();
  const { signup, isPending: signupIsPending, error: signupError } = useSignup();
  const formId = "auth-form";
  const emailId = "email";
  const passwordId = "password";

  const submitHandler = async (form) => {
    const email = form[emailId].value;
    const password = form[passwordId].value;
    if (mode === "login") {
      await login(email, password);
    }
    if (mode === "signup") {
      await signup(email, password);
    }
    console.log("SUBMITTING FORM:", email, password);
  };

  const emailValidator = (email) => {
    return email.includes("@");
  };

  const passwordValidator = (password) => {
    return password.length > 0;
  };

  const InitialMode = () => (
    <div className={styles.initial}>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
      <Link to="/signup">
        <button>SIGNUP</button>
      </Link>
    </div>
  );

  const formAction = mode.toUpperCase();
  const FormTitle = () => (
    <div className={styles.title}>
      <h1>{formAction}</h1>
      <Link to="/">
        <button>ESC</button>
      </Link>
    </div>
  );

  const FormFooter = () => (
    <div className={styles.footer}>
      {mode === "login" && (
        <>
          <p>{loginError}</p>
          <p>Don't have an account?</p>
          <Link to="/signup">SIGN UP</Link>
        </>
      )}
      {mode === "signup" && (
        <>
          <p>{signupError}</p>
          <p>Already a user?</p>
          <Link to="/login">LOGIN</Link>
        </>
      )}
    </div>
  );

  return (
    <Panel className={styles.auth}>
      {mode === "initial" && <InitialMode />}
      {mode !== "initial" && (
        <>
          <FormTitle />
          <Form id={formId} onSubmit={submitHandler}>
            <FormField
              id={emailId}
              type="email"
              required
              placeholder="Enter your email"
              hint="Please use valid email"
              validator={emailValidator}
            />
            <FormField
              id={passwordId}
              type="password"
              required
              placeholder="Enter your password"
              hint="Should be 4 chars min asdfasdfkjas;dlkfj ;alksjd f;aslkdjf "
              // Don't validate password on login
              validator={mode === "signup" ? passwordValidator : () => true}
            />
            <FormSubmit
              form={formId}
              formNoValidate
              disabled={loginIsPending || signupIsPending}
              disabledOnInvalid={true}
            >
              {formAction}
            </FormSubmit>
          </Form>
          <FormFooter />
        </>
      )}
    </Panel>
  );
};

export default AuthForm;
