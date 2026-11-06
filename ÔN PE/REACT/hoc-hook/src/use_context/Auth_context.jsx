import { createContext, useState } from "react";

// 1. Tạo context để chia sẻ dữ liệu giữa các component
// AuthContext sẽ giống như một "kho dữ liệu chung".
export const AuthContext = createContext(null);

// 2. Component Provider bọc các component con cần dùng dữ liệu này
// Props `children` là các component nằm bên trong <AuthProvider>...</AuthProvider>
export function AuthProvider({ children }) {
  // 3. State lưu thông tin user đang đăng nhập
  const [user, setUser] = useState(null);

  // 4. Hàm login: set user thành dữ liệu giả lập khi đăng nhập
  const login = () => {
    setUser({
      id: 1,
      fullName: "Nguyễn Duy Mạnh",
      role: "Student",
    });
  };

  // 5. Hàm logout: xóa user để đánh dấu chưa đăng nhập
  const logout = () => {
    setUser(null);
  };

  return (
    // 6. Provider cung cấp giá trị cho tất cả component con bên trong
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {/* children chính là phần nội dung nằm giữa mở/đóng tag AuthProvider */}
      {children}
    </AuthContext.Provider>
  );
}

// Bạn sẽ cần lưu user đang đăng nhập để:
// Navbar hiển thị tên user
// Protected Route kiểm tra user đã login chưa
// Role-based Route kiểm tra student / teacher / admin
// Sidebar hiển thị menu theo role
// Logout xóa user
// Context có 3 phần chính:

// 1. createContext()  → tạo kho dữ liệu chung
// 2. Provider         → bọc component cần dùng dữ liệu
// 3. useContext()     → lấy dữ liệu ra dùng

// Hiểu đơn giản:
// Context = cái kho chung
// Provider = người đưa dữ liệu vào kho
// useContext = người lấy dữ liệu từ kho
// import { createContext, useContext, useState } from "react";

