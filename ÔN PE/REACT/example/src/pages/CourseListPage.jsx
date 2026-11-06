// Import Link để chuyển trang và useSearchParams để đọc/ghi các query parameters trên URL (ví dụ: ?skill=Reading)
import { Link, useSearchParams } from "react-router-dom";

function CourseListPage() {
  // searchParams giúp đọc tham số, setSearchParams giúp cập nhật lại tham số URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy giá trị của tham số "skill" trên URL, nếu không có thì mặc định là chuỗi rỗng
  const skill = searchParams.get("skill") || "";

  // Hàm xử lý sự kiện khi bấm nút lọc
  const filterReading = () => {
    // Thay đổi URL hiện tại thêm tham số ?skill=Reading
    setSearchParams({ skill: "Reading" });
  };

  return (
    <div>
      <h1>Danh sách khóa học</h1>

      {/* Nút bấm để gọi hàm lọc thay đổi tham số URL */}
      <button onClick={filterReading}>Lọc Reading</button>

      {/* Hiển thị kỹ năng đang được lọc cho người dùng thấy */}
      <p>Skill đang lọc: {skill || "Tất cả"}</p>

      <ul>
        <li>
          {/* Link chuyển đến trang chi tiết của khóa học có ID là "course-001" */}
          <Link to="/courses/course-001">IELTS Reading Foundation</Link>
        </li>
        <li>
          {/* Link chuyển đến trang chi tiết của khóa học có ID là "course-002" */}
          <Link to="/courses/course-002">IELTS Listening Basic</Link>
        </li>
      </ul>
    </div>
  );
}

export default CourseListPage;