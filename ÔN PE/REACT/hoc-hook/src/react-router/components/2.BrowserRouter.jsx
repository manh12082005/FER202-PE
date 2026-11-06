// BrowserRouter là component bọc toàn bộ app để bật chức năng routing.
// Thường đặt ở main.jsx hoặc index.js.
// Ví dụ:
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
 <BrowserRouter>
   <App />
 </BrowserRouter>
);
// Hiểu đơn giản:
// BrowserRouter = bật chế độ dùng URL cho React app
// Nếu quên bọc BrowserRouter, dùng Routes, Link, useNavigate sẽ bị lỗi.
