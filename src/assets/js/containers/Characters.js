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
    userData,
    server,
}) => {
    return (
        <div className="characters-container">
            <h1>CHARACTERS LIST</h1>
            <div className="characters">
                {data.results.length > 0 ? (
                    data.results.map((character, index) => {
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
                    <span>No results</span>
                )}
            </div>
            <div className="pages-limit">
                <Pages maxPage={maxPage} setPage={setPage} page={page} />

                <Limit
                    data={data}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    setMaxPage={setMaxPage}
                    maxPage={maxPage}
                />
            </div>
        </div>
    );
};

export default Characters;
