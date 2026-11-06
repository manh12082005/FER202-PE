import React, { useState } from 'react';
// Nav: Thành phần điều hướng cơ bản
// Tabs & Tab: Dùng để tạo các thẻ nội dung xen kẽ nhau trên cùng 1 vị trí
// Breadcrumb: Đường dẫn (ví dụ: Trang chủ > Thư mục > Bài viết)
import { Nav, Tabs, Tab, Breadcrumb } from 'react-bootstrap';

function NavigationExample() {
  const [key, setKey] = useState('home');

  return (
    <div>
      <h2 className="mb-4">Ví dụ về Navigation (Điều hướng)</h2>

      <h4 className="mt-4">1. Breadcrumb (Đường dẫn)</h4>
      {/* Breadcrumb.Item dùng cho từng cấp, mục nào có thuộc tính active là mục hiện tại */}
      <Breadcrumb className="bg-light p-3 rounded">
        <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Thư viện</Breadcrumb.Item>
        <Breadcrumb.Item active>Dữ liệu</Breadcrumb.Item>
      </Breadcrumb>

      <h4 className="mt-4">2. Nav (Thanh điều hướng cơ bản)</h4>
      {/* variant="pills" tạo style dạng viên thuốc. defaultActiveKey xác định mục nào đang được chọn */}
      <Nav variant="pills" defaultActiveKey="/home" className="mb-3">
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          {/* Thuộc tính disabled làm mờ đi và không bấm được */}
          <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
        </Nav.Item>
      </Nav>

      <h4 className="mt-4">3. Tabs (Các thẻ)</h4>
      <div className="border p-3 rounded">
        {/* Tabs quản lý trạng thái qua biến state 'key', mỗi Tab được phân biệt bằng 'eventKey' */}
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Trang chủ">
            <p>Nội dung của tab Trang chủ. Rất hữu ích khi muốn gom nhóm nội dung trong cùng 1 trang.</p>
          </Tab>
          <Tab eventKey="profile" title="Hồ sơ">
            <p>Nội dung của tab Hồ sơ cá nhân người dùng.</p>
          </Tab>
          <Tab eventKey="contact" title="Liên hệ">
            <p>Thông vị trí hệ của website.</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default NavigationExample;
