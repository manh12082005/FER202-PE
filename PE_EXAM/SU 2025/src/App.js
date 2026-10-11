import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import { ListMovie } from "./components/ListMovie";
import "bootstrap/dist/css/bootstrap.min.css"
import { Booking } from "./components/Booking";

function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="movies" element={<ListMovie />}></Route>
                     <Route path="booking/create" element={<Booking />}></Route>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;