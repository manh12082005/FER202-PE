//use efect có 1 dependencies
import { useEffect, useState } from "react";
import axios from "axios"
// useEffect(() => {
//   console.log("Chỉ chạy 1 lần sau lần render đầu tiên");
// }, []);
//Effect chạy lần đầu, sau đó chạy lại mỗi khi dependency thay đổi.
export default function CourseSearch() {
    const [courses, setCourses] = useState([])
    const [keyword, setKeyword] = useState('')
    const [error, setError] = useState('')
    const [searchText, SetSearchText] = useState('')
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/courses?tittle_like=${keyword}`)
                setCourses(response.data)
            } catch (error) {
                setError('Không thể tìm thấy khóa học')
            }
        }
        fetchCourses();
    }, [keyword])
    if (error) {
        return <p>{error}</p>
    }
    const handleSearch = (e) =>{
        e.prevenDefault();
        SetSearchText(keyword)
    }
    return (
        <div>
            {/* <input type="text" value={keyword} placeholder="Enter course ..." 
         onChange={(e) => setKeyword(e.target.value)}/>
         <button type="button" onClick={handleSearch}>Search</button> */}
            <form onSubmit={handleSearch}>
                <input type="text" value={keyword} placeholder="Enter course ..."
                    onChange={(e) => setKeyword(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            {courses?.map((course)=>(
                <div key={course.id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                </div>
            ))}

        </div>
    )

}
// useEffect với debounce search
// Khi user gõ search, không nên gọi API ngay từng ký tự quá nhanh.
// Ví dụ user gõ:
// r
// re
// rea
// read
// readi
// reading
// Nếu mỗi lần gõ gọi API thì quá nhiều request.
// Ta dùng debounce:
import { useEffect, useState } from "react";
import axios from "axios";

export default function DebounceSearch() {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchCourses = async () => {
        const response = await axios.get(
          `http://localhost:5000/courses?title_like=${keyword}`
        );

        setCourses(response.data);
      };

      fetchCourses();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [keyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search course..."
      />

      {courses.map((course) => (
        <p key={course.id}>{course.title}</p>
      ))}
    </div>
  );
}