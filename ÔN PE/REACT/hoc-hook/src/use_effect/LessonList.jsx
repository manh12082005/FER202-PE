import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LessonList() {
  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/lessons?courseId=${courseId}`
        );

        setLessons(response.data);
      } catch (err) {
        setError("Không thể tải danh sách bài học");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading) return <p>Đang tải bài học...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Danh sách bài học</h2>

      {lessons.length === 0 ? (
        <p>Khóa học này chưa có bài học.</p>
      ) : (
        lessons.map((lesson) => (
          <div key={lesson.id}>
            <h3>{lesson.title}</h3>
            <p>Thời lượng: {lesson.durationMinutes} phút</p>
          </div>
        ))
      )}
    </div>
  );
}