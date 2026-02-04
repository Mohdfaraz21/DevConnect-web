import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  //getting user from the store by useSelector
  const user = useSelector((store) => store.user)
  return user && (
    <div>
      {/*passing user to EditProfile component */}
      <EditProfile user = {user} />
    </div>
  );
};

export default Profile;
