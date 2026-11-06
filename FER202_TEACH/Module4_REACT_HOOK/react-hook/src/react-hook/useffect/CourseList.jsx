import { useEffect, useState } from "react";
import axios from "axios";

// ==========================================
// BÀI HỌC VỀ: useEffect (Trường hợp truyền mảng rỗng [])
// ==========================================
// 1. Cú pháp: useEffect( () => { ... } , [] )
// 2. Đặc điểm của mảng rỗng []:
//    - Báo cho React biết rằng: "useEffect này KHÔNG phụ thuộc vào bất kỳ state nào cả"
//    - KẾT QUẢ: Code bên trong sẽ CHỈ CHẠY ĐÚNG 1 LẦN DUY NHẤT ngay sau khi mở trang web (Lần render đầu tiên).
//    - ỨNG DỤNG LỚN NHẤT: Dùng để gọi API lấy danh sách dữ liệu hiển thị lúc mới vào trang.

export default function CourseList() {
    // State lưu danh sách lấy từ API
    const [courses, setCourses] = useState([]);
    // State quản lý việc hiển thị chữ "Đang tải..."
    const [error, setError] = useState('');

    // [1] USEEFFECT VỚI DEPS []
    useEffect(() => {
        console.log("useEffect [] -> Chỉ chạy 1 lần duy nhất khi mới mở trang");

        // Gọi API lấy dữ liệu
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9999/courses");
                setCourses(response.data); // Cất dữ liệu vào state
            } catch (err) {
                setError('Không thể kết nối API. Bạn đã chạy json-server chưa?');
            }
        };

        fetchData();
    }, []); // <--- NHÌN KỸ CHỖ NÀY: mảng rỗng []



    // Nếu có lỗi thì hiện lỗi
    if (error) return <div><p>{error}</p></div>;

    // Nếu tải xong thì vẽ danh sách
    return (
        <div>
            <h3>Danh sách khóa học (Lấy API 1 lần)</h3>
            {courses.map((course) => (
                <div key={course.id}>
                    <strong>{course.title}</strong>
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
}