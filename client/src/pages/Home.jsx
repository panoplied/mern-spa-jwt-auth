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
        <Panel>
          <div className={styles.auth}>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Sign Up</button></Link>
          </div>
        </Panel>
      )}
    </>
  );
};

export default Home;
