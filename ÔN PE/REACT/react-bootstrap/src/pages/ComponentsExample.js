import React from 'react';
// Card: Vùng chứa nội dung có viền, rất linh hoạt (thường dùng hiển thị sản phẩm, bài viết)
// Accordion: Danh sách các mục có thể nhấn xổ xuống để xem chi tiết bên trong
// Table: Bảng định dạng sẵn của Bootstrap
// ListGroup & Badge: Danh sách dạng danh mục và các huy hiệu nhỏ (thường dùng báo số lượng)
import { Card, Button, Accordion, Table, Carousel, ListGroup, Badge } from 'react-bootstrap';

function ComponentsExample() {
  return (
    <div>
      <h2 className="mb-4">Ví dụ về Components (Thành phần)</h2>

      <h4 className="mt-4">1. Card (Thẻ nội dung)</h4>
      <Card style={{ width: '18rem' }} className="mb-4 shadow-sm">
        {/* variant="top" bo tròn góc trên của ảnh cho vừa với Card */}
        <Card.Img variant="top" src="https://via.placeholder.com/100px180" />
        <Card.Body>
          <Card.Title>Tiêu đề Card</Card.Title>
          <Card.Text>
            Đây là một số nội dung mẫu bên trong một chiếc thẻ (Card). Thường dùng để hiển thị sản phẩm hoặc bài viết.
          </Card.Text>
          <Button variant="primary">Đi tới bài viết</Button>
        </Card.Body>
      </Card>

      <h4 className="mt-4">2. Accordion (Danh sách xổ xuống)</h4>
      {/* defaultActiveKey="0" chỉ định mục nào được mở sẵn khi vừa vào trang */}
      <Accordion defaultActiveKey="0" className="mb-4">
        {/* Mỗi Accordion.Item cần một eventKey riêng biệt để quản lý trạng thái đóng/mở */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>Câu hỏi thường gặp #1</Accordion.Header>
          <Accordion.Body>
            Nội dung câu trả lời cho câu hỏi 1. Bạn có thể chèn bất cứ thứ gì vào đây.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Câu hỏi thường gặp #2</Accordion.Header>
          <Accordion.Body>
            Nội dung câu trả lời cho câu hỏi 2. Accordion giúp tiết kiệm diện tích.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h4 className="mt-4">3. Table (Bảng dữ liệu)</h4>
      {/* 
        striped: Tạo hiệu ứng màu nền xen kẽ các hàng
        bordered: Đóng khung các ô
        hover: Đổi màu khi rê chuột
        responsive: Thêm thanh cuộn ngang nếu màn hình nhỏ, tránh bể layout
      */}
      <Table striped bordered hover responsive className="mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Họ</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </Table>

      <h4 className="mt-4">4. ListGroup & Badge</h4>
      <ListGroup className="mb-5 w-50">
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Hộp thư đến</div>
            Các tin nhắn chưa đọc
          </div>
          {/* pill làm badge bo tròn hoàn toàn. bg="primary" định dạng màu xanh */}
          <Badge bg="primary" pill>14</Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Thùng rác</div>
            Các email đã xóa
          </div>
          <Badge bg="danger" pill>2</Badge>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default ComponentsExample;
