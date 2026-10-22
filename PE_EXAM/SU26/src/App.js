import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css"
import { Subjects } from "./components/Subjects";
import { Attendance } from "./components/Attendance";


function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/subjects" element={<Subjects />}></Route>
                    <Route path="/subjects/:subjectId/attendance" element={<Attendance />}></Route>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;
