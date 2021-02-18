import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../components/ComicCard";
import Pages from "../components/Pages";

const Comics = ({ search }) => {
    const [data, setData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/comics?title=${search}&page=${page}`
                );
                console.log("data comics page", response.data);
                setData(response.data);
                if (data.count) {
                    setMaxPage(Math.ceil(response.data.count / 100));
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [setIsLoading, search, page, setPage, data.count]);
    return isLoading ? (
        "Loading..."
    ) : (
        <div className="comics-wrapper">
            <h1>COMICS</h1>
            <div className="comics">
                {data.results.map((comic) => {
                    return <ComicCard comic={comic} />;
                })}
            </div>
            <Pages maxPage={maxPage} setPage={setPage} page={page} />
        </div>
    );
};

export default Comics;
