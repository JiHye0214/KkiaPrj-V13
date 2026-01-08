import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import UserLayout from "./layouts/UserLayout";

function App() {
    const location = useLocation();
    const hideHeaderPaths = ["/user/login", "/user/register"];
    const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

    return (
        <>
            {/* 로그인에서 헤더 없애기 */}
            {/* 전해줄 인자가 있다면 넣어야겠지 */}
            {!shouldHideHeader && <Header isAuthenticated={false} alert={false} />}
            
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>

                {/* user 경로 그룹 */}
                <Route path="/user" element={<UserLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

            </Routes>
        </>
    );
}

export default App;
