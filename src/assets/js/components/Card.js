import circle from "../../images/explore-no-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const Card = ({ character }) => {
    const history = useHistory();

    const handleClick = (id) => {
        console.log(id);
        return history.push(`/comics/${id}`);
    };
    return (
        <div
            className="character-card"
            onClick={() => handleClick(character._id)}
        >
            <div className="card-img">
                <img
                    src={
                        character.thumbnail.path ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                        character.thumbnail.path ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                            ? circle
                            : character.thumbnail.path +
                              "." +
                              character.thumbnail.extension
                    }
                    alt="ironman"
                />
            </div>

            <div className="card-txt">
                <div>
                    <span>{character.name}</span>
                    <FontAwesomeIcon icon={faBookmark} className="bookmark" />
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

export default Card;
