import React from "react";
import SlicedUsers from "./sliced-users";
import { H5 } from "../text/text";
import { AiOutlineUser } from "react-icons/ai";

const AllUsers = ({ allUsers, loadMore, limit }) => {
  const filteredUsers = allUsers?.filter((user) => user.role !== "admin");

  return (
    <>
      <div className="w-full flex my-4 items-center ">
        <H5> Users </H5>
        <AiOutlineUser className="ml-2" size="1.5rem" />
      </div>

      <table className="w-full table-auto border my-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Joined </th>
            <th className="border px-4 py-2">Priviledge</th>
            <th className="border px-4 py-2">action</th>
          </tr>
        </thead>
        <tbody>
          <SlicedUsers
            users={filteredUsers}
            loadMore={loadMore}
            limit={limit}
          />
        </tbody>
      </table>
    </>
  );
};

export default AllUsers;
