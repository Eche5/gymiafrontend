import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Attendance() {
  return (
    <div>
      <div className=" bg-white p-4 items-center rounded-lg">
        <nav className=" flex justify-between">
          <h1 className=" text-black text-3xl">Attendance</h1>

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
    </div>
  );
}

export default Attendance;
