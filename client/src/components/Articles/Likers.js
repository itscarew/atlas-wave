import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Likers = ({ noOfLikes, likes }) => {
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
      height: "20rem",
      overflowY: "scroll",
    },
  };

  return (
    <div>
      <p className="ml-2 cursor-pointer" onClick={openModal}>
        {noOfLikes} {noOfLikes > 1 ? "likes" : "like"}{" "}
      </p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="flex flex-col justify-center m-8">
          <h2 className="text-1xl font-semibold">Likes </h2>
          <div className="flex flex-col justify-center mt-4">
            {likes?.map((like) => (
              <div key={like._id} className="flex flex-col border-b py-2">
                <Link className="font-semibold " to={`/user/${like.user?._id}`}>
                  {" "}
                  {like.user?.name}{" "}
                </Link>
                <Link to={`/user/${like.user?._id}`}>
                  {like.user?.username}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Likers;
