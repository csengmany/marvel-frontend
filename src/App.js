import "./assets/css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
library.add(faBookmark);

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState("");

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
            <Header search={search} setSearch={setSearch} />
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
                        setPage={setPage}
                    />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
