import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Components
import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo";
import Scanlines from './components/Scanlines'
import NFTMonitor from "./components/NFTMonitor";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>

      {!user && <BackgroundVideo />}
      <Scanlines />
      <NFTMonitor />
    </>
  );
}

export default App;
