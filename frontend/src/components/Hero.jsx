import { useNavigate } from "react-router-dom";

const Hero = () => {
    const Navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-800 p-24">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="font- text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">User Management System.</span>
          <span className="block text-indigo-500">Want to get started ?</span>
        </h2>
        <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
          User management system where authentication is done using mern stack
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <button
              onClick={() => Navigate("/register")}
              type="button"
              className=" m-2 py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Get started
            </button>
            <button
              onClick={() => Navigate("/login")}
              type="button"
              className=" m-2 py-4 px-6 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
            >
              Have account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
