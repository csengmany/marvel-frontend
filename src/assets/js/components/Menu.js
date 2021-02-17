import { Link } from "react-router-dom";
const Menu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Characters</Link>
                </li>
                <li>
                    <Link to="/comics">Comics</Link>
                </li>
                <li>
                    <Link to="/favorites">Favorites</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
