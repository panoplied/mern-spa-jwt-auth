import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import Panel from "../Panel";

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
    <>
      <h1>Initial</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
    </>
  );

  return (
    <Panel>
      {mode === "initial" && <InitialMode />}
      {mode !== "initial" && (
        <>
          <h1>{mode}</h1>
          <Link to="/"><button>close</button></Link>
          <form onSubmit={submitHandler}>
            <label>Email</label>
            <input type="email" onChange={emailChangeHandler} value={email} />
            <label>Password</label>
            <input type="password" onChange={passwordChangeHandler} value={password} />
            <button disabled={isLoginPending || isSignupPenging}>{mode}</button>
          </form>
          {mode !== "login" && (
            <>
              <p>ERROR: {loginError}</p>
              <p>Already a user? <Link to="/login">Login</Link></p>
            </>
          )}
          {mode !== "signup" && (
            <>
              <p>ERROR: {signupError}</p>
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </>
          )}
        </>
      )}
    </Panel>
  );
};

export default AuthForm;
