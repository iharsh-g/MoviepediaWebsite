import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/movies" element={<Movie/>} />
                <Route path="/search/movies" element={<Movie/>}/>
            </Routes>
        </div>
    );
}

export default App;
