import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "sonner";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useQuery({
    queryKey: ["user"],
    queryFn: checkAuth,
  });
  console.log(authUser);

  if (!authUser && isCheckingAuth) {
    return (
      <div className="w-full h-svh grid place-content-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }
  return (
    <div data-theme="">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/setting"
          element={authUser ? <Setting /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
        <Route path="/Signup" element={authUser ? <Home /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
