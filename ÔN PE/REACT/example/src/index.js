// Import React - Thư viện lõi để tạo giao diện
import React from 'react';
// Import ReactDOM - Thư viện để gắn ứng dụng React vào HTML DOM (trình duyệt)
import ReactDOM from 'react-dom/client';
// Import Component gốc của toàn bộ ứng dụng
import App from './App';

// Tìm thẻ div có id="root" trong file public/index.html làm điểm gốc
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render (hiển thị) nội dung của Component App vào trong gốc rễ đó
root.render(
    <App />
);
