import { useLogout } from "../../hooks/useLogout";

import Avatar from "boring-avatars";

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
    <div>
      <p>Logged in as {user.email}</p>
      <div>{generativeUserPic}</div>
      <button onClick={logoutClickHandler}>Logout</button>
    </div>
  );
};

export default UserProfile;
