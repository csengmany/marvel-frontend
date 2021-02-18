import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import circle from "../../images/explore-no-img.jpg";

const Character = () => {
    const [data, setData] = useState([]);
    const { characterId } = useParams();
    console.log("page comics", characterId);
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
                    //${characterId}`
                    // ?title=${search}&page=${page}`
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
        <>
            <div className="comics">
                {!characterId ? (
                    <span>Ce héros n'existe pas</span>
                ) : (
                    <div className="comics-characterId">
                        {/* {console.log("comic avec characterId")}
                        <span>{data.name}</span>
                        <span>{data.description}</span>
                        {console.log(data.comics)} */}
                        {/* <p>
                            {data.comics.length > 0 &&
                                data.comics.map((comic) => comic)}
                        </p> */}
                        <h1>Page Hero</h1>
                        <img
                            src={
                                data.thumbnail.path ===
                                    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                                data.thumbnail.path ===
                                    "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                                    ? circle
                                    : data.thumbnail.path +
                                      "." +
                                      data.thumbnail.extension
                            }
                            alt="ironman"
                        />
                    </div>
                )}
            </div>
            <span className="home-page">Page : </span>
            {/* {new Array(maxPage).fill(1).map((item, index) => {
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
            })} */}
        </>
    );
};

export default Character;
