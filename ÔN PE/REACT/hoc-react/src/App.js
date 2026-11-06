import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Sider from "./components/common/Sider";
import HomePage from "./components/pages/HomePage";
import "./app.css"
function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Sider />
        <HomePage />
      </div>
      <Footer />
    </>
  );
}

export default App;
