import React from "react";
import { connect } from "react-redux";
import { deleteCurrentUser } from "../../redux/actions/user.actions";
import Modal from "react-modal";

const DeleteUser = ({ deleteCurrentUser }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className=" w-full mx-auto mt-6 mb-6 px-8 pt-4 pb-4 ">
      <p className="appearance-none outline-none  w-full py-2 px-3 text-red-600 leading-tight text-2xl">
        Danger zone*
      </p>
      <button
        className="flex items-center justify-center border border-red-700 text-red-600  hover:bg-red-700 hover:text-white h-10 py-2 px-4 rounded m-4"
        type="submit"
        onClick={openModal}
      >
        DELETE YOUR ACCOUNT
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col justify-center m-8">
          <h2 className="text-2xl">You are about to delete your account !</h2>
          <div className="flex justify-center mt-4">
            <button
              className="w-full flex items-center justify-center bg-teal-500   text-white m-4 p-2 rounded "
              onClick={closeModal}
            >
              NO
            </button>
            <button
              className="w-full flex items-center justify-center bg-gray-900 text-white m-4 p-2  rounded "
              onClick={() => deleteCurrentUser()}
            >
              GO AHEAD
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default connect(undefined, { deleteCurrentUser })(DeleteUser);
