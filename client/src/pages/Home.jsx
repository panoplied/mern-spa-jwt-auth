import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

import UserProfile from "../components/UserProfile";

import ConeVideo from "../video/cone1440.webm";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      {user && <UserProfile user={user} />}

      {!user && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}

      <video autoPlay muted loop>
        <source src={ConeVideo} type="video/webm" />
      </video>
    </>
  );
};

export default Home;
