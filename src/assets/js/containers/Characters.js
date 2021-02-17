import { useHistory } from "react-router-dom";

const Characters = ({ data, maxPage, setPage }) => {
    const history = useHistory();
    const handleClick = (id) => {
        return history.push(`/comics/${id}`);
    };
    return (
        <>
            <div className="characters">
                {data.results.map((character, index) => {
                    return (
                        <div
                            className="character-card"
                            key={character._id}
                            onClick={() => handleClick(character._id)}
                        >
                            <img
                                style={{
                                    objectFit:
                                        (character.thumbnail.path ===
                                            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                                            character.thumbnail.path ===
                                                "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708") &&
                                        "fill",
                                }}
                                src={
                                    character.thumbnail.path +
                                    "." +
                                    character.thumbnail.extension
                                }
                                alt="ironman"
                            />
                            <span>{character.name}</span>
                            <p>
                                {character.description.length > 60
                                    ? character.description.slice(0, 44) + "..."
                                    : character.description}
                            </p>
                        </div>
                    );
                })}
            </div>
            <span className="home-page">Page : </span>
            {new Array(maxPage).fill(1).map((item, index) => {
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
            })}
        </>
    );
};

export default Characters;
