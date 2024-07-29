import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoutes from "./components/hoc/ProtectedRoutes";
import Header from "./components/header/header";
import Dashboard from "./pages/dashboard/Dashboard";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./redux/actions/authActions";

const AuthWrapper = ({ user, redirectPath, Component }) => {
  if (user) {
    return <Navigate to={redirectPath} />;
  }

  return <Component />;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("USER", user);
    if (!user) {
      dispatch(getUserDetails());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route
              element={
                <WebSocketProvider>
                  <Dashboard />
                </WebSocketProvider>
              }
              path="/dashboard"
            />
          </Route>
          <Route
            path="/login"
            element={
              <AuthWrapper
                user={user}
                redirectPath="/dashboard"
                Component={Login}
              />
            }
          />

          <Route
            path="/register"
            element={
              <AuthWrapper
                user={user}
                redirectPath={"/dashboard"}
                Component={Register}
              />
            }
          />
          <Route path="/" element={<Login />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
