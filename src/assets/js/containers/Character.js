import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Picture from "../components/Picture";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

const Character = ({
    userToken,
    setDisplayModal,
    server,
    userId,
    userData,
}) => {
    const [data, setData] = useState([]);
    const { characterId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${server}/comics/${characterId}`
                );
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
    }, [
        setIsLoading,
        search,
        setSearch,
        page,
        setPage,
        characterId,
        data.count,
        maxPage,
        server,
    ]);
    return isLoading ? (
        <Loader />
    ) : (
        <div className="character-container">
            <div className="character">
                <div>
                    <h1>{data.name}</h1>
                    <Picture picture={data} name={data.name} />
                </div>
                <p>{data.description}</p>
            </div>
            <div className="character-comics">
                {data.comics.length > 0 ? (
                    <>
                        <h2>{data.name.toUpperCase()}&nbsp;COMICS</h2>
                        <div className="comics">
                            {data.comics.map((comic, index) => {
                                return (
                                    <ComicCard
                                        key={index}
                                        comic={comic}
                                        userToken={userToken}
                                        userId={userId}
                                        setDisplayModal={setDisplayModal}
                                        userData={userData}
                                        server={server}
                                    />
                                );
                            })}
                        </div>
                    </>
                ) : (
                    "There is no comic book associated with this character."
                )}
            </div>
        </div>
    );
};

export default Character;
