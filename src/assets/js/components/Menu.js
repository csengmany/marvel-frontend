import { Link } from "react-router-dom";
const Menu = ({ userToken, setLimit, setPage, displayXs, setDisplayXs }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link
                        to="/"
                        onClick={() => {
                            setPage(1);
                            setLimit(10);
                            if (displayXs) {
                                setDisplayXs(false);
                            }
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
                            if (displayXs) {
                                setDisplayXs(false);
                            }
                        }}
                    >
                        COMICS
                    </Link>
                </li>
                {userToken && (
                    <li>
                        <Link
                            to="/favorites"
                            onClick={() => {
                                if (displayXs) {
                                    setDisplayXs(false);
                                }
                            }}
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
