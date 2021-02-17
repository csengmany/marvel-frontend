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

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/characters?name=${search}&page=${page}`
                );
                console.log("data", response.data); //data {count: 1493, limit: 100, results: Array(100)}count: 1493limit: 100results: (100) [{…},  {…}, ]__proto__: Object
                setData(response.data);
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
                <Route path="/comics">
                    <Comics />
                </Route>
                <Route path="/favorites">
                    <Favorites />
                </Route>
                <Route path="/">
                    <Characters data={data} />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
