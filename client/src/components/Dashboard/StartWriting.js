import React from 'react';
import {Link} from "react-router-dom"

const StartWriting = ({user}) => {
    return (
        <div className="flex w-full justify-center">
        <div className="flex flex-col items-center mt-32 p-4">
          <p className="text-3xl text-center mb-8">
            Hey {user.name.split(" ")[0]} !, All Articles you post will
            show up here.
          </p>
          <Link
            to="/create"
            className="flex w-1/2 justify-center bg-teal-500 hover:bg-teal-600 text-white py-4 px-12 rounded mb-8"
          >
            Start Writing!!
            <span className="ml-2" role="img" aria-label="party-pooper">
              🎉
            </span>
          </Link>
        </div>
      </div>
    )
}

export default StartWriting