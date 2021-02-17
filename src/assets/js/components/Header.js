import logo from "../../images/marvel.svg";
import Menu from "./Menu";
const Header = ({ search, setSearch }) => {
    return (
        <header>
            <img src={logo} alt="marvel logo" className="logo" />
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
