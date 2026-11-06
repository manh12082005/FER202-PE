// Nôm na:
// Index Route là trang mặc định của route cha.
// Ví dụ bạn vào:
// /learning
// Nhưng /learning chỉ là layout, chưa biết hiện trang nào.
// Bạn muốn mặc định hiện Dashboard.
// Dùng index:

<Route path="/learning" element={<StudentLayout />}>
  <Route index element={<StudentDashboard />} />
  <Route path="courses" element={<CourseListPage />} />
  <Route path="tests" element={<PracticeTestsPage />} />
</Route>

// Luồng:
// URL: /learning
// ↓
// Render StudentLayout
// ↓
// Outlet chưa có route con cụ thể
// ↓
// React Router thấy Route index
// ↓
// Nhét StudentDashboard vào Outlet
// Hiểu nhanh:
// /learning
// → StudentLayout + StudentDashboard mặc định