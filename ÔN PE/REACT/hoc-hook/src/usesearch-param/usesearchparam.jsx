// Nôm na:
// useSearchParams dùng để đọc và ghi query string trên URL.
// Query string là phần sau dấu ?.
// Ví dụ:
// /courses?skill=Reading&level=Beginner&page=2
// Ở đây:
// skill = Reading
// level = Beginner
// page = 2
// Dùng khi làm search/filter/pagination.
// Dự án IELTS của bạn cần search/filter/pagination 
// cho danh sách công khai và danh sách dài.
// Cách lấy search params
import { useSearchParams } from "react-router-dom";

function CourseListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const skill = searchParams.get("skill");
  const level = searchParams.get("level");

  return (
    <div>
      <p>Skill: {skill}</p>
      <p>Level: {level}</p>
    </div>
  );
}

// URL:
// /courses?skill=Reading&level=Beginner
// Kết quả:
// Skill: Reading
// Level: Beginner
// Cách set search params
function CourseListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterReading = () => {
    setSearchParams({
      skill: "Reading",
      level: "Beginner",
    });
  };

  return (
    <button onClick={handleFilterReading}>
      Lọc Reading Beginner
    </button>
  );
}

// Khi bấm nút:
// URL đổi thành /courses?skill=Reading&level=Beginner