// utils/index.js
// Tạo một "axios instance" với cấu hình dùng chung cho toàn bộ dự án.
//
// Thay vì viết URL đầy đủ ở mỗi chỗ gọi API:
//   axios.get("http://localhost:9999/products")  ← lặp lại nhiều lần
//
// Dùng instance giúp viết ngắn hơn:
//   instance.get("/products")  ← baseURL tự ghép vào thành http://localhost:9999/products

import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9999", // địa chỉ gốc của JSON Server
});

export default instance;