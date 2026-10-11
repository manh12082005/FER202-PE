import { useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { BoxProvider } from "../context/ContextProvider";


export const OrderHistory = () => {
    const { orders } = useContext(BoxProvider);
    const formatDate = (value) => {
        return new Date(value).toLocaleDateString("en-GB");
    };

    const getTotalPrice = (products) => {
        return products
            .reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <Container fluid style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2>Order History</h2>
            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>OrderDate</th>
                        <th>ShipAddress</th>
                        <th>ProductList</th>
                        <th>TotalPrice ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{formatDate(order.orderDate)}</td>
                            <td>{order.shipAddress}</td>
                            <td>
                                {order.products.map((product, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            margin: "4px 0"
                                        }}
                                    >
                                        <span style={{ width: "30px" }}>
                                            {product.quantity}
                                        </span>

                                        <span style={{ width: "180px" }}>
                                            {product.name}
                                        </span>

                                        <span style={{ width: "60px" }}>
                                            {product.price}
                                        </span>

                                        <span style={{ width: "30px" }}>
                                            {product.quantity}
                                        </span>
                                    </div>
                                ))}
                            </td>
                            <td>
                                {getTotalPrice(order.products)}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </Container>
    );
};
