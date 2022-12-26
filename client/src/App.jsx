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

  const title = "AEThERNA";

  const Landing = () => {
    return !user ? (
      <>
        <h1 className="title">{title}</h1>
        <AuthForm mode="initial" />
      </>
    ) : (
      <>
        <h1 className="title small">{title}</h1>
        <UserProfile user={user} />
      </>
    );
  };

  const Auth = ({ mode }) => {
    return (
      <>
        <h1 className="title small">{title}</h1>
        <AuthForm mode={mode} />
      </>
    );
  };

  return (
    <>
      {!user && <BackgroundVideo />}
      <Scanlines />
      <NFTMonitor />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/login"
            element={!user ? <Auth mode="login" /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Auth mode="signup" /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
