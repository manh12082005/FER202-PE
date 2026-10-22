# FER202 PE - CHEATSHEET & SNIPPETS TỔNG HỢP

> **💡 MẸO NHANH**: Xem tài liệu lý thuyết và hướng dẫn chi tiết toàn bộ các module tại file [KNOWLEDGE_ALL_MODULES.md](./KNOWLEDGE_ALL_MODULES.md).

Tài liệu này bao gồm các đoạn code thường xuyên gặp nhất trong đề thi Thực hành (PE) môn FER202 (ReactJS). Copy & Paste và sửa tên biến cho phù hợp!



# ==========================================
# PHẦN 1: CẤU HÌNH BAN ĐẦU (SETUP)
# ==========================================
## 1. AXIOS Config (`utils/index.js`)
Dùng để cấu hình đường dẫn API dùng chung.
```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9999',
});

export default instance;
```
## 2. CHUẨN BỊ CONTEXT API (`context/ContextProvider.js`)
Lưu toàn bộ dữ liệu vào `BoxProvider` ngay từ lúc chạy app.
```javascript
import { createContext, useEffect, useState } from "react"
import instance from "../utils";


export const BoxProvider = createContext();

export const ContextProvider = ({ children }) => {
    const [listRecipes, setListRecipes] = useState([]);

    //Call api va lay ra du lieu
    useEffect(() => {
        instance.get("/recipes").then((res) => {
            setListRecipes(res.data)
        })

    }, [])

    return (
        <BoxProvider.Provider
            value={{
                listRecipes: listRecipes, setListRecipes: setListRecipes,
            }}>
            {children}
        </BoxProvider.Provider>
    )
}
```
---

## 3. APP.JS (ROUTING CƠ BẢN ĐỂ GẮN KẾT CÁC CRUD)
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import ListItems from './components/ListItems';


function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListItems />} />
            </ <Routes>>
      </BrowserRouter>
    </ContextProvider>
  );
}
export default App;
```
---




# ==========================================
# PHẦN 2: READ & LIST (HIỂN THỊ DANH SÁCH)
# ==========================================
## 3. LẤY DỮ LIỆU & XÓA (READ & DELETE) - `ListItems.js`
Mẫu hiển thị danh sách, có kết hợp Lọc (Dropdown, Search), Sắp xếp.

```javascript
import { useContext, useState } from 'react';
import { BoxProvider } from '../context/ContextProvider';
import { Form, Row, Col, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import instance from '../utils';

export const ListItems = () => {
  const { listItems, setListItems, listCategories } = useContext(BoxProvider);
  
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(''); // Rỗng là All
  const [sortOrder, setSortOrder] = useState('asc'); 

  // 1. LỌC (FILTER) - Bước 1: Duyệt qua mảng gốc để lọc điều kiện
  let filteredData = listItems.filter(item => {
    // Bước 1a: Kiểm tra tên có chứa chuỗi search không (đưa về chữ thường để so sánh không phân biệt hoa thường)
    const matchName = (item.name || "").toLowerCase().includes(search.toLowerCase());
    // Bước 1b: Kiểm tra category. Nếu người dùng chọn "All" (chuỗi rỗng) thì luôn đúng (true). Ngược lại so sánh id.
    const matchCat = selectedCat === '' ? true : item.categoryId == selectedCat;
    // Bước 1c: Phải thỏa mãn ĐỒNG THỜI cả tên và category thì mới giữ lại phần tử này
    return matchName && matchCat;
  });

  // 2. SẮP XẾP (SORT theo giá) - Bước 2: Dùng dữ liệu ĐÃ LỌC ở trên để đem đi sắp xếp
  filteredData = filteredData.sort((a, b) => {
    // Bước 2a: Nếu chọn "asc" (Tăng dần), lấy a trừ b
    if (sortOrder === 'asc') return a.price - b.price;
    // Bước 2b: Nếu chọn "desc" (Giảm dần), lấy b trừ a
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  // 3. XÓA (DELETE) - cập nhật listItems không cần reload
  const handleRemove = async (id) => {
    const check = window.confirm("Do you want to delete this item?");
    if (!check) return;
    try {
      await instance.delete(`/items/${id}`);
      const newList = listItems.filter(item => item.id !== id);
      setListItems(newList);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control 
            placeholder="Search by name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </Col>
        <Col md={4}>
          <Form.Select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
            <option value="">All Categories</option>
            {listCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
           <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
             <option value="asc">Price Ascending</option>
             <option value="desc">Price Descending</option>
           </Form.Select>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
             <tr key={index}>
               <td>{item.id}</td>
               <td>{item.name}</td>
               <td>{item.price}</td>
               <td>
                 <Link to={`/edit/${item.id}`}>
                    <Button variant="warning" size="sm" style={{ marginRight: "10px" }}>Edit</Button>
                 </Link>
                 <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>Delete</Button>
               </td>
             </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
```
## [SP 26] ACCORDION + NESTED DATA (du lieu long nhau)

```javascript
import { Accordion } from "react-bootstrap"

<Accordion key={`accordion-${id}`} defaultActiveKey={filteredEmployees[0]?.id}>
    {filteredEmployees.map((employee, index) => (
        <Accordion.Item eventKey={employee.id}>
            <Accordion.Header>
                #{index + 1} - {employee.empName.lastName} {employee.empName.firstName}
                {employee.supervisorId == null ? " - Manager" : ""}
            </Accordion.Header>
            <Accordion.Body>
                <Button onClick={() => handleViewWorkHours(employee)}>View Work Hours</Button>
                {/* Du lieu long nhau: render mang con dependents[] */}
                <Table>
                    <thead><tr><th>No.</th><th>Name</th><th>Birthdate</th><th>Relationship</th></tr></thead>
                    <tbody>
                        {employee.dependents.map((dep, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{dep.fullName}</td>
                                <td>{dep.birthDate}</td>
                                <td>{dep.relationship}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Accordion.Body>
        </Accordion.Item>
    ))}
</Accordion>
```
---


## [FA24BL5] XEM CHI TIET TREN CUNG TRANG (MASTER-DETAIL) + THEM REVIEW (PUT VAO MANG LONG NHAU)

```javascript
// B1: Click vao nut de hien thi thong tin (khong dung useParams)
const [selectedProduct, setSelectedProduct] = useState(null);
const [id, setId] = useState(null);

const handleButtonClick = async (event) => {
    const clickedId = event.target.id;
    setId(clickedId);
    try {
        const response = await instance.get(`/products/${clickedId}`);
        setSelectedProduct(response.data);
    } catch (error) { console.error("Error:", error); }
};

// Nut bam View Detail
<Button id={`${product.id}`} onClick={handleButtonClick}>View Details</Button>

// B2: Form submit add review (tao object review roi add vao mang reviews cua product hien tai)
const handleSubmit = async (e) => {
    // Bước 1: Ngăn chặn hành vi load lại trang mặc định của form khi ấn Submit
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    try {
        const newReview = {
            reviewerName: reviewerName,
            comment: comment,
            rating: rating,
            date: new Date().toISOString()
        };

        // Put ca mang cu va them thang moi vao
        const updatedProduct = {
            ...selectedProduct,
            reviews: [...selectedProduct.reviews, newReview]
        };

        const res = await instance.put(`/products/${id}`, updatedProduct);
        setSelectedProduct(res.data);   // cap nhat lai thong tin dang hien thi
        alert("Add review Successfully!");
    } catch (err) { console.log("Loi:", err); }
}

// B3: Radio rating [1,2,3,4,5] inline
{[1, 2, 3, 4, 5].map((value) => (
    <Form.Check
        key={value}
        inline
        label={value}
        name="rating"
        type="radio"
        id={`rating-${value}`}
        value={value}
        checked={rating === value}
        onChange={(e) => setRating(Number(e.target.value))}
    />
))}

// An hien Form chi tiet
{selectedProduct ? (
    <div>{/* Form hien tai va danh sach review */}</div>
) : (
    <p>Please select a product!</p>
)}
```

```

## 4. ĐỀ FA24BL5 - Giao diện MASTER-DETAIL (Xem chi tiết & Thêm Review trên cùng trang)
```javascript
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider";
import instance from "../utils";

export const Product = () => {
    const { listProduct } = useContext(BoxProvider);
    //tạo các biến state
    const [title, setTitle] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [id, setId] = useState(null);
    const [reviewerName, setReviewerName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(false);

    const newListProduct = listProduct.filter((item) => {
        const nameMatch = item.title.toLowerCase().includes(title.toLowerCase());
        return nameMatch
    })
    const handleButtonClick = async (event) => {
        // Bước 1: Lấy id của product được click từ thuộc tính id của Button
        const clickedId = event.target.id;
        setId(clickedId); // Lưu id vào state để đánh dấu dòng đang chọn
        try {
            // Bước 2: Gọi API lấy chi tiết sản phẩm dựa trên ID (Bao gồm cả mảng reviews bên trong)
            const response = await instance.get(`/products/${clickedId}`);
            // Bước 3: Đổ dữ liệu lấy được vào state selectedProduct để form chi tiết (Master-Detail) hiện ra
            setSelectedProduct(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        // Bước 1: Chống load trang
        e.preventDefault();


        if (!reviewerName.trim()) { setError("Reviewer Name is required!"); return; }
        if (!comment.trim()) { setError("Comment is required!"); return; }

        try {

            const newReview = {
                reviewerName: reviewerName,
                comment: comment,
                rating: rating,
                date: new Date().toISOString()
            };


            const updatedProduct = {
                ...selectedProduct,
                reviews: [...selectedProduct.reviews, newReview]
            };
            const res = await instance.put(`/products/${id}`, updatedProduct);


            setSelectedProduct(res.data);
            alert("Add review Successfully!");

        } catch (err) {
            console.log("Lỗi:", err);
        }
    }

    return (
        <>
            {/* body */}
            <div>
                {/* header */}
                <div>
                    <h1 style={{ marginLeft: "45px" }}>Product List</h1>
                </div>
                <Container fluid >
                    <Row style={{ margin: "15px" }}>
                        {/* table */}
                        <Col md={6} >

                            {/* search */}
                            <div style={{ marginBottom: "10px" }}>
                                <Form.Control
                                    placeholder="Enter title search..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <Table striped bordered hover responsive variant="light">
                                <thead className="table-white">
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newListProduct.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td><Button id={`${product.id}`}
                                                onClick={handleButtonClick}>View Details</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        {/* Cart */}
                        <Col md={6}>
                            {selectedProduct ? (
                                <>
                                    <div style={{ borderBottom: "1px solid #cccc" }}>
                                        <strong>Reviews details:</strong>
                                        <div>ProductId: {selectedProduct.id}</div>
                                        <div>Title: {selectedProduct.title}</div>
                                        <div>Category: {selectedProduct.category}</div>
                                        <div>Price: {selectedProduct.price}</div>
                                    </div>

                                    {/* add */}
                                    <div>
                                        <strong>Add a new Review</strong>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Reviewer Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Reviewers name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
                                                {error === "Reviewer Name is required!" && (
                                                    <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
                                                )}

                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                                                {error === "Comment is required!" && (
                                                    <div style={{ color: "red", marginTop: "5px" }}>{error}</div>
                                                )}
                                            </Form.Group>
                                            <Form.Group className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                                <Form.Label style={{ marginRight: '20px', marginBottom: '0' }}>Rating</Form.Label>

                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <Form.Check
                                                        key={value}
                                                        inline
                                                        label={value}
                                                        name="rating"
                                                        type="radio"
                                                        id={`rating-${value}`}
                                                        value={value}
                                                        checked={rating === value}
                                                        onChange={(e) => setRating(Number(e.target.value))}
                                                    />
                                                ))}
                                            </Form.Group>
                                            <Button variant="primary" type="submit" style={{ width: "15%" }}>Send Review</Button>
                                        </Form>
                                    </div>
                                    {/* table */}
                                    <div>

                                        <Table striped bordered hover responsive variant="light">
                                            <thead className="table-white">
                                                <tr>
                                                    <th>Reviewer Name</th>
                                                    <th>Comment</th>
                                                    <th>Date</th>
                                                    <th>Rating</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedProduct.reviews?.map((review, index) => (
                                                    <tr key={index}>
                                                        <td>{review.reviewerName}</td>
                                                        <td>{review.comment}</td>
                                                        <td>{new Date(review.date).toLocaleDateString('en-GB')}</td>
                                                        <td>{review.rating}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    {/* button */}
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            style={{ width: "15%" }}
                                            onClick={() => {
                                                setSelectedProduct(null);// dưa biến về null giấu form
                                                setId(null);
                                                setReviewerName("");
                                                setComment("");
                                                setRating(1);
                                                setError("");
                                            }}
                                        >
                                            Clear Reviews
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <strong>Reviews details:</strong>
                                    <p>Please select a product!</p>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    )
};


```

# ==========================================
# PHẦN 3: CREATE / ADD (THÊM MỚI DỮ LIỆU)
# ==========================================
## 4. THÊM MỚI DỮ LIỆU (CREATE) - `AddItem.js`
Form thêm mới có Validation và tự sinh ID bằng `Date.now()`.

```javascript
import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import instance from '../utils';
import { BoxProvider } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

export const AddItem = () => {
  const { listCategories, listItems, setListItems } = useContext(BoxProvider);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Bước 2: Kiểm tra dữ liệu hợp lệ (Validation). Nếu lỗi thì set câu chửi và return luôn (không chạy code bên dưới nữa)
    if (!name.trim()) { setError("Name is required!"); return; }
    if (price <= 0) { setError("Price must be greater than 0!"); return; }
    if (!categoryId) { setError("Please select a category!"); return; }

    try {
      // Bước 3: Đóng gói các state vào chung 1 object để cbi gửi lên server
      const newItem = { 
          id: Date.now(), // Sinh ID tạm
          name, 
          price: Number(price), 
          categoryId: Number(categoryId) 
      };
      
      // Bước 4: Gọi API POST để lưu data xuống DB. Server sẽ trả về item đã có ID thật.
      const res = await instance.post('/items', newItem);
      
      // Bước 5: Cập nhật luôn Local State bằng cách copy mảng cũ [...listItems] và nhét data mới vào cuối
      if (setListItems) setListItems([...listItems, res.data]);
      
      alert("Added Successfully!");
      // Bước 6: Chuyển hướng người dùng về lại trang chủ sau khi thêm thành công
      navigate('/'); 
    } catch (err) {
      console.log("Lỗi:", err);
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add New Item</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {listCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" style={{ width: "100%" }}>Add Item</Button>
      </Form>
    </div>
  );
};
```
## [PE Trial] POST TAO MOI + CAP NHAT STATE LOCAL

```javascript
const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Recipe Name is required"); return; }
    setError("");

    const newItem = {
        id: Date.now(),   // id bang timestamp
        name, cuisine, difficulty, tags, mealType: mealTypes,
        prepTimeMinutes: Number(prepTimeMinutes) || 0,
        cookTimeMinutes: Number(cookTimeMinutes) || 0,
        image: "default.jpg", rating: 0
    };

    // Cap nhat state ngay, khong can goi API doc lai
    setListRecipes(prev => [...prev, newItem]);
    alert("Recipe saved successfully");
    navigate("/");
};
```
---


## [SU 2025] POST BOOKING - LAY GIA TRI QUA name= (khong can state)

```javascript
const handleSubmit = (e) => {
    e.preventDefault();
    const userStr  = e.target.user.value      // lay gia tri bang name=
    const movieStr = e.target.movie.value
    const dateStr  = e.target.date.value
    const seatStr  = e.target.seat.value

    if (userStr == "" || movieStr == "" || dateStr == "" || seatStr == 0) {
        setError(true); return;
    }
    setError(false)
    instance.post("/bookings", {
        id: Date.now(), userId: userStr, movieId: movieStr, showTime: dateStr, seats: seatStr
    })
    alert("Booking success!")
}

// Input dung name= thay vi state
<Form.Select name="user" defaultValue={""}>
    <option value={""}>Select User</option>
    {listUsers?.map((item) => <option value={item.id}>{item.name}</option>)}
</Form.Select>
<Form.Control type="datetime-local" name="date" />
<Form.Control type="number" name="seat" defaultValue={0} />
```
---


## [SP 26] POST WORKON + KIEM TRA TRUNG + UPDATE STATE

```javascript
const handleAddWorkHours = async () => {
    const newErrors = [];
    if (!selectedProId) newErrors.push("Project name is required");
    if (!workHoursInput || Number(workHoursInput) <= 0) newErrors.push("Work hours must be > 0");
    if (newErrors.length > 0) { setErrors(newErrors); return; }

    // Kiem tra trung: cung employee va cung project
    const isDuplicate = workons.some(
        (w) => String(w.empId) === String(workEmployee.id) && String(w.proId) === String(selectedProId)
    );
    if (isDuplicate) {
        setErrors(["This project already exists. Please update work hours instead"]); return;
    }

    const res = await instance.post("/workons", {
        proId: Number(selectedProId), empId: Number(workEmployee.id), workHours: Number(workHoursInput),
    });
    setWorkons([...workons, res.data]);   // them item server tra ve vao state
    setSelectedProId(""); setWorkHoursInput(0); setErrors([]);
};
```
---


## [SP 25] ADD TO CART (tang quantity / them moi)

```javascript
const handleAddToCart = (product) => {
    const checkListProduct = listOrder.find((item) => item.id === product.id)
    if (checkListProduct) {
        // Da co -> tang quantity
        const newListOrder = listOrder.map((item) => {
            if (item.id === product.id) return { ...item, quantity: item.quantity + 1 }
            return item
        })
        setListOrder(newListOrder)
    } else {
        // Chua co -> them moi
        const newProduct = { id: product.id, name: product.title, price: product.price, quantity: 1 }
        setListOrder([...listOrder, newProduct])
    }
}

// Remove khoi gio hang
const handleRemoveCart = (order) => {
    setListOrder(listOrder.filter((item) => item.id !== order.id))
}
```
---


## [SP 25] POST ORDER + FORMAT NGAY + TINH TONG

```javascript
const handleSubmit = (e) => {
    e.preventDefault()
    const newOrder = {
        id: Date.now(),
        orderDate: new Date().toISOString(),
        products: listOrder,
        shipAddress: e.target.address.value   // lay qua name="address"
    }
    instance.post("/orders", newOrder)
    setListOrder([])
    setMessage(true)
}

// Format ngay dd/mm/yyyy
const formatDate = (value) => new Date(value).toLocaleDateString("en-GB");

// Tính tổng tiền đơn hàng bằng reduce()
// Giải thích: 'sum' là biến tích lũy (ban đầu = 0). 'item' là từng giỏ hàng lặp qua. 
// Mỗi vòng lặp, lấy giá * số lượng rồi cộng dồn vào sum. Cuối cùng toFixed(2) để làm tròn 2 chữ số thập phân.
const getTotalPrice = (products) =>
    products.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
```
---





## 3. ĐỀ PE TRIAL - Form Thêm Mới (CRUD CREATE)
```javascript
import { Button, Container, Form } from "react-bootstrap";
import { useState, useContext } from "react";
import { BoxProvider } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import instance from "../utils";

export const CreateRecipe = () => {
    const navigate = useNavigate();
    const { setListRecipes } = useContext(BoxProvider);

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
    const [cookTimeMinutes, setCookTimeMinutes] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [tags, setTags] = useState("");
    const [mealTypes, setMealTypes] = useState("");
    const [error, setError] = useState("");

    const handleSave = async (e) => {
        // Bước 1: Chống load trang
        e.preventDefault();
        if (!name.trim()) {
            setError("Recipe Name is required");
            return;
        }
        setError("");

        // Bước 2: Gom cục data chuẩn bị gửi
        const payload = {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            prepTimeMinutes: Number(prepTimeMinutes) || 0,
            cookTimeMinutes: Number(cookTimeMinutes) || 0,
            cuisine: cuisine,
            difficulty: difficulty,
            tags: tags,
            mealType: mealTypes,
            image: "default.jpg",
            rating: 0
        };

        try {
            const newItem = { id: String(Date.now()), ...payload };

            // Bước 3: Gọi API POST
            const res = await instance.post("/recipes", newItem);

            // Bước 4: Cập nhật listRecipes trên client với dữ liệu do server trả về
            if (setListRecipes) {
                setListRecipes(function(oldList) {
                    const newList = [...oldList, res.data];
                    return newList;
                });
            }

            // Bước 5: Báo thành công và điều hướng
            alert("Recipe saved successfully");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error saving recipe");
        }
    };

    return (
        <Container style={{ maxWidth: 800, marginTop: 20 }}>
            <h2>Create Recipe</h2>
            <Form onSubmit={handleSave}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Recipe Name *</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="ingredients">
                    <Form.Label>Ingredients (separate with ;)</Form.Label>
                    <Form.Control value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="instructions">
                    <Form.Label>Instructions (separate with ;)</Form.Label>
                    <Form.Control value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="prep">
                    <Form.Label>Preparation Time Minutes</Form.Label>
                    <Form.Control type="number" value={prepTimeMinutes} onChange={(e) => setPrepTimeMinutes(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cook">
                    <Form.Label>Cook Time Minutes</Form.Label>
                    <Form.Control type="number" value={cookTimeMinutes} onChange={(e) => setCookTimeMinutes(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cuisine">
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="difficulty">
                    <Form.Label>Difficulty</Form.Label>
                    <Form.Control value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tags">
                    <Form.Label>Tags (separate with ;)</Form.Label>
                    <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="mealTypes">
                    <Form.Label>Meal Types (separate with ;)</Form.Label>
                    <Form.Control value={mealTypes} onChange={(e) => setMealTypes(e.target.value)} />
                </Form.Group>

                <div style={{ display: "flex", gap: 10 }}>
                    <Button type="submit" variant="primary">Save</Button>
                    <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
                </div>
            </Form>
        </Container>
    )
}

export default CreateRecipe;

```

# ==========================================
# PHẦN 4: DELETE / REMOVE (XÓA DỮ LIỆU)
# ==========================================

## MẪU CHUẨN: XÓA DỮ LIỆU TỪ BẢNG (DELETE)
```javascript
  // 3. XÓA (DELETE) - cập nhật listItems không cần reload
  const handleRemove = async (id) => {
    // Bước 1: Bật bảng hỏi xác nhận. Nếu user chọn Cancel (check = false) thì thoát hàm luôn
    const check = window.confirm("Do you want to delete this item?");
    if (!check) return;

    try {
      // Bước 2: Gọi API Xóa dựa trên ID
      await instance.delete(`/items/${id}`);
      // Bước 3: Cập nhật UI ngay lập tức. Dùng hàm filter giữ lại những item CÓ ID KHÁC với ID vừa bị xóa.
      const newList = listItems.filter(item => item.id !== id);
      setListItems(newList);
    } catch (err) {
      console.log("Error:", err);
    }
  };
```

## [FA 24] XEM CHI TIET + DELETE (useParams)

```javascript
const { id } = useParams();
const product = listProduct.find((item) => item.id == id)   // == khong ===

// QUAN TRONG: guard bat buoc (listProduct = [] luc dau render)
if (!product) return <div><h3>Loading product...</h3></div>;

const handleRemove = async () => {
    if (!window.confirm("Do you want to delete this product?")) return;
    try {
        await instance.delete(`/product/${product.id}`);
        const newListProduct = listProduct.filter((item) => item.id !== product.id);
        setListProduct(newListProduct);   // cap nhat state tren UI ngay
        navigate("/");
    } catch (error) { console.log("Error:", error); }
};
```
---



> *Ghi chú: Xem thêm thao tác xóa ngay trong bảng (Table) ở phần READ & LIST (Form chuẩn).*


## 5. ĐỀ FA 24 - Giao diện CHI TIẾT SẢN PHẨM & XÓA (ProductDetail)
```javascript
import { useContext, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import instance from "../utils"

export const ProductDetail = () => {
    const { listProduct, setListProduct } = useContext(BoxProvider)
    const { id } = useParams();
    const product = listProduct.find((item) => item.id == id)
    const navigate = useNavigate()
    if (!product) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h3>Loading product...</h3>
            </div>
        );
    }
    const handleRemove = async () => {
        // Bước 1: Bật bảng hỏi xác nhận
        const check = window.confirm("Do you want to delete this product?");
        if (!check) return;

        try {
            // Bước 2: Gọi API Xóa
            await instance.delete(`/product/${product.id}`);
            // Bước 3: Lọc bỏ phần tử vừa xóa và cập nhật state
            const newListProduct = listProduct.filter((item) => item.id !== product.id);
            setListProduct(newListProduct);
            // Bước 4: Chuyển hướng về trang chủ
            navigate("/");
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleBackToHome = () => {
        navigate("/")
    }

    return (
        <Container fluid >
            <Row >
                {/* image */}
                <Col md={4}>
                    <div
                        style={{
                            height: "400px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <img
                            src={`/images/${product.image}`}
                            alt={product.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                </Col>
                {/* content */}
                <Col md={8}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginTop: "20px"
                        }}
                    >
                        <h2 style={{ fontWeight: "bold" }}>
                            Product details: {product.title}
                        </h2>

                        <strong>Id: {product.id}</strong>

                        <div>
                            <strong>Description:</strong>{" "}
                            <span>{product.description}</span>
                        </div>

                        <div
                            style={{
                                color: "blue",
                                textDecoration: "line-through",
                                fontWeight: "bold"
                            }}
                        >
                            Price: ${product.price}
                        </div>

                        <div
                            style={{
                                color: "red",
                                fontWeight: "bold"
                            }}
                        >
                            Discount: {product.discountPercentage}%
                        </div>

                        <div
                            style={{
                                color: "blue",
                                fontWeight: "bold"
                            }}
                        >
                            New Price: $
                            {Math.round(
                                product.price -
                                (product.price * product.discountPercentage) / 100
                            )}
                        </div>

                        <strong>Rating: {product.rating}</strong>

                        <strong>Stock: {product.stock}</strong>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px"
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: "green",
                                    border: "none",
                                    width: "110px"
                                }}
                                onClick={handleBackToHome}
                            >
                                Back to list
                            </Button>

                            <Button
                                variant="danger"
                                style={{
                                    width: "90px"
                                }}
                                onClick={handleRemove}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row >
        </Container >
    )
}
```
# ==========================================
# PHẦN 5: UPDATE & EDIT (CẬP NHẬT DỮ LIỆU)
# ==========================================
## 5. CẬP NHẬT DỮ LIỆU (UPDATE) - `EditItem.js`
Lấy ID từ URL bằng `useParams()`, load dữ liệu cũ và gọi `instance.put`.

```javascript
import { useContext, useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { Link, useNavigate, useParams } from "react-router-dom"
import instance from "../utils"
export const EditProject = () => {
    const { listDepartment, listEmployee, listProject, setListProject } = useContext(BoxProvider)
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [type, setType] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Lấy thông tin project cũ và đổ vào form
    useEffect(() => {
        const oldProject = listProject?.find(
            (project) => project.id == id
        );

        if (oldProject) {
            setName(oldProject.name);
            setDescription(oldProject.description);
            setStartDate(oldProject.startDate);
            setType(oldProject.type);
            setDepartment(oldProject.department);
        } else {
            // Trường hợp refresh trang và dữ liệu context chưa tải xong
            instance
                .get(`/projects/${id}`)
                .then((response) => {
                    const project = response.data;

                    setName(project.name);
                    setDescription(project.description);
                    setStartDate(project.startDate);
                    setType(project.type);
                    setDepartment(project.department);
                })
                .catch((error) => {
                    console.log("Get project error:", error);
                });
        }
    }, [id, listProject]);
    const handleSubmit = async (event) => {
        // Bước 1: Ngăn hành vi load lại trang
        event.preventDefault()
        // Bước 2: Validate nếu ô trống
        if (
            !name.trim() ||
            !description.trim() ||
            !startDate ||
            !type.trim() ||
            !String(department).trim()
        ) {
            alert("Please enter the form fields that are required.");
            return
        }
        try {
            //biến chữa dữ liệu được cập nhật
            const updateProject = {
                name: name.trim(),
                description: description.trim(),
                startDate,
                type: type.trim(),
                department: department
            }
            // call api để update
            await instance.patch(`/projects/${id}`, updateProject)
            //cập nhật lại dữ liệu trong context
            const newList = listProject.map((project) => {
                if (project.id == id) {
                    return {
                        ...project,
                        ...updateProject
                    }
                }
                return project
            })
            //set dữ liệu mới vào
            if (setListProject) {
                setListProject(newList)
            }
            alert("Update success")
            navigate("/")
        } catch (error) {
            setError("Update project failed!");
        }
    }
    return (
        <>
            {/* header */}
            <div >
                <h1 style={{ textAlign: "center" }}>Edit Project</h1>
            </div>
            {/* content */}
            <Container fluid >
                <Row >
                    <Col md={10} style={{ paddingLeft: "80px" }} >
                        {/* Departments */}
                        <div>
                            <Link to="/">Home page</Link>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            {/* Input Text cơ bản */}
                            <Form.Group className="mb-3">
                                <Form.Label>ProjectName*</Form.Label>
                                <Form.Control type="text" size="lg" value={name} onChange={(event) =>
                                    setName(event.target.value)} />
                            </Form.Group>

                            {/* Textarea (Ô nhập liệu to nhiều dòng) */}
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={5} value={description} onChange={(event) =>
                                    setDescription(event.target.value)} />
                            </Form.Group>
                            {/* Date */}
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" value={startDate} onChange={(event) =>
                                    setStartDate(event.target.value)} />
                            </Form.Group>
                            {/* Input Text cơ bản */}
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Control type="text" size="lg" value={type} onChange={(event) =>
                                    setType(event.target.value)} />
                            </Form.Group>
                            {/* Select Department */}
                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Select size="lg" value={department} onChange={(event) =>
                                    setDepartment(event.target.value)}>
                                    {listDepartment?.map((dep) => (
                                        <option key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Button type="submit">Update</Button>
                        </Form>
                    </Col>
                </Row >
            </Container >
        </>
    )
}

```
---




# ==========================================
# PHẦN 6: CÁC KỸ THUẬT LỌC VÀ TÌM KIẾM (FILTER & SEARCH)
# ==========================================
## [PE Trial] CHECKBOX MULTI-SELECT + toggleItem

```javascript
const [selectedCuisines, setSelectedCuisines] = useState([]);
const [selectedMealTypes, setSelectedMealTypes] = useState([]);
const [selectedTags, setSelectedTags] = useState([]);

// Ham toggle: da co -> xoa, chua co -> them
const toggleItem = (value, setter) => {
    setter(prev => {
        const arr = Array.isArray(prev) ? prev : [];
        return arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    });
}

// Filter: mang rong = hien tat ca; co item -> dung .some
const listRecipesFinal = listRecipes.filter((item) => {
    const nameMatch = (item.name || "").toLowerCase().includes(nameState.toLowerCase());
    const cuisineMatch = selectedCuisines.length === 0
        || selectedCuisines.some(c => String(item.cuisine || "").toLowerCase().includes(String(c).toLowerCase()));
    const mealMatch = selectedMealTypes.length === 0
        || selectedMealTypes.some(m => String(item.mealType || "").toLowerCase().includes(String(m).toLowerCase()));
    const tagsValue = (item.tags || "").toString().toLowerCase();
    const tagsMatch = selectedTags.length === 0
        || selectedTags.some(t => tagsValue.includes(t.toLowerCase()));
    return nameMatch && cuisineMatch && mealMatch && tagsMatch;
})

// Render checkbox
{["Mexican", "American", "Italian", "Asian"].map((value) => (
    <Form.Check key={value} type="checkbox"
        id={`cuisine-${value.toLowerCase()}`}
        label={value}
        checked={select
        
        edCuisines.includes(value)}
        onChange={() => toggleItem(value, setSelectedCuisines)} />
))}
```
---




```javascript
// form.check
                            <Form>
                                {listMovie.map((movie) => (
                                    <Form.Check
                                        key={movie.id}
                                        type="radio"
                                        name="movie"
                                        label={movie.name}
                                        value={movie.name}
                                        onChange={(e) =>
                                            setMovieFilter(e.target.value)
                                        }
                                    />
                                ))}
                            </Form>
```
---


## [SP 25] DROPDOWN LOC (lay unique tu chinh mang)

```javascript
const arrCategory = Array.from(new Set(products?.map((item) => item.category)))
const [categoryState, setCategoryState] = useState("")

const listProductFinal = listProductNew.filter((item) =>
    item.category.toLowerCase().includes(categoryState.toLowerCase())
)

<Form.Select value={categoryState} onChange={(e) => setCategoryState(e.target.value)}>
    <option value={""}>--Select all category--</option>
    {arrCategory?.map((item) => <option key={item} value={item}>{item}</option>)}
</Form.Select>
```
---


## [SU 2025] LOC NHIEU DROPDOWN + LOC SO NGUYEN

```javascript
const arrGenre = Array.from(new Set(listMovie?.map((item) => item.genre)))
const arrYear  = Array.from(new Set(listMovie?.map((item) => item.releaseYear)))

const [genreState, setGenreState] = useState("");
const [yearState,  setYearState]  = useState("");
const [titleState, setTitleState] = useState("");

const listMovieFinal = listMovie.filter((item) => {
    const check1 = item.genre.toLowerCase().includes(genreState.toLowerCase())
    const check2 = yearState == "" ? true : item.releaseYear == yearState  // dung == de so sanh string vs number
    const check3 = item.title.toLowerCase().includes(titleState.toLowerCase())
    return check1 && check2 && check3
})
```
---


## [SP 26] CLICK ROW DE LOC + AN HIEN COT

```javascript
const [id, setId] = useState(null);   // id phong ban dang chon (kieu string)
const [filteredEmployees, setFilteredEmployees] = useState([]);

const handleButtonClick = (event) => {
    const clickedId = event.target.id;    // lay id tu attribute id cua button
    if (id === clickedId) {
        setId(null); setFilteredEmployees([]);   // click lan 2 -> tat
    } else {
        setId(clickedId);
        setFilteredEmployees(employees.filter((e) => String(e.depId) === clickedId));
    }
    setWorkEmployee(null);  // reset cot 3
}

// Button doi mau khi dang chon
<Button
    style={id === String(department.id) ? { backgroundColor: "green" } : { backgroundColor: "blue" }}
    id={`${department.id}`}    // id phai la string
    onClick={handleButtonClick}
>View</Button>

// An/hien cot bang display
<Col md={5} style={{ display: !id ? "none" : "block" }}>...</Col>
<Col md={4} style={{ display: !workEmployee ? "none" : "block" }}>...</Col>
```
---





## 2. ĐỀ PE TRIAL - Bộ lọc CHECKBOX MULTI-SELECT
```javascript
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Recipes = () => {
    const { listRecipes } = useContext(BoxProvider)
    const navigate = useNavigate();
    //lay ra name recipe
    const arrRecipe = Array.from(new Set(listRecipes?.map((item) => item.name)))
    //tao biến use state để lọc 
    const [nameState, setNameState] = useState("");
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const [selectedMealTypes, setSelectedMealTypes] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    //bước lọc
    const listRecipesFinal = listRecipes.filter((item) => {
        const nameMatch = (item.name || "").toLowerCase().includes(nameState.toLowerCase());

        // Bước 3: Lọc mảng. Gồm 2 vế nối bằng || (HOẶC):
        // - Vế 1: Nếu mảng lọc RỖNG (selectedCuisines.length === 0, không tick cái nào) thì True (lấy hết).
        // - Vế 2: Ngược lại, nếu mảng có đồ, kiểm tra xem có BẤT KỲ (.some) phần tử nào người dùng đã tick TRÙNG VỚI thuộc tính của item hay không?
        const cuisineMatch = selectedCuisines.length === 0 || selectedCuisines.some(c => String(item.cuisine || "").toLowerCase().includes(String(c).toLowerCase()));

        const mealMatch = selectedMealTypes.length === 0 || selectedMealTypes.some(m => String(item.mealType || "").toLowerCase().includes(String(m).toLowerCase()));

        const tagsMatch = selectedTags.length === 0 || selectedTags.some(t => String(item.tags || "").toLowerCase().includes(String(t).toLowerCase()));

        return nameMatch && cuisineMatch && mealMatch && tagsMatch;
    })

    // setItemState thực chất là một tham số truyền vào hàm.
    // Khi gọi hàm ở dưới giao diện (vd: onChange={() => toggleItem("Mexican", setSelectedCuisines)}),
    // tham số 'item' sẽ nhận chữ "Mexican", và 'setItemState' sẽ nhận hàm 'setSelectedCuisines'.
    const toggleItem = (item, setItemState) => {
        // Bước 1: Khai báo hàm setState dạng callback để lấy được giá trị mảng cũ nhất (oldArray)
        // Vì setItemState lúc này là setSelectedCuisines, đoạn này sẽ lấy danh sách đã chọn hiện tại
    setItemState(function(oldArray) {
            // Đề phòng trường hợp oldArray bị undefined
            const currentArray = Array.isArray(oldArray) ? oldArray : [];

            // Nếu trong mảng cũ ĐÃ CÓ cái item người dùng vừa click (tức là họ muốn Bỏ chọn)
            // Bước 2: Kiểm tra xem item người dùng vừa click ĐÃ NẰM TRONG mảng cũ chưa?
            if (currentArray.includes(item) === true) {
                // Lọc và loại bỏ cái item đó đi
                // Bước 2a: NẾU ĐÃ CÓ (tức là họ muốn bỏ tick) -> Dùng filter loại bỏ nó ra khỏi mảng
                const newArray = currentArray.filter(i => i !== item);
                return newArray;
            } 
            // Ngược lại, nếu mảng cũ CHƯA CÓ (tức là họ muốn Chọn thêm)
            else {
                // Giữ nguyên mảng cũ và thêm item mới vào cuối
                // Bước 2b: NẾU CHƯA CÓ (tức là họ muốn tick chọn) -> Copy mảng cũ và nhét item đó vào cuối mảng
                // Vd: từ mảng rỗng [] sẽ trở thành mảng mới ["Mexican"]
                const newArray = [...currentArray, item];
                return newArray;
            }
        });
    };

    return (
        <>
            {/* header */}
            <div>
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>RECIPES FORUM</h1>
            </div>
            {/* body */}
            <Container fluid >
                <Row >
                    {/* phan 1 */}
                    <Col xs={2} style={{ borderRight: "2px solid #cccc" }} >
                        {/* cuisine */}
                        <div>
                            <h3>Cuisine</h3>
                            <Form >
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-mexican"
                                    label="Mexican"
                                    checked={selectedCuisines.includes("Mexican")}
                                    onChange={() => toggleItem("Mexican", setSelectedCuisines)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-american"
                                    label="American"
                                    checked={selectedCuisines.includes("American")}
                                    onChange={() => toggleItem("American", setSelectedCuisines)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-italian"
                                    label="Italian"
                                    checked={selectedCuisines.includes("Italian")}
                                    onChange={() => toggleItem("Italian", setSelectedCuisines)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="cuisine-asian"
                                    label="Asian"
                                    checked={selectedCuisines.includes("Asian")}
                                    onChange={() => toggleItem("Asian", setSelectedCuisines)}
                                />
                            </Form>
                        </div>
                        {/* meal type */}
                        <div>
                            <h3>Meal Type</h3>
                            <Form>
                                {/* Checkbox (Có thể chọn nhiều cái cùng lúc) */}
                                <Form.Check
                                    type="checkbox"
                                    id="meal-dinner"
                                    label="Dinner"
                                    checked={selectedMealTypes.includes("Dinner")}
                                    onChange={() => toggleItem("Dinner", setSelectedMealTypes)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="meal-snack"
                                    label="Snack"
                                    checked={selectedMealTypes.includes("Snack")}
                                    onChange={() => toggleItem("Snack", setSelectedMealTypes)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="meal-dessert"
                                    label="Dessert"
                                    checked={selectedMealTypes.includes("Dessert")}
                                    onChange={() => toggleItem("Dessert", setSelectedMealTypes)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="meal-lunch"
                                    label="Lunch"
                                    checked={selectedMealTypes.includes("Lunch")}
                                    onChange={() => toggleItem("Lunch", setSelectedMealTypes)}
                                />
                            </Form>
                        </div>
                    </Col>
                    {/* content */}
                    <Col xs={8} >
                        {/* search */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                            <Form.Control onChange={(e) => setNameState(e.target.value)} defaultValue={nameState} type="text" placeholder="Enter Recipe Name to search..." style={{ width: "50%", alignItems: "center" }} />
                        </div>
                        {/* button */}
                        <div style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
                            <Button onClick={() => navigate('/recipe/create')} type="button" style={{ width: "10%", alignItems: 'end' }}>Create Recipe</Button>
                        </div>
                        {/* table */}
                        <Table striped bordered hover responsive variant="light">
                            <thead className="table-white">
                                <tr>
                                    <th>Image</th>
                                    <th>Recipes</th>
                                    <th>Cuisine</th>
                                    <th>MealType</th>
                                    <th>Tags</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listRecipesFinal?.map((recipe, index) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: "center", verticalAlign: "middle", width: "160px" }}>{
                                            (
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "150px", height: "150px" }}>
                                                    <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={`./images/${recipe.image}`} />
                                                </div>
                                            )}</td>
                                        <td>{(
                                            <div>
                                                <h1>{recipe.name}</h1>
                                                <p>PreparationTime: {recipe.prepTimeMinutes}</p>
                                                <p>Cook Time: {recipe.cookTimeMinutes}</p>
                                            </div>

                                        )}</td>

                                        <td>{recipe.cuisine}</td>
                                        <td>{recipe.mealType}</td>
                                        <td>{recipe.tags}</td>
                                        <td>{recipe.rating}</td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </Table>
                    </Col>
                    {/* Tags */}
                    <Col xs={2} >
                        <div>
                            <h3>Tags</h3>
                            <Form>
                                {/* Checkbox (Có thể chọn nhiều cái cùng lúc) */}
                                <Form.Check
                                    type="checkbox"
                                    id="tag-chicken"
                                    label="Chicken"
                                    checked={selectedTags.includes("Chicken")}
                                    onChange={() => toggleItem("Chicken", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-salsa"
                                    label="Salsa"
                                    checked={selectedTags.includes("Salsa")}
                                    onChange={() => toggleItem("Salsa", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-cookies"
                                    label="Cookies"
                                    checked={selectedTags.includes("Cookies")}
                                    onChange={() => toggleItem("Cookies", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-dessert"
                                    label="Dessert"
                                    checked={selectedTags.includes("Dessert")}
                                    onChange={() => toggleItem("Dessert", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-baking"
                                    label="Baking"
                                    checked={selectedTags.includes("Baking")}
                                    onChange={() => toggleItem("Baking", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-pasta"
                                    label="Pasta"
                                    checked={selectedTags.includes("Pasta")}
                                    onChange={() => toggleItem("Pasta", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-vegetarian"
                                    label="Vegetarian"
                                    checked={selectedTags.includes("Vegetarian")}
                                    onChange={() => toggleItem("Vegetarian", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-stir-fry"
                                    label="Stir-fry"
                                    checked={selectedTags.includes("Stir-fry")}
                                    onChange={() => toggleItem("Stir-fry", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-asian"
                                    label="Asian"
                                    checked={selectedTags.includes("Asian")}
                                    onChange={() => toggleItem("Asian", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-pizza"
                                    label="Pizza"
                                    checked={selectedTags.includes("Pizza")}
                                    onChange={() => toggleItem("Pizza", setSelectedTags)}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="tag-italian"
                                    label="Italian"
                                    checked={selectedTags.includes("Italian")}
                                    onChange={() => toggleItem("Italian", setSelectedTags)}
                                />

                            </Form>
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    )
}
```

# ==========================================
# PHẦN 7: LOGIC & SNIPPETS KHÁC
# ==========================================
## [SP 25] TINH RATE TU REVIEWS[] LONG NHAU

```javascript
const listProductNew = products.map((item) => {
    const numberFeedback = item.reviews.length
    const totalScore = item.reviews
        .map((review) => review.rating)
        .reduce((accumulator, currentVal) => accumulator + currentVal, 0)
    return { ...item, rate: (totalScore / numberFeedback).toFixed(2) }
})
```
---


## [SP 26] TINH LUONG + FORMAT VND

```javascript
// Tinh luong theo gio: (luong thang / 176) * so gio lam
const workRowsWithProjectNames = workRows.map((w) => {
    const project = projects.find((p) => String(p.id) === String(w.proId))
    const salary = (workEmployee.empSalary / 176) * w.workHours
    return { ...w, proName: project ? project.proName : "Not Found", salary }
})

const totalSalary = workRowsWithProjectNames.reduce((sum, w) => sum + w.salary, 0)
const formatVND = (v) => `${Math.round(v).toLocaleString("vi-VN")} VND`
```
---


# TOM TAT KY THUAT THEO DE

| Ky thuat                     | FA 24 | SP 25 | SU 2025 | SP 26 | PE Trial | FA24BL5 |
| ---------------------------- | :---: | :---: | :-----: | :---: | :------: | :-----: |
| Radio filter (tu bang rieng) |   v   |   -   |    -    |   -   |    -     |    -    |
| Dropdown (tu chinh mang)     |   -   |   v   |    v    |   -   |    -     |    -    |
| Checkbox multi-select        |   -   |   -   |    -    |   -   |    v     |    -    |
| Click row loc + display:none |   -   |   -   |    -    |   v   |    -     |    -    |
| Array.from(new Set)          |   -   |   v   |    v    |   -   |    -     |    -    |
| Join bang bang find()        |   v   |   -   |    -    |   v   |    -     |    -    |
| Tinh rate tu reviews[]       |   -   |   v   |    -    |   -   |    -     |    -    |
| Add to Cart tang qty         |   -   |   v   |    -    |   -   |    -     |    -    |
| Delete + filter state        |   v   |   v   |    -    |   -   |    -     |    -    |
| POST + update state ngay     |   -   |   v   |    v    |   v   |    v     |    -    |
| useParams xem chi tiet       |   v   |   -   |    -    |   -   |    -     |    -    |
| Xem chi tiet cung trang      |   -   |   -   |    -    |   -   |    -     |    v    |
| datetime-local               |   -   |   -   |    v    |   -   |    -     |    -    |
| Accordion + nested data      |   -   |   -   |    -    |   v   |    -     |    -    |
| toggleItem pattern           |   -   |   -   |    -    |   -   |    v     |    -    |
| Tinh luong theo gio          |   -   |   -   |    -    |   v   |    -     |    -    |
| Kiem tra trung khi POST      |   -   |   -   |    -    |   v   |    -     |    -    |
| PUT + them data vao mang con |   -   |   -   |    -    |   -   |    -     |    v    |

---


# SNIPPET NHANH (CÁC HÀM XỬ LÝ NHANH THƯỜNG GẶP)

Dưới đây là các hàm rút gọn cực kỳ hữu dụng, đã được ghi chú rõ ràng cách dùng, hoàn cảnh sử dụng và nó thuộc về dạng bài tập/phần nào ở trên để bạn dễ đối chiếu:

```javascript
/* =======================================================
   1. LẤY MẢNG UNIQUE (LỌC TRÙNG)
   - Dùng ở đâu: Thường dùng ở PHẦN 6 (FILTER) khi muốn trích xuất tất cả các Category/Cuisine/Tags không trùng lặp từ list data để đưa vào thẻ <select> hoặc Checkbox.
   - Ví dụ: Đề PE TRIAL (Lọc Recipes theo mảng Tags)
   ======================================================= */
const arrUnique = Array.from(new Set(list?.map((item) => item.category)))


/* =======================================================
   2. SO SÁNH SỐ NGUYÊN (TRONG HÀM FILTER)
   - Dùng ở đâu: Dùng ở PHẦN 6 (FILTER) khi lọc theo ID hoặc Năm (Year) lấy từ thẻ <select>.
   - Lưu ý: Bắt buộc dùng `==` thay vì `===` vì yearState lấy từ Form của HTML luôn là kiểu String, còn releaseYear trong DB Json là Number.
   ======================================================= */
const checkYear = yearState == "" ? true : item.releaseYear == yearState


/* =======================================================
   3. TÍNH TỔNG BẰNG REDUCE (SUM)
   - Dùng ở đâu: Dùng ở PHẦN 5 (TÍNH TỔNG - REDUCE) khi tính tổng tiền giỏ hàng (Cart) hoặc Bill.
   - Ví dụ: Tính (Giá * Số lượng) của từng item cộng dồn lại.
   ======================================================= */
const total = arr.reduce((sum, item) => sum + item.price * item.quantity, 0)


/* =======================================================
   4. TÍNH TRUNG BÌNH MẢNG LỒNG NHAU (AVERAGE RATING)
   - Dùng ở đâu: Dùng khi tính điểm trung bình (Rating) từ một mảng `reviews` nằm lồng bên trong Object `Product`.
   - Ví dụ: Đề FA24BL5 (Master-Detail hiển thị Rating trung bình)
   ======================================================= */
const averageRate = (
    item.reviews.map(r => r.rating).reduce((a, b) => a + b, 0) / item.reviews.length
).toFixed(2) // toFixed(2) để làm tròn 2 chữ số thập phân


/* =======================================================
   5. FORMAT NGÀY THÁNG VÀ TIỀN TỆ
   - Dùng ở đâu: Dùng ở PHẦN 2 (READ & LIST) khi hiển thị ra Table hoặc Card cần làm đẹp dữ liệu.
   ======================================================= */
// Format Ngày hiển thị đẹp (dd/mm/yyyy)
const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-GB")

// Format Tiền hiển thị đẹp (Ví dụ: 10.000 VND)
const formatVND = (price) => `${Math.round(price).toLocaleString("vi-VN")} VND`


/* =======================================================
   6. POST DATA & CẬP NHẬT STATE TẠI CHỖ
   - Dùng ở đâu: Dùng ở PHẦN 3 (CREATE / ADD) khi gọi API thêm mới.
   - Mục đích: Cập nhật lại UI List hiển thị ngay lập tức sau khi thêm mà không cần reload trang hay gọi API fetch lại.
   ======================================================= */
const res = await instance.post("/items", newItem);
setList([...list, res.data]); // Copy mảng list cũ và nhét data mới trả về vào cuối


/* =======================================================
   7. ẨN / HIỆN GIAO DIỆN BẰNG INLINE STYLE (DISPLAY)
   - Dùng ở đâu: Dùng ở PHẦN 2 (Master-Detail) khi bấm nút View Details thì hiện form, chưa bấm thì ẩn.
   - Ví dụ: Đề FA24BL5 (Ẩn hiện form review khi chọn product)
   ======================================================= */
<div style={{ display: !id ? "none" : "block" }}>
    {/* Form hoặc nội dung chi tiết cần ẩn/hiện */}
</div>


/* =======================================================
   8. XÁC NHẬN XÓA & CẬP NHẬT STATE TẠI CHỖ
   - Dùng ở đâu: Dùng ở PHẦN 4 (DELETE)
   - Mục đích: Gọi API xóa xong dùng .filter để loại bỏ item vừa xóa ra khỏi state, giao diện sẽ mất dòng đó lập tức.
   ======================================================= */
if (!window.confirm("Are you sure?")) return; // Bật dialog hỏi trước khi xóa
await instance.delete(`/items/${item.id}`);
setList(list.filter(i => i.id !== item.id));


/* =======================================================
   9. TẠO ID TỰ ĐỘNG BẰNG TIMESTAMP
   - Dùng ở đâu: Dùng ở PHẦN 3 (CREATE / ADD) khi cần tạo id duy nhất mà không phụ thuộc backend sinh tự động.
   ======================================================= */
const newItem = { 
    id: String(Date.now()), // Sinh ID ngẫu nhiên theo thời gian thực chuẩn String
    ...fields // Dùng toán tử Spread rải các field còn lại vào
}
```

---

# KIẾN THỨC BỔ SUNG: CÁC PHƯƠNG THỨC GỌI API (GET / POST / PUT / PATCH / DELETE)

Trong môn FER202, việc dùng sai phương thức API (gọi là HTTP Methods) bằng thư viện Axios (`instance`) sẽ khiến dữ liệu không lưu được hoặc báo lỗi 404, 500. Dưới đây là bảng giải nghĩa "chuẩn cơm mẹ nấu" kèm nhiều ví dụ từ đa dạng các loại bài tập ở trên.

### 1. `instance.get()` - LẤY DỮ LIỆU TỪ JSON SERVER
- **Khi nào dùng:** Khi bạn muốn đọc danh sách hoặc lấy chi tiết 1 phần tử mang về giao diện. Thường gọi trong `useEffect`.
- **Đặc điểm:** Chỉ nhận URL, không kèm data.
- **Ví dụ 1 (Lấy danh sách lúc khởi tạo App - File ContextProvider):**
```javascript
// Thường viết ở ContextProvider để lấy mảng bự nhất từ đầu
useEffect(() => {
    instance.get('/items').then((res) => setListItems(res.data));
    instance.get('/categories').then((res) => setListCategories(res.data));
}, []);
```
- **Ví dụ 2 (Lấy chi tiết 1 Product - Đề FA24BL5 Master-Detail):**
```javascript
// Gọi API lấy dữ liệu Product có id tương ứng khi ấn nút View Details
const response = await instance.get(`/products/${clickedId}`);
setSelectedProduct(response.data);
```

### 2. `instance.post()` - THÊM MỚI DỮ LIỆU
- **Khi nào dùng:** Khi form của bạn tạo ra **1 cái gì đó hoàn toàn mới** (1 hàng mới trong file db.json).
- **Đặc điểm:** Cần truyền **tham số thứ 2** là cục Object dữ liệu bạn gom được từ State.
- **Ví dụ 1 (Lưu món ăn mới - Đề PE Trial Create Recipe):**
```javascript
const newItem = { id: String(Date.now()), name: name, cuisine: cuisine }; // Object mới
const res = await instance.post("/recipes", newItem); // Nhét cục mới này vào bảng recipes
setListRecipes([...listRecipes, res.data]); // Copy mảng cũ, thêm cái mới vào đuôi
```
- **Ví dụ 2 (Lưu giỏ hàng/Bill - Bài Shopping Cart):**
```javascript
// Gom toàn bộ mảng listOrder và địa chỉ vào 1 đơn hàng mới
const newOrder = { id: Date.now(), products: listOrder, address: address }
await instance.post("/orders", newOrder);
```

### 3. `instance.put()` - CẬP NHẬT GHI ĐÈ TOÀN BỘ (REPLACE TOÀN TẬP)
- **Khi nào dùng:** Khi bạn muốn **Thay thế 100% Object cũ bằng Object mới**. Nếu bạn quên không copy lại các trường cũ, các trường đó trên DB sẽ bị xóa trắng! Rất nguy hiểm nếu dùng bừa bãi.
- **Tại sao hay dùng trong bài Thi:** Trong db.json, nếu object có một MẢNG LỒNG NHAU (Ví dụ: mảng `reviews` trong `products`), JSON Server không hỗ trợ push trực tiếp vào mảng con. Bạn bắt buộc phải **rút toàn bộ Product ra, thêm review vào mảng con, rồi ném trả lại bằng lệnh PUT để ghi đè nguyên cái Product đó.**
- **Ví dụ (Thêm Review - Đề FA24BL5 Master-Detail):**
```javascript
// 1. Tạo review mới
const newReview = { reviewerName: name, comment: comment };

// 2. Tạo product mới toanh bằng cách rải (...selectedProduct) để lấy lại các trường cũ (để khỏi bị xóa mất). 
// Sau đó đè lên trường reviews bằng cách rải mảng cũ ra rồi nhét review mới vào cuối.
const updatedProduct = {
    ...selectedProduct,
    reviews: [...selectedProduct.reviews, newReview]
};

// 3. Gọi PUT để ghi đè (bắt buộc truyền URL có ID và toàn bộ cục product mới)
const res = await instance.put(`/products/${id}`, updatedProduct);
```

### 4. `instance.patch()` - CẬP NHẬT TỪNG PHẦN (CHỈ SỬA CÁI GÌ THÌ GỬI CÁI ĐÓ)
- **Khi nào dùng:** Dùng cho form Edit/Update thông thường. Gửi field nào lên thì DB chỉ sửa field đó, các field khác giữ nguyên vô sự.
- **Ví dụ (Sửa thông tin - Đề Edit Project):**
```javascript
// Bạn chỉ sửa Tên và Mô tả trên giao diện
const updateProject = {
    name: name.trim(),
    description: description.trim()
}

// Gọi API PATCH, db.json sẽ chỉ tìm đến trường name và description để sửa, các trường như startDate, type không bị ảnh hưởng.
await instance.patch(`/projects/${id}`, updateProject);
```

### 5. `instance.delete()` - XÓA DỮ LIỆU
- **Khi nào dùng:** Khi bấm nút Delete / Remove 1 dòng.
- **Đặc điểm:** Chỉ gửi cái URL chứa ID, không cần data.
- **Ví dụ (Xóa Sản Phẩm - Đề FA 24):**
```javascript
if (!window.confirm("Are you sure?")) return; // Hỏi xác nhận 

// Gọi API xóa cái ID đó trên DB
await instance.delete(`/product/${product.id}`);

// Xóa xong thì dùng mảng hiện tại .filter loại bỏ nó ra để UI biến mất dòng đó ngay lập tức
setListProduct(listProduct.filter(i => i.id !== product.id));
```

---
**💡 TÓM LẠI "THẦN CHÚ" ĐI THI:**
- **Đọc danh sách/Chi tiết:** Dùng `.get("/url")`
- **Thêm 1 hàng mới toanh vào DB:** Dùng `.post("/url", newData)`
- **Sửa 1 vài field (Form Edit):** Dùng `.patch("/url/id", partialData)`
- **Thêm data vào Mảng Lồng Nhau (Mảng con):** Dùng `.put("/url/id", fullObjectDaThayDoi)`
- **Xóa rớt 1 hàng:** Dùng `.delete("/url/id")`

---
## [MỞ RỘNG] VÍ DỤ TRÍCH XUẤT CHUẨN TỪ ĐỀ FA24BL5: CLICK VIEW DETAILS ĐỂ HIỂN THỊ REVIEW BÊN CẠNH
Dưới đây là nguyên bản source code chuẩn chỉ của bài FA24BL5 (Giao diện Master-Detail). Luồng ẩn/hiện form được chú thích chi tiết các bước.

```javascript
import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider";
import instance from "../utils";

export const Product = () => {
    const { listProduct } = useContext(BoxProvider);
    const [title, setTitle] = useState("");
    
    // BƯỚC 1: KHAI BÁO STATE QUẢN LÝ ẨN/HIỆN 
    // Ban đầu túi rỗng (null), có nghĩa là chưa ai bấm chọn sản phẩm nào cả
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const [id, setId] = useState(null);
    const [reviewerName, setReviewerName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1);
    const [error, setError] = useState(false);

    const newListProduct = listProduct.filter((item) => {
        const nameMatch = item.title.toLowerCase().includes(title.toLowerCase());
        return nameMatch
    })
    
    // BƯỚC 3: HÀM XỬ LÝ SỰ KIỆN KHI BẤM "VIEW DETAILS"
    const handleButtonClick = async (event) => {
        const clickedId = event.target.id;
        setId(clickedId);
        try {
            // Lấy toàn bộ chi tiết sản phẩm (Bao gồm cả mảng reviews)
            const response = await instance.get(`/products/${clickedId}`);

            // ĐIỂM QUYẾT ĐỊNH: Đổ dữ liệu API vào state
            // Kể từ dòng này, selectedProduct KHÔNG CÒN LÀ NULL NỮA!
            setSelectedProduct(response.data);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reviewerName.trim()) { setError("Reviewer Name is required!"); return; }
        if (!comment.trim()) { setError("Comment is required!"); return; }

        try {
            const newReview = {
                reviewerName: reviewerName,
                comment: comment,
                rating: rating,
                date: new Date().toISOString()
            };

            const updatedProduct = {
                ...selectedProduct,
                reviews: [...selectedProduct.reviews, newReview]
            };
            const res = await instance.put(`/products/${id}`, updatedProduct);

            setSelectedProduct(res.data);
            alert("Add review Successfully!");

        } catch (err) {
            console.log("Lỗi:", err);
        }
    }

    return (
        <>
            <div>
                <div>
                    <h1 style={{ marginLeft: "45px" }}>Product List</h1>
                </div>
                <Container fluid >
                    <Row style={{ margin: "15px" }}>
                        {/* CỘT TRÁI: MASTER (DANH SÁCH SẢN PHẨM) */}
                        <Col md={6} >
                            <div style={{ marginBottom: "10px" }}>
                                <Form.Control placeholder="Enter title search..." value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <Table striped bordered hover responsive variant="light">
                                <thead className="table-white">
                                    <tr>
                                        <th>Id</th><th>Title</th><th>Category</th><th>Price</th><th>Function</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newListProduct.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.title}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                {/* Nút bấm kích hoạt Bước 3 */}
                                                <Button id={`${product.id}`} onClick={handleButtonClick}>
                                                    View Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        
                        {/* CỘT PHẢI: CHI TIẾT SẢN PHẨM VÀ FORM REVIEW */}
                        <Col md={6}>
                            {/* BƯỚC 2: TOÁN TỬ 3 NGÔI (Condition ? True : False) */}
                            {/* React sẽ hỏi: "selectedProduct có dữ liệu không (khác null)?" */}
                            {selectedProduct ? (
                                // VẾ TRUE: Nếu ĐÃ CHỌN một sản phẩm, xổ nguyên đống giao diện này ra
                                <>
                                    <div style={{ borderBottom: "1px solid #cccc" }}>
                                        <strong>Reviews details:</strong>
                                        <div>ProductId: {selectedProduct.id}</div>
                                        <div>Title: {selectedProduct.title}</div>
                                        <div>Category: {selectedProduct.category}</div>
                                        <div>Price: {selectedProduct.price}</div>
                                    </div>

                                    <div>
                                        <strong>Add a new Review</strong>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Reviewer Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Reviewers name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} />
                                                {error === "Reviewer Name is required!" && (<div style={{ color: "red", marginTop: "5px" }}>{error}</div>)}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                                                {error === "Comment is required!" && (<div style={{ color: "red", marginTop: "5px" }}>{error}</div>)}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                                                <Form.Label style={{ marginRight: '20px', marginBottom: '0' }}>Rating</Form.Label>
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <Form.Check
                                                        key={value}
                                                        inline
                                                        label={value}
                                                        name="rating"
                                                        type="radio"
                                                        id={`rating-${value}`}
                                                        value={value}
                                                        checked={rating === value}
                                                        onChange={(e) => setRating(Number(e.target.value))}
                                                    />
                                                ))}
                                            </Form.Group>
                                            <Button variant="primary" type="submit" style={{ width: "15%" }}>Send Review</Button>
                                        </Form>
                                    </div>
                                    
                                    <div>
                                        <Table striped bordered hover responsive variant="light">
                                            <thead className="table-white">
                                                <tr>
                                                    <th>Reviewer Name</th><th>Comment</th><th>Date</th><th>Rating</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedProduct.reviews?.map((review, index) => (
                                                    <tr key={index}>
                                                        <td>{review.reviewerName}</td>
                                                        <td>{review.comment}</td>
                                                        <td>{new Date(review.date).toLocaleDateString('en-GB')}</td>
                                                        <td>{review.rating}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    
                                    {/* NÚT CLEAR REVIEW CŨNG LÀ MỘT VÍ DỤ ẨN GIAO DIỆN */}
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            style={{ width: "15%" }}
                                            onClick={() => {
                                                // Đưa biến về null -> Vế False lại được kích hoạt -> Giấu form đi!
                                                setSelectedProduct(null); 
                                                setId(null); setReviewerName(""); setComment(""); setRating(1); setError("");
                                            }}
                                        >
                                            Clear Reviews
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                // VẾ FALSE: Nếu CHƯA CHỌN (selectedProduct === null), hiển thị dòng chữ này
                                <div>
                                    <strong>Reviews details:</strong>
                                    <p>Please select a product!</p>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    )
};
```
