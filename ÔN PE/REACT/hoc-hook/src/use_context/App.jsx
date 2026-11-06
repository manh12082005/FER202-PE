import { AuthProvider } from "./AuthContext";
import Header from "./Header";
import Login from "./Login";

function App() {
  return (
    // AuthProvider bọc toàn bộ ứng dụng để các component con có thể dùng chung dữ liệu
    <AuthProvider>
      {/* Header và Login là các component con = children của AuthProvider */}
      <Header />
      <Login />
    </AuthProvider>
  );
}

export default App;