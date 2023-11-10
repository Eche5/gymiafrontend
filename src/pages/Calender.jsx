import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthenticationContext";

function Calender() {
  const currentDate = new Date();
  const { auth } = useAuth();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div>
      <div className=" flex justify-between p-2">
        <div>
          <h1 className=" text-2xl font-bold">
            Hello, {auth?.foundUser?.firstname}
          </h1>
          <p className=" text-gray-700 font-bold">
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

      <div className="  flex justify-center ">
        <div className=" bg-white rounded-lg">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
      </div>
      <h1 className=" text-center text-2xl font-bold">
        You have no training today!!!
      </h1>
    </div>
  );
}

export default Calender;
