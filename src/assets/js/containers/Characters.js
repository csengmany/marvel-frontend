import CharacterCard from "../components/CharacterCard";
import Limit from "../components/Limit";
import Pages from "../components/Pages";
const Characters = ({
    data,
    maxPage,
    setMaxPage,
    setPage,
    page,
    limit,
    setLimit,
    setDisplayModal,
    userToken,
    setUserToken,
    setUser,
    userId,
    setFavorite,
}) => {
    return (
        <div className="characters-container">
            <h1>CHARACTERS</h1>
            <div className="characters">
                {data.results.length > 0 ? (
                    data.results.map((character) => {
                        return (
                            <CharacterCard
                                character={character}
                                key={character._id}
                                limit={limit}
                                setDisplayModal={setDisplayModal}
                                userToken={userToken}
                                setUserToken={setUserToken}
                                setUser={setUser}
                                userId={userId}
                                setFavorite={setFavorite}
                            />
                        );
                    })
                ) : (
                    <span>No results</span>
                )}
            </div>
            <div className="pages-limit">
                <Pages maxPage={maxPage} setPage={setPage} page={page} />
                {data.results.length > 10 && (
                    <Limit
                        data={data}
                        setPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        setMaxPage={setMaxPage}
                        maxPage={maxPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Characters;
