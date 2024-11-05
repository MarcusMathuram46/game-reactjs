import React, { useState } from 'react'
import "../styles/BoxSplit.css"

function Box({ size, level }) {
    const [isSplit, setIsSplit] = useState(false);
  
    const handleSplit = () => {
      setIsSplit(true);
    };
  
    // Base case: if the box is split, recursively render four smaller boxes
    if (isSplit) {
      const newSize = size / 2;
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            width: size,
            height: size,
            border: level === 0 ? '1px solid black' : 'none', // Show initial border only
          }}
          onClick={(e) => e.stopPropagation()} // Prevent click from propagating to parent
        >
          <Box size={newSize} level={level + 1} />
          <Box size={newSize} level={level + 1} />
          <Box size={newSize} level={level + 1} />
          <Box size={newSize} level={level + 1} />
        </div>
      );
    }
  
    // Render the initial box that can be clicked to split
    return (
      <div
        style={{
          width: size,
          height: size,
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleSplit}
      ></div>
    );
  }
function BoxSplit() {
  return (
    <div className="App">
      <h1>Box Split</h1>
      <Box size={200} level={0} />
    </div>
  )
}

export default BoxSplit
