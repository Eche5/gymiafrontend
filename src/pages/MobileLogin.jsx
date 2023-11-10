import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthenticationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";
function MobileLogin() {
  const emailRef = useRef();

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLogin, setIssLoggingin] = useState("SIGN IN");

  const [pwd, setPwd] = useState("");
  const {
    auth,
    setAuth,
    isSignInActive,
    setIsSignInActive,
    handleSignInClick,
    handleSignUpClick,
  } = useAuth();
  const LOGIN_URL = "/users/auth";
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const id = params.id;

  const from =
    location.state?.from?.pathname || auth?.foundUser?.role === "Admin"
      ? `/admin/${id}`
      : `/${id}`;
  //saves last inputed username
  useEffect(() => {
    const savedEmail = localStorage.getItem("lastEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
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

      console.log(err);
      if (err.response.status === 400) {
        setErrMsg(err.response.data.message);
        setIssLoggingin("SIGN IN");
        setIsAuthenticating(false);
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.message);
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

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    const token = response.credential;

    const email = userObject.email;

    GoogleLogin({ email, token });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "221101201489-9u39f32384pn1688dlq3fd0vsdrt2s3d.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_black",
      size: "large",
      shape: "pill",
    });
  }, []);

  return (
    <div className=" flex justify-center ">
      <div className=" min-h-screen w-full">
        <form onSubmit={onHandleSubmit} id="form">
          <div id="signInDiv"></div>
          <p className=" text-center font-bold">OR</p>

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
            name="passwords"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
          />

          <label className=" flex justify-start items-center gap-2">
            <div>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPassword}
              />
            </div>
            Show Password
          </label>
          <a href="#" className=" hover:underline">
            Forgot your password?
          </a>

          <button className=" flex items-center gap-2">
            {isLogin} {isAuthenticating && <Spinner />}
          </button>
          <p className=" text-black">Don't have an account?</p>
          <NavLink to="/signup" className=" hover:underline text-xl font-bold">
            Sign Up
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default MobileLogin;
