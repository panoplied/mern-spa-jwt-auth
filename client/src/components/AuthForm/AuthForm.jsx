import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import { Form, FormField, FormSubmit } from "../UI/Form";
import Panel from "../UI/Panel";
import PasswordHint from "./PasswordHint";
import CapsLockIndicator from "../UI/CapsLockIndicator";
import styles from "./AuthForm.module.css";

const PASS_REQUIREMENTS = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

const AuthForm = ({ mode }) => {
  const FORM_ID = "auth-form";
  const EMAIL_ID = "email";
  const PASSWORD_ID = "password";

  const [emailHint, setEmailHint] = useState("");
  const [passHint, setPassHint] = useState("");

  const emailValidator = useCallback(
    async (email) => {
      if (await validator.isEmail(email)) {
        setEmailHint("");
        return true;
      } else {
        setEmailHint("Please use a valid email");
        return false;
      }
    },
    [mode]
  );

  const passwordValidator = useCallback(
    async (password) => {
      // Don't validate for login, only for signup
      if (
        mode === "login" ||
        (await validator.isStrongPassword(password, PASS_REQUIREMENTS))
      ) {
        setPassHint("");
        return true;
      } else {
        setPassHint(
          <PasswordHint pwd={password} pwdReqs={PASS_REQUIREMENTS} />
        );
        return false;
      }
    },
    [mode]
  );

  const { login, isPending: loginIsPending, error: loginError } = useLogin();
  const { signup, isPending: signupIsPending, error: signupError } = useSignup();

  const submitHandler = async (form) => {
    const email = form[EMAIL_ID].value;
    const password = form[PASSWORD_ID].value;
    if (mode === "login") {
      await login(email, password);
    }
    if (mode === "signup") {
      await signup(email, password);
    }
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

  const Reset = () => {
    return <>{"><"}</>;
  };

  return (
    <Panel className={styles.auth}>
      {mode === "initial" && <InitialMode />}
      {mode !== "initial" && (
        <>
          <FormTitle />
          <Form id={FORM_ID} onSubmit={submitHandler}>
            <FormField
              id={EMAIL_ID}
              type="email"
              required
              placeholder="EMAIL"
              validator={emailValidator}
              hint={emailHint}
              resetterElement={<Reset />}
            />
            <FormField
              id={PASSWORD_ID}
              type="password"
              required
              placeholder="PASSWORD"
              validator={passwordValidator}
              hint={passHint}
              resetterElement={<Reset />}
              additionalElements={<CapsLockIndicator />}
            />
            <FormSubmit
              form={FORM_ID}
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
