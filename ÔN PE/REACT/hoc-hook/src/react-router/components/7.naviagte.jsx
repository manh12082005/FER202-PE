// Navigate dùng để tự chuyển hướng.
// Ý tưởng: nếu chưa đăng nhập, đừng cho vào trang bảo vệ, mà chuyển sang trang login.

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Giả sử người dùng chưa đăng nhập
  const isLoggedIn = false;

  // Nếu chưa đăng nhập thì chuyển sang /login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Nếu đã đăng nhập thì cho xem nội dung con
  return children;
}

// Cách dùng:
// <ProtectedRoute>
//   <StudentDashboard />
// </ProtectedRoute>

// Luồng hoạt động:
// 1. Người dùng vào /learning/dashboard
// 2. ProtectedRoute chạy
// 3. Nếu chưa login => chuyển sang /login
// 4. Nếu đã login => hiện StudentDashboard

// Ví dụ dễ hiểu:
// - Bạn muốn vào trang "Khoá học của tôi"
// - Nhưng chưa đăng nhập
// - Hệ thống sẽ tự đưa bạn tới trang đăng nhập
