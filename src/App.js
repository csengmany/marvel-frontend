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
    faBookmark as fasFaBookmark,
    faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
library.add(
    farFaBookmark,
    faCaretRight,
    faCaretLeft,
    faSearch,
    faTimes,
    fasFaBookmark,
    faBookOpen
);

function App() {
    //state to save data of axios request
    const [data, setData] = useState([]);
    //display message when page is loading
    const [isLoading, setIsLoading] = useState(true);
    //state of query params
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    //other states
    const [maxPage, setMaxPage] = useState("");
    //create intemerdiate to launch search when user submit the search
    const [textInput, setTextInput] = useState("");
    // state to control modal
    const [displayModal, setDisplayModal] = useState("");
    // state to control use favorite feature
    const [userData, setUserData] = useState([]);

    const [userToken, setUserToken] = useState(Cookies.get("userToken") || "");
    const [userId, setUserId] = useState(Cookies.get("userId") || "");
    const setUser = (token, id) => {
        if (token && id) {
            // Create cookies when user is connected
            Cookies.set("userToken", token, { expires: 7 }); //expire in seven days
            Cookies.set("userId", id, { expires: 7 });
            // update userToken
            setUserToken(token);
            setUserId(id);
        } else {
            //delete cookies when user is disconnected
            Cookies.remove("userToken");
            Cookies.remove("userId");
            //update userToken
            setUserToken(null);
            setUserId(null);
        }
    };

    useEffect(() => {
        console.log("hi");

        //axios request
        const fetchData = async () => {
            try {
                // const responseUser = await axios.get(
                //     `https://cathy-marvel-backend.herokuapp.com/user/favorites/${userId}`
                // );

                // console.log(
                //     "data favorite page",
                //     responseUser.data.favorite_characters,
                //     responseUser.data.favorite_comics
                // );
                // setUserData(responseUser.data);
                const response = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/characters?name=${search}&page=${page}&limit=${limit}`
                );
                console.log("data Home page", response.data);
                setData(response.data);
                let calcul = Math.ceil(response.data.count / limit);
                setMaxPage(calcul);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
                const result = error.response;
            }
        };

        fetchData();
    }, [setIsLoading, search, setSearch, page, setPage, limit]);
    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <Router>
            <Header
                search={search}
                setSearch={setSearch}
                textInput={textInput}
                setTextInput={setTextInput}
                userToken={userToken}
                setUser={setUser}
                userId={userId}
                setUserId={setUserId}
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
            />
            <Switch>
                <Route path="/comics/:characterId">
                    <Character limit={limit} setLimit={setLimit} />
                </Route>
                <Route path="/comics">
                    <Comics
                        search={search}
                        limit={limit}
                        setLimit={setLimit}
                        userToken={userToken}
                        userId={userId}
                        setDisplayModal={setDisplayModal}
                        userData={userData}
                    />
                </Route>

                <Route path="/favorites">
                    <Favorites
                        userId={userId}
                        userToken={userToken}
                        setDisplayModal={setDisplayModal}
                        search={search}
                        limit={limit}
                        setLimit={setLimit}
                        page={page}
                        setPage={setPage}
                        maxPage={maxPage}
                        setMaxPage={setMaxPage}
                        data={data}
                    />
                </Route>

                <Route path="/">
                    <Characters
                        data={data}
                        maxPage={maxPage}
                        setMaxPage={setMaxPage}
                        page={page}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        setDisplayModal={setDisplayModal}
                        displayModal={displayModal}
                        userToken={userToken}
                        setUserToken={setUserToken}
                        setUser={setUser}
                        userId={userId}
                        userData={userData}
                    />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
