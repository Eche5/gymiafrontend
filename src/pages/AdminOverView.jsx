import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import wallet from "../assets/icons8-wallet.gif";
import muscle from "../assets/images.jpg";
import dumbell from "../assets/dumbell.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function AdminOverView() {
  return (
    <div>
      <div className=" bg-white p-4 items-center rounded-lg">
        <nav className=" flex justify-between">
          <h1 className=" text-black text-3xl">Dashboard</h1>

          <div className=" flex items-center border-2 border-gray-800 w-3/4 rounded-lg gap-4 px-4">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              className=" w-full"
              type="text"
              placeholder="Search for trainee/trainers/documents..."
            />
          </div>
          <div className=" flex justify-center items-center gap-2">
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
            <img
              className=" h-8 w-8 rounded-full"
              src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg"
            />
          </div>
        </nav>
      </div>
      <div className=" flex justify-center gap-16 m-4">
        <div className=" flex justify-between items-center bg-white text-black px-8 py-4 gap-4 rounded-lg">
          <img src={muscle} className=" text-white bg-white h-10 w-10" />

          <div>
            <h1 className=" text-xl  text-center">Trainers</h1>
            <p className=" text-2xl">235</p>
          </div>
        </div>
        <div className=" flex justify-between items-center bg-white text-black px-8 py-4 gap-4 rounded-lg">
          <img src={dumbell} className=" h-10 w-10" />
          <div>
            <h1 className=" text-xl  text-center ">Trainees</h1>
            <p className=" text-2xl">12 </p>
          </div>
        </div>
        <div className=" flex justify-between items-center bg-white text-black px-8 py-4 gap-4 rounded-lg">
          <img src={wallet} />
          <div>
            <h1 className=" text-sm  text-center">Payment</h1>
            <p className=" text-2xl">$40k</p>
          </div>
        </div>
      </div>
      <div className="  flex justify-center ">
        <div className=" bg-white rounded-lg">
          <h1 className=" text-center text-xl font-bold">Schedule calender</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}

export default AdminOverView;
