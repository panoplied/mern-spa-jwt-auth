import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending, error } = useSignup();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await signup(email, password);
  };

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Signup Page</h1>
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
        <button disabled={isPending}>Signup</button>
        {error && <p>ERROR: {error}</p>}
      </form>
    </>
  );
};

export default Signup;
