import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import LandingPic from "../assets/landing-pic.jpg";
import LandingPicArticle from "../assets/landing-pic-articles.jpg";
import LandingPicGirl from "../assets/landing-pic-girl.jpg";
import LandingPicPeople from "../assets/landing-pic-people.jpg";

import { H1, P, H2, H5, H7 } from "../components/text/text";
import CustomLink from "../components/custom-link";

const LandingContent = () => {
  return (
    <div className="flex flex-col items-center m-6">
      <H1 className="text-grey-900 font-serif">Atlas Wave</H1>

      <H5 className="text-gray-600 mb-2">
        {" "}
        Dive and dig deeper on topics that matter to you, and topics of your
        interest !!{" "}
      </H5>

      <H7 className="m-2">
        Post articles with pictures here. This is a whole new wave !!
      </H7>

      <div className="flex m-6  items-center ">
        <span className="m-2 flex items-center text-gray-600 ">
          <AiFillCheckCircle size="2em" color="#38b2ac" />
          <P className="ml-2">World-class.</P>
        </span>
        <span className="m-2 flex items-center text-gray-600 ">
          <AiFillCheckCircle size="2em" color="#38b2ac" />{" "}
          <P className="ml-2"> Undiscovered voices. </P>
        </span>
        <span className="m-2 flex items-center text-gray-600 ">
          <AiFillCheckCircle size="2em" color="#38b2ac" />{" "}
          <P className="ml-2"> Topics you love. </P>
        </span>
        <P className="m-2 ">All on Atlaswave, all for you.</P>
      </div>

      <div className="flex flex-col justify-center mb-6">
        <CustomLink
          className="flex justify-center bg-teal-500 hover:bg-gray-900 text-white py-4 px-12 rounded"
          to="/signup"
        >
          Get Started
        </CustomLink>
        <P className="mt-4">
          Already have an account?
          <CustomLink className="text-teal-500" to="/signin">
            {" "}
            Sign in.
          </CustomLink>
        </P>
      </div>

      <div className="m-4 w-2/3">
        <img
          src={LandingPic}
          className="object-cover height-20rem w-full"
          alt="landing-pic"
        />
      </div>

      <div className="w-full flex justify-between items-start my-8 ">
        <div className="w-1/2 m-8 ">
          <H2> World-class publications </H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </P>
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
        <div className="w-1/2 m-8 ">
          <H2> The topics you love</H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </P>
        </div>
      </div>

      <div className="w-full flex justify-between items-start my-8 ">
        <div className="w-1/2 m-8 ">
          <H2> Undiscovered voices </H2>
          <P>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </P>
        </div>

        <div className="w-1/2">
          <img
            src={LandingPicPeople}
            className="object-cover height-20rem w-full"
            alt="people-pic"
          />
        </div>
      </div>

      <div className="flex w-1/2 mx-auto flex-col items-center justify-between  m-2 mb-8 border-b pb-10 border-black  ">
        <P className="my-4  ">
          {" "}
          Tell the world your story on newwave.{" "}
          <CustomLink className="text-teal-600" to="/signup">
            Get Started{" "}
          </CustomLink>{" "}
        </P>{" "}
        <H5 className="text-gray-800 text-center mt-8 mb-12 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </H5>
      </div>

      <div className="flex flex-col mx-auto w-1/2 mb-8 items-center justify-between  ">
        <H1 className="font-serif  text-gray-800 mb-2 ">
          Expand your reading.
        </H1>
        <H1 className="font-serif   text-gray-800 mb-2  ">
          {" "}
          Expand your mind.{" "}
        </H1>
        <CustomLink
          className="flex justify-center bg-gray-900 hover:bg-teal-600 text-white py-4 px-12 m-2 rounded"
          to="/signup"
        >
          Get Started
        </CustomLink>
      </div>
    </div>
  );
};

export default LandingContent;
