import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Header() {
  // Lấy dữ liệu user và hàm logout từ Context
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>IELTS Online Learning</h2>

      {/* Nếu đã có user thì hiện thông tin người dùng, ngược lại hiện thông báo chưa đăng nhập */}
      {user ? (
        <>
          <p>Xin chào: {user.fullName}</p>
          <p>Vai trò: {user.role}</p>
          <button onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <p>Bạn chưa đăng nhập</p>
      )}
    </div>
  );
}

export default Header;