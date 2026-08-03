import React, { useEffect, useState } from "react";
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

  // Responsive columns -> items per page
  const [columns, setColumns] = useState(4);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 640) setColumns(1);
      else if (w < 768) setColumns(2);
      else if (w < 1024) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    // reset to first page if feed or columns changed in a way that invalidates the page
    setPage(1);
  }, [columns]);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new User found!!</h1>;
  const itemsPerPage = columns;
  const totalPages = Math.max(1, Math.ceil(feed.length / itemsPerPage));

  const start = (page - 1) * itemsPerPage;
  const paged = feed.slice(start, start + itemsPerPage);

  return (
    feed && (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          People You May Know
        </h2>

        <div className="flex justify-center">
          <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paged.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        {feed.length > itemsPerPage && (
          <div className="flex justify-center mt-8">
            <div className="btn-group">
              <button
                className="btn btn-sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Feed;
