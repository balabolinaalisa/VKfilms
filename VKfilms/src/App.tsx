import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';

function App(){
    return(
        <div className="min-h-screen w-full bg-gray-100 p-0 m-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
            </Routes>
        </div>
    );
}

export default App;