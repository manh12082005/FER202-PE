// useEffect với nhiều dependency
// useEffect(() => {
//   console.log("Chạy khi skill hoặc level thay đổi");
// }, [skill, level]);

import { useEffect, useState } from "react";
import axios from 'axios'
export default function CourseFilter() {
    const [skill, setSkill] = useState("Reading");
    const [level, setLevel] = useState("Beginner");
    const [courses, setCourses] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/courses?skill=${skill}&level=${level}`)
                setCourses(response.data)
            } catch (error) {
                setError('Không thể tìm thấy khóa học')
            }
        }
        fetchData();
    }, [skill, level]);
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div>
            <select value={skill} onChange={(e) => setSkill(e.target.value)}>
                <option value="Listening">Listening</option>
                <option value="Listening" >Readng</option>
                <option value="Listening">Speaking</option>
                <option value="Listening">Writting</option>
            </select>
            <select value={level} onChange={(e) => setLevel(e.target.value)} >
                <option value="Listening">Beginner</option>
                <option value="Listening">Immediately</option>
                <option value="Listening">Pro</option>
            </select>
            {courses?.map((course) => (
                <div key={course.id}>
                    <p>{course.tittle}</p>
                </div>
            ))}

        </div>
    )
}