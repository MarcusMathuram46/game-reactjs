import React, { useState } from "react";
import "../styles/NestedList.css";

function NestedList({ data, path, setPath }) {
  const [expandedItems, setExpandedItems] = useState({});

  // Toggle expand/collapse for an item
  const toggleExpand = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  // Handle item click (expand or go deeper)
  const handleItemClick = (item) => {
    if (item.children) {
      toggleExpand(item.name);
      setPath((prevPath) => [...prevPath, item.name]); // Navigate deeper
    }
  };

  // Handle back button click (go up one level or go to root)
  const handleBackClick = () => {
    if (path.length === 0) {
      // If at the root, reset the path to the original state
      setPath([]);
    } else {
      setPath((prevPath) => prevPath.slice(0, -1)); // Go back one level
    }
  };

  // Render items with expand/collapse functionality
  const renderItems = (items, currentPath) => {
    return (
      <ul>
        {items.map((item) => {
          const isCurrentPath = currentPath.includes(item.name);
          return (
            <li key={item.name}>
              <div
                onClick={() => handleItemClick(item)}
                style={{
                  cursor: item.children ? "pointer" : "default",
                  fontWeight: isCurrentPath ? "bold" : "normal", // Highlight current path
                }}
              >
                {item.children
                  ? expandedItems[item.name]
                    ? "📂 "
                    : "📁 "
                  : "📄 "}
                {item.name}
              </div>
              {expandedItems[item.name] && item.children && renderItems(item.children, currentPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  // Render items based on the current path
  const getCurrentItems = (data, currentPath) => {
    let currentLevelData = data;
    for (let i = 0; i < currentPath.length; i++) {
      currentLevelData = currentLevelData.find(item => item.name === currentPath[i])?.children || [];
    }
    return currentLevelData;
  };

  return (
    <div className="nested-list">
      {/* Path display */}
      <div className="path-bar">
        Path: {path.length > 0 ? path.join(" / ") : "Root"}
      </div>

      {/* Back button */}
      {path.length > 0 && (
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      )}

      {/* Render the list based on the current path */}
      {renderItems(getCurrentItems(data, path), path)}
    </div>
  );
}

export default NestedList;
