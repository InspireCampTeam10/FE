import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Profile from "./pages/profile/Profile";
import NavigationBar from "./components/navbar/NavigationBar";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 로그인 & 회원가입 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔹 프로필 페이지 (회원가입 후 이동) */}
        <Route path="/profile" element={<Profile />} />

        {/* 🔹 네비게이션 바 포함된 페이지 */}
        <Route
          path="/*"
          element={
            <>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
