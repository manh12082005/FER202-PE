import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { Link, useNavigate, useParams } from "react-router-dom"
import instance from "../utils"
export const EditProject = () => {
    const { listDepartment, listEmployee, listProject, setListProject } = useContext(BoxProvider)
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [type, setType] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");

    const Navigate = useNavigate();

    // Lấy thông tin project cũ và đổ vào form
    useEffect(() => {
        const oldProject = listProject?.find(
            (project) => project.id == id
        );

        if (oldProject) {
            setName(oldProject.name);
            setDescription(oldProject.description);
            setStartDate(oldProject.startDate);
            setType(oldProject.type);
            setDepartment(oldProject.department);
        } else {
            // Trường hợp refresh trang và dữ liệu context chưa tải xong
            instance
                .get(`/projects/${id}`)
                .then((response) => {
                    const project = response.data;

                    setName(project.name);
                    setDescription(project.description);
                    setStartDate(project.startDate);
                    setType(project.type);
                    setDepartment(project.department);
                })
                .catch((error) => {
                    console.log("Get project error:", error);
                });
        }
    }, [id, listProject]);
    const handleSubmit = async (event) => {
        event.preventDefault()
        //validate nếu ô trống
        if (
            !name.trim() ||
            !description.trim() ||
            !startDate ||
            !type.trim() ||
            !String(department).trim()
        ) {
            alert("Please enter the form fields that are required.");
            return
        }
        try {
            //biến chữa dữ liệu được cập nhật
            const updateProject = {
                name: name.trim(),
                description: description.trim(),
                startDate,
                type: type.trim(),
                department: department
            }
            // call api để update
            await instance.patch(`/projects/${id}`, updateProject)
            //cập nhật lại dữ liệu trong context
            const newList = listProject.map((project) => {
                if (project.id == id) {
                    return {
                        ...project,
                        ...updateProject
                    }
                }
                return project
            })
            //set dữ liệu mới vào
            if (setListProject) {
                setListProject(newList)
            }
            alert("Update success")
            Navigate("/")
        } catch (error) {
            setError("Update project failed!");
        }
    }
    return (
        <>
            {/* header */}
            <div >
                <h1 style={{ textAlign: "center" }}>Edit Project</h1>
            </div>
            {/* content */}
            <Container fluid >
                <Row >
                    <Col md={10} style={{ paddingLeft: "80px" }} >
                        {/* Departments */}
                        <div>
                            <Link to="/">Home page</Link>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            {/* Input Text cơ bản */}
                            <Form.Group className="mb-3">
                                <Form.Label>ProjectName*</Form.Label>
                                <Form.Control type="text" size="lg" value={name} onChange={(event) =>
                                    setName(event.target.value)} />
                            </Form.Group>

                            {/* Textarea (Ô nhập liệu to nhiều dòng) */}
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={5} value={description} onChange={(event) =>
                                    setDescription(event.target.value)} />
                            </Form.Group>
                            {/* Date */}
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" value={startDate} onChange={(event) =>
                                    setStartDate(event.target.value)} />
                            </Form.Group>
                            {/* Input Text cơ bản */}
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control type="text" size="lg" value={type} onChange={(event) =>
                                    setType(event.target.value)} />
                            </Form.Group>
                            {/* Select Department */}
                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Select size="lg" value={department} onChange={(event) =>
                                    setDepartment(event.target.value)}>
                                    {listDepartment?.map((dep) => (
                                        <option key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button type="submit">Update</Button>
                        </Form>
                    </Col>
                </Row >
            </Container >
        </>
    )
}
