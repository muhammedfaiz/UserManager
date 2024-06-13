import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../features/auth/authSlice";
import Progress from "../components/Progress";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, error } = useSelector(store => store.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (isSuccess || user) {
      toast.success("User registered");
      navigate("/");
    }
  }, [user, isSuccess, error, navigate, dispatch]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
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

  const validate = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profile) {
        formData.append("image", profile);
      }
      dispatch(register(formData));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-700">
      <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Create a new account
        </div>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
          Already have an account ?
          <Link
            to="/login"
            className="text-sm text-blue-500 underline hover:text-blue-700 ml-1"
          >
            Login
          </Link>
        </span>
        <div className="p-6 mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="create-account-name"
                  className={`rounded-lg border-transparent flex-1 appearance-none border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.name ? "focus:ring-red-500" : "focus:ring-purple-600"
                  } focus:border-transparent`}
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="text"
                  id="create-account-email"
                  className={`rounded-lg border-transparent flex-1 appearance-none border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.email ? "focus:ring-red-500" : "focus:ring-purple-600"
                  } focus:border-transparent`}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="password"
                  id="create-account-password"
                  className={`rounded-lg border-transparent flex-1 appearance-none border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.password ? "focus:ring-red-500" : "focus:ring-purple-600"
                  } focus:border-transparent`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex flex-col mb-2">
              <div className="relative">
                <input
                  type="password"
                  id="create-account-confirm-password"
                  className={`rounded-lg border-transparent flex-1 appearance-none border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-purple-600"
                  } focus:border-transparent`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex flex-col mb-2">
              <div className="relative">
                {preview ? (
                  <img src={preview} alt="Image-Preview" className="p-3 h-52" />
                ) : null}
                <input
                  type="file"
                  id="create-account-profile-image"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
