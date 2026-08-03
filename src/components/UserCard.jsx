import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials =
    `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`.toUpperCase();

  return (
    <div className="card bg-base-300 w-full max-w-sm shadow-xl overflow-hidden h-auto transform transition-transform hover:scale-105">
      {/* Image */}
      <figure className="relative h-72 bg-gray-700 overflow-hidden">
        {photoUrl && !imgError ? (
          <>
            <img
              src={photoUrl}
              alt="profile"
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            />

            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                <div className="w-12 h-12 rounded-full border-4 border-white/20 animate-spin" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500">
            <span className="text-4xl font-bold text-white">{initials}</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h2 className="text-white text-xl font-semibold">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-white opacity-80 text-sm">
              {age}, {gender}
            </p>
          )}
        </div>
      </figure>

      {/* Body */}
      <div className="card-body items-center text-center p-4">
        {about && <p className="text-gray-300 mb-3 leading-relaxed">{about}</p>}

        {showActions && (
          <div className="card-actions justify-center gap-4">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
