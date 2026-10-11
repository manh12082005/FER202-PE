import { useContext, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { BoxProvider } from "../context/ContextProvider";
import instance from "../utils";

export const Department = () => {
  const { departments, employees, projects, workons, setWorkons } =
    useContext(BoxProvider);
  const [id, setId] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const [workEmployee, setWorkEmployee] = useState(null);
  const [selectedProId, setSelectedProId] = useState("");
  const [workHoursInput, setWorkHoursInput] = useState(0);
  const [errors, setErrors] = useState([]);

  const newDepartmentsList = departments.map((department) => {
    const manager = employees.find(
      (employee) => employee.id == department.managerId,
    );
    return {
      ...department,
      managerName: manager
        ? `${manager.empName.firstName} ${manager.empName.lastName}`
        : "Not Found",
    };
  });

  const handleButtonClick = (event) => {
    const clickedId = event.target.id;

    if (id === clickedId) {
      setId(null);
      setFilteredEmployees([]);
    } else {
      setId(clickedId);
      const filtered = employees.filter((e) => String(e.depId) === clickedId);
      setFilteredEmployees(filtered);
    }

    // Đổi phòng ban thì đóng luôn bảng Work on projects đang xem dở
    setWorkEmployee(null);
    setSelectedProId("");
    setWorkHoursInput(0);
    setErrors([]);
  };

  const handleViewWorkHours = (employee) => {
    setWorkEmployee(employee);
    setSelectedProId("");
    setWorkHoursInput(0);
    setErrors([]);
  };

  const workRows = workEmployee
    ? workons.filter((w) => String(w.empId) === String(workEmployee.id))
    : [];

  const workRowsWithProjectNames = workRows.map((w) => {
    const project = projects.find((p) => String(p.id) === String(w.proId));
    const hourly = workEmployee.empSalary / 176;
    const salary = hourly * w.workHours;
    return {
      ...w,
      proName: project ? project.proName : "Not Found",
      salary: salary,
    };
  });

  const totalSalary = workRowsWithProjectNames.reduce(
    (sum, w) => sum + w.salary,
    0,
  );

  const formatVND = (value) =>
    `${Math.round(value).toLocaleString("vi-VN")} VND`;

  const handleAddWorkHours = async () => {
    const newErrors = [];
    if (!selectedProId) newErrors.push("Project name is required");
    if (!workHoursInput || Number(workHoursInput) <= 0)
      newErrors.push("Work hours must be greater than zero");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const isDuplicate = workons.some(
      (w) =>
        String(w.empId) === String(workEmployee.id) &&
        String(w.proId) === String(selectedProId),
    );
    if (isDuplicate) {
      setErrors([
        "This project already exists. Please update work hours instead",
      ]);
      return;
    }

    const res = await instance.post("/workons", {
      proId: Number(selectedProId),
      empId: Number(workEmployee.id),
      workHours: Number(workHoursInput),
    });

    setWorkons([...workons, res.data]);
    setSelectedProId("");
    setWorkHoursInput(0);
    setErrors([]);
  };

  return (
    <>
      <div className="department">
        <p
          style={{
            fontSize: "25px",
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "20px",
          }}
        >
          Company Management
        </p>
      </div>

      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="department-list">
              <div className="department-list-header">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                  }}
                >
                  Department List
                </p>
              </div>
              <div className="department-list-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Depart Name</th>
                      <th style={{ textAlign: "center" }}>Manager</th>
                      <th style={{ textAlign: "center" }}>Employees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newDepartmentsList.map((department) => (
                      <tr>
                        <td>{department.depName}</td>
                        <td>{department.managerName}</td>
                        <td>
                          {!id ? (
                            <Button
                              variant="primary"
                              size="sm"
                              id={`${department.id}`}
                              onClick={handleButtonClick}
                            >
                              View
                            </Button>
                          ) : (
                            <Button
                              style={
                                id === department.id
                                  ? {
                                      backgroundColor: "green",
                                      borderColor: "green",
                                    }
                                  : { backgroundColor: "blue" }
                              }
                              variant="primary"
                              size="sm"
                              id={`${department.id}`}
                              onClick={handleButtonClick}
                            >
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          {/* Employees List */}
          <Col md={5} style={{ display: !id ? "none" : "block" }}>
            <div className="employee-list">
              <div className="employee-list-header">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                  }}
                >
                  Employees List
                </p>
              </div>
              <div className="employee-list-accordion">
                <Accordion
                  key={`accordion-${id}`}
                  defaultActiveKey={
                    filteredEmployees.length > 0
                      ? filteredEmployees[0].id
                      : undefined
                  }
                >
                  {filteredEmployees.map((employee, index) => (
                    <Accordion.Item eventKey={employee.id}>
                      <Accordion.Header
                        style={{
                          backgroundColor: "blue",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <p>
                          <text style={{ fontWeight: "bold" }}>
                            #{index + 1}-{employee.empName.lastName}{" "}
                            {employee.empName.firstName}
                          </text>
                          <text style={{ fontWeight: "bold" }}>
                            {employee.supervisorId == null ? " - Manager" : ""}
                          </text>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        {/* Info  */}
                        <div
                          style={{
                            borderBottom: "1px solid #cccc",
                            paddingBottom: "10px",
                          }}
                        >
                          <ul>
                            <li>Employee ID: {employee.id}</li>
                            <li>Gender: {employee.empGender}</li>
                            <li>Birthdate: {employee.empBirthdate}</li>
                          </ul>
                          <Button onClick={() => handleViewWorkHours(employee)}>
                            View Work Hours
                          </Button>
                        </div>
                        {/* Dependent List  */}
                        <div style={{ marginTop: "10px" }}>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th style={{ textAlign: "center" }}>No.</th>
                                <th style={{ textAlign: "center" }}>Name</th>
                                <th style={{ textAlign: "center" }}>
                                  Birthdate
                                </th>
                                <th style={{ textAlign: "center" }}>
                                  Relationship
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {employee.dependents.map((dependent, index) => (
                                <tr>
                                  <td style={{ textAlign: "center" }}>
                                    {index + 1}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {dependent.fullName}{" "}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {dependent.birthDate}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {dependent.relationship}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </Col>
          {/* Work Hours / Salary List  */}
          <Col md={4} style={{ display: !workEmployee ? "none" : "block" }}>
            <div className="workon-list">
              <div className="workon-list-header">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                  }}
                >
                  Work on projects
                </p>
              </div>

              {workRowsWithProjectNames.length === 0 ? (
                <p style={{ color: "red" }}>No work hours</p>
              ) : (
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>WorkId</th>
                        <th style={{ textAlign: "center" }}>Project name</th>
                        <th style={{ textAlign: "center" }}>Work hours</th>
                        <th style={{ textAlign: "center" }}>Salary (VND)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workRowsWithProjectNames.map((w) => (
                        <tr key={w.id}>
                          <td style={{ textAlign: "center" }}>{w.id}</td>
                          <td>{w.proName}</td>
                          <td style={{ textAlign: "center" }}>{w.workHours}</td>
                          <td style={{ textAlign: "right" }}>
                            {formatVND(w.salary)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div
                    style={{
                      backgroundColor: "#cfe2ff",
                      fontWeight: "bold",
                      padding: "8px",
                      marginBottom: "15px",
                    }}
                  >
                    Projects Salary: {formatVND(totalSalary)}
                  </div>
                </>
              )}

              <div className="add-workhours-form" style={{ marginTop: "15px" }}>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "25px",
                  }}
                >
                  Add new work hours
                </p>

                {errors.length > 0 && (
                  <div
                    style={{
                      backgroundColor: "#f8d7da",
                      color: "#842029",
                      padding: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <strong>Errors:</strong>
                    <ul style={{ marginBottom: 0 }}>
                      {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Project name</Form.Label>
                  <Form.Select
                    value={selectedProId}
                    onChange={(event) => setSelectedProId(event.target.value)}
                  >
                    <option value="">--- Choice a project name ---</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.proName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Work hours</Form.Label>
                  <Form.Control
                    type="number"
                    value={workHoursInput}
                    onChange={(event) => setWorkHoursInput(event.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="success"
                  style={{ width: "100%" }}
                  onClick={handleAddWorkHours}
                >
                  Add
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
