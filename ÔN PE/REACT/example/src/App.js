// Import các thành phần cấu hình định tuyến (Router) từ react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom"
// Import các Trang (Pages) và Layout dùng trong ứng dụng
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/StudentDashboard";
import LessonLearningPage from "./pages/LessonLearningPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    // Bọc toàn bộ ứng dụng trong BrowserRouter để kích hoạt khả năng điều hướng URL
    <BrowserRouter>
      {/* Routes là bộ khung chứa danh sách tất cả các đường dẫn (Route) */}
      <Routes>
        {/* Đường dẫn gốc "/", khi truy cập sẽ hiển thị giao diện HomePage */}
        <Route path="/" element={<HomePage />} />
        
        {/* Đường dẫn "/courses", hiển thị danh sách khóa học */}
        <Route path="/courses" element={<CourseListPage />} />
        
        {/* Tham số động ":courseId" để lấy ID của khóa học. Ví dụ: /courses/123 -> courseId là "123" */}
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        
        {/* Route Lồng Nhau (Nested Route): "/learning" sử dụng StudentLayout (Layout chung có Sidebar/Nav) */}
        <Route path="/learning" element={<StudentLayout />}>
          {/* "index" Route: trang con mặc định được hiển thị khi truy cập đúng đường dẫn cha "/learning" */}
          <Route index element={<StudentDashboard />} />
          
          {/* Đường dẫn chi tiết bài học với 2 tham số động: courseId và lessonId (nằm trong Layout) */}
          <Route path="courses/:courseId/lessons/:lessonId" element={<LessonLearningPage />} />
        </Route>
        
        {/* Dấu "*" bắt mọi URL không khớp với bất kỳ Route nào ở trên -> Trả về Trang lỗi 404 */}
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

// Xuất App để file index.js có thể import và sử dụng để chạy ứng dụng
export default App;
