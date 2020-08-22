import React from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/comment.actions";
import { RiDeleteBin6Line } from "react-icons/ri";

import Modal from "react-modal";

const RemoveCommentButton = ({ commentId, deleteComment }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onDelete = (commentId) => {
    deleteComment(commentId);
  };

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
    <React.Fragment>
      <RiDeleteBin6Line
        className="cursor-pointer"
        onClick={openModal}
        color="red"
        size="1em"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-center m-8">
          <h2 className="text-2xl">
            Are you sure you want to delete your comment?
          </h2>
          <div className="flex justify-center mt-4">
            <button
              className="w-full flex items-center justify-center bg-teal-500  text-white m-4 p-2 rounded"
              onClick={closeModal}
            >
              DISCARD
            </button>
            <button
              className="w-full flex items-center justify-center bg-gray-900  text-white m-4 p-2  rounded "
              onClick={() => onDelete(commentId)}
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default connect(undefined, { deleteComment })(RemoveCommentButton);
