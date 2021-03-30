import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "../components/CharacterCard";
import ComicCard from "../components/ComicCard";
import Loader from "../components/Loader";

const Favorites = ({
    data,
    setUserToken,
    setUser,
    userToken,
    setDisplayModal,
    userId,
    search,
    page,
    limit,
    server,
}) => {
    const [userData, setUserData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const responseUser = await axios.get(
                    `${server}/user/favorites/${userId}`
                );
                setUserData(responseUser.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [setIsLoading, userId, search, server]);
    return isLoading ? (
        <Loader />
    ) : (
        <div className="favorites-container">
            <h1>YOUR FAVORITES</h1>
            <h2>CHARACTERS</h2>
            <div className="characters">
                {userData.favorite_characters.length > 0 ? (
                    userData.favorite_characters.map((character, index) => {
                        return (
                            <div className="angle-parent" key={character._id}>
                                <CharacterCard
                                    character={character}
                                    key={character._id}
                                    limit={limit}
                                    setDisplayModal={setDisplayModal}
                                    userToken={userToken}
                                    setUserToken={setUserToken}
                                    setUser={setUser}
                                    userId={userId}
                                    userData={userData}
                                    server={server}
                                />
                                <div className="angle"></div>
                            </div>
                        );
                    })
                ) : (
                    <span>No favorite character yet 😔</span>
                )}
            </div>
            <h2>COMICS</h2>
            <div className="comics">
                {userData.favorite_comics.length > 0 ? (
                    userData.favorite_comics.map((comic, index) => {
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
                    })
                ) : (
                    <span>No favorite comic yet 😔</span>
                )}
            </div>
        </div>
    );
};

export default Favorites;
