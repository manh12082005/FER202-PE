// Nôm na:
// Dynamic Route là đường dẫn có biến.
// Ví dụ:
// /courses/course-001
// /courses/course-002
// /courses/course-003
// Bạn không thể viết từng route:
{/* <Route path="/courses/course-001" />
<Route path="/courses/course-002" />
<Route path="/courses/course-003" />
Ta viết: */}
// <Route path="/courses/:courseId" element={<CourseDetailPage />} /
// Dấu : nghĩa là biến.
// /courses/course-001 → courseId = "course-001"
// /courses/course-999 → courseId = "course-999"
// Ví dụ dự án IELTS dùng id dạng course-001, lesson-001, test-001, q-001, 
// nên Dynamic Route rất hợp để mở chi tiết khóa học/bài học/bài test.
// Ví dụ học bài trong khóa học:
// /learning/courses/course-001/lessons/lesson-003
// Route:

<Route
  path="courses/:courseId/lessons/:lessonId"
  element={<LessonLearningPage />}
  />

// Component:

import { useParams } from "react-router-dom";

function LessonLearningPage() {
  const { courseId, lessonId } = useParams();

  return (
    <div>
      <h1>Đang học khóa: {courseId}</h1>
      <h2>Bài học: {lessonId}</h2>
    </div>
  );
}

// Kết quả:

// courseId = course-001
// lessonId = lesson-003

// Trong dự án IELTS, lessons có liên kết courseId, 
// nên route dạng này rất hợp để biết bài học đang thuộc khóa nào.