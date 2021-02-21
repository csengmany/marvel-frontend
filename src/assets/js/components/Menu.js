import { Link } from "react-router-dom";
const Menu = ({ userToken }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">CHARACTERS</Link>
                </li>
                <li>
                    <Link to="/comics">COMICS</Link>
                </li>
                {userToken && (
                    <li>
                        <Link to="/favorites">FAVORITES</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
