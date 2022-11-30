import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const logoutClickHandler = () => {
    logout();
  }

  return (
    <>
      <h1>Home Page</h1>
      {user && (
        <div>
          <p>{user.email}</p>
          <button onClick={logoutClickHandler}>Logout</button>
        </div>
      )}
    </>
  );
};

export default Home;
