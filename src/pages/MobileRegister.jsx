import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import Spinner from "../components/Spinner";
import { useAuth } from "../contexts/AuthenticationContext";

function MobileRegister() {
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const errRef = useRef();

  const firstNameRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [validName, setValidName] = useState(false);

  const [validLastName, setValidLastName] = useState(false);

  const [validPwd, setValidPwd] = useState(false);

  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);

  const [matchFocus, setMatchFocus] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [isSigningUp, setisSigningUp] = useState("Sign Up");

  const [email, setEmail] = useState("");

  const [validEmail, setValidEmail] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);

  const [firstname, setFirstname] = useState("");

  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastname, setLastname] = useState("");

  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");

  const [phonenumber, setPhonenumber] = useState("");

  const [validPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const [phonenumberFocus, setPhonenumberFocus] = useState(false);

  const isValidName = firstname.length > 4;

  const isValidLastName = lastname.length > 4;

  const isValidPhoneNumber =
    (phonenumber.length >= 11 && phonenumber.startsWith("08")) ||
    phonenumber.startsWith("09") ||
    phonenumber.startsWith("07");

  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    if (isValidName) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [isValidName]);

  useEffect(() => {
    if (isValidLastName) {
      setValidLastName(true);
    } else {
      setValidLastName(false);
    }
  }, [isValidLastName]);

  useEffect(() => {
    if (isValidPhoneNumber) {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  }, [isValidPhoneNumber]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email, EMAIL_REGEX]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));

    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd, PWD_REGEX]);

  useEffect(() => {
    setErrMsg("");
  }, [firstname, pwd, matchPwd]);

  const REGISTER_URL = "/users/register";

  const { setAuth, isSignInActive } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);

    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");

      return;
    }

    const phone = phonenumber.toString();

    const userData = {
      email,
      firstname,
      phonenumber: phone,
      lastname,
      password: pwd,
      confirmPassword: matchPwd,
    };

    try {
      setIsAuthenticating(true);

      setisSigningUp("Creating your account...");

      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const accessToken = response?.data?.accessToken;

      const foundUser = response?.data?.newUser;

      setAuth({ foundUser, accessToken });

      setisSigningUp("Sign Up");
      setIsSignedUp(true);
    } catch (error) {
      if (error.response.status === 403);

      setErrMsg(error.response.data.message);

      setIsAuthenticating(false);

      setisSigningUp("Sign Up");
    }
  };

  return (
    <div className=" flex justify-center ">
      <div className=" min-h-screen w-full">
        <form onSubmit={handleSubmit} id="forms">
          <h1 className=" pt-4">Create Account</h1>
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
            type="text"
            name="firstname"
            placeholder="Your Firstname.."
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            aria-describedby="uidnote"
            required
            type="text"
            name="lastname"
            placeholder="Your Lastname.."
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            aria-describedby="uidnote"
            required
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            aria-describedby="uidnote"
            required
            type="phonenumber"
            placeholder="Phone Number"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <input
            aria-describedby="uidnote"
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <input
            aria-describedby="uidnote"
            required
            type="password"
            placeholder="confirm Password"
            onChange={(e) => setMatchPwd(e.target.value)}
          />

          <button className=" flex items-center gap-2">
            {isSigningUp} {isAuthenticating && <Spinner />}
          </button>
          <p className=" text-black">Already have an account?</p>
          <NavLink to="/login" className=" hover:underline text-xl font-bold">
            Sign in
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default MobileRegister;
