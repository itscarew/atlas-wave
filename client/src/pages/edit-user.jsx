import React, { useEffect } from "react";
import MainLayout from "../layouts/main-layout";
import EditUser from "../components/User-Account/edit-user";
import EditUserPassword from "../components/User-Account/edit-user-password";
import DeleteUser from "../components/User-Account/delete-user";

const EditUserPage = ({ history }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayout>
      <div className="w-full max-w-lg mx-auto flex flex-col">
        <EditUser history={history} />
        <EditUserPassword />
        <DeleteUser />
      </div>
    </MainLayout>
  );
};

export default EditUserPage;
