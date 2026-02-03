import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      console.log(res.data);
      
      dispatch(addFeed(res.data));
    } catch (error) {
      //TODO: Handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return <div>Hello from, Feed</div>;
};

export default Feed;
