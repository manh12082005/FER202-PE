import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { BoxProvider } from "../context/ContextProvider"
import instance from "../utils"

export const Booking = () => {
    //lay ra du lieu tu boxProvider
    const { listUsers, listMovie } = useContext(BoxProvider)
    const [error, setError] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        const userStr = e.target.user.value
        const movieStr = e.target.movie.value
        const dateStr = e.target.date.value
        const seatStr = e.target.seat.value
        
        //Validate
        if (userStr == "" || movieStr == "" || dateStr == "" || seatStr == 0) {
            setError(true);
            return;
        }
        setError(false)
        //tao 1 doi tuong booking moi
        const newBooking = {
            id: Date.now(),
            userId: userStr,
            movieId: movieStr,
            showTime: dateStr,
            seats: seatStr
        }
        //call api
        instance.post("/bookings", newBooking)
        //thông báo 
        alert("Booking success!")
    }
    return (
        <>
            <h2 style={{ textAlign: "center" }}>Create Booking</h2>
            <div>{error && <span style={{ color: "red", margin: "20px" }}>All fields are required and seats must be at least 1.</span>}</div>
            <Form style={{ margin: "20px" }} onSubmit={handleSubmit}>
                <Row>
                    {/* User */}
                    <Col>
                        <Form.Select name="user" defaultValue={""}>
                            <option value={""}>Select User</option>
                            {listUsers?.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    {/* Movies */}
                    <Col>
                        <Form.Select name="movie" defaultValue={""}>
                            <option value={""}>Select Movie</option>
                            {listMovie?.map((item) => (
                                <option key={item.id} value={item.id}>{item.title}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    {/* Date */}
                    <Col>
                        <Form.Control type="datetime-local" name="date"></Form.Control>
                    </Col>
                    {/* Seat */}
                    <Col>
                        <Form.Control type="number" placeholder="Seats" name="seat" defaultValue={0}></Form.Control>
                    </Col>
                    <Col>
                        <Button type="submit" style={{ width: "100%", background: "green", color: "white", border: "none" }}>Submit</Button>
                    </Col>
                </Row>
            </Form>
        </>

    )
}