import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

import UserProfile from "../components/UserProfile";
import Scanlines from "../components/Scanlines";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Scanlines />

      {user && <UserProfile user={user} />}

      {!user && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </>
  );
};

export default Home;
