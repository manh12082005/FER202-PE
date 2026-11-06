import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Badge, Alert } from 'react-bootstrap';

function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const contactInfo = [
        { label: 'Email',    value: 'support@fpt.edu.vn',    badge: 'Phan hoi trong 24h', color: 'info' },
        { label: 'Hotline',  value: '1900 2345',              badge: 'T2-T6 | 8h-17h',    color: 'success' },
        { label: 'Dia chi',  value: 'FPT University, Ha Noi', badge: 'Co so chinh',        color: 'secondary' },
        { label: 'Zalo',     value: '0901 234 567',           badge: 'Tra loi nhanh',      color: 'primary' },
    ];

    return (
        <Container>
            <h2>Lien he</h2>
            <p>Co thac mac? Hay gui tin nhan hoac lien he truc tiep!</p>

            <Row>
                {/* Cot trai: Form */}
                <Col md={7}>
                    <h5>Gui tin nhan</h5>

                    {submitted && (
                        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
                            Da gui! Chung toi se phan hoi trong vong 24h.
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} sm={6} controlId="contactName">
                                <Form.Label>Ho ten</Form.Label>
                                <Form.Control type="text" placeholder="Nguyen Van A" required />
                            </Form.Group>
                            <Form.Group as={Col} sm={6} controlId="contactEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="abc@fpt.edu.vn" required />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="contactSubject">
                            <Form.Label>Chu de</Form.Label>
                            <Form.Select required>
                                <option value="">-- Chon chu de --</option>
                                <option>Hoi ve bai hoc</option>
                                <option>Bao loi</option>
                                <option>Gop y khac</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="contactMessage">
                            <Form.Label>Noi dung</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Nhap noi dung..." required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Gui tin nhan
                        </Button>
                    </Form>
                </Col>

                {/* Cot phai: ListGroup */}
                <Col md={5}>
                    <h5>Thong tin lien he</h5>
                    <ListGroup>
                        {contactInfo.map((item, i) => (
                            <ListGroup.Item key={i}>
                                <strong>{item.label}:</strong> {item.value}{' '}
                                <Badge bg={item.color}>{item.badge}</Badge>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <p>Gio lam viec: Thu 2 - Thu 6, 8:00 - 17:00</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
