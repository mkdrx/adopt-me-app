import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import { useState } from "react";
import SearchParams from "./SearchParams";
import Details from "./Details";

import "./style.css";

function App() {
  const theme = useState("darkblue");

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <div className="p-0 m-0 min-h-screen bg-cyan-100">
          <BrowserRouter>
            <header className="w-full mb-10 text-center p-7 bg-gradient-to-l from-cyan-400 via-cyan-600 to-cyan-900">
              <Link to="/" className="text-6xl text-white hover:text-gray-200">
                <img
                  src="http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png"
                  alt="logo"
                  className="mx-auto"
                />
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id/" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
