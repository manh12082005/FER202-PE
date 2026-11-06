import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-light p-3 rounded shadow-sm mb-4">
      <h5 className="mb-3">Danh mục Ví dụ</h5>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/layout" active={location.pathname === '/layout'}>
          Layout (Bố cục)
        </Nav.Link>
        <Nav.Link as={Link} to="/navigation" active={location.pathname === '/navigation'}>
          Navigation (Điều hướng)
        </Nav.Link>
        <Nav.Link as={Link} to="/forms" active={location.pathname === '/forms'}>
          Forms (Biểu mẫu)
        </Nav.Link>
        <Nav.Link as={Link} to="/components" active={location.pathname === '/components'}>
          Components (Thành phần)
        </Nav.Link>
        <Nav.Link as={Link} to="/overlays" active={location.pathname === '/overlays'}>
          Overlays & Feedback
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
