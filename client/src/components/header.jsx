import React from "react";
import CustomLink from "../components/custom-link";
import { connect } from "react-redux";

import { MdExplore } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdDashboard, MdHome } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const Navbar = ({
  auth: {
    user: { username, role },
    isAuthenticated,
  },
}) => (
  <nav className=" flex justify-between items-center mx-8 ">
    <div>
      <CustomLink
        to={isAuthenticated ? "/home" : "/"}
        className="text-2xl font-bold text-gray-900 font-serif"
      >
        Atlas Wave
      </CustomLink>
    </div>
    <ul className="flex justify-end m-4">
      {isAuthenticated && role === "admin" ? (
        <li className="mr-6">
          <CustomLink
            activeClassName="text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/admindashboard"
          >
            dashboard <MdDashboard className="inline" />
          </CustomLink>
        </li>
      ) : null}
      {isAuthenticated ? (
        <li className="mr-6">
          <CustomLink
            activeClassName="text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/home"
          >
            home <MdHome className="inline" />
          </CustomLink>
        </li>
      ) : null}
      <li className="mr-6">
        <CustomLink
          activeClassName="text-teal-600"
          className="text-gray-900 hover:text-teal-600"
          to="/explore"
        >
          explore <MdExplore className="inline" />
        </CustomLink>
      </li>
      {isAuthenticated ? (
        <li className="mr-6">
          <CustomLink
            activeClassName="text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/create"
          >
            create an article <IoIosCreate className="inline" />
          </CustomLink>
        </li>
      ) : null}

      {isAuthenticated ? (
        <li>
          <CustomLink
            activeClassName="text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/profile"
          >
            {username} <FiUser className="inline" />
          </CustomLink>
        </li>
      ) : null}
      {!isAuthenticated ? (
        <li>
          <CustomLink
            activeClassName="text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/signup"
          >
            get started <IoIosCreate className="inline" />
          </CustomLink>
        </li>
      ) : null}
    </ul>
  </nav>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
