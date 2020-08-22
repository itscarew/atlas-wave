import React from "react";
import { connect } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import Modal from "react-modal";

import { deleteArticle } from "../../redux/actions/article.actions";

const DeleteButton = ({ articleUserId, articleId, auth, deleteArticle }) => {
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

  const onDelete = (articleId) => {
    deleteArticle(articleId);
  };

  return (
    <div>
      {articleUserId === auth.user?.userId ? (
        <RiDeleteBin6Line
          className="cursor-pointer"
          onClick={openModal}
          color="red"
          size="1em"
        />
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-center m-8">
          <h2 className="text-2xl">
            Are you sure you want to delete your Article ?
          </h2>
          <div className="flex justify-center mt-4">
            <button
              className="w-full flex items-center justify-center bg-teal-500 text-white m-4 p-2 rounded "
              onClick={closeModal}
            >
              DISCARD
            </button>
            <button
              className="w-full flex items-center justify-center bg-gray-900  text-white m-4 p-2  rounded "
              onClick={() => onDelete(articleId)}
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteArticle })(DeleteButton);
