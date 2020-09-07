import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import User from "./user";

const SlicedUsers = ({ users, limit, loadMore }) => {
  return (
    <>
      {users?.slice(0, limit).map((user) => (
        <User key={user._id} user={user} />
      ))}

      {users.length > limit ? (
        <tr>
          <td
            onClick={() => loadMore()}
            className="flex mx-auto my-12 justify-center "
          >
            <BsFillPlusCircleFill
              size="1rem"
              fill="#1a202c"
              className="cursor-pointer"
            />
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default SlicedUsers;
