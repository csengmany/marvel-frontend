import logo from "../../images/marvel.svg";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
const Header = ({ search, setSearch }) => {
    const history = useHistory();
    return (
        <header>
            <img
                src={logo}
                alt="marvel logo"
                className="logo"
                onClick={() => history.push("/")}
            />
            <Menu />
            <input
                type="text"
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
        </header>
    );
};

export default Header;
