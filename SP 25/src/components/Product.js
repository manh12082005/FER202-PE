import { useContext, useState } from "react"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BoxProvider } from "../context/ContextProvider"
import instance from "../utils";

export const Product = () => {
    const navigate = useNavigate()
    const { products } = useContext(BoxProvider);
    //lay ra category
    const arrCategory = Array.from(new Set(products?.map((item) => item.category)))
    //tạo biến state của category
    const [categoryState, setCategoryState] = useState("")
    const [listOrder, setListOrder] = useState([])
    const [message, setMessage] = useState(false)
    //Tính rate
    const listProductNew = products.map((item) => {
        //lấy ra số lượng đánh giá
        const numberFeedback = item.reviews.length
        //tính tổng điểm đưa trên số lượng đánh giá
        const totalScore = item.reviews.map((review) => review.rating)
            .reduce((accumulator, currentVal) => accumulator + currentVal, 0)

        //sau đó trả về 1 item mới
        return {
            ...item,
            rate: (totalScore / numberFeedback).toFixed(2)
        }
    })

    //loc products theo biến category
    const listProductFinal = listProductNew.filter((item) => {
        const check1 = item.category.toLowerCase().includes(categoryState.toLowerCase())
        return check1;
    })
    //handleAddToCart
    const handleAddToCart = (product) => {
        const id = product.id
        const name = product.title
        const price = product.price
        //check sự tồn tại của sản phẩm trong list order
        const checkListProduct = listOrder.find((item) => item.id === id)
        if (checkListProduct) {
            const newListOrder = listOrder.map((item) => {
                if (item.id === id)
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                return item
            })
            setListOrder(newListOrder)
        } else {
            let quantity = 1
            const newProduct = {
                id: id,
                name: name,
                price: price,
                quantity: quantity
            }
            //tạo 1 đối tương thêm vào listOrder
            setListOrder([...listOrder, newProduct])
        }
    }

    //remove
    const handleRemove = (order) => {
        const newListOrder = listOrder.filter((item) => item.id !== order.id)
        setListOrder(newListOrder)
    }
    //handleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        //tạo 1 đối tương order mới
        const id = Date.now()
        const orderDate = new Date().toISOString();
        const products = listOrder
        const shipAddress = e.target.address.value
        const newOrder = {
            id: id,
            orderDate: orderDate,
            products: products,
            shipAddress: shipAddress
        }
        //thên đối tượng vào orders
        instance.post("/orders", newOrder)
        //set mảng order rỗng
        setListOrder([])
        setMessage(true)
    }
    return (
        <>
            {/* Header */}
            <div>
                <h1 style={{ textAlign: "center" }}>Shopping System</h1>
            </div>
            {/* body */}
            <div>
                <Form >
                    <Row>
                        {/* dropdown */}
                        <Col>
                            <Form.Select value={categoryState} style={{ width: "25%", margin: "30px" }} onChange={(e) => setCategoryState(e.target.value)}>
                                <option value={""}>--Select all category--</option>
                                {arrCategory?.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col style={{ textAlign: "end", margin: "30px" }}>
                            <Button type="button" onClick={() => navigate("/orders")} style={{ background: "green", color: "white", border: "none" }}>Orders History</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                <Container fluid >
                    <Row style={{ margin: "15px" }}>
                        {/* table */}
                        <Col xs={8} >
                            <Table striped bordered hover responsive variant="light">
                                <thead className="table-white">
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Rate</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProductFinal.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.title}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.rate}</td>
                                            <td onClick={() => handleAddToCart(product)}><Button>Add to cart</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        {/* Cart */}
                        <Col xs={4} style={{ border: "1px solid #cccc" }}>
                            <h4 style={{ textAlign: "center" }}>Cart</h4>
                            {listOrder.length > 0 ? (
                                <>
                                    {/* table */}
                                    <Table striped bordered hover responsive variant="light">
                                        <thead className="table-white">
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listOrder?.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.id}</td>
                                                    <td>{order.name}</td>
                                                    <td>{order.price}</td>
                                                    <td>{order.quantity}</td>
                                                    <td><Button onClick={() => handleRemove(order)} style={{ backgroundColor: "red", color: "white", border: "none" }}>Remove</Button></td>

                                                </tr>
                                            ))}
                                        </tbody>

                                    </Table>
                                    <Form onSubmit={handleSubmit}>
                                        {/* ship adress */}
                                        <div style={{ display: "grid", margin: "10px" }}>
                                            <strong>Ship Address</strong>
                                            <textarea name="address" style={{ height: "100px", marginTop: "5px" }}></textarea>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "end" }}>
                                            <Button type="submit" style={{ backgroundColor: "orange", border: "none", color: "black", marginBottom: "10px" }}>Place Order</Button>
                                        </div>
                                    </Form>

                                </>
                            ) : (

                                message && (
                                    <div>
                                        <strong>Your cart is empty!</strong>
                                        <h4 style={{ color: "green" }}>
                                            Thank you for your order!
                                        </h4>
                                        <p style={{ color: "green" }}>
                                            Your order has been placed successfully.
                                        </p>
                                    </div>
                                )
                            )
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}