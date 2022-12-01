import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <>
      <p><Link to="/">Home</Link></p>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <label>Email</label>
        <input
          type="email"
          onChange={emailChangeHandler}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={passwordChangeHandler}
          value={password}
        />
        <button disabled={isPending}>Login</button>
        {error && <p>ERROR: {error}</p>}
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </>
  );
};

export default Login;
