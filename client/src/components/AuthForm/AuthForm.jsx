import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import Panel from "../Panel";

import styles from "./AuthForm.module.css";

const AuthForm = ({ mode }) => {
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

  return (
    <Panel className={styles.auth}>
      {mode === "initial" && <InitialMode />}
      {mode !== "initial" && (
        <>
          <div className={styles.title}>
            <h1>{mode.toUpperCase()}</h1>
            <Link to="/"><button>ESC</button></Link>
          </div>
          <form onSubmit={submitHandler} className={''}>
            <label>Email</label>
            <input type="email" onChange={emailChangeHandler} value={email} />
            <label>Password</label>
            <input type="password" onChange={passwordChangeHandler} value={password} />
            <button disabled={isLoginPending || isSignupPenging}>{mode}</button>
          </form>
          {mode !== "login" && (
            <>
              <p>ERROR: {signupError}</p>
              <p>Already a user? <Link to="/login">Login</Link></p>
            </>
          )}
          {mode !== "signup" && (
            <>
              <p>ERROR: {loginError}</p>
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </>
          )}
        </>
      )}
    </Panel>
  );
};

export default AuthForm;
