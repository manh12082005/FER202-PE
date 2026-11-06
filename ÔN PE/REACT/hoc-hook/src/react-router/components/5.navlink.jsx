// Nôm na:
// NavLink giống Link, nhưng nó biết link nào đang active.
// “Active” ở đây nghĩa là: React Router đang xem URL hiện tại có khớp 
// với đường dẫn của NavLink không.
// URL hiện tại là /learning/courses
// NavLink có to="/learning/courses"
// Ví dụ Sidebar student:

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Trang chủ
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Giới thiệu
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Liên hệ
      </NavLink>
    </div>
  );
}

// Khi URL là:
// /learning/courses
// Thì NavLink này active:

<NavLink
  to="/learning/courses"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  Khóa học
</NavLink>
// Hiểu nhanh:

// Link    = chỉ chuyển trang
// NavLink vừa điều hướng, vừa biết “đây là trang đang mở”