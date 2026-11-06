// Outlet là cái chỗ trống trong layout cha, nơi trang con được nhét vào.
// Ví dụ bạn có Student Layout:
// StudentLayout
// ├── Header
// ├── Sidebar
// └── Content
// Bạn muốn Header và Sidebar luôn giữ nguyên.
// Chỉ phần Content thay đổi:
// /learning/dashboard → hiện Dashboard
// /learning/courses   → hiện CourseList
// /learning/tests     → hiện TestList
// Vậy trong StudentLayout:

import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <StudentSidebar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Outlet nghĩa là:
// Trang con render vào đây.
// Route sẽ viết như này:

<Route path="/learning" element={<StudentLayout />}>
  <Route path="dashboard" element={<StudentDashboard />} />
  <Route path="courses" element={<MyCoursesPage />} />
  <Route path="tests" element={<PracticeTestsPage />} />
</Route>

// Luồng chạy:

// URL: /learning/courses
// ↓
// React Router thấy cha: /learning → render StudentLayout
// ↓
// Trong StudentLayout có <Outlet />
// ↓
// React Router thấy con: courses → nhét MyCoursesPage vào Outlet

// Kết quả:

// StudentLayout
// ├── Header
// ├── Sidebar
// └── Outlet
//     └── MyCoursesPage