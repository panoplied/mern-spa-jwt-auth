import { useLogout } from "../../hooks/useLogout";

import Avatar from "boring-avatars";
import Panel from "../UI/Panel";

const UserProfile = ({ user }) => {
  const { logout } = useLogout();

  const logoutClickHandler = () => {
    logout();
  };

  const generativeUserPic = (
    <Avatar
      size={256}
      name={user.email}
      variant="pixel"
      colors={["#330708", "#E84624", "#E87624", "#E8A726", "#E8D826"]}
    />
  );

  return (
    <Panel>
      <p>Logged in as {user.email}</p>
      <div>{generativeUserPic}</div>
      <button onClick={logoutClickHandler}>Logout</button>
    </Panel>
  );
};

export default UserProfile;
