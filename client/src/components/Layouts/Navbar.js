import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { MdExplore } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const Navbar = ({
  auth: {
    user: { username },
    isAuthenticated,
  },
}) => (
  <nav className="flex justify-between items-center mx-8 ">
    <div>
      <NavLink
        to={isAuthenticated ? "/dashboard" : "/"}
        className="text-2xl font-bold text-gray-900 font-serif"
      >
        Atlas Wave
      </NavLink>
    </div>
    <ul className="flex justify-end m-4">
      {isAuthenticated ? (
        <li className="mr-6">
          <NavLink
            activeClassName="hover:text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/dashboard"
          >
            dashboard <MdDashboard className="inline" />
          </NavLink>
        </li>
      ) : null}
      <li className="mr-6">
        <NavLink
          activeClassName="hover:text-teal-600"
          className="text-gray-900 hover:text-teal-600"
          to="/explore"
        >
          explore <MdExplore className="inline" />
        </NavLink>
      </li>
      {isAuthenticated ? (
        <li className="mr-6">
          <NavLink
            activeClassName="hover:text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/create"
          >
            create an article <IoIosCreate className="inline" />
          </NavLink>
        </li>
      ) : null}

      {isAuthenticated ? (
        <li>
          <NavLink
            activeClassName="hover:text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/profile"
          >
            {username} <FiUser className="inline" />
          </NavLink>
        </li>
      ) : null}
      {!isAuthenticated ? (
        <li>
          <NavLink
            activeClassName="hover:text-teal-600"
            className="text-gray-900 hover:text-teal-600"
            to="/register"
          >
            get started <IoIosCreate className="inline" />
          </NavLink>
        </li>
      ) : null}
    </ul>
  </nav>
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
