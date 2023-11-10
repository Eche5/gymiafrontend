import { NavLink, Outlet } from "react-router-dom";
import trainer from "../assets/profilepic.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faGear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthenticationContext";

function Dashboard() {
  const { auth } = useAuth();
  console.log(auth);
  const id = auth?.foundUser._id;
  return (
    <div className="flex justify-between h-screen">
      <div className=" w-[7%]  bg-black flex flex-col gap-24  items-center ">
        <NavLink
          to={`/${id}`}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 m-2 h-16 w-20 text-center text-3xl pt-3 rounded-lg"
              : " text-black m-2 h-16 w-20 bg-white text-center text-3xl pt-3 rounded-lg"
          }
          end
        >
          <h1> GYM</h1>
        </NavLink>

        <NavLink
          to={`/${id}/message`}
          className={({ isActive }) =>
            isActive
              ? "text-gray-700 text-center items-center "
              : " text-white text-center items-center"
          }
        >
          <FontAwesomeIcon icon={faMessage} className=" w-10 h-10" />
          <p className=" text-center items-center text-white"> messages</p>
        </NavLink>
        <NavLink
          to={`/${id}/schedule`}
          className={({ isActive }) =>
            isActive
              ? "text-gray-700 text-center items-center "
              : " text-white text-center items-center "
          }
        >
          <FontAwesomeIcon icon={faCalendar} className="w-10 h-10 " />
          <p className=" text-center items-center text-white"> schedule</p>
        </NavLink>

        <NavLink
          to={`/${id}/profile`}
          className={({ isActive }) =>
            isActive
              ? "text-gray-700 text-center items-center "
              : " text-white text-center items-center "
          }
        >
          <FontAwesomeIcon icon={faGear} className=" w-10 h-10" />
          <p className=" text-center items-center text-white"> profile</p>
        </NavLink>
      </div>
      <div className="w-[75%] h-screen rounded-lg m-2 p-2">
        <Outlet />
      </div>
      <div className="w-[20%] h-[99vh] mx-4 mt-1 bg-white rounded-lg ">
        <div className=" flex flex-col   items-center ">
          <img src={trainer} className="rounded-3xl w-40 mt-4 " />
        </div>
        <h1 className=" font-bold text-center">
          {auth?.foundUser?.firstname} {auth?.foundUser?.lastname}
        </h1>
        <p className=" text-blue-900 font-bold text-center">Trainee</p>
        {auth?.foundUser?.isVerified && (
          <div>
            <div className="flex justify-evenly text-center">
              <div>
                Height
                <button className="w-20  bg-gray-900 text-white p-1 rounded-lg">
                  175cm
                </button>
              </div>
              <div>
                Weight
                <button className="w-20  bg-gray-900 text-white p-1 rounded-lg">
                  73kg
                </button>
              </div>
              <div>
                Age
                <button className="w-20  bg-gray-900 text-white p-1 rounded-lg">
                  28 years
                </button>
              </div>
            </div>
            <div className=" m-2">
              <h1 className=" text-blue-900 font-bold">Monthly Goals</h1>

              <div>
                <p>Calories</p>
                <div className=" w-full  bg-gray-200 rounded-full mb-2 dark:bg-gray-700">
                  <div
                    className=" bg-gray-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: "45%" }}
                  >
                    45%
                  </div>
                </div>
              </div>
              <div>
                <p>Lose Weight</p>
                <div className=" w-full bg-gray-200 rounded-full ">
                  <div
                    className=" bg-gray-900 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: "20%" }}
                  >
                    20%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}

export default Dashboard;
