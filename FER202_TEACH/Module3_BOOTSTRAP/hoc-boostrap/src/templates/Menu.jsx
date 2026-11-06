import { Link } from "react-router-dom"
export default function Menu() {
    return (
        <div className="menu">
            <div className="col-menu">
                <ul>
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About Us</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}