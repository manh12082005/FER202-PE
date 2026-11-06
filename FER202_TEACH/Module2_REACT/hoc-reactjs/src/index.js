// ======================================================
// FILE: index.js  —  ĐIỂM KHỞI CHẠY CỦA ỨNG DỤNG REACT
// ======================================================
//
// 🔥 LUỒNG CHẠY CỦA REACT APP (từ trên xuống dưới):
//
//  [1] Trình duyệt mở file public/index.html
//      → Trong file đó có: <div id="root"></div>
//      → Đây là "container" rỗng, React sẽ render mọi thứ vào đây.
//
//  [2] Webpack/React Scripts load file index.js này (entry point)
//      → index.js là file đầu tiên được chạy trong thư mục src/
//
//  [3] ReactDOM.createRoot() tìm thẻ <div id="root"> trong HTML
//      → Tạo ra một "React Root" — vùng kiểm soát của React trên DOM.
//
//  [4] root.render(<App />) ra lệnh React render component App
//      → Từ đây React bắt đầu vẽ toàn bộ giao diện vào #root.
//
//  Tóm tắt luồng:
//  index.html (#root) → index.js → App.js → các component con
// ======================================================



// Import ReactDOM: cầu nối giữa React và trình duyệt (DOM thật)
// "react-dom/client" là phiên bản mới từ React 18 (hỗ trợ Concurrent Mode)
import ReactDOM from 'react-dom/client';

// Import file CSS toàn cục — áp dụng style cho toàn bộ ứng dụng
import './index.css';

// Import component gốc App — đây là component cha của toàn bộ cây component
import App from './App';


// Bước 1: Tìm thẻ <div id="root"> trong public/index.html
//          và tạo React Root tại đó
const root = ReactDOM.createRoot(document.getElementById('root'));

// Bước 2: Render component <App /> vào trong #root
//          Toàn bộ giao diện sẽ được sinh ra từ <App /> trở đi
root.render(
  <App />
);
