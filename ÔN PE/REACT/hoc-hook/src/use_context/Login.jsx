import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Login() {
  // Lấy dữ liệu user và hàm login từ Context
  const { user, login } = useContext(AuthContext);

  return (
    <div>
      <h3>Trang đăng nhập</h3>

      {/* Nếu user đã tồn tại thì đã đăng nhập, ngược lại hiện nút đăng nhập */}
      {user ? (
        <p>Bạn đã đăng nhập rồi</p>
      ) : (
        <button onClick={login}>Đăng nhập Student</button>
      )}
    </div>
  );
}

export default Login;