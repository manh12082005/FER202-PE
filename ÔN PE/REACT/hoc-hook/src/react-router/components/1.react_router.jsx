// React Router là “bản đồ điều hướng” của website React.
// Ví dụ website IELTS có nhiều trang:
// /
//  /login
//  /courses
//  /courses/course-001
//  /learning/dashboard
//  /learning/courses
//  /learning/courses/course-001/lessons/lesson-001
//  /teacher/courses
//  /admin/users
// Nếu không có React Router, React không biết:
// URL này thì hiện component nào?
// /login thì hiện LoginPage
// /courses thì hiện CourseListPage
// /learning/dashboard thì hiện StudentDashboard
// React Router giúp bạn khai báo:
// <Route path="/login" element={<LoginPage />} />
// <Route path="/courses" element={<CourseListPage />} />
// <Route path="/learning/dashboard" element={<StudentDashboard />} />