// Component Link dùng để tạo các liên kết (như thẻ <a>) giúp chuyển trang mượt mà không bị reload trang
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>IELTS Online Learning</h1>

      {/* Link chuyển hướng người dùng đến trang danh sách khóa học (/courses) */}
      <Link to="/courses">Xem khóa học</Link>
      <br />
      {/* Link chuyển hướng người dùng vào khu vực học tập (/learning) */}
      <Link to="/learning">Vào khu học tập</Link>
    </div>
  );
}

export default HomePage;