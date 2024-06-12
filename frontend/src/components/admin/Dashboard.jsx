import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeUser,reset } from "../../features/admin/adminSlice";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState(users);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const { data, isLoading, isSuccess, error } = useSelector(
    (store) => store.admin
  );
  useEffect(() => {
    if (isSuccess) {
      setUsers(data);
      return;
    }
    if (error) {
      toast.error(error);
      return;
    }
    dispatch(reset());
  }, [data, isSuccess, error,dispatch]);

  useEffect(() => {
    setFilteredUser(users);
  }, [users]);

  const handleSearch = (e) => {
    e.preventDefault();
    const data = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.includes(search)
    );
    setFilteredUser(data);
    console.log(filteredUser);
  };

  const handleDelete = (e,id)=>{
    e.preventDefault();
    dispatch(removeUser(id));
  }
  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight">Users</h2>
          <div className="text-end">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Search.."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center m-24">
            <Spinner />
          </div>
        ) : (
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUser &&
                    filteredUser.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="#" className="relative block">
                                  {user.image ? (
                                    <img
                                      alt="profil"
                                      src={`http://localhost:8000/uploads/${user.image}`}
                                      className="mx-auto object-cover rounded-full h-10 w-10 "
                                    />
                                  ) : (
                                    <div className="text-dark mx-2">
                                      <svg
                                        width="30"
                                        fill="black"
                                        height="30"
                                        className="dark:text-white text-black"
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                      </svg>
                                    </div>
                                  )}
                                </a>
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.isAdmin ? "Admin" : "User"}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                              ></span>
                              <span className="relative">active</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <Link
                              to={`/admin/user-edit/${user._id}`}
                              className="text-indigo-600 hover:text-indigo-900 m-4"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e)=>handleDelete(e,user._id)}
                              className="text-red-600 hover:text-red-900 m-4"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
