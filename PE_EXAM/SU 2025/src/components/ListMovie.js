import { useContext, useState } from "react";
import { BoxProvider } from "../context/ContextProvider"
import { Col, Form, Row,Button } from "react-bootstrap"
import { Link } from "react-router-dom";
export const ListMovie = () => {
    //lay ra du lieu tu boxProvider
    const { listMovie, setListMovie } = useContext(BoxProvider);
    //lay danh muc va nam
    const arrGenre = Array.from(new Set(listMovie?.map((item) => item.genre)))
    const arrYear = Array.from(new Set(listMovie?.map((item) => item.releaseYear)))
    //tao ra ba bien state tuong ung danh muc
    const [genreState, setGenreState] = useState("");
    const [yearState, setYearState] = useState("");
    const [titleState, setTitleState] = useState("");
    //lọc list movie theo ba biến
    const listMovieFinal = listMovie.filter((item) => {
        const check1 = item.genre.toLowerCase().includes(genreState.toLowerCase())
        const check2 = yearState == "" ? true : item.releaseYear == yearState
        const check3 = item.title.toLowerCase().includes(titleState.toLowerCase())
        return check1 && check2 && check3;
    })

    return (
        <>
            <h2 >Movie List</h2>
            <Form>
                <Row>
                    {/* All genre */}
                    <Col xs={3}>
                        <Form.Select onChange={(e) => setGenreState(e.target.value)} defaultValue={genreState}>
                            <option value="">All genre</option>
                            {arrGenre.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    {/* All year */}
                    <Col xs={3}>
                        <Form.Select onChange={(e) => setYearState(e.target.value)} defaultValue={yearState}>
                            <option value=""> All year</option>
                            {arrYear?.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    {/* Search */}
                    <Col xs={6}>
                        <Form.Control onChange={(e) => setTitleState(e.target.value)} defaultValue={titleState} type="text" placeholder="Enter title to search" />
                    </Col>
                </Row>
            </Form>
            {/* button navigate */}
            <div style={{textAlign:"end",margin:"10px"}}>
                <Button style={{background:"green",border:"none"}}>
                    <Link to={"/booking/create"} style={{color:"white"}}>Book Ticket</Link>
                </Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
                {listMovieFinal?.map((item, index) => (
                    <div key={index} style={{ border: "1px solid #ccc" }}>
                        {/* images */}
                        <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
                            <img style={{ width: "100%", height: "100%", objectFit: "fill" }} src={`./images/${item.poster}`} title={item.title}></img>
                        </div>
                        {/* title */}
                        <div style={{ borderBottom: "1px solid #cccc", padding: "10px 5px" }}>
                            <strong>{item.title}</strong>
                        </div >
                        {/* genre */}
                        <div style={{ borderBottom: "1px solid #cccc", padding: "10px 5px" }}>
                            <strong>Genre: </strong>
                            <span>{item.genre}</span>
                        </div>
                        {/* releaseYear */}
                        <div style={{ borderBottom: "1px solid #cccc", padding: "10px 5px" }}>
                            <strong>ReleaseYear: </strong>
                            <span>{item.releaseYear}</span>
                        </div>
                        {/* duration */}
                        <div style={{ borderBottom: "1px solid #cccc", padding: "10px 5px" }}>
                            <strong>Duration: </strong>
                            <span>{item.duration}</span>
                        </div>
                        {/* rating */}
                        <div style={{ borderBottom: "1px solid #cccc", padding: "10px 5px" }}>
                            <strong>Rating: </strong>
                            <span>{item.rating}</span>
                        </div>
                        {/* booked */}
                        <div style={{ borderBottom: "1px solid #cccc", padding: "10px 5px" }}>
                            <strong>Booked: </strong>
                            <span>{item.booked}</span>
                        </div>
                    </div>
                ))}

            </div>
        </>

    )
}