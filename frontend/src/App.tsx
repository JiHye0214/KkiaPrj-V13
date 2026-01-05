import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const location = useLocation();
    const hideHeaderPaths = ["/login", "/register"];
    const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

    return (
        <>
            {/* 로그인에서 헤더 없애기 */}
            {/* 전해줄 인자가 있다면 넣어야겠지 */}
            {!shouldHideHeader && <Header isAuthenticated={true} alert={false} />}
            
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/home" element={<Home />}></Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>

            </Routes>
        </>
    );
}

export default App;
