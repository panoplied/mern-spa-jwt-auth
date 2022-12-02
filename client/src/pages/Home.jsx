import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

// Components
import UserProfile from "../components/UserProfile";
import Scanlines from "../components/Scanlines";
import NFTMonitor from "../components/NFTMonitor";

// Resources
import ConeVideo from "../video/cone1440.webm";

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

      <video autoPlay muted loop>
        <source src={ConeVideo} type="video/webm" />
      </video>

      <NFTMonitor />
    </>
  );
};

export default Home;
