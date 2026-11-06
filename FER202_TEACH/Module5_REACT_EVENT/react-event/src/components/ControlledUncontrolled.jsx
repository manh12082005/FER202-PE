// Form Handling: Controlled vs Uncontrolled Components
// FER202 - Module 5

import React, { useState, useRef } from "react";

// ---- CONTROLLED COMPONENT ----
// React kiểm soát giá trị input qua state
export function ControlledInput() {
  const [value, setValue] = useState("");
  return (
    <div>
      <h3>Controlled Component</h3>
      <p>React quản lý giá trị qua state:</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Gõ gì đó..."
      />
      <p>Giá trị hiện tại: <strong>{value}</strong></p>
      <p>Độ dài: {value.length} ký tự</p>
    </div>
  );
}

// ---- UNCONTROLLED COMPONENT ----
// DOM tự quản lý, dùng ref để lấy giá trị khi cần
export function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    alert("Giá trị: " + inputRef.current.value);
  };

  return (
    <div>
      <h3>Uncontrolled Component</h3>
      <p>DOM tự quản lý, dùng useRef để đọc khi cần:</p>
      <input ref={inputRef} defaultValue="Giá trị mặc định" />
      <button onClick={handleClick}>Lấy giá trị</button>
    </div>
  );
}

export default ControlledInput;
