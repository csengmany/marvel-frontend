import CharacterCard from "../components/CharacterCard";
import Pages from "../components/Pages";
const Characters = ({ data, maxPage, setPage, page }) => {
    return (
        <>
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
            <Pages maxPage={maxPage} setPage={setPage} page={page} />
        </>
    );
};

export default Characters;
