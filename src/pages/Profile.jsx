import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthenticationContext";

function Profile() {
  const { auth } = useAuth();

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const errRef = useRef();

  const firstNameRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const [validName, setValidName] = useState(false);

  const [validWeight, setValidWeight] = useState(false);

  const [validHeight, setValidHeight] = useState(false);

  const [validLastName, setValidLastName] = useState(false);

  const [validPwd, setValidPwd] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [isSigningUp, setisSigningUp] = useState("Sign Up");

  const [email, setEmail] = useState(auth?.foundUser?.email);

  const [weight, setWeight] = useState(0);

  const [height, setHeight] = useState(0);

  const [validEmail, setValidEmail] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);

  const [firstname, setFirstname] = useState(auth?.foundUser?.firstname);

  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastname, setLastname] = useState(auth?.foundUser?.lastname);

  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [phonenumber, setPhonenumber] = useState(auth?.foundUser?.phonenumber);

  const [date, setDate] = useState("");

  const [validPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const [phonenumberFocus, setPhonenumberFocus] = useState(false);

  const isValidName = firstname.length >= 4;

  const isValidLastName = lastname.length > 4;
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

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
    if (weight >= 40) {
      setValidWeight(true);
    } else {
      setValidWeight(false);
    }
  }, [weight]);

  useEffect(() => {
    if (height >= 70) {
      setValidHeight(true);
    } else {
      setValidHeight(false);
    }
  }, [height]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can submit the form data or perform validation here
    // For now, let's just log the data
    console.log(formData);
  };
  return (
    <div>
      <div className=" flex justify-between p-2">
        <div>
          <h1 className=" text-2xl font-bold">
            Hello, {auth?.foundUser?.firstname}
          </h1>
          <p className=" text-gray-700">
            Keep doing the work & get the results.
          </p>
        </div>
        <div className=" flex items-center gap-2">
          <button className=" bg-white border-2 text-black border-gray-900 p-2 rounded-lg flex items-center gap-2">
            {formattedDate}
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <div
        className="
    flex flex-col justify-center items-center  p-4 rounded-lg
  "
      >
        <form className="flex flex-col pb-4">
          <div className=" laptop:flex laptop:justify-between gap-1 ">
            <label htmlFor="firstname">
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !firstname ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="firstname"
              readOnly
              ref={firstNameRef}
              placeholder=" First Name"
              autoComplete="off"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
              className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
            />

            {/* //lastname */}
            <label htmlFor="lastname">
              <FontAwesomeIcon
                icon={faCheck}
                className={validLastName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validLastName || !lastname ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              autoComplete="off"
              readOnly
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              required
              aria-invalid={validLastName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
              className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
            />
          </div>

          {/* //email */}
          <div className=" laptop:flex laptop:justify-between gap-1 ">
            <label htmlFor="email">
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <div className=" w-full">
              <input
                type="text"
                id="email"
                readOnly
                autoComplete="off"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>
            <div className=" w-full">
              <input
                type="Date"
                id="Date"
                readOnly
                autoComplete="off"
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
                aria-describedby="uidnote"
                className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
              />
            </div>
          </div>
          {/* //phonenumber */}
          <div className=" laptop:flex laptop:justify-center gap-1 ">
            <label htmlFor="phonenumber" className="mt-4">
              <FontAwesomeIcon
                icon={faCheck}
                className={validPhoneNumber ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  validPhoneNumber || !phonenumber ? "hide" : "invalid"
                }
              />
            </label>
            <input
              type="number"
              id="phonenumber"
              readOnly
              placeholder="Phone Number"
              autoComplete="off"
              onChange={(e) => setPhonenumber(e.target.value)}
              value={phonenumber}
              required
              aria-invalid={validPhoneNumber ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setPhonenumberFocus(true)}
              onBlur={() => setPhonenumberFocus(false)}
              className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
            />
            <p
              id="uidnote"
              className={
                phonenumberFocus && phonenumber && !validPhoneNumber
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              11 digits.
              <br />
              Must be numbers.
              <br />
            </p>
            <select
              id="genderSelect"
              value={selectedGender}
              disabled
              onChange={handleGenderChange}
              className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className=" laptop:flex laptop:justify-between gap-1 ">
            {/* //password */}

            <div className=" w-full">
              <input
                type="number"
                id="weight"
                placeholder="weight/kg"
                onChange={(e) => setWeight(e.target.value)}
                required
                readOnly
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
              />
              <p
                id="pwdnote"
                className={!validWeight ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be above 40kg
              </p>
            </div>

            <div className=" w-full">
              <input
                type="number"
                id="height"
                placeholder="Height/cm"
                onChange={(e) => setHeight(e.target.value)}
                required
                readOnly
                aria-invalid={validHeight ? "false" : "true"}
                aria-describedby="confirmnote"
                className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
              />
              <p
                id="confirmnote"
                className={!validHeight ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be above 70cm
              </p>
            </div>
          </div>
          <label htmlFor="genderSelect" className=" text-white text-center">
            Any existing medical conditions or allergies
          </label>
          <div className=" flex justify-center">
            <select
              id="genderSelect"
              value={selectedGender}
              disabled
              onChange={handleGenderChange}
              className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4  phone:mb-6"
            >
              <option value="">Medical condition?</option>
              <option value="male">Yes</option>
              <option value="female">No</option>
            </select>
          </div>

          <label htmlFor="firstname">
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !firstname ? "hide" : "invalid"}
            />
          </label>
          <input
            type="address"
            id="address"
            ref={firstNameRef}
            readOnly
            placeholder=" Address"
            autoComplete="off"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
            className="text-[22px] p-1 rounded-lg bg-white text-black  pl-4 w-full phone:mb-6"
          />
          <div className=" flex justify-center gap-4">
            <button className="bg-red-700 text-white rounded-lg w-full py-2 px-8 mt-4">
              Cancel
            </button>
            <button
              disabled={!validName || !validPwd || !validWeight ? true : false}
              className={
                validWeight
                  ? `border rounded-lg border-transparent py-2 px-8 text-base font-medium text-white w-full ${
                      isAuthenticating
                        ? "bg-gray-400 cursor-not-allowed w-full"
                        : "bg-gray-900 hover:bg-green-700 w-full"
                    } hover:border-gray-400 transition duration-250 ease-in-out mt-4`
                  : "cursor-not-allowed border rounded-lg border-transparent py-2 px-8 text-base font-medium bg-gray-900 hover:border-gray-400 transition duration-250 ease-in-out mt-4 w-full"
              }
            >
              <div className=" flex justify-center gap-4">
                {isSigningUp} {isAuthenticating && <Spinner />}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
