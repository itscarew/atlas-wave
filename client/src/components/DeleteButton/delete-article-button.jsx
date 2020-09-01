import React, { useState } from "react";
import { connect } from "react-redux";

import { H5 } from "../text/text";
import Button from "../button";
import CustomModal from "../modal";

import { deleteArticle } from "../../redux/actions/article.actions";

import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteArticleButton = ({
  articleUserId,
  articleId,
  auth,
  deleteArticle,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onDelete = (articleId) => {
    deleteArticle(articleId);
  };
  return (
    <>
      {articleUserId === auth.user?._id ? (
        <RiDeleteBin6Line
          className="cursor-pointer"
          onClick={openModal}
          color="red"
          size="1em"
        />
      ) : null}

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="flex flex-col justify-center m-8">
          <H5>Are you sure you want to delete your Article ?</H5>
          <div className="flex justify-center mt-4">
            <Button
              className="w-full bg-teal-500 text-white m-4  "
              onClick={closeModal}
            >
              DISCARD
            </Button>
            <Button
              className="w-full bg-gray-900  text-white m-4  "
              onClick={() => onDelete(articleId)}
            >
              DELETE
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteArticle })(DeleteArticleButton);
