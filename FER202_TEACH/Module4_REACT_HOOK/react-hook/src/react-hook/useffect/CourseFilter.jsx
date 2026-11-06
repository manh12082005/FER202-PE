import { useEffect, useState } from "react";
import axios from "axios";

// ==========================================
// BÀI HỌC VỀ: useEffect (Trường hợp truyền mảng có chứa biến [state1, state2...])
// ==========================================
// 1. Cú pháp: useEffect( () => { ... } , [skill, level] )
// 2. Đặc điểm:
//    - Vẫn chạy 1 lần lúc mới mở trang web (như thường lệ).
//    - SAU ĐÓ: Chỉ khi nào state 'skill' HOẶC 'level' bị thay đổi, thì useEffect mới chạy lại.
//    - Nếu component render lại vì một state khác thay đổi (không nằm trong mảng), useEffect SẼ KHÔNG CHẠY.
// 3. ỨNG DỤNG LỚN NHẤT: Dùng làm bộ lọc (Filter) tìm kiếm. Mỗi lần người dùng chọn bộ lọc khác -> Tự gọi API lọc lại danh sách.

export default function CourseFilter() {
    // 2 state làm tiêu chí lọc (dependency)
    const [skill, setSkill] = useState("Reading");   
    const [level, setLevel] = useState("Beginner");  
    
    // State chứa kết quả
    const [courses, setCourses] = useState([]);       
    const [loading, setLoading] = useState(false);    
    const [error, setError] = useState('');           

    // [1] USEEFFECT PHỤ THUỘC VÀO [skill, level]
    useEffect(() => {
        console.log(`Bộ lọc thay đổi: Gọi lại API với skill=${skill}, level=${level}`);
        
        setError('');
        setLoading(true);

        const fetchData = async () => {
            try {
                // Nhúng trực tiếp 2 biến skill và level vào đường link API
                const response = await axios.get(
                    `http://localhost:9999/courses?skill=${skill}&level=${level}`
                );
                setCourses(response.data);
            } catch (err) {
                setError('Lỗi API');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [skill, level]); // <--- CHỈ KHI skill hoặc level ĐỔI, thì mới chạy lại code gọi API ở trên

    return (
        <div>
            <h3>Bộ lọc (GỌi lại API khi Filter thay đổi)</h3>
            
            {/* Các thẻ <select> này khi thay đổi sẽ làm thay đổi state 'skill' và 'level' */}
            <div>
                <label>Skill: </label>
                <select value={skill} onChange={(e) => setSkill(e.target.value)}>
                    <option value="Reading">Reading</option>
                    <option value="Listening">Listening</option>
                    <option value="Speaking">Speaking</option>
                </select>

                <label> Level: </label>
                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Pro">Pro</option>
                </select>
            </div>

            {loading && <p>Đang tìm kiếm...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
                <>
                    <p>Tìm thấy <strong>{courses.length}</strong> khóa học:</p>
                    {courses.map((course) => (
                        <div key={course.id}>
                            <strong>{course.title}</strong>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}