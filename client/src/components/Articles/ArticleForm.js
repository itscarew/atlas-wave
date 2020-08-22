import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticle } from "../../redux/actions/article.actions";
import { GrFormPreviousLink } from "react-icons/gr";
import { IoIosCreate } from "react-icons/io";

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      articleImage: "",
      content: "",
      error: {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { articleImage, title, content } = this.state;

    const form = new FormData();
    form.append("articleImage", articleImage);
    form.append("title", title);
    form.append("content", content);
    this.props.createArticle(form, this.props.history);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  };

  render() {
    const { err } = this.state.error;
    const { loading } = this.props.articles;
    return (
      <div className="w-1/2 mx-auto mt-12">
        <form
          onSubmit={this.onSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4"
        >
          <div
            className="flex items-center mb-4 cursor-pointer "
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            <GrFormPreviousLink size="1.5rem" />
            <p className="ml-2"> go back</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm  mb-2">Title</label>
            <textarea
              placeholder="Your Title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 text-2xl  leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm  mb-2">
              Your Article Image (recommended)*
            </label>
            <input
              type="file"
              name="articleImage"
              onChange={this.onChangeHandler}
              required
              className="appearance-none  w-full py-2 px-3 text-gray-700 text-2xl leading-tight"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm  mb-2">
              Wrtie your story here <IoIosCreate className="inline" />
            </label>
            <textarea
              value={this.state.content}
              placeholder="Your Story ...."
              name="content"
              onChange={this.handleChange}
              rows="6"
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 text-2xl  leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-teal-500 hover:bg-gray-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Creating Article..." : "Post Your Article"}
            </button>
          </div>

          {err ? (
            <div className="text-center mt-4 text-red-500 text-sm"> {err} </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  articles: state.articles,
});

export default connect(mapStateToProps, { createArticle })(ArticleForm);
