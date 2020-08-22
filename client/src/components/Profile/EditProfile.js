import React from "react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

import EditUserPassword from "./EditUserPassword";

const EditPofile = ({history}) => {
  return (
    <div className = "w-full max-w-lg mx-auto flex flex-col" >
      <EditUser history = {history} />
      <EditUserPassword />
      <DeleteUser/>
    </div>
  );
};

export default EditPofile;
