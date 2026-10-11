import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import { Product } from "./components/Product";

function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Product />}></Route>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;