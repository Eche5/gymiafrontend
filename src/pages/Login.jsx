import { useState, useRef, useEffect } from "react";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../contexts/AuthenticationContext";
import Spinner from "../components/Spinner";
import Register from "./Register";
function Login() {
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
    handleSignInClick,
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
              className=" flex  justify-center p-2 rounded-3xl"
            ></div>
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
              name="password"
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
                To keep connected with us, please login with your personal info
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
              <p>Enter your personal details and start your journey with us</p>
              <NavLink to="/signup">
                <button className="ghost" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
