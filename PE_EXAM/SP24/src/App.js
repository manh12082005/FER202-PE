import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import { Project } from "./components/Project";
import { Employee } from "./components/Employee";
import { EditProject } from "./components/EditProject";



function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Project />}></Route>
                    <Route path="/departments/:id/employess" element={<Employee />}></Route>
                    <Route path="/projects/edit/:id" element={<EditProject />}></Route>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;