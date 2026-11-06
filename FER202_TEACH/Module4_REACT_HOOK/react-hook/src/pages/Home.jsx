import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>React Hooks - Ví dụ thực tế</h1>
      <ul>
        <li><strong>useState</strong>: <Link to="/count">/count</Link></li>
        <li><strong>useEffect (không có deps)</strong>: <Link to="/counter">/counter</Link></li>
        <li><strong>useEffect (deps [])</strong>: <Link to="/course-list">/course-list</Link></li>
        <li><strong>useEffect (deps [skill, level])</strong>: <Link to="/course-filter">/course-filter</Link></li>
        <li><strong>useContext</strong>: <Link to="/use-context">/use-context</Link></li>
        <li><strong>useParams</strong>: <Link to="/products">/products</Link> → click vào sản phẩm → <code>/products/:id</code></li>
        <li><strong>useSearchParams</strong>: <Link to="/courses">/courses</Link> → đổi filter → URL thay đổi theo</li>
      </ul>
    </div>
  );
}
