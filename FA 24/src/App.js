import { Product } from "./components/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css"
import { ProductDetail } from "./components/ProductDetail";

function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Product />}></Route>
                     <Route path="/product/:id" element={<ProductDetail />}></Route>

                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;