import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import AuthForm from "./components/AuthForm";
import UserProfile from "./components/UserProfile";
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo";
import Scanlines from "./components/Scanlines";
import NFTMonitor from "./components/NFTMonitor";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      {!user && (
        <>
          <h1 className="title">AEThERNA</h1>
          <BackgroundVideo />
        </>
      )}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!user ? <AuthForm mode="initial" /> : <UserProfile user={user} />}
          />
          <Route
            path="/login"
            element={!user ? <AuthForm mode="login" /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <AuthForm mode="signup" /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
     
      <Scanlines />
      <NFTMonitor />
    </>
  );
}

export default App;
