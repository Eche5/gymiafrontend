import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainDashboard from "./pages/MainDashboard";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calender";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverView from "./pages/AdminOverView";
import Trainees from "./pages/Trainees";
import Trainers from "./pages/Trainers";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import ChatApp from "./pages/ChatApp";
import { useEffect, useState } from "react";
import MobileRegister from "./pages/MobileRegister";
import MobileLogin from "./pages/MobileLogin";
import GoogleAuth from "./components/GoogleAuth";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenWidth = () => {
      const newScreenWidth = window.innerWidth;
      setIsMobile(newScreenWidth < 768);
    };

    // Initial check
    checkScreenWidth();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  console.log(isMobile);

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/auth" element={<GoogleAuth />} />
        {!isMobile && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
          </>
        )}
        {isMobile && (
          <>
            <Route path="/login" element={<MobileLogin />} />
            <Route path="/signup" element={<MobileRegister />} />
          </>
        )}
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/:id" element={<AdminDashboard />}>
          <Route path="/admin/:id" element={<AdminOverView />} />
          <Route path="trainee" element={<Trainees />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route element={<Dashboard />}>
          <Route path="/:id" element={<MainDashboard />} />
          <Route path="/:id/message" element={<Chat />} />
          <Route path="/:id/profile" element={<Profile />} />
          <Route path="/:id/schedule" element={<Calendar />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
