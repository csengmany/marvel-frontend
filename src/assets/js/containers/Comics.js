import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../components/ComicCard";

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
                console.log("data", response.data); //data {count: 1493, limit: 100, results: Array(100)}count: 1493limit: 100results: (100) [{…},  {…}, ]__proto__: Object
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
            <div className="comics">
                {data.results.map((comic) => {
                    console.log("comic sans id");

                    return <ComicCard comic={comic} />;
                })}
            </div>
            <span className="home-page">Page : </span>
            {new Array(maxPage).fill(1).map((item, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setPage(index + 1);
                        }}
                    >
                        {index + 1}
                    </button>
                );
            })}
        </div>
    );
};

export default Comics;
