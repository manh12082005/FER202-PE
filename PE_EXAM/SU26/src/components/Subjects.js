import { useContext, useState } from "react"
import { Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { useNavigate, useSearchParams } from "react-router-dom"

export const Subjects = () => {
    // B1:Dùng thằng useSearchParams để đọc cái query string trên url
    // ví dụ subjects?status=ACTIVE ,searchPrams giúp lấy giá trị của status như là active
    const navigate = useNavigate();
    const [searchPrams] = useSearchParams()
    const { listSubjects } = useContext(BoxProvider)
    //B1: tạo biến state để lưu giá trị người chọn hoặc nhập
    const [nameFilter, setNameFilter] = useState("")
    // B2: Lấy giá trị status từ URL bằng searchPrams.get("status")
    const [selectedSub, setSelectedSub] = useState(searchPrams.get("status") || "")
    //B3:lọc theo category và brand
    const listSubjectFinal = listSubjects.filter((subject) => {
        const checkName = nameFilter.toLowerCase() === "" || subject.name.toLowerCase().startsWith(nameFilter.toLowerCase())
        const checkStatus = selectedSub.toLowerCase() === "" || subject.status.toLowerCase() === (selectedSub.toLowerCase())
        return checkName && checkStatus;
    })
    return (
        <>
            {/* Tiêu đề */}
            <div style={{ display: "flex", gap: "10px" }}>
                <h2>Attendance System</h2>
                <Badge bg="secondary" className="ms-2">Subjects</Badge>
            </div>
            {/* Body */}
            <Container fluid="md">
                {/* Thông tin */}
                <Row className="mb-3">
                    <h1>Subject List</h1>
                    <p>Browse and filter available subjects</p>
                </Row>
                {/* Filter */}
                <Row className="mb-3">
                    <Form style={{ display: "flex", gap: "10px" }}>
                        {/* Input */}
                        <Form.Control type="text" placeholder="Search by name..." onChange={(e) => setNameFilter(e.target.value)} />
                        {/* Select */}
                        <Form.Select style={{ maxWidth: "150px" }} value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)}>
                            <option value="">All Status</option>
                            {[...new Set(listSubjects.map(su => su.status))].map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </Form.Select>
                    </Form>
                </Row>
                {/* Nội dung */}
                <Row className="mb-3">
                    {listSubjectFinal.map(sub => (
                        <Col key={sub.id} md={3} className="mb-3">
                            <Card className="shadow-sm h-100">
                                <Card.Body>
                                    <Card.Title>{sub.code}</Card.Title>
                                    <Card.Text>{sub.name} </Card.Text>
                                    <p>Credits:{sub.credits}</p>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <Badge bg={sub.status === "ACTIVE" ? "success" : "secondary"} className="ms-2">{sub.status}</Badge>
                                        <Button onClick={()=>navigate(`subjects/${sub.id}/attendance`)} variant="primary" className="w-100">View Attendance</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>

    )
}