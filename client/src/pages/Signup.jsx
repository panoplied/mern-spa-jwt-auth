import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
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
    // TODO implement actual signup request
    console.log("DEBUG | SIGNUP | ", email, password);
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
        <button>Signup</button>
      </form>
    </>
  );
};

export default Signup;
