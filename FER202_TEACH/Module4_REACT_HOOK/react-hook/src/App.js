import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

// useState
import { Count } from "./react-hook/usestate/Count";

// useEffect
import Counter from "./react-hook/useffect/Counter";
import CourseList from "./react-hook/useffect/CourseList";
import CourseFilter from "./react-hook/useffect/CourseFilter";

// useContext
import { ContextProvider } from "./react-hook/usecontext/context/ContextProvider";
import { Product } from "./react-hook/usecontext/components/Product";

// useParams
import ProductList from "./react-hook/use-param/ProductList";
import ProductDetail from "./react-hook/use-param/ProductDetail";

// useSearchParams
import CourseListPage from "./react-hook/use-search-param/CourseListPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* useState */}
        <Route path="/count" element={<Count />} />

        {/* useEffect */}
        <Route path="/counter" element={<Counter />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-filter" element={<CourseFilter />} />

        {/* useContext: ContextProvider bọc ngoài Component Product */}
        <Route path="/use-context" element={
          <ContextProvider>
            <Product />
          </ContextProvider>
        } />

        {/* useParams */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* useSearchParams */}
        <Route path="/courses" element={<CourseListPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
