import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

import UserProfile from "../components/UserProfile";
import BackgroundVideo from "../components/BackgroundVideo/BackgroundVideo";
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

      <BackgroundVideo />
    </>
  );
};

export default Home;
