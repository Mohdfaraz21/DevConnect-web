import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed.length) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      //console.log(res.data);

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      //TODO: Handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new User found!!</h1>;
  return (
    feed && (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          People You May Know
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {feed.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    )
  );
};

export default Feed;
