import React, { useState } from "react";
import { connect } from "react-redux";

import { H5 } from "../text/text";
import Button from "../button";
import CustomModal from "../modal";

import { deleteComment } from "../../redux/actions/comment.actions";

//React icons
import { RiDeleteBin6Line } from "react-icons/ri";

const RemoveCommentButton = ({ commentId, deleteComment }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onDelete = (commentId) => {
    deleteComment(commentId);
  };

  return (
    <>
      <RiDeleteBin6Line
        className="cursor-pointer"
        onClick={openModal}
        color="red"
        size="1em"
      />
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col justify-center m-8">
          <H5>Are you sure you want to delete your comment?</H5>
          <div className="flex justify-center mt-4">
            <Button
              className="w-full  bg-teal-500  text-white m-4 "
              onClick={closeModal}
            >
              DISCARD
            </Button>
            <Button
              className="w-full  bg-gray-900  text-white m-4   "
              onClick={() => onDelete(commentId)}
            >
              DELETE
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default connect(undefined, { deleteComment })(RemoveCommentButton);
