import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
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
                        icon={faBookmark}
                        className="bookmark"
                        onClick={() => handleBookmarkClick(character)}
                    />
                </div>

                <p>
                    {character.description.length > 44
                        ? character.description.slice(0, 40) + "..."
                        : character.description}
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;
