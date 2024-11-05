import React, { useState } from "react";
import "../styles/NestedList.css";
function NestedList({ data, path, setPath }) {
  const [expandedItems, setExpandedItems] = useState({});
  const toggleExpand = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleItemClick = (item) => {
    if (item.children) {
      toggleExpand(item.name);
      setPath((prevPath) => [...prevPath, item.name]);
    }
  };
  const handleBackClick = () => {
    setPath((prevPath) => prevPath.slice(0, -1));
  };

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
                  : "� "
                : "📄 "}
              {item.name}
            </div>
            {expandedItems[item.name] &&
              item.children &&
              renderItems(item.children)}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="nested-list">
      <div className="path-bar">
        Path: {path.length > 0 ? path.join(' / ') : 'Root'}
      </div>
      {path.length > 0 && (
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      )}
      {renderItems(data)}
    </div>
  );
}

export default NestedList;
