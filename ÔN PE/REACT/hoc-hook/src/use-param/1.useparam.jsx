// Nôm na:
// useParams dùng để lấy biến trong URL.
// Route:

<Route path="/courses/:courseId" element={<CourseDetailPage />} />

// URL:
// /courses/course-001
// Trong CourseDetailPage:

import { useParams } from "react-router-dom";

function CourseDetailPage() {
  const { courseId } = useParams();

  return <h1>Course ID: {courseId}</h1>;
}

// Kết quả:
// Course ID: course-001
// Ví dụ thực tế hơn:

function CourseDetailPage() {
  const { courseId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [courseId]);

  return <div>Chi tiết khóa học</div>;
}

// Luồng:

// URL: /courses/course-001
// ↓
// useParams lấy courseId = "course-001"
// ↓
// Gọi API: /courses/course-001
// ↓
// Lấy chi tiết khóa học
// ↓
// Render ra màn hình