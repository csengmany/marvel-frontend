import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import Pages from "../components/Pages";
import Limit from "../components/Limit";
import ComicCard from "../components/ComicCard";

const Favorites = ({
    data,
    userToken,
    setDisplayModal,
    userId,
    search,
    page,
    limit,
    maxPage,
    setMaxPage,
    setPage,
    setLimit,
}) => {
    const [comicData, setComicData] = useState([]);

    const [userData, setUserData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const responseUser = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/user/favorites/${userId}`
                );
                console.log(
                    "data comics page",
                    responseUser.data.favorite_characters,
                    responseUser.data.favorite_comics
                );
                setUserData(responseUser.data);

                const response = await axios.get(
                    `https://cathy-marvel-backend.herokuapp.com/comics?title=${search}&page=${page}&limit=${limit}`
                );
                console.log("data comics page", response.data);
                setComicData(response.data);

                // if (data.count) {
                //     setMaxPage(Math.ceil(response.data.count / limit));
                // }
                setIsLoading(false);
                //         const responseComics = await axios.get(
                //             `https://cathy-marvel-backend.herokuapp.com/comics?title=${search}&page=${page}&limit=${limit}`
                //         );

                //         setComicData(responseComics.data);

                //         setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [setIsLoading, userId, setComicData, search, page, limit]);
    return isLoading ? (
        "Loading..."
    ) : (
        <div className="favorites-container">
            <h1>FAVORITES</h1>
            <h2>CHARACTERS</h2>
            <div className="characters">
                {data.results.map((character, index) => {
                    if (
                        userData.favorite_characters.indexOf(character._id) !==
                        -1
                    ) {
                        return (
                            <CharacterCard
                                character={character}
                                key={character._id}
                                // limit={limit}
                                setDisplayModal={setDisplayModal}
                                userToken={userToken}
                                // setUserToken={setUserToken}
                                // setUser={setUser}
                                userId={userId}
                                // setFavorite={setFavorite}
                            />
                        );
                    }
                })}
            </div>
            <h2>COMICS</h2>
            <div className="comics">
                {userData.favorite_comics.length > 0 ? (
                    comicData.results.map((comic, index) => {
                        if (
                            userData.favorite_comics.indexOf(comic._id) !== -1
                        ) {
                            console.log(comic.title);
                            return (
                                <ComicCard
                                    key={index}
                                    comic={comic}
                                    userToken={userToken}
                                    userId={userId}
                                    setDisplayModal={setDisplayModal}
                                />
                                // <div>
                                //     <span>{comic.title}&nbsp;&nbsp;&nbsp;</span>
                                // </div>
                            );
                        }
                    })
                ) : (
                    <span>No comics favorites</span>
                )}
            </div>

            <div className="pages-limit">
                <Pages maxPage={maxPage} setPage={setPage} page={page} />
                {data.results.length > 10 && (
                    <Limit data={data} setPage={setPage} setLimit={setLimit} />
                )}
            </div>
        </div>
    );
};

export default Favorites;
