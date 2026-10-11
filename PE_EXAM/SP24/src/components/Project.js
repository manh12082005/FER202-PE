import { useContext, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { Link } from "react-router-dom"
export const Project = () => {
    const { listDepartment, listEmployee, listProject } = useContext(BoxProvider)
    const [departmentFilter, setDepartmentFilter] = useState("");
    const newProjectList = listProject.map((project) => {
        const departmentName = listDepartment.find((d) => d.id == project.department)
        return {
            ...project,
            departmentName: `${departmentName.name}`,
        };
    })
    const listFinal = newProjectList.filter((project) => {
        if (departmentFilter === "" || departmentFilter === "All") return true;
        const checkDepartment = project.departmentName.toLowerCase().includes(departmentFilter.toLowerCase())
        return checkDepartment;
    })
    return (
        <>
            {/* header */}
            <div >
                <h1 style={{ textAlign: "center" }}>List of Project</h1>
            </div>
            {/* content */}
            <Container fluid >
                <Row >
                    <Col md={2} style={{ paddingLeft: "80px" }} >
                        {/* Departments */}
                        <div>
                            <h3>Departments</h3>
                            <Form>
                                {/* Radio All */}
                                <Form.Check
                                    type="radio"
                                    name="department"
                                    label="All"
                                    value="All"
                                    checked={departmentFilter === "" || departmentFilter === "All"}
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                />
                                {listDepartment.map((department) => (
                                    <Form.Check
                                        key={department.id}
                                        type="radio"
                                        name="department"
                                        label={department.name}
                                        value={department.name}
                                        checked={departmentFilter === department.name}
                                        onChange={(e) => setDepartmentFilter(e.target.value)}
                                    />
                                ))}
                            </Form>
                        </div>
                    </Col>
                    {/* content */}
                    <Col md={10} style={{ paddingRight: "100px" }}>
                        <Table striped bordered hover responsive variant="light">
                            <thead className="table-white">
                                <tr>
                                    <th>id</th>
                                    <th>Project Name</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>Type</th>
                                    <th>Department</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listFinal.map((project) => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td>{project.startDate}</td>
                                        <td>{project.type}</td>
                                        <td><Link to={`/departments/${project.department}/employess`}>{project.departmentName}</Link></td>
                                        <td><Link to={`/projects/edit/${project.id}`}>Edit</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row >
            </Container >
        </>
    )
}