import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Functional components
import AuthForm from "./components/AuthForm";
import UserProfile from "./components/UserProfile";

// VFX components
import NFTMonitor from "./components/VFX/NFTMonitor";
import BackgroundVideo from "./components/VFX/BackgroundVideo/BackgroundVideo";
import Scanlines from "./components/VFX/Scanlines";

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
      <Scanlines />
      <NFTMonitor />

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
     
    </>
  );
}

export default App;
