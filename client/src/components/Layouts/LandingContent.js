import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import LandingPic from "../../assets/landing-pic.jpg";
import LandingPicArticle from "../../assets/landing-pic-articles.jpg";
import LandingPicGirl from "../../assets/landing-pic-girl.jpg";
import LandingPicPeople from "../../assets/landing-pic-people.jpg";
import { Link } from "react-router-dom";

const LandingContent = () => {
  return (
    <div className="flex flex-col items-center m-6">
      <h1 className="text-6xl  text-grey-900 font-serif">Atlas Wave</h1>
      <p className="text-2xl  text-gray-600 mb-2">
        Dive and dig deeper on topics that matter to you, and topics of your
        interest !!
      </p>

      <p className="text-1xl  m-2">
        Post articles with pictures here. This is a whole new wave !!
      </p>

      <div className="flex m-6  items-center ">
        <span className="m-2 flex items-center text-gray-600 ">
          <AiFillCheckCircle size="2em" color="#38b2ac" />
          <p className="ml-2">World-class publications.</p>
        </span>
        <span className="m-2 flex items-center text-gray-600 ">
          <AiFillCheckCircle size="2em" color="#38b2ac" />{" "}
          <p className="ml-2"> Undiscovered voices. </p>
        </span>
        <span className="m-2 flex items-center text-gray-600 ">
          <AiFillCheckCircle size="2em" color="#38b2ac" />{" "}
          <p className="ml-2"> Topics you love. </p>
        </span>
        <span className="m-2 ">All on Atlaswave, all for you.</span>
      </div>

      <div className="flex flex-col justify-center mb-6">
        <Link
          className="flex justify-center bg-teal-500 hover:bg-gray-900 text-white py-4 px-12 rounded"
          to="/register"
        >
          Get Started
        </Link>
        <p className="mt-4">
          Already have an account?
          <Link className="text-teal-500" to="/login">
            {" "}
            Sign in.
          </Link>
        </p>
      </div>

      <div className="m-4 w-2/3">
        <img
          src={LandingPic}
          className="object-cover height-20rem w-full"
          alt="landing-pic"
        />
      </div>

      <div className="w-full flex justify-between items-start my-8 ">
        <div className="w-1/2 p-4 ">
          <h2 className="text-5xl"> World-class publications </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="w-1/2">
          <img
            src={LandingPicArticle}
            className="object-cover height-20rem w-full"
            alt="article-pic"
          />
        </div>
      </div>

      <div className="w-full flex justify-between items-start my-8 ">
        <div className="w-1/2">
          <img
            src={LandingPicGirl}
            className="object-cover height-20rem w-full "
            alt="girl-pic"
          />
        </div>
        <div className="w-1/2 p-4 ">
          <h2 className="text-5xl"> The topics you love</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-start my-8 ">
        <div className="w-1/2 p-4 ">
          <h2 className="text-5xl"> Undiscovered voices </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className="w-1/2">
          <img
            src={LandingPicPeople}
            className="object-cover height-20rem w-full"
            alt="people-pic"
          />
        </div>
      </div>

      <h4 className="flex w-1/2 mx-auto flex-col items-center justify-between  m-2 mb-8 border-b pb-10 border-black  ">
        <p className="my-4  ">
          {" "}
          Tell the world your story on newwave.{" "}
          <Link className="text-gray-900" to="/register">
            Get Started{" "}
          </Link>{" "}
        </p>{" "}
        <p className="text-gray-800 text-center text-2xl mt-8 mb-12 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </p>
      </h4>

      <div className="flex flex-col mx-auto w-1/2 mb-8 items-center justify-between  ">
        <p className="font-serif text-6xl text-gray-800  ">
          Expand your reading.
        </p>
        <p className="font-serif text-6xl  text-gray-800   ">
          {" "}
          Expand your mind.{" "}
        </p>
        <Link
          className="flex justify-center bg-gray-900 hover:bg-teal-600 text-white py-4 px-12 m-2 rounded"
          to="/register"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingContent;
