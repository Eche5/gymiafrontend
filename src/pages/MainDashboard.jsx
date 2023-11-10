import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faMoon,
  faGlassWater,
  faCloud,
  faTemperatureThreeQuarters,
  faUmbrella,
  faGaugeSimpleHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthenticationContext";
function MainDashboard() {
  const { auth } = useAuth();
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div>
      <div className=" flex justify-between p-2 rounded-lg text-black  m-2">
        <div>
          <h1 className=" text-2xl font-bold">
            Hello, {auth?.foundUser?.firstname}
          </h1>
          <p className=" text-gray-700">
            Keep doing the work & get the results.
          </p>
        </div>
        <div className=" flex items-center gap-2">
          <button className=" bg-white text-black border-2 border-gray-900 p-2 rounded-lg flex items-center gap-2">
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
      <div className=" flex justify-evenly text-white">
        <div className=" bg-gray-600 p-2 rounded-lg">
          <div className=" text-3xl flex items-center gap-10">
            <h1>8 Hours</h1>
            <FontAwesomeIcon
              icon={faMoon}
              className=" bg-black p-1 w-8 h-8 rounded-lg"
            />
          </div>
          <p>Sleep</p>
        </div>
        <div className=" bg-black p-2 rounded-lg">
          <div className=" text-3xl flex items-center gap-10">
            <h1>5 Litres</h1>
            <FontAwesomeIcon
              icon={faGlassWater}
              className=" bg-gray-600 p-1 w-8 h-8 rounded-lg"
            />
          </div>
          <p>Sleep</p>
        </div>
      </div>
      <article className=" flex justify-center">
        <div className=" bg-black px-8 py-2 rounded-lg text-white">
          <div className=" text-3xl flex items-center gap-10">
            <div>
              <h1 className=" text-2xl">Weather</h1>
              <p className=" text-sm">Lagos</p>
            </div>

            <FontAwesomeIcon
              icon={faCloud}
              className=" bg-gray-600 p-1 w-8 h-8 rounded-lg"
            />
          </div>
          <div className=" flex justify-evenly">
            <div>
              <FontAwesomeIcon
                icon={faTemperatureThreeQuarters}
                className=" bg-gray-600 p-1 w-8 h-8 rounded-lg"
              />
              <h1>19ºC</h1>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faUmbrella}
                className=" bg-gray-600 p-1 w-8 h-8 rounded-lg"
              />
              <h1>2 Cm</h1>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faGaugeSimpleHigh}
                className=" bg-gray-600 p-1 w-8 h-8 rounded-lg"
              />
              <h1>10km/h</h1>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default MainDashboard;
