import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createArticle } from "../redux/actions/article.actions";
import FormLayout from "../components/form";
import TextAreaLayout from "../components/textarea";
import InputLayout from "../components/input";
import { P } from "../components/text/text";

import Button from "../components/button";
import CustomClipLoader from "../components/loader/cliploader";
import MainLayout from "../layouts/main-layout";

//reat icons
import { GrFormPreviousLink } from "react-icons/gr";
import { IoIosCreate } from "react-icons/io";

const CreateArticlePage = ({
  createArticle,
  articles: { loading },
  history,
}) => {
  const initialState = { title: "", content: "", articleImage: "" };
  const [article, setArticle] = useState(initialState);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const onChangeHandler = (e) =>
    setArticle({ ...article, [e.target.name]: e.target.files[0] });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, content, articleImage } = article;

    const form = new FormData();
    form.append("articleImage", articleImage);
    form.append("title", title);
    form.append("content", content);
    createArticle(form, history);
  };

  const { title, content } = article;

  return (
    <MainLayout>
      <div className="w-1/2 mx-auto my-12">
        <FormLayout
          onSubmit={onSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
        >
          <div
            className="flex items-center mb-4 cursor-pointer "
            onClick={() => {
              history.goBack();
            }}
          >
            <GrFormPreviousLink size="1.5rem" />
            <P className="ml-2"> go back</P>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">Title</label>
            <TextAreaLayout
              placeholder="Your Title"
              name="title"
              value={title}
              onChange={handleChange}
              required
              className="shadow-sm appearance-none border rounded  text-gray-700 text-2xl "
            ></TextAreaLayout>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm  mb-2">
              Your Article Image (recommended)* Size not more than 3mb*
            </label>
            <InputLayout
              type="file"
              name="articleImage"
              onChange={onChangeHandler}
              required
              className="appearance-none w-full py-2 px-3 text-gray-700 text-2xl leading-tight"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm  mb-2">
              Wrtie your story here <IoIosCreate className="inline" />
            </label>
            <TextAreaLayout
              value={content}
              placeholder="Your Story ...."
              name="content"
              onChange={handleChange}
              rows="6"
              required
              className="shadow-sm appearance-none border rounded  text-gray-700 text-2xl "
            ></TextAreaLayout>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="bg-teal-500 hover:bg-gray-900 text-white w-full"
            >
              <CustomClipLoader loading={loading}>
                {" "}
                Post Your Article
              </CustomClipLoader>
            </Button>
          </div>
        </FormLayout>
      </div>
    </MainLayout>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles,
});

export default connect(mapStateToProps, { createArticle })(CreateArticlePage);
