import { useEffect, useState } from "react"
import { Alert, Button, Container, Form, Table } from "react-bootstrap"
import { useParams, useSearchParams } from "react-router-dom"
import instance from "../utils"

const getToday = () => {
    const date = new Date()
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export const Attendance = () => {
    const { subjectId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const classId = searchParams.get("classId") || ""

    const [subject, setSubject] = useState(null)
    const [classes, setClasses] = useState([])
    const [students, setStudents] = useState([])
    const [attendances, setAttendances] = useState([])
    const [date, setDate] = useState(getToday())
    const [statuses, setStatuses] = useState({})
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Lấy môn học, các lớp thuộc môn học và danh sách sinh viên.
    useEffect(() => {
        const loadData = async () => {
            const subjectRes = await instance.get(`/subjects/${subjectId}`)
            const classesRes = await instance.get("/classes", { params: { subjectId } })
            const studentsRes = await instance.get("/students")

            setSubject(subjectRes.data)
            setClasses(classesRes.data)
            setStudents(studentsRes.data)

        }

        loadData()
    }, [subjectId])

    // Nếu URL chưa có lớp hợp lệ, chọn lớp đầu tiên và ghi classId lên URL.
    useEffect(() => {
        const classExists = classes.some((item) => item.id === classId)
        if (classes.length > 0 && !classExists) {
            setSearchParams({ classId: classes[0].id })
        }
    }, [classes, classId, setSearchParams])

    // Lấy attendance theo classId trên URL.
    useEffect(() => {
        if (classId) {
            instance.get("/attendances", { params: { classId } })
                .then((response) => setAttendances(response.data))
        }
    }, [classId])

    const selectedClass = classes.find((item) => item.id === classId)
    const enrolledStudents = selectedClass
        ? students.filter((student) => selectedClass.enrollments.some(
            (enrollment) => enrollment.studentId === student.id && enrollment.status === "enrolled"
        ))
        : []

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (date > getToday()) {
            setError("The attendance date cannot be in the future.")
            return
        }

        if (enrolledStudents.some((student) => !statuses[student.id])) {
            setError("Please select PRESENT or ABSENT for every student.")
            return
        }

        const exists = attendances.some((item) =>
            item.classId === classId && item.date.slice(0, 10) === date
        )
        if (exists) {
            setError(`Attendance for ${date} already exists in this class`)
            return
        }

        try {
            for (const student of enrolledStudents) {
                await instance.post("/attendances", {
                    studentId: student.id,
                    classId,
                    date: `${date}T00:00:00.000Z`,
                    status: statuses[student.id]
                })
            }

            setSuccess("Attendance recorded successfully.")
            setTimeout(() => window.location.reload(), 1200)
        } catch (err) {
            const message = err.response?.data?.message || err.message
            setError(`Could not record attendance: ${message}`)
        }
    }

    return (
        <Container className="py-4">
            <h2>Record Attendance</h2>
            <p>{subject?.name} — {selectedClass?.className}</p>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Class</Form.Label>
                    <Form.Select
                        value={classId}
                        onChange={(event) => {
                            setStatuses({})
                            setSearchParams({ classId: event.target.value })
                        }}
                    >
                        {classes.map((item) => (
                            <option key={item.id} value={item.id}>{item.className}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Session Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />
                </Form.Group>

                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Student Code</th>
                            <th>Full Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledStudents.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.studentCode}</td>
                                <td>{student.fullName}</td>
                                <td>
                                    <Form.Check
                                        inline type="radio" name={student.id} label="PRESENT"
                                        checked={statuses[student.id] === "PRESENT"}
                                        onChange={() => setStatuses({ ...statuses, [student.id]: "PRESENT" })}
                                    />
                                    <Form.Check
                                        inline type="radio" name={student.id} label="ABSENT"
                                        checked={statuses[student.id] === "ABSENT"}
                                        onChange={() => setStatuses({ ...statuses, [student.id]: "ABSENT" })}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button type="submit">Record Attendance</Button>
            </Form>
        </Container>
    )
}
