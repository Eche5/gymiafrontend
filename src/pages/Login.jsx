import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthenticationContext";
import Spinner from "../components/Spinner";
import Register from "./Register";

function Login() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [isValid, setIsValid] = useState(false);

  const [email, setEmail] = useState("");

  const [isLoading, setIssLoading] = useState("Verify email");

  const [errMsg, setErrMsg] = useState("");

  const [sending, isSending] = useState("RESEND VERIFICATION EMAIL");

  const [isVerified, setIsVerified] = useState(true);

  const [sentVerified, isSentVerified] = useState(false);

  const errRef = useRef();

  const [isLogin, setIssLoggingin] = useState("SIGN IN");

  const [pwd, setPwd] = useState("");

  const {
    setAuth,
    isSignInActive,
    handleSignInClick,
    isSignedUp,
    handleSignUpClick,
  } = useAuth();

  const LOGIN_URL = "/users/auth";

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //saves last inputed username
  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");

    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  //Function to toggle password visibility
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //Login function
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIssLoggingin("SIGNING IN...");

      setIsAuthenticating(true);

      const response = await axios.post(
        LOGIN_URL,

        JSON.stringify({ email, password: pwd }),

        {
          headers: { "Content-Type": "application/json" },

          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;

      const foundUser = response?.data?.data;

      const id = response?.data?.data?._id;

      setAuth({
        foundUser,

        accessToken,
      });

      setIssLoggingin("SIGN IN");

      setEmail("");

      setPwd("");

      if (foundUser.role === "Admin") {
        navigate(`/admin/${id}`);
      } else {
        navigate(`/${id}`);
      }
    } catch (err) {
      setIssLoggingin("SIGN IN");

      if (err?.response?.status === 400) {
        setErrMsg(err.response.data.message);

        setIssLoggingin("SIGN IN");

        setIsAuthenticating(false);
      } else if (err.response.status === 401) {
        setIsVerified(false);

        setIssLoggingin("Log in");

        setIsAuthenticating(false);
      } else if (err?.response?.status === 401) {
        setErrMsg(err?.response?.data?.message);

        setIssLoggingin("SIGN IN");

        setIsAuthenticating(false);
      } else {
        setErrMsg("No Server Response");

        setIssLoggingin("SIGN IN");

        setIsAuthenticating(false);
      }

      errRef.current.focus();
    }
  };

  useEffect(() => {
    document.title = `gymia | ${isSignInActive ? "Login" : "Signup"} `;
  }, [isSignInActive]);

  useEffect(() => {
    if (email.length >= 4 && email.includes("@") && pwd.length >= 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, setErrMsg]);

  //Oauth for google
  const GoogleLogin = async ({ email, token }) => {
    try {
      const GOOGLE_URL = "/users/googleAuth";

      const response = await axios.get(GOOGLE_URL, {
        params: { email, token },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;

      const foundUser = response?.data?.data;

      const id = response?.data?.data?._id;

      setAuth({ foundUser, accessToken });

      if (foundUser.role === "Admin") {
        navigate(`/admin/${id}`);
      } else {
        navigate(`/${id}`);
      }
    } catch (error) {
      if (error?.response?.status === 401) setIsVerified(false);
    }
  };

  //function to
  const handleCallbackResponse = (response) => {
    const userObject = jwtDecode(response.credential);

    const token = response.credential;

    const email = userObject.email;

    GoogleLogin({ email, token });
  };

  useEffect(() => {
    /* global google */
    google?.accounts.id.initialize({
      client_id:
        "862123191475-prilu1qvgri5akjsv6g0to8p4fqs3qj1.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_black",
      size: "large",
      shape: "pill",
    });
  }, []);

  const onResendVerification = async (e) => {
    e.preventDefault();

    const RESEND_URL = `/users/verify`;

    setIssLoading("verifying email...");

    isSending("RESENDING VERIFICATION EMAIL...");

    try {
      await axios.post(RESEND_URL, JSON.stringify({ email }), {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      });

      isSentVerified(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      {isVerified && !isSignedUp && (
        <div
          className={`container m-12 ${
            isSignInActive ? "" : "right-panel-active m-12"
          }`}
        >
          <Register />
          <div className="form-container sign-in-container">
            <form onSubmit={onHandleSubmit} id="form">
              <div
                id="signInDiv"
                className="flex justify-center p-2 rounded-3xl"
              ></div>
              <p className="text-center font-bold">OR</p>

              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <input
                aria-describedby="uidnote"
                required
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                aria-describedby="uidnote"
                required
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
              />

              <label className="flex justify-start items-center gap-2">
                <div>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                </div>
                Show Password
              </label>

              <NavLink to="/forgotpassword" className="hover:underline">
                Forgot your password?
              </NavLink>

              <button className="flex items-center gap-2">
                {isLogin} {isAuthenticating && <Spinner />}
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div
                className={`overlay-panel overlay-left ${
                  isSignInActive ? "animate" : ""
                }`}
              >
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us, please login with your personal
                  info
                </p>
                <NavLink to="/login">
                  <button className="ghost" onClick={handleSignInClick}>
                    Sign In
                  </button>
                </NavLink>
              </div>

              <div
                className={`overlay-panel overlay-right ${
                  isSignInActive ? "" : "animate"
                }`}
              >
                <h1>Hello, Friend!</h1>
                <p>
                  Enter your personal details and start your journey with us
                </p>
                <NavLink to="/signup">
                  <button className="ghost" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSignedUp && (
        <div className=" h-screen ">
          <section className="  mt-40 p-4 bg-gradient-to-r from-stone-200 to-neutral-500 text-gray-900 rounded-3xl">
            <div className=" text-center">
              <h1 className=" text-3xl">🎉 Almost there!</h1>
              <p className=" text-2xl">We&apos;ve sent you an email at </p>
              <p className=" text-2xl">{email}</p>
              <p className=" text-2xl">
                Please follow the instructions in the email.
              </p>
            </div>
          </section>
        </div>
      )}
      {!isVerified && (
        <div className=" h-screen m-20">
          <section className=" max-w-[520px]  p-8 bg-gradient-to-r from-stone-200 to-neutral-500  text-black rounded-3xl flex flex-col justify-center items-center">
            {!sentVerified && (
              <>
                <p className=" text-center text-gray-900 text-3xl ">
                  Your email address is not verified, Please click the button
                  below
                </p>
                <button
                  onClick={onResendVerification}
                  className="border rounded-3xl border-transparent py-2 px-8 text-sm font-medium bg-white hover:bg-gray-900 hover:text-white text-black m-4"
                >
                  {sending}
                </button>
              </>
            )}
            {sentVerified && (
              <p className="text-gray-900 text-3xl text-center">
                Check your email and follow the instructions
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Login;
