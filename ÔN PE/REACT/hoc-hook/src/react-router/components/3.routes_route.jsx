// Routes là nơi chứa danh sách route.
// Route là từng đường dẫn cụ thể.
// Ví dụ:
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CourseListPage from "./pages/CourseListPage";

export default function App() {
 return (
   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/courses" element={<CourseListPage />} />
   </Routes>
 );
}
// Ý nghĩa:
// path="/"        → hiện HomePage
// path="/login"   → hiện LoginPage
// path="/courses" → hiện CourseListPage
// path là đường dẫn trên URL.
// element là component sẽ được hiển thị.
