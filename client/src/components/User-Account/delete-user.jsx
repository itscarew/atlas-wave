import React from "react";
import { connect } from "react-redux";
import { deleteCurrentUser } from "../../redux/actions/user.actions";
import { H3, H5 } from "../text/text";
import CustomModal from "../modal";
import Button from "../button";

const DeleteUser = ({ deleteCurrentUser }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className=" w-full mx-auto mt-6 mb-6 px-8 pt-4 pb-4 ">
      <H3 className="py-2 px-3 text-red-600 leading-tight ">Danger zone*</H3>
      <Button
        className=" border border-red-700 text-red-600  hover:bg-red-700 hover:text-white m-4"
        type="submit"
        onClick={openModal}
      >
        DELETE YOUR ACCOUNT
      </Button>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col justify-center m-8">
          <H5>You are about to delete your account !</H5>
          <div className="flex justify-center mt-4">
            <Button
              className="w-full bg-teal-500   text-white m-4 rounded "
              onClick={closeModal}
            >
              NO
            </Button>
            <Button
              className="w-full bg-gray-900 text-white m-4  rounded "
              onClick={() => deleteCurrentUser()}
            >
              GO AHEAD
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default connect(undefined, { deleteCurrentUser })(DeleteUser);
