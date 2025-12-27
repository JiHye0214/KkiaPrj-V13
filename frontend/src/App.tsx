import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
    const exampleData = {
        today: "2025-12-22",
        baseball: true,
        gameTime: "18:30",
        away: { img: "team-eagles.png", name: "Eagles" },
        home: { img: "v13.png", name: "Tigers", latitude: 37.5, longitude: 127.0, place: "광주-기아 챔피언스 필드" },
        entry: [
            { name: "Player1", avgERA: "0.250", opsWHIP: "0.800" },
            { name: "Player2", avgERA: "0.280", opsWHIP: "0.850" },
        ],
        weather: {
            weather: [{ icon: "☀️" }],
            main: { temp: 10, humidity: 60 },
            clouds: { all: 20 },
            wind: { speed: 3.5 },
        },
        top5Favorites: [
            { id: 1, favoriteImgs: [{ fileName: "fav1.png" }] },
            { id: 2, favoriteImgs: [{ fileName: "fav2.png" }] },
        ],
        news: {
            items: [
                { originallink: "https://news.com/1", title: "News 1" },
                { originallink: "https://news.com/2", title: "News 2" },
            ],
        },
    };

    return (
        <>
            {/* 전해줄 인자가 있다면 넣어야겠지 */}
            <Header isAuthenticated={true} alert={false} />
            <Routes>
                <Route path="/" element={<Home {...exampleData} />}></Route>
                <Route path="/home" element={<Home {...exampleData} />}></Route>
            </Routes>
        </>
    );
}

export default App;
