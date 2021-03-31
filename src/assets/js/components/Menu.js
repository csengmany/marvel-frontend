import { Link } from "react-router-dom";
const Menu = ({ userToken, setLimit, setPage, setDisplayXs }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link
                        to="/"
                        onClick={() => {
                            setPage(1);
                            setLimit(10);
                            setDisplayXs(false);
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
                            setDisplayXs(false);
                        }}
                    >
                        COMICS
                    </Link>
                </li>
                {userToken && (
                    <li>
                        <Link
                            to="/favorites"
                            onClick={() => setDisplayXs(false)}
                        >
                            FAVORITES
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
