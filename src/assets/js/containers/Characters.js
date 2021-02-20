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
}) => {
    return (
        <div className="characters-container">
            <h1>CHARACTERS</h1>
            <div className="characters">
                {data.results.map((character) => {
                    return (
                        <CharacterCard
                            character={character}
                            key={character._id}
                        />
                    );
                })}
            </div>
            <div className="pages-limit">
                <Pages maxPage={maxPage} setPage={setPage} page={page} />
                <Limit
                    data={data}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    setMaxPage={setMaxPage}
                />
            </div>
        </div>
    );
};

export default Characters;
