import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

import UserProfile from '../components/UserProfile';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      <h1>Home Page</h1>
      {user && <UserProfile user={user} />}
      {!user &&
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      }
    </>
  );
};

export default Home;
