import React from "react";
import InputLayout from "../input";
import Button from "../button";
import FormLayout from "../form";

const CommentForm = ({ content, onComment, onChange }) => {
  return (
    <>
      <FormLayout onSubmit={onComment} className="flex">
        <InputLayout
          type="text"
          placeholder="Comment..."
          name="content"
          value={content}
          className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight "
          onChange={onChange}
          required
        />
        <Button
          comment
          className="bg-teal-500 text-white p-2 outline-none "
          type="submit"
        >
          Comment
        </Button>
      </FormLayout>
    </>
  );
};

export default CommentForm;
