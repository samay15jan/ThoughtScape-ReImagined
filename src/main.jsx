import { StrictMode, useState, useEffect, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./utils/firebase";
import { userDataStore } from "./utils/zustand";
const Landing = lazy(() => import("./Pages/Landing.jsx"));
const Auth = lazy(() => import("./Pages/Auth.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const updateData = userDataStore((state) => state.updateData);
  const removeData = userDataStore((state) => state.removeData);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          console.log("Email Not Verified!!");
        } else {
          setLoggedIn(true);
          const userData = {
            userId: user.uid,
            name: user.displayName,
            email: user.email,
            profile: user.photoURL,
          };
          updateData(userData);
        }
      } else {
        setLoggedIn(false);
        removeData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Landing />} />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth type="login" />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth type="register" />}
        />
        <Route
          path="/reset"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth type="reset" />}
        />

        {/* <Route
          path="/__/auth/action"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth type="register" />}
        /> */}

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
