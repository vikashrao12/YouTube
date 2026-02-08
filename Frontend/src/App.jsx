import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Watch from "./pages/Watch";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import CreateChannel from "./pages/CreateChannel";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const VideoPlayer = lazy(() => import("./pages/VideoPlayer"));
const Channel = lazy(() => import("./pages/Channel"));


function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <BrowserRouter>
      <Layout searchText={searchText} setSearchText={setSearchText}>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


            <Route path="/channel/:id" element={<ProtectedRoute><Channel /></ProtectedRoute>} />
            <Route path="/create-channel" element={<ProtectedRoute><CreateChannel /></ProtectedRoute>} />



          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
