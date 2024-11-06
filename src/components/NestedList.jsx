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
      setPath((prevPath) => [...prevPath, item.name]);
    }
  };

  // Handle back button click (go up one level)
  const handleBackClick = () => {
    setPath((prevPath) => prevPath.slice(0, -1));
  };

  // Render items with expand/collapse functionality
  const renderItems = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <div
              onClick={() => handleItemClick(item)}
              style={{ cursor: item.children ? "pointer" : "default" }}
            >
              {item.children
                ? expandedItems[item.name]
                  ? "📂 "
                  : "📁 "
                : "📄 "}
              {item.name}
            </div>
            {expandedItems[item.name] && item.children && renderItems(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="nested-list">
      {/* Path display */}
      <div className="path-bar">
        Path: {path.length > 0 ? path.join(' / ') : 'Root'}
      </div>

      {/* Back button */}
      {path.length > 0 && (
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      )}

      {/* Render the list based on the current path */}
      {renderItems(data)}
    </div>
  );
}

export default NestedList;
