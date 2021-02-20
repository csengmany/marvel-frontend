import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import Picture from "./Picture";

const CharacterCard = ({ character }) => {
    const history = useHistory();

    const handleBookmarkClick = (character) => {};
    const handleClick = (id) => {
        return history.push(`/comics/${id}`);
    };
    return (
        <div
            className="character-card"
            onClick={() => handleClick(character._id)}
        >
            <div className="card-img">
                <Picture picture={character} name={character.name} />
            </div>

            <div className="card-txt">
                <div>
                    <span>{character.name}</span>
                    <FontAwesomeIcon
                        icon={farFaBookmark}
                        className="bookmark"
                        onClick={() => handleBookmarkClick(character)}
                    />
                </div>

                <p className="description">
                    {character.description
                        ? character.description
                        : `More information about ${character.name}`}
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;
