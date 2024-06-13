import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Progress from "../components/Progress";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formToggle, setFormToggle] = useState(false);
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { user, isLoading, isSuccess, error } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(profile);
    setProfile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (isSuccess) {
      toast.success("User Updated");
      setFormToggle(false);
      navigate("/profile");
    }
  }, [isSuccess, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (profile) {
      formData.append("image", profile);
    }
    dispatch(updateProfile(formData));
  };
  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      {!formToggle && (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              {user.image ? (
                <img
                  className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                  src={`http://localhost:8000/uploads/${user.image}`}
                  alt="profile"
                />
              ) : (
                <div className="flex justify-center mx-auto m-5">
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
                </div>
              )}
              <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {user.name}
                </h3>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="flex gap-2 px-2">
              <button
                onClick={() => setFormToggle(true)}
                className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
              >
                Edit
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 rounded-full bg-white text-dark dark:text-dark antialiased font-bold hover:bg-gray-300 dark:hover:bg-gray-500 px-4 py-2"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      )}

      {formToggle && (
        <div className="flex justify-center items-center h-screen dark:bg-gray-700">
          <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-1 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
              Edit Your Account
            </div>

            <div className="p-3 mt-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="create-account-pseudo"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      name="pseudo"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="text"
                      id="create-account-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="password"
                      id="create-account-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <input
                      type="password"
                      id="create-account-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Image-Preview"
                        className="p-3 h-52"
                      />
                    ) : null}
                    <input
                      type="file"
                      id="create-account-email"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Confirm Password"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                {isLoading && (
                  <div className="m-5 p-3">
                    <Progress />
                  </div>
                )}
                <div className="flex w-full my-4">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            <button
              onClick={() => setFormToggle(false)}
              className="flex-2 rounded-full mt-5 bg-white text-dark  antialiased font-bold hover:bg-gray-400 dark:hover:bg-gray-400 px-3 py-2"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
