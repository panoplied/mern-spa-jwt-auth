import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

import UserProfile from "../components/UserProfile";
// import ConeVideo from "../video/cone1440.webm";
import ConeVideo from "../video/cone720.webm";
import styles from "./Home.module.css";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      <h1 className={styles.title}>AEThERNA</h1>

      {user && <UserProfile user={user} />}

      {!user && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}

      <video autoPlay muted loop className={styles.video}>
        <source src={ConeVideo} type="video/webm" />
      </video>

    </>
  );
};

export default Home;
