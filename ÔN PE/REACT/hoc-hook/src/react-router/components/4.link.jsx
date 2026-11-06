// Nôm na:
// Link giống thẻ <a>, nhưng dành riêng cho React Router.
// Không nên dùng:

<a href="/courses">Khóa học</a>

// Vì nó làm browser reload lại toàn bộ trang.
// Nên dùng:
import { Link } from "react-router-dom";

<Link to="/courses">Khóa học</Link>

// Khác nhau:
// <a href="/courses">
// → reload cả website
// <Link to="/courses">
// → chỉ đổi URL và đổi component cần render
// → không reload toàn bộ app
// Ví dụ Header:

function Header() {
  return (
    <nav>
      <Link to="/">Trang chủ</Link>
      <Link to="/courses">Khóa học</Link>
      <Link to="/tests">Bài test</Link>
      <Link to="/login">Đăng nhập</Link>
    </nav>
  );
}

// Khi bấm “Khóa học”:
// URL đổi thành /courses
// ↓
// React Router tìm Route path="/courses"
// ↓
// Render CourseListPage