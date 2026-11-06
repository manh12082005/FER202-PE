import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Import components
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

// Import pages
import Home from './pages/Home';
import LayoutExample from './pages/LayoutExample';
import NavigationExample from './pages/NavigationExample';
import FormsExample from './pages/FormsExample';
import ComponentsExample from './pages/ComponentsExample';
import OverlaysExample from './pages/OverlaysExample';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <Container>
          <Row>
            {/* Sidebar chiếm 3 cột trên màn hình md trở lên */}
            <Col md={3} className="d-none d-md-block">
              <Sidebar />
            </Col>
            
            {/* Nội dung chính chiếm 9 cột */}
            <Col xs={12} md={9}>
              <div className="p-4 bg-white rounded shadow-sm min-vh-100">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/layout" element={<LayoutExample />} />
                  <Route path="/navigation" element={<NavigationExample />} />
                  <Route path="/forms" element={<FormsExample />} />
                  <Route path="/components" element={<ComponentsExample />} />
                  <Route path="/overlays" element={<OverlaysExample />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
