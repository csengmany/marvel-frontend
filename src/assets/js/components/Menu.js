import { Link } from "react-router-dom";
const Menu = ({ userToken, setLimit, setPage }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link
                        to="/"
                        onClick={() => {
                            setPage(1);
                            setLimit(10);
                        }}
                    >
                        CHARACTERS
                    </Link>
                </li>
                <li>
                    <Link
                        to="/comics"
                        onClick={() => {
                            setPage(1);
                            setLimit(10);
                        }}
                    >
                        COMICS
                    </Link>
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
