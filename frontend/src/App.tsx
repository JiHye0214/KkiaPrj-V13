import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
    return (
        <>
            {/* 전해줄 인자가 있다면 넣어야겠지 */}
            <Header isAuthenticated={true} alert={false} />
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
            </Routes>
        </>
    );
}

export default App;
