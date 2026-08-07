import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [dispatch]);

  if (!connections) return null;

  const validConnections = connections.filter(
    (connection) =>
      connection &&
      connection._id &&
      (connection.firstName || connection.lastName || connection.photoUrl),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-10 rounded-[2rem] border border-white/10 bg-base-200/60 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Connections
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white">
              Your developer network
            </h1>
            <p className="mt-3 max-w-2xl text-base text-base-content/70">
              Explore the people you've connected with and start meaningful
              conversations with developers from your network.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-primary px-6 py-5 text-white shadow-lg shadow-primary/30">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-content/80">
              Connected
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {validConnections.length}
            </p>
          </div>
        </div>
      </section>

      {validConnections.length === 0 ? (
        <div className="rounded-[2rem] bg-base-200 p-10 text-center text-base-content/70 shadow-xl shadow-black/10">
          <h2 className="text-2xl font-semibold text-white">
            No connections yet
          </h2>
          <p className="mt-3">
            Start connecting with developers to grow your network.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {validConnections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-base-300/70 p-6 shadow-xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:bg-base-300"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-5">
                    <div className="relative h-24 w-24 rounded-[1.5rem] overflow-hidden bg-base-200 shadow-lg">
                      <img
                        alt="photo"
                        className="h-full w-full object-cover"
                        src={photoUrl}
                      />
                      <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 rounded-full bg-primary ring-2 ring-base-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        {firstName} {lastName}
                      </h2>
                      <p className="mt-1 text-sm text-base-content/70">
                        {age && gender ? `${age}, ${gender}` : "Developer"}
                      </p>
                      <div className="mt-3 inline-flex rounded-full bg-base-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-base-content/70">
                        Developer
                      </div>
                    </div>
                  </div>

                  <Link to={`/chat/${_id}`}>
                    <button className="btn btn-primary btn-sm min-w-[110px]">
                      Chat
                    </button>
                  </Link>
                </div>

                <div className="mt-6 rounded-[1.7rem] bg-base-200 p-5">
                  <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/60">
                    About
                  </h3>
                  <p className="mt-3 text-base text-base-content/80">
                    {about || "No profile details available."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Connections;
