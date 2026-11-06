// Nôm na:
// Nested Route là route lồng trong route cha.
// Ví dụ:
// /learning
// /learning/dashboard
// /learning/courses
// /learning/courses/:courseId
// /learning/courses/:courseId/lessons/:lessonId
// Tất cả đều thuộc khu vực Student.
// Trong dự án IELTS, student learning được đề xuất có các route như 
//  /learning/courses/:courseId/lessons,
//  /learning/courses/:courseId/lessons/:lessonId.
// Code:

<Route path="/learning" element={<StudentLayout />}>
  <Route path="dashboard" element={<StudentDashboard />} />

  <Route path="courses" element={<CourseListPage />} />

  <Route path="courses/:courseId" element={<CourseDetailPage />} />

  <Route
    path="courses/:courseId/lessons/:lessonId"
    element={<LessonLearningPage />}
  />
</Route>

// Lưu ý:
// Trong route con, không viết:
// path="/learning/courses"
// Mà viết:
// path="courses"
// Vì nó đã nằm trong cha /learning.