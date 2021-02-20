import "./assets/css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

//import components
import Footer from "./assets/js/components/Footer";
import Header from "./assets/js/components/Header";
//import containers
import Characters from "./assets/js/containers/Characters";
import Comics from "./assets/js/containers/Comics";
import Favorites from "./assets/js/containers/Favorites";
import Character from "./assets/js/containers/Character";
//import fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCaretLeft,
    faCaretRight,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
library.add(faBookmark, faCaretRight, faCaretLeft, faSearch, faTimes);

function App() {
    //state to save data of axios request
    const [data, setData] = useState([]);
    //display message when page is loading
    const [isLoading, setIsLoading] = useState(true);
    //state of query params
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    //other states
    const [maxPage, setMaxPage] = useState("");
    const [charactersFavorite, setCharactersFavorites] = useState([]);
    // const [comicsFavorite, setComicsFavorites] = useState([]);
    //create intemerdiate to launch search when user submit the search
    const [textInput, setTextInput] = useState("");

    const [userToken, setUserToken] = useState(Cookies.get("userToken") || "");
    const [displayModal, setDisplayModal] = useState("");
    const setUser = (token) => {
        if (token) {
            // Create a cookie name userToken
            Cookies.set("userToken", token, { expires: 7 }); //expire in seven days
            // update userToken
            setUserToken(token);
        } else {
            //delete cookie when user is disconnect
            Cookies.remove("userToken");
            //update userToken
            setUserToken(null);
        }
    };

    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/characters?name=${search}&page=${page}`
                );
                console.log("data Home page", response.data);
                setData(response.data);
                setMaxPage(Math.ceil(response.data.count / 100));
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [setIsLoading, search, setSearch, page, setPage]);
    return isLoading ? (
        "Loading..."
    ) : (
        <Router>
            <Header
                search={search}
                setSearch={setSearch}
                textInput={textInput}
                setTextInput={setTextInput}
                userToken={userToken}
                setUser={setUser}
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
            />
            <Switch>
                <Route path="/comics/:characterId">
                    <Character />
                </Route>
                <Route path="/comics">
                    <Comics search={search} />
                </Route>
                <Route path="/favorites">
                    <Favorites />
                </Route>
                <Route path="/">
                    <Characters
                        data={data}
                        maxPage={maxPage}
                        page={page}
                        setPage={setPage}
                        charactersFavorite={charactersFavorite}
                        setCharactersFavorites={setCharactersFavorites}
                    />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
