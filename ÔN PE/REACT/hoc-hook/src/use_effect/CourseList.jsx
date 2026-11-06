//Use efect có 0 dependecies
// useEffect(() => {
//   console.log("Chỉ chạy 1 lần sau lần render đầu tiên");
// }, []);
// Nghĩa là:
// Effect chỉ chạy 1 lần khi component được mount vào màn hình.
// Khi CourseList xuất hiện trên màn hình
// → gọi API /courses
// → lấy dữ liệu courses
// → lưu vào state courses
// → tắt loading
// → render danh sách khóa học

import { useEffect, useState } from "react";
import axios from "axios"
export default function CourseList() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get("http://localhost:5000/courses");
                setCourses(response.data)
            } catch (error) {
                setErrror("Không thể tải danh sách khóa học")
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])
    if (loading) {
        return <p>Đang tải dữ liệu....</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div>
            <h3>Danh sách khóa học</h3>
            {courses?.map((courses) => (
                <div key={courses.id}>
                    <h3>{courses.title}</h3>
                    <p>{courses.description}</p>
                </div>
            ))}
        </div>
    )








}