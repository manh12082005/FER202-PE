import React from 'react';
// Container: Bao bọc nội dung, giúp căn giữa và tạo khoảng cách 2 bên.
// Row: Đại diện cho một hàng, dùng để chứa các cột (Col).
// Col: Cột trong hệ thống lưới 12 cột.
import { Container, Row, Col } from 'react-bootstrap';

function LayoutExample() {
  return (
    <div>
      <h2 className="mb-4">Ví dụ về Layout (Grid System)</h2>
      <p>Grid system của Bootstrap chia trang thành 12 cột (columns).</p>

      <h4 className="mt-4">1. Chia cột đều nhau (Auto-layout)</h4>
      {/* fluid={true} sẽ làm Container trải rộng 100% màn hình, mặc định là có khoảng thụt lề */}
      <Container className="mb-4 p-3 border bg-light">
        <Row className="mb-3 text-center">
          {/* Không truyền prop gì, Col tự động chia đều không gian khả dụng trong Row */}
          <Col className="border p-2 bg-white">1 trong 2 cột</Col>
          <Col className="border p-2 bg-white">2 trong 2 cột</Col>
        </Row>
        <Row className="text-center">
          <Col className="border p-2 bg-white">1 trong 3</Col>
          <Col className="border p-2 bg-white">2 trong 3</Col>
          <Col className="border p-2 bg-white">3 trong 3</Col>
        </Row>
      </Container>

      <h4 className="mt-4">2. Đặt kích thước cụ thể</h4>
      <Container className="mb-4 p-3 border bg-light">
        <Row className="text-center">
          {/* xs={8} nghĩa là trên màn hình cực nhỏ (xs) trở lên, cột này chiếm 8/12 phần */}
          <Col xs={8} className="border p-2 bg-white">xs=8 (chiếm 8/12)</Col>
          {/* xs={4} chiếm 4/12 phần còn lại */}
          <Col xs={4} className="border p-2 bg-white">xs=4 (chiếm 4/12)</Col>
        </Row>
      </Container>

      <h4 className="mt-4">3. Responsive (Thay đổi theo màn hình)</h4>
      <p>Thu nhỏ trình duyệt để xem sự thay đổi.</p>
      <Container className="p-3 border bg-light">
        <Row className="text-center">
          {/* 
            xs={12}: Trên điện thoại (màn hình nhỏ xs), cột chiếm toàn bộ 12/12 (100% chiều rộng).
            md={6}: Khi màn hình đạt kích thước trung bình (md - tablet, laptop), cột co lại chỉ chiếm 6/12 (50% chiều rộng).
          */}
          <Col xs={12} md={6} className="border p-2 bg-white mb-2">xs=12 md=6</Col>
          <Col xs={12} md={6} className="border p-2 bg-white mb-2">xs=12 md=6</Col>
        </Row>
      </Container>
    </div>
  );
}

export default LayoutExample;
