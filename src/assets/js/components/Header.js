import logo from "../../images/marvel.svg";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";

const Header = ({
    search,
    setSearch,
    textInput,
    setTextInput,
    displayModal,
    setDisplayModal,
    userToken,
    setUser,
}) => {
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
                    <button type="submit" className="search-btn">
                        <FontAwesomeIcon icon="search" />
                    </button>
                </form>
                <Modal
                    setUser={setUser}
                    userToken={userToken}
                    displayModal={displayModal}
                    setDisplayModal={setDisplayModal}
                />
            </div>
        </header>
    );
};

export default Header;
