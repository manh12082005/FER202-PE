import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Recipes } from "./components/Recipes";
import CreateRecipe from "./components/CreateRecipe";
import { ContextProvider } from "./context/ContextProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Recipes />}></Route>
                    <Route path="/recipe/create" element={<CreateRecipe />}></Route>
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export default App;