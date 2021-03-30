import logo from "../../images/marvel.svg";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";

const Header = ({
    setSearch,
    displayModal,
    setDisplayModal,
    userToken,
    setUser,
    limit,
    setLimit,
    setPage,
    server,
}) => {
    //create intemerdiate to launch search when user submit the search
    const [textInput, setTextInput] = useState("");
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
                    onClick={() => {
                        history.push("/");
                        setPage(1);
                        setLimit(10);
                    }}
                />
                <Menu
                    userToken={userToken}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                />

                <form
                    className="search-input"
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
                    server={server}
                />
            </div>
        </header>
    );
};

export default Header;
