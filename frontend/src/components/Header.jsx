import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const userInfo = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow py-4 ">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <Link className="flex-shrink-0" to="/">
                <h1 className="text-gray-700 dark:text-white text-xl font-semibold">
                  USER MANAGER
                </h1>
              </Link>
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-white dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="options-menu"
                        onClick={() =>
                          profileToggle
                            ? setProfileToggle(false)
                            : setProfileToggle(true)
                        }
                      >
                        {userInfo && userInfo.image ? (
                          <span className="relative block">
                            <img
                              alt="profile"
                              src={`http://localhost:8000/uploads/${userInfo.image}`}
                              className="mx-auto object-cover rounded-full h-12 w-12 "
                            />
                          </span>
                        ) : (
                          <svg
                            width="30"
                            fill="currentColor"
                            height="30"
                            className="dark:text-white text-black"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                    <div
                      className={
                        profileToggle
                          ? "absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                          : "hidden right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5"
                      }
                    >
                      <div
                        className="py-1 "
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {userInfo ? (
                          <>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Profile</span>
                              </span>
                            </Link>
                            <span
                              onClick={handleLogout}
                              className="block cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Logout</span>
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/register"
                              className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Register</span>
                              </span>
                            </Link>
                            <Link
                              to="/login"
                              className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                              role="menuitem"
                            >
                              <span className="flex flex-col">
                                <span>Login</span>
                              </span>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
