import React, { useState } from "react";
import "../styles/ElementTransfer.css";

function ElementTransfer() {
  const [bucket1, setBucket1] = useState(["Item 1", "Item 2", "Item 3", "Item 5"]);
  const [bucket2, setBucket2] = useState(["Item 4", "Item 6"]);
  const [selectedItems, setSelectedItems] = useState({
    bucket1: [],
    bucket2: [],
  });

  const handleSelect = (bucket, item) => {
    setSelectedItems((prevSelected) => {
      const selected = prevSelected[bucket].includes(item)
        ? prevSelected[bucket].filter((i) => i !== item)
        : [...prevSelected[bucket], item];
      return { ...prevSelected, [bucket]: selected };
    });
  };

  const handleAdd = () => {
    setBucket2([...bucket2, ...selectedItems.bucket1]);
    setBucket1(bucket1.filter((item) => !selectedItems.bucket1.includes(item)));
    setSelectedItems({ ...selectedItems, bucket1: [] });
  };

  const handleRemove = () => {
    setBucket1([...bucket1, ...selectedItems.bucket2]);
    setBucket2(bucket2.filter((item) => !selectedItems.bucket2.includes(item)));
    setSelectedItems({ ...selectedItems, bucket2: [] });
  };

  const handleAddAll = () => {
    setBucket2([...bucket2, ...bucket1]);
    setBucket1([]);
    setSelectedItems({ bucket1: [], bucket2: selectedItems.bucket2 });
  };

  const handleRemoveAll = () => {
    setBucket1([...bucket1, ...bucket2]);
    setBucket2([]);
    setSelectedItems({ bucket1: selectedItems.bucket1, bucket2: [] });
  };

  return (
    <div className="container">
      <div>
        <h3>Bucket 1</h3>
        <ul>
          {bucket1.map((item) => (
            <li key={item}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.bucket1.includes(item)}
                  onChange={() => handleSelect("bucket1", item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={handleAddAll}>Add All</button>
        <button onClick={handleRemoveAll}>Remove All</button>
      </div>
      <div>
        <h3>Bucket 2</h3>
        <ul>
          {bucket2.map((item) => (
            <li key={item}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedItems.bucket2.includes(item)}
                  onChange={() => handleSelect("bucket2", item)}
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ElementTransfer;
