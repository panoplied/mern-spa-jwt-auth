import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import Panel from "../UI/Panel";

import styles from "./AuthForm.module.css";

const AuthForm = ({ mode }) => {
  const formAction = mode.toUpperCase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending: isLoginPending, error: loginError } = useLogin();
  const { signup, isPending: isSignupPenging, error: signupError } = useSignup();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (mode === "login") {
      await login(email, password);
    }
    if (mode === "signup") {
      await signup(email, password);
    }
  }

  const InitialMode = () => (
    <div className={styles.initial}>
      <Link to="/login"><button>LOGIN</button></Link>
      <Link to="/signup"><button>SIGN UP</button></Link>
    </div>
  );

  const FormTitle = () => (
    <div className={styles.title}>
      <h1>{formAction}</h1>
      <Link to="/">
        <button className="bg-red-500">ESC</button>
      </Link>
    </div>
  );

  const FormFooter = () => (
    <>
      {mode === "signup" && (
        <>
          <p>{signupError}</p>    
          <p>Already a user?</p>
          <p className="crtCyan">
            <Link to="/login">LOGIN</Link>
          </p>
        </>
      )}
      {mode === "login" && (
        <>
          <p>{loginError}</p>
          <p>Don't have an account?</p>
          <p className="crtCyan">
            <Link to="/signup">SIGN UP</Link>
          </p>
        </>
      )}
    </>
  );

  return (
    <Panel className={styles.auth}>
      {mode === "initial" && <InitialMode />}
      {mode !== "initial" && (
        <>
          <FormTitle />
          <form onSubmit={submitHandler} className={styles.form}>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={emailChangeHandler}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={passwordChangeHandler}
              required
            />
            <button disabled={isLoginPending || isSignupPenging}>
              {formAction}
            </button>
          </form>
          <FormFooter />
        </>
      )}
    </Panel>
  );
};

export default AuthForm;
