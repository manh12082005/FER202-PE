import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Department } from "./components/Department";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Department />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

// localhost:3000/ = http://localhost:3000

export default App;
