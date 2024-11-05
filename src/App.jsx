import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BoxSplit from "./components/BoxSplit";
import ElementTransfer from "./components/ElementTransfer";
import Game from "./components/Game";
import InfiniteScroll from "./components/InfiniteScroll";
import NestedList from "./components/NestedList";

// Sample Data For the NestedList Component
const nestedData = [
  {
    name: "Applications",
    children: [{ name: "App1" }, { name: "App2" }],
  },
  {
    name: "Library",
    children: [{ name: "Lib1" }, { name: "Lib2" }],
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
            name: "Shared",
            children: [{ name: "thing1" }, { name: "thing2" }],
          },
        ],
      },
    ],
  },
];
function App() {
  const [path, setPath] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ElementTransfer />} />
          <Route path="/box-split" element={<BoxSplit />} />
          <Route path="/game" element={<Game />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/nested-list" element={<NestedList data={nestedData} path={path} setPath={setPath} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
