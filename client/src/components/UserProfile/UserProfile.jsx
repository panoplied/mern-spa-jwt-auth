import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";

import Avatar from "boring-avatars";
import Panel from "../UI/Panel";

import styles from "./UserProfile.module.css";

const UserProfile = ({ user }) => {
  const { logout } = useLogout();
  const logoutHandler = () => logout();

  const Logout = () => <>{"Logout"}</>;
  const UserName = () => <>{user.email}</>;
  const UserPic = ({ name, variant, colors, size, square }) => (
    <Avatar
      name={name}
      variant={variant}
      colors={colors}
      size={size}
      square={square}
    />
  );

  const userPicVariants = [
    "beam",
    "marble",
    "pixel",
    "sunset",
    "bauhaus",
    "ring",
  ];
  const [picVariantIndex, setPicVariantIndex] = useState(0);
  const handleVariantChange = (event) => {
    setPicVariantIndex((prevIndex) => {
      if (prevIndex >= 5) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  return (
    <Panel className={styles.profile}>
      <div className={styles.userpic} onClick={handleVariantChange}>
        <UserPic
          name={user.email}
          variant={userPicVariants[picVariantIndex]}
          colors={["#330708", "#E84624", "#E87624", "#E8A726", "#E8D826"]}
          size={256}
          square={false}
        />
      </div>

      <div className={styles.username}>
        <UserName />
      </div>

      <div className={styles.logout} onClick={logoutHandler}>
        <Logout />
      </div>
    </Panel>
  );
};

export default UserProfile;
