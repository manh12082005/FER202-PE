import { useContext, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import { useNavigate } from "react-router-dom"

export const Product = () => {
    const navigate = useNavigate()
    const { listProduct, listBrand, listCategory } = useContext(BoxProvider)
    // B1:tạo 2 biến state để tí gender giao diện
    const [categoryFilter, setCategoryFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    //lấy ra các thuộc tính của product
    const newProductList = listProduct.map((product) => {
        const brandName = listBrand.find((b) => b.id == product.brand)
        const categoryName = listCategory.find((c) => c.id == product.category)
        const newPrice = Math.round(product.price - (product.price * product.discountPercentage / 100))
        return {
            ...product,
            brandName: brandName.name,
            categoryName: categoryName.name,
            newPrice: newPrice
        };

    })
    //B3:lọc theo category và brand
    const listProductFinal = newProductList.filter((product) => {
        const checkCategory = product.categoryName.toLowerCase().includes(categoryFilter.toLowerCase())
        const checkBrand = product.brandName.toLowerCase().includes(brandFilter.toLowerCase())
        return checkCategory && checkBrand;
    })
    return (
        <>
            {/* header */}
            <div>
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>List of Products</h1>
            </div>
            {/* body */}
            <Container fluid >
                <Row >
                    {/* phan 1 */}
                    <Col xs={2} style={{ paddingLeft: "60px" }} >
                        {/* cuisine */}
                        <div>
                            <h3>Categories</h3>
                            <Form>
                                {listCategory.map((category) => (
                                    <Form.Check
                                        key={category.id}
                                        type="radio"
                                        name="category"
                                        label={category.name}
                                        value={category.name}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    // B2: viết event onChange bắt sự kiện thay đổi người dùng chọn
                                    />
                                ))}
                            </Form>
                        </div>
                        {/* meal type */}
                        <div>
                            <h3>Brands</h3>
                            <Form>
                                {listBrand.map((brand) => (
                                    <Form.Check
                                        key={brand.id}
                                        type="radio"
                                        name="brand"
                                        label={brand.name}
                                        value={brand.name}
                                        onChange={(e) =>
                                            setBrandFilter(e.target.value)
                                        }
                                    />
                                ))}
                            </Form>
                        </div>
                    </Col>
                    {/* content */}
                    <Col md={10} style={{ paddingRight: "100px" }}>
                        <Row>
                            {listProductFinal.map((product) => (
                                <Col
                                    key={product.id}
                                    md={3}
                                    sm={6}
                                    xs={12}
                                    className="mb-4"
                                >
                                    <Card className="shadow-sm h-100">
                                        <div
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        >
                                            <Card.Img
                                                variant="top"
                                                src={`./images/${product.image}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />
                                        </div>

                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="text-center">
                                                {product.title}
                                            </Card.Title>

                                            <Card.Text style={{ margin: "20px 5px" }}>
                                                Brand:{" "}
                                                <strong>
                                                    {product.brandName}
                                                </strong>
                                                <br />

                                                Category:{" "}
                                                <strong>
                                                    {product.categoryName}
                                                </strong>
                                            </Card.Text>
                                            <div style={{ display: "grid", justifyContent: "center" }}>
                                                <p
                                                    style={{
                                                        color: "blue",
                                                        textDecoration:
                                                            "line-through"
                                                    }}
                                                >
                                                    Price: ${product.price}
                                                </p>
                                                <p
                                                    style={{
                                                        color: "red",

                                                    }}
                                                >
                                                    Discount: {product.discountPercentage}%
                                                </p>
                                                <p
                                                    style={{
                                                        color: "blue",

                                                    }}
                                                >
                                                    New price: ${product.newPrice}
                                                </p>


                                            </div>



                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <Button onClick={() => navigate(`/product/${product.id}`)} type="button" style={{ backgroundColor: "green", color: "white", border: "none", width: "70%" }}>

                                                    View Details
                                                </Button>
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row >
            </Container >
        </>

    )
}