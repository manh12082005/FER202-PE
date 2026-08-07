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
        const clickedId = event.target.id;
        setId(clickedId);
        try {

            const response = await instance.get(`/products/${clickedId}`);

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

