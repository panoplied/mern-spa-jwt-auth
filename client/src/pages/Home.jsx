import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

import UserProfile from "../components/UserProfile";
import Panel from '../components/Panel';

import styles from "./Home.module.css";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      {user && <UserProfile user={user} />}

      {!user && (
        <Panel className={styles.auth}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </Panel>
      )}
    </>
  );
};

export default Home;
