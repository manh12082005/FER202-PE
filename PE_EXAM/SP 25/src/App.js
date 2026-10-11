import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css"
import { Product } from "./components/Product";
import { OrderHistory } from "./components/OrderHistory";

function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Product />}></Route>
                    <Route path="/orders" element={<OrderHistory />}></Route>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;