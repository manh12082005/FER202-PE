// NavLink giống Link nhưng hỗ trợ thêm trạng thái "active" (đang chọn) nếu URL hiện tại khớp với nó. 
// Outlet là nơi nhúng và hiển thị các trang con bên trong layout.
import { NavLink, Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div>
      {/* Header chung của khu vực Student */}
      <h2>Student Area</h2>

      {/* Thanh điều hướng (Navigation bar) giữ nguyên khi các trang con bên dưới thay đổi */}
      <nav>
        {/* Link về trang chủ của khu học tập */}
        <NavLink to="/learning">Dashboard</NavLink>{" "}
        
        {/* Link đến một bài học cụ thể */}
        <NavLink to="/learning/courses/course-001/lessons/lesson-001">
          Bài học mẫu
        </NavLink>
      </nav>

      {/* Đường kẻ ngang phân cách */}
      <hr />

      {/* Outlet RẤT QUAN TRỌNG: Đây là vị trí mà các nội dung Route con (như StudentDashboard, LessonLearningPage) sẽ được nhúng vào hiển thị */}
      <Outlet />
    </div>
  );
}

export default StudentLayout;