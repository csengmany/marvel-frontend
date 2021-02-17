const Characters = ({ data }) => {
    return (
        <div className="characters">
            {console.log(data.results[0])}
            {data.results.map((character, index) => {
                return (
                    <div className="character-card" key={character._id}>
                        {console.log(
                            character.thumbnail.path +
                                "." +
                                character.thumbnail.extension
                        )}
                        <img
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
    );
};

export default Characters;
