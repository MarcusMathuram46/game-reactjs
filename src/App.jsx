import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import BoxSplit from "./components/BoxSplit";
import ElementTransfer from "./components/ElementTransfer";
import Game from "./components/Game";
import InfiniteScroll from "./components/InfiniteScroll";
import NestedList from "./components/NestedList";
import "./styles/App.css";


const nestedData = [
  {
    name: "Applications",
    children: [
      { name: "App1" },
      { name: "App2" },
      {
        name: "App Suite",
        children: [
          { name: "App3" },
          { name: "App4" },
          { name: "App5", children: [{ name: "Add-On1" }, { name: "Add-On2" }] },
        ],
      },
    ],
  },
  {
    name: "Library",
    children: [
      { name: "Lib1" },
      { name: "Lib2" },
      {
        name: "Lib Extensions",
        children: [
          { name: "Lib3" },
          { name: "Lib4" },
          { name: "Utilities", children: [{ name: "Util1" }, { name: "Util2" }] },
        ],
      },
    ],
  },
  {
    name: "System",
    children: [
      {
        name: "Users",
        children: [
          {
            name: "Guest",
            children: [
              { name: "Desktop" },
              { name: "Documents" },
              { name: "Downloads" },
            ],
          },
          {
            name: "Admin",
            children: [
              { name: "Config Files" },
              { name: "Logs" },
              { name: "Security", children: [{ name: "Policies" }, { name: "Rules" }] },
            ],
          },
          {
            name: "Shared",
            children: [
              { name: "thing1" },
              { name: "thing2" },
              {
                name: "Projects",
                children: [
                  { name: "Project1", children: [{ name: "Drafts" }, { name: "Final" }] },
                  { name: "Project2" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Configurations",
        children: [
          { name: "Settings" },
          { name: "Preferences" },
          { name: "Network", children: [{ name: "Wi-Fi" }, { name: "Ethernet" }] },
        ],
      },
    ],
  },
  {
    name: "Media",
    children: [
      {
        name: "Photos",
        children: [
          { name: "Vacation" },
          { name: "Family" },
          { name: "Events", children: [{ name: "Wedding" }, { name: "Graduation" }] },
        ],
      },
      {
        name: "Videos",
        children: [
          { name: "Movies" },
          { name: "Clips", children: [{ name: "Short Films" }, { name: "Trailers" }] },
        ],
      },
    ],
  },
];


function App() {
  const [path, setPath] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-brand">My App</div>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
            <Link to="/" onClick={toggleMenu}>Element Transfer</Link>
            <Link to="/box-split" onClick={toggleMenu}>Box Split</Link>
            <Link to="/game" onClick={toggleMenu}>Game</Link>
            <Link to="/infinite-scroll" onClick={toggleMenu}>Infinite Scroll</Link>
            <Link to="/nested-list" onClick={toggleMenu}>Nested List</Link>
          </div>
        </nav>

        {/* Route Definitions */}
        <div className="container">
          <Routes>
            <Route path="/" element={<ElementTransfer />} />
            <Route path="/box-split" element={<BoxSplit />} />
            <Route path="/game" element={<Game />} />
            <Route path="/infinite-scroll" element={<InfiniteScroll />} />
            <Route
              path="/nested-list"
              element={<NestedList data={nestedData} path={path} setPath={setPath} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
