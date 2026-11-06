import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="row">
            <div className="col col-md-10">
                Logo = Slogan+Banner
            </div>
            <div className="col col-md-2 menu">
                <ul>
                    <li>
                        <Link to={'/signup'}>Sign Up</Link>
                    </li>
                    <li>
                        <Link to={'/signin'}>Sign In</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}