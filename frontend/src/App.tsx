import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { theme } = useThemeStore();
  useQuery({
    queryKey: ["user"],
    queryFn: checkAuth,
  });

  if (!authUser && isCheckingAuth) {
    return (
      <div className="w-full h-svh grid place-content-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }
  return (
    <div data-theme={theme} className=" h-full  mx-auto">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/setting" element={<Setting />} />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
        <Route path="/Signup" element={authUser ? <Home /> : <Signup />} />
      </Routes>
      <Toaster duration={2000} />
    </div>
  );
}

export default App;
