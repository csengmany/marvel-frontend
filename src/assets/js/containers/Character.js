import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Picture from "../components/Picture";
import ComicCard from "../components/ComicCard";
import Pages from "../components/Pages";

const Character = () => {
    const [data, setData] = useState([]);
    const { characterId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/comics/${characterId}`
                );
                console.log("data", response.data); //data {count: 1493, limit: 100, results: Array(100)}count: 1493limit: 100results: (100) [{…},  {…}, ]__proto__: Object
                setData(response.data);
                if (data.count) {
                    setMaxPage(Math.ceil(response.data.count / 100));
                    console.log(maxPage);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [
        setIsLoading,
        search,
        setSearch,
        page,
        setPage,
        characterId,
        data.count,
        maxPage,
    ]);
    return isLoading ? (
        "Loading..."
    ) : (
        <div className="character-id">
            <div className="character">
                <div>
                    <h1>{data.name}</h1>
                    <Picture picture={data} name={data.name} />
                </div>
                <p>{data.description}</p>
            </div>
            <div className="character-comics">
                <h2>{data.name.toUpperCase()}&nbsp;COMICS</h2>
                {data.comics.map((comic, index) => {
                    return <ComicCard comic={comic} key={index} />;
                })}
            </div>
            <Pages maxPage={maxPage} setPage={setPage} />
        </div>
    );
};

export default Character;
