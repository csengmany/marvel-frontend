import CharacterCard from "../components/CharacterCard";
import Pages from "../components/Pages";
const Characters = ({ data, maxPage, setPage }) => {
    return (
        <>
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
            <Pages maxPage={maxPage} setPage={setPage} />
        </>
    );
};

export default Characters;
