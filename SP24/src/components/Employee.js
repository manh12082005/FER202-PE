import { useContext, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { Link, useParams } from "react-router-dom"
export const Employee = () => {
    const { listDepartment, listEmployee, listProject } = useContext(BoxProvider)
    const { id } = useParams();
    const listEmployeeDepartment = listEmployee.filter((item) => {
        const employee = item.department == id
        return employee
    })
    return (
        <>
            {/* header */}
            <div >
                <h1 style={{ textAlign: "center" }}>List of Employess</h1>
            </div>
            {/* content */}
            <Container fluid >
                <Row >
                    <Col md={10} style={{ paddingLeft: "80px" }} >
                        {/* Departments */}
                        <div>
                            <Link to="/">Home page</Link>
                            <h3>Departments:Integrated System</h3>
                        </div>
                        <Table striped bordered hover responsive variant="light">
                            <thead className="table-white">
                                <tr>
                                    <th>id</th>
                                    <th>Employee Name</th>
                                    <th>Date of birth</th>
                                    <th>Gender</th>
                                    <th>Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listEmployeeDepartment.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.dob}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.position}</td>
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