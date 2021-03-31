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
    const [displayXs, setDisplayXs] = useState(false);
    const [displayXsSearch, setDisplayXsSearch] = useState(false);
    const history = useHistory();
    const handleSearch = (event) => {
        event.preventDefault();
        setSearch(textInput);
    };

    return (
        <header>
            <div className="header">
                <FontAwesomeIcon
                    icon="bars"
                    className="xs"
                    onClick={() => setDisplayXs(true)}
                />

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

                {displayXs && (
                    <div className="xs-nav">
                        <div>
                            <Modal
                                setUser={setUser}
                                userToken={userToken}
                                displayModal={displayModal}
                                setDisplayModal={setDisplayModal}
                                server={server}
                                setDisplayXs={setDisplayXs}
                            />
                            <Menu
                                userToken={userToken}
                                setPage={setPage}
                                limit={limit}
                                setLimit={setLimit}
                            />
                        </div>
                        <FontAwesomeIcon
                            icon="times"
                            className="xs-times"
                            onClick={() => {
                                setDisplayXs(false);
                            }}
                        />
                    </div>
                )}
                {displayXsSearch && (
                    <div className="xs-search">
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
                        <div>
                            <FontAwesomeIcon
                                icon="times"
                                className="xs-times"
                                onClick={() => {
                                    setDisplayXsSearch(false);
                                }}
                            />
                        </div>
                    </div>
                )}
                <div className="not-xs">
                    <Menu
                        userToken={userToken}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                    />
                </div>
                <div className="not-xs">
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
                </div>
                <div className="not-xs">
                    <Modal
                        setUser={setUser}
                        userToken={userToken}
                        displayModal={displayModal}
                        setDisplayModal={setDisplayModal}
                        server={server}
                    />
                </div>

                <FontAwesomeIcon
                    icon="search"
                    className="xs"
                    onClick={() => {
                        setDisplayXsSearch(true);
                    }}
                />
            </div>
        </header>
    );
};

export default Header;
