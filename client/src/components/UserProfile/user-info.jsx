import React from "react";
import moment from "moment";

const UserInfo = ({ authName, user }) => {
  return (
    <div>
      <h2 className="text-4xl">{user?.name} </h2>
      <h3 className="text-2xl font-semibold"> {user?.username} </h3>
      <h6 className="text-xs text-gray-600 ">
        {authName === user?.name ? "You" : user?.name} Joined on{" "}
        {moment(user?.joined).format("MMMM Do, YYYY")}
      </h6>
    </div>
  );
};

export default UserInfo;
