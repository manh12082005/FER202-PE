// ============================================================
// Import các thành phần từ thư viện React Router DOM
// BrowserRouter : Bao bọc toàn bộ app, lắng nghe sự thay đổi URL
//                 (sử dụng HTML5 History API - không reload trang)
// Routes        : Container chứa danh sách Route,
//                 chỉ render route khớp đầu tiên với URL hiện tại
// Route         : Khai báo 1 tuyến đường: path (URL) → element (Component)
// ============================================================
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

// ── Layout cố định (luôn hiển thị, không thay đổi theo URL) ──
import Header from './templates/Header';
import Menu from './templates/Menu';
import Footer from './templates/Footer';
import Aside from './templates/Aside'

// ── Các trang (thay đổi theo URL thông qua <Routes>) ──
import Main from './pages/Main';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    /*
     * <BrowserRouter> phải bao ngoài cùng để tất cả component con
     * có thể sử dụng các hook: useNavigate, useParams, useLocation
     * Chỉ dùng MỘT <BrowserRouter> cho toàn bộ ứng dụng
     */
    <BrowserRouter>
      <div className="container">

        {/* Header và Menu luôn hiển thị trên mọi trang */}
        <Header />
        <Menu />

        <div className="row">
          {/* Aside (sidebar) cũng cố định, không phụ thuộc vào URL */}
          <Aside />

          {/* Vùng nội dung chính — thay đổi theo URL */}
          <div className="col-md-9">

            {/*
             * <Routes> duyệt từng <Route> từ trên xuống
             * và render component của route khớp đầu tiên.
             *
             * Ví dụ:
             *   URL = "/"        → render <Main />
             *   URL = "/about"   → render <AboutUs />
             *   URL = "/contact" → render <Contact />
             */}
            <Routes>
              {/* Trang chủ — khớp với "/" hoặc "/home" */}
              <Route path='/'      element={<Main />}    />
              <Route path='/home'  element={<Main />}    />

              {/* Trang Giới thiệu */}
              <Route path='/about'   element={<AboutUs />} />

              {/* Trang Liên hệ */}
              <Route path='/contact' element={<Contact />} />

              {/* Trang Đăng ký tài khoản */}
              <Route path='/signup'  element={<SignUp />}  />

              {/* Trang Đăng nhập */}
              <Route path='/signin'  element={<SignIn />}  />

              {/*
               * Gợi ý: Có thể thêm route bắt lỗi 404 ở cuối:
               * <Route path='*' element={<NotFound />} />
               */}
            </Routes>

          </div>
        </div>

        {/* Footer luôn hiển thị ở cuối mọi trang */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
