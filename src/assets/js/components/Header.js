import logo from "../../images/marvel.svg";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ search, setSearch, textInput, setTextInput }) => {
    const history = useHistory();
    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(textInput);
    };
    return (
        <header>
            <div className="header">
                <img
                    src={logo}
                    alt="marvel logo"
                    className="logo"
                    onClick={() => history.push("/")}
                />
                <Menu />

                <form
                    onSubmit={(event) => {
                        handleSearch(event);
                    }}
                >
                    <input
                        type="text"
                        value={textInput}
                        onChange={(event) => {
                            setTextInput(event.target.value);
                        }}
                        placeholder="search"
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon="search" />
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;
