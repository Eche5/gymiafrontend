import { useEffect, useState } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);

  const [isLoading, setIssLoading] = useState("Forgot Password");

  const [isRessettin, setIsResetting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "e-rent | ForgotPassword ";
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const FORGOT_URL = "/users/forgotpassword";

    setIssLoading("Sending reset link...");

    setIsResetting(true);
    try {
      const response = await axios.post(FORGOT_URL, JSON.stringify({ email }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      if (response?.status === 200) setSuccess(true);

      setIssLoading("Forgot Password");

      setIsResetting(false);
    } catch (error) {
      setSuccess(false);

      setIsResetting(false);

      setIssLoading("Forgot Password");
    }
  };

  return (
    <div
      className="
    flex  justify-center items-center
   py-4 px-2 h-screen
  "
    >
      <section className=" w-[520px] min-h-[420px]  p-4  bg-gradient-to-r from-stone-200 to-neutral-500  text-white rounded-3xl">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className=" cursor-pointer text-gray-900"
          onClick={() => navigate(-1)}
        />
        {!success && (
          <form className="flex flex-col pb-4" onSubmit={onHandleSubmit}>
            <h1 className="text-4xl leading-5 mt-4 text-center pb-20 text-gray-900">
              Forgot Password
            </h1>
            <div>
              <p className=" pb-2 text-gray-900 font-bold">
                Enter your email address
              </p>
              <div className=" flex  bg-white text-[1.2rem] p-1 rounded-3xl text-gray-900 mb-4">
                <img
                  className="w-8 h-8 p-1"
                  src="https://img.icons8.com/ios/50/new-post.png"
                  alt="new-post"
                />
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="pl-4 w-[80%] bg-gray-500"
                  required
                />
              </div>
            </div>

            <button className="border flex justify-center gap-2 rounded-3xl border-transparent py-2 px-4 text-base font-medium bg-black text-white m-4">
              {isRessettin && <Spinner />} {isLoading}
            </button>
          </form>
        )}
        {success && (
          <h1 className=" mt-32 font-black text-gray-900 text-center">
            Please check Your email to reset your password
          </h1>
        )}
      </section>
    </div>
  );
}

export default ForgotPassword;
