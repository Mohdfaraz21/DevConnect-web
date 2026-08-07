import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeed = async () => {
      if (feed.length) return;
      setError(null);

      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });

        dispatch(addFeed(res?.data?.data));
      } catch (error) {
        console.error("Failed to fetch feed:", error);
        setError(
          "Unable to load people suggestions right now. Please try again later.",
        );
      }
    };

    getFeed();
  }, [dispatch, feed.length]);

  if (!feed) return null;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new User found!!</h1>;

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          People You May Know
        </h2>

        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-6">
          {feed.map((user) => (
            <div key={user._id} className="flex justify-center">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
