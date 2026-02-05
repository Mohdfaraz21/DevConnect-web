import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch()

    const handleSendRequest = async (status, userId) => {
      try {
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true})
        dispatch(removeUserFromFeed(userId))
      }catch(err) {
        console.log(err)
      }
    }

      
    
return (
  <div className="card bg-base-300 w-80 shadow-xl overflow-hidden h-auto">

    {/* Image */}
    <figure className="relative h-72">
      <img
        src={photoUrl}
        alt="profile"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h2 className="text-white text-xl font-bold">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-white opacity-80">
            {age}, {gender}
          </p>
        )}
      </div>
    </figure>

    {/* Body */}
    <div className="card-body items-center text-center p-4">

      {about && (
        <p className="opacity-80 mb-2">
          {about}
        </p>
      )}

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

    </div>
  </div>
);



};

export default UserCard;
