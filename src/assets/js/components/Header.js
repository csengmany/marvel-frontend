import logo from "../../images/marvel.svg";
import Menu from "./Menu";
const Header = () => {
    return (
        <header>
            <img src={logo} alt="marvel logo" className="logo" />
            <Menu />
        </header>
    );
};

export default Header;
