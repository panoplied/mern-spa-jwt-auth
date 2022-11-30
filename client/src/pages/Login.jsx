import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // TODO implement actual login request
    console.log("DEBUG | LOGIN | ", email, password);
  };

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Login Page</h1>
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
      </form>
    </>
  );
};

export default Login;
