import React from "react";
import moment from "moment";
import RemoveUserButton from "../DeleteButton/delete-user-button";

const User = ({ user }) => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2">{user._id}</td>
        <td className="border px-4 py-2"> {user.username} </td>
        <td className="border px-4 py-2"> {user.name} </td>
        <td className="border px-4 py-2"> {user.email} </td>
        <td className="border px-4 py-2">{moment(user.joined).fromNow()}</td>
        <td className="border px-4 py-2">{user.role}</td>
        <td className="border px-4 py-2 ">
          <RemoveUserButton userId={user._id} />
        </td>
      </tr>
    </>
  );
};

export default User;
