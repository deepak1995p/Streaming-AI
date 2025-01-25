import React from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import ProtectedRoute from "./auth/protectedRoute";
import { useEffect } from "react";
import { sessionState, useChatSession } from "@chainlit/react-client";
import { useRecoilValue } from "recoil";

const userEnv = {};

const App = () => {
  const { connect } = useChatSession();
  const session = useRecoilValue(sessionState);
  useEffect(() => {
    if (session?.socket.connected) {
      return;
    }
    fetch("http://localhost:80/custom-auth", { credentials: "include" }).then(
      () => {
        connect({
          userEnv,
        });
      }
    );
  }, [connect]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/main/*"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      {/* <div className="flex animate-fadeIn duration-1000">
        <Sidebar />
        <MainContent />
      </div> */}
    </>
  );
};

export default App;
