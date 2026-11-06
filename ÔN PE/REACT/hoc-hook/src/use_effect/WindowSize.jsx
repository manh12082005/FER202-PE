//useEffect với event listener
import { useEffect, useState } from "react";

export default function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <h2>Chiều rộng màn hình: {width}px</h2>;
}
//useEffect với document title
import { useEffect, useState } from "react";

export default function CounterTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Bạn đã bấm ${count} lần`;
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
    </div>
  );
}
//useEffect với localStorage
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <h2>Theme hiện tại: {theme}</h2>

      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
//useEffect với route param
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetail() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(
        `http://localhost:5000/courses/${courseId}`
      );

      setCourse(response.data);
    };

    fetchCourse();
  }, [courseId]);

  if (!course) return <p>Đang tải khóa học...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
    </div>
  );
}
