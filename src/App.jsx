import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer"));
const Channel = lazy(() => import("./pages/Channel"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/channel/:id" element={<Channel />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
