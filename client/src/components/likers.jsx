import React from "react";
import CustomLink from "./custom-link";
import CustomModal from "./modal";
import { P, H6 } from "./text/text";

const Likers = ({ noOfLikes, likes }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <P className="ml-2 cursor-pointer" onClick={openModal}>
        {noOfLikes} {noOfLikes > 1 ? "likes" : "like"}{" "}
      </P>
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <H6 className="px-8 font-semibold">Likes </H6>
        <div
          className="px-8 py-2"
          style={{ height: "50vh", overflowY: "scroll" }}
        >
          <div className="flex flex-col justify-center mt-4">
            {likes?.map((like) => (
              <div key={like._id} className="flex flex-col border-b py-2">
                <CustomLink
                  className="font-semibold "
                  to={`/user/${like.user?._id}`}
                >
                  {" "}
                  {like.user?.name}{" "}
                </CustomLink>
                <CustomLink to={`/user/${like.user?._id}`}>
                  {like.user?.username}
                </CustomLink>
              </div>
            ))}
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default Likers;
