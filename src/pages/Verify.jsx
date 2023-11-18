import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function Verify() {
  const [isVerified, setIsVerified] = useState(false);

  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  const { auth, setAuth } = useAuth();

  const params = useParams();

  const id = params.id;

  const navigate = useNavigate();

  const [isLoading, setIssLoading] = useState("Verify email");

  useEffect(() => {
    document.title = "e-rent | verify Email ";
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const FORGOT_URL = `/users/verify/${id}`;

    setIssLoading("verifying email...");
    try {
      const response = await axios.patch(FORGOT_URL, JSON.stringify({ id }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) setIsVerified(true);

      const accessToken = response?.data?.accessToken;

      const foundUser = response?.data?.data;

      setIsAlreadyVerified(false);

      setAuth({ foundUser, accessToken });
      setTimeout(() => {
        navigate(`/${foundUser._id}`);
      }, 1000);
    } catch (error) {
      setIssLoading("Verify email");

      if (error?.response?.status === 401) setIsAlreadyVerified(true);
    }
  };
  return (
    <div
      className="
    flex  justify-center items-center
   py-4 px-2 h-screen
  "
    >
      <section className=" w-[520px]   p-8  bg-gradient-to-r from-stone-200 to-neutral-500 text-gray-900  rounded-3xl">
        {!isAlreadyVerified && !isVerified && (
          <div className="flex flex-col  ">
            <h1 className=" text-3xl text-center ">Verify email</h1>
            <p className=" text-xl text-center mt-6">
              Click the button below to verify your email
            </p>
            <button
              onClick={onHandleSubmit}
              className="border flex justify-center gap-2 rounded-full border-transparent py-2 px-12 text-2xl font-medium bg-black hover:bg-gray-500 hover:text-gray-900 text-white m-4"
            >
              {isLoading}
            </button>
          </div>
        )}
        {isVerified && (
          <h1 className=" text-3xl text-center mt-20 ">
            Email successfully verified
          </h1>
        )}
        {isAlreadyVerified && (
          <h1 className=" text-2xl text-center mt-32 ">
            email is already verified
          </h1>
        )}
      </section>
    </div>
  );
}

export default Verify;
