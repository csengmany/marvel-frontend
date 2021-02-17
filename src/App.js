import "./assets/css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
//import components
import Footer from "./assets/js/components/Footer";
import Header from "./assets/js/components/Header";
//import containers
import Characters from "./assets/js/containers/Characters";
import Comics from "./assets/js/containers/Comics";

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/comics">
                    <Comics />
                </Route>
                <Route path="/">
                    <Characters />
                </Route>
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
