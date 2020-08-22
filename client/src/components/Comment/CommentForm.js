import React from "react";

const CommentForm = ({ content, onComment, onChange }) => {
  return (
    <div>
      <form onSubmit={onComment} className="flex">
        <input
          type="text"
          placeholder="Comment..."
          name="content"
          value={content}
          className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          onChange={onChange}
          required
        />
        <button
          className="bg-teal-500 text-white p-2 outline-none "
          type="submit"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
