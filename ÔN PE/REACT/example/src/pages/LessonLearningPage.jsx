// Import hook useParams để lấy tham số động từ URL
import { useParams } from "react-router-dom";

function LessonLearningPage() {
  // Route định nghĩa là "/courses/:courseId/lessons/:lessonId" nên ta có thể lấy cả 2 tham số này từ URL
  const { courseId, lessonId } = useParams();

  return (
    <div>
      <h1>Trang học bài</h1>
      {/* Hiển thị ID của khóa học và ID của bài học đang học */}
      <p>Course ID: {courseId}</p>
      <p>Lesson ID: {lessonId}</p>
    </div>
  );
}

export default LessonLearningPage;