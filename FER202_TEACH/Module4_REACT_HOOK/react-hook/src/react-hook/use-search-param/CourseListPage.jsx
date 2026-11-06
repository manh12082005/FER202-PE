// BÀI HỌC 3: LƯU TRẠNG THÁI BỘ LỌC LÊN URL (useSearchParams)
// 
// 1. Vấn đề của useState: 
// Khi bạn search, bộ lọc được lưu trong bộ nhớ tạm của biến. Nếu bạn F5 (tải lại trang), 
// bộ nhớ bị xóa -> Mất luôn kết quả vừa lọc.
// 
// 2. Giải pháp bằng useSearchParams: 
// Dùng nó để lưu thẳng điều kiện lọc lên thanh địa chỉ (URL).
// Ví dụ: /courses?skill=Reading&level=Beginner
// Dù có F5 trang, thì chữ 'Reading' vẫn nằm chình ình trên URL -> Code sẽ đọc lại từ URL 
// và lọc lại y chang -> Không bao giờ mất. Tiện lợi nhất là có thể copy link gửi bạn bè.
//
// 3. Cơ chế hoạt động (Tại sao truyền Object lại biến thành chuỗi URL?):
// - Khi gọi setSearchParams({ skill: "Reading", level: "Pro" }), hàm này ngầm gọi công cụ URLSearchParams.
// - Nó tự động gắp key và value ghép lại (skill=Reading), nếu có nhiều biến thì nối bằng dấu '&'.
// - Cuối cùng nó tự mồi thêm dấu '?' ở đầu và dán đè lên URL trình duyệt (-> ?skill=Reading&level=Pro).
// -> Nhờ vậy sinh viên không bao giờ phải hì hục nối chuỗi thủ công bằng tay!

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Container, Table, Form } from "react-bootstrap";


export default function CourseListPage() {
    // 1. State lưu danh sách tất cả các khóa học lấy về từ API
    const [courses, setCourses] = useState([]);

    // 2. Hook đọc/ghi dữ liệu lên URL (Cách xài giống hệt useState nhưng là State của URL)
    // - searchParams: Dùng để ĐỌC giá trị đang có trên URL (ví dụ đọc chữ Reading)
    // - setSearchParams: Dùng để GHI/SỬA giá trị lên URL (ví dụ đổi chữ Reading thành Listening)
    const [searchParams, setSearchParams] = useSearchParams();

    // 3. Lấy dữ liệu 1 lần duy nhất từ API (Chuẩn đề thi PE)
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:9999/courses");
                setCourses(response.data);
            } catch (error) {
                console.error("Lỗi tải API:", error);
            }
        };
        fetchCourses();
    }, []);

    // 4. Lấy điều kiện lọc (Filter) hiện tại ĐANG CÓ TRÊN URL CẮM XUỐNG BIẾN
    // Hàm get() lấy ra giá trị. Nếu trên URL chưa có gì (null), ta cho mặc định là chuỗi rỗng ""
    const skill = searchParams.get("skill") || "";
    const level = searchParams.get("level") || "";

    // 5. Hàm chạy khi người dùng chọn một Kỹ năng (Skill) ở hộp Select
    const handleSkillChange = (e) => {
        const newSkill = e.target.value; // Giá trị mới người dùng vừa bấm
        const params = {}; // Tạo object rỗng để gom các tham số cần đẩy lên URL

        if (newSkill) params.skill = newSkill; // Đưa skill mới vào params
        if (level) params.level = level;       // Vẫn giữ lại level cũ nếu có

        // Gọi hàm đẩy lên URL -> URL thay đổi ngay lập tức
        setSearchParams(params);
    };

    // 6. Hàm chạy khi người dùng chọn một Trình độ (Level) ở hộp Select
    const handleLevelChange = (e) => {
        const newLevel = e.target.value;
        const params = {};

        if (skill) params.skill = skill;       // Giữ lại skill cũ
        if (newLevel) params.level = newLevel; // Đưa level mới vào

        setSearchParams(params);
    };

    // 7. TIẾN HÀNH LỌC DỮ LIỆU Ở CLIENT DỰA TRÊN 2 BIẾN (skill và level) ĐÃ LẤY TỪ URL XUỐNG
    const filtered = courses.filter((c) => {
        // Nếu biến skill đang rỗng (chưa chọn gì) thì matchSkill auto = true (lấy hết). 
        // Nếu có chọn thì kiểm tra xem skill của khóa học có khớp không.
        const matchSkill = skill ? c.skill === skill : true;
        const matchLevel = level ? c.level === level : true;

        // Khóa học phải thỏa mãn CẢ 2 điều kiện mới được giữ lại
        return matchSkill && matchLevel;
    });


    return (
        <Container>
            <h2>Danh sách khóa học</h2>

            {/* BỘ LỌC */}
            {/* Lưu ý: value của Form.Select được binding (kết nối) thẳng với biến lấy từ thanh URL xuống */}
            <div style={{ display: "flex", gap: "50px", marginBottom: "30px" }}>
                <Form.Select value={skill} onChange={handleSkillChange}>
                    <option value="">-- Tất cả Skill --</option>
                    <option value="Reading">Reading</option>
                    <option value="Listening">Listening</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Writing">Writing</option>
                </Form.Select>

                <Form.Select value={level} onChange={handleLevelChange}>
                    <option value="">-- Tất cả Level --</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Pro">Pro</option>
                </Form.Select>
            </div>

            {/* BẢNG HIỂN THỊ */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khóa học</th>
                        <th>Kỹ năng (Skill)</th>
                        <th>Trình độ (Level)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* KHÔNG MAP biến 'courses' gốc, mà MAP cái mảng 'filtered' đã được lọc! */}
                    {filtered.map((course) => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td><strong>{course.title}</strong></td>
                            <td>{course.skill}</td>
                            <td>{course.level}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}