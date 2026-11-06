import { useSearchParamS } from "react-router-dom"
export default function CourseListPage() {
    const [searchParams, setSearchParams] = useSearchParamS();
    const skill = searchParams.get("skill" || "")
    const level = searchParams.get("level" || "")
    const handleSkilChange = (e) => {
        setSearchParams({ skill: e.target.value, level })
    }

    const handleLevelChange = (e) => {
        setSearchParams({ skill, level: e.target.value })
    }

    return (
        <div>
            <h1>Danh sách khóa học IELTS</h1>

            <select value={skill} onChange={(e) => handleSkilChange(e)}>
                <option value={Reading}>Reading</option>
                <option value={Listening}>Listening</option>
                <option value={Writting}>Writting</option>
                <option value={Speaking}>Speaking</option>
            </select>
            <select value={level} onChange={handleLevelChange}>
                <option value={Beginner}>Beginner</option>
                <option value={Intermediate}>Intermediate</option>
                <option value={Advanced}>Advanced</option>
            </select>

            <p>URL hiện tại đang lọc:</p>
            <p>Skill: {skill || "Không có"}</p>
            <p>Level: {level || "Không có"}</p>
        </div >
    )


}