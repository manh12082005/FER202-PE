// ======================================================
// FILE: App.js  —  COMPONENT GỐC CỦA ỨNG DỤNG
// ======================================================
//
// 🔥 VỊ TRÍ TRONG LUỒNG CHẠY:
//
//  index.html → index.js → [App.js] → Header, Sider, HomePage, Footer
//                                              ↓
//                                         HomePage → Product (x3)
//
// App.js đóng vai trò là "layout chính" của toàn bộ trang web.
// Nó lắp ghép tất cả các component lại với nhau theo đúng vị trí:
//   - Header  : thanh đầu trang (logo, nav...)
//   - Sider   : thanh bên trái (menu, sidebar...)
//   - HomePage: nội dung chính giữa trang
//   - Footer  : chân trang
//
// ⚠️ Lưu ý: App là component cha của tất cả → không nhận props từ ai.
//            Nó là gốc của "cây component" (Component Tree).
// ======================================================

// Import CSS — áp dụng style cho toàn bộ layout
import './App.css';

// Import các component con — mỗi component là 1 phần giao diện riêng biệt
import { Footer } from './components/common/Footer';   // Component chân trang
import { Header } from './components/common/Header';   // Component đầu trang
import { Sider } from './components/common/Sider';     // Component sidebar (menu bên)
import { HomePage } from './components/pages/HomePage'; // Component nội dung trang chủ

// Định nghĩa component App (dùng function declaration)
// App không nhận props vì nó là component gốc, không có component cha nào gọi nó
// (trừ index.js dùng root.render(<App />))
function App() {
  return (
    // Fragment <> </> để bọc nhiều phần tử mà không thêm thẻ <div> thừa vào DOM
    <>
      {/* ---- HEADER: Luôn nằm trên cùng ---- */}
      {/*
        <Header /> được render đầu tiên → xuất hiện ở đầu trang.
        Đây là named export nên import dùng dấu ngoặc nhọn: { Header }
      */}
      <Header />

      {/* ---- LAYOUT CHÍNH: Sidebar + Nội dung ---- */}
      {/* className="layout" → dùng CSS flexbox để Sider + HomePage nằm ngang */}
      <div className="layout">
        {/*
          <Sider /> : component menu/sidebar bên trái
          <HomePage />: component trang chủ — chứa danh sách sản phẩm
          Hai component này nằm trong cùng 1 <div> để có thể dàn layout ngang (flex/grid).
        */}
        <Sider />
        <HomePage />
        {/*
          Luồng render tiếp tục vào bên trong <HomePage />:
            HomePage → listProduct.map() → <Product name price image />
                                         → render 3 sản phẩm ra màn hình
        */}
      </div>

      {/* ---- FOOTER: Luôn nằm dưới cùng ---- */}
      <Footer />
    </>
  );
}

// Export default App để index.js có thể import mà không cần dấu ngoặc nhọn:
//   import App from './App'    (default export)
//   import { App } from './App'   (sẽ bị lỗi vì App là default, không phải named export)
export default App;
