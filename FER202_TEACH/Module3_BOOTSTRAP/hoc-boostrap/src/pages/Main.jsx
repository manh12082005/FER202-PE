import React from 'react';
import Content from '../templates/Content';

// Main: Trang chủ — chỉ render phần nội dung chính
// Header, Menu, Aside, Footer đã được render trong App.js
function Main() {
    return (
        <div className="col-md-6">
            <Content />
        </div>
    );
}

export default Main;
