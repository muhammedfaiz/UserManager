import { useEffect, useState } from "react";
import Progress from "../Progress";
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails, getUserDetials,reset } from "../../features/admin/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserEdit = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserDetials(userId));
  }, [dispatch,userId]);
  const { data, isLoading, error, isUpdated } = useSelector(
    (store) => store.admin
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preview,setPreview] = useState(null);
  const [profile,setProfile]=useState(null);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);
  
  useEffect(()=>{
    if(isUpdated){
      toast.success("User Updated Successfully");
      dispatch(reset());
      navigate("/admin/dashboard");
    }
    if(error){
        toast.error(error.message);
        return;
    }
  },[isUpdated,dispatch,navigate,error])
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if(profile){
        formData.append("image", profile);
    }
    const body = {id:userId,data:formData}
    dispatch(editUserDetails(body));
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-1 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Edit Your Account
        </div>
        <img
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src={`http://localhost:8000/uploads/${data.image}`}
                alt="profile"
              />
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
                {preview ? (
                  <img src={preview} alt="Image-Preview" className="p-3 h-52" />
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
      </div>
    </div>
  );
};
export default UserEdit;
