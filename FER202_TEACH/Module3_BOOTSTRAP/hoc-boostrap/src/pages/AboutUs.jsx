import React from 'react';
import { Container, Card, Badge, Table, Accordion, Row, Col } from 'react-bootstrap';

function AboutUs() {
    const members = [
        { name: 'Nguyen Van An',  role: 'Frontend Dev',   skills: ['React', 'Bootstrap'], color: 'primary' },
        { name: 'Tran Thi Binh', role: 'UI/UX Designer', skills: ['Figma', 'CSS'],       color: 'success' },
        { name: 'Le Quoc Cuong', role: 'Backend Dev',    skills: ['Node', 'MongoDB'],    color: 'warning' },
    ];

    const schedule = [
        { week: 1, topic: 'Gioi thieu React & JSX',       status: 'Hoan thanh', statusColor: 'success' },
        { week: 2, topic: 'Props & State',                 status: 'Hoan thanh', statusColor: 'success' },
        { week: 3, topic: 'Bootstrap - Layout & Grid',     status: 'Dang hoc',   statusColor: 'warning' },
        { week: 4, topic: 'Bootstrap - Form & Validation', status: 'Chua hoc',   statusColor: 'secondary' },
        { week: 5, topic: 'React Router DOM',              status: 'Chua hoc',   statusColor: 'secondary' },
    ];

    const faqs = [
        { question: 'FER202 hoc nhung gi?',       answer: 'FER202 day ve React.js va React Bootstrap.' },
        { question: 'Can biet gi truoc khi hoc?', answer: 'Can biet HTML, CSS va JavaScript co ban.' },
        { question: 'Thi cuoi ky co gi?',         answer: 'Thi thuc hanh - xay dung ung dung web voi React, Bootstrap va Router.' },
        { question: 'Tai lieu hoc o dau?',        answer: 'react-bootstrap.netlify.app' },
    ];

    return (
        <Container>
            <h2>Gioi thieu nhom</h2>
            <p>Nhom sinh vien FPT - Mon FER202 React Bootstrap</p>

            {/* CARD + BADGE */}
            <h4>Thanh vien</h4>
            <Row>
                {members.map((m, i) => (
                    <Col xs={12} md={4} key={i}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{m.name}</Card.Title>
                                <p>{m.role}</p>
                                {m.skills.map((s, j) => (
                                    <Badge key={j} bg={m.color}>{s}</Badge>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* TABLE */}
            <h4>Lich hoc mon FER202</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tuan</th>
                        <th>Chu de</th>
                        <th>Trang thai</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((row) => (
                        <tr key={row.week}>
                            <td>Tuan {row.week}</td>
                            <td>{row.topic}</td>
                            <td>
                                <Badge bg={row.statusColor}>{row.status}</Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* ACCORDION */}
            <h4>Cau hoi thuong gap (FAQ)</h4>
            <Accordion defaultActiveKey="0">
                {faqs.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>{faq.question}</Accordion.Header>
                        <Accordion.Body>{faq.answer}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}

export default AboutUs;
