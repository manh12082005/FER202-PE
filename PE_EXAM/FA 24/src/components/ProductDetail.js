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
        const check = window.confirm("Do you want to delete this product?");
        if (!check) return;

        try {
            await instance.delete(`/product/${product.id}`);
            const newListProduct = listProduct.filter((item) => item.id !== product.id);
            setListProduct(newListProduct);
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