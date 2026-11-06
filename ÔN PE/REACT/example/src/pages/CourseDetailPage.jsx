// Import hook useParams để lấy các tham số động từ đường dẫn URL (như :courseId)
import { useParams } from "react-router-dom";

function CourseDetailPage() {
  // Lấy chính xác tên tham số "courseId" đã được định nghĩa trong thẻ <Route> ở App.js
  const { courseId } = useParams();

  return (
    <div>
      <h1>Chi tiết khóa học</h1>
      {/* Hiển thị ID của khóa học lên màn hình */}
      <p>ID khóa học lấy từ URL: {courseId}</p>
    </div>
  );
}

export default CourseDetailPage;