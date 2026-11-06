import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const topics = [
    { title: 'Layout', desc: 'Container, Row, Col để chia bố cục trang', link: '/layout' },
    { title: 'Navigation', desc: 'Navbar, Tabs, Breadcrumb để điều hướng', link: '/navigation' },
    { title: 'Forms', desc: 'Các kiểu Form input, validation', link: '/forms' },
    { title: 'Components', desc: 'Card, Table, Accordion, Carousel...', link: '/components' },
    { title: 'Overlays', desc: 'Modal, Alert, Toast, Tooltip...', link: '/overlays' }
  ];

  return (
    <div>
      <h1 className="mb-4 text-primary">Tài nguyên ôn thi React Bootstrap</h1>
      <p className="lead">Chào mừng! Đây là kho chứa các ví dụ thực tế được phân chia theo từng chủ đề giúp bạn ôn thi môn FER202 một cách dễ dàng.</p>
      
      <Row className="mt-4 g-4">
        {topics.map((topic, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text className="text-muted">
                  {topic.desc}
                </Card.Text>
                <Button variant="outline-primary" as={Link} to={topic.link}>
                  Xem ví dụ
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
