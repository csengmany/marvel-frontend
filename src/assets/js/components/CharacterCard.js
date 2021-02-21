import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import Picture from "./Picture";
import axios from "axios";

const CharacterCard = ({
    character,
    userToken,
    setDisplayModal,
    setUserToken,
    setUser,
    userId,
}) => {
    const history = useHistory();

    const handleClick = (id) => {
        return history.push(`/comics/${id}`);
    };
    const handleFavoriteClick = async () => {
        if (userToken) {
            try {
                const formData = new FormData();
                formData.append("id", userId);
                formData.append("characterId", character._id);
                console.log("userId", userId);
                const response = await axios.post(
                    `https://cathy-marvel-backend.herokuapp.com/user/favorite/character`,
                    formData,
                    {
                        headers: {
                            authorization: `Bearer ${userToken}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(response.data);
            } catch (error) {
                console.log(error.response);
            }
        } else {
            setDisplayModal("flex");
        }
    };
    return (
        <div className="character-card">
            <div className="card-img">
                <Picture picture={character} name={character.name} />
            </div>

            <div className="card-txt">
                <div>
                    <span onClick={() => handleClick(character._id)}>
                        {character.name}
                    </span>

                    <FontAwesomeIcon
                        icon={farFaBookmark}
                        className="bookmark"
                        onClick={handleFavoriteClick}
                    />
                </div>

                <p
                    className="description"
                    onClick={() => handleClick(character._id)}
                >
                    {character.description
                        ? character.description
                        : `More information about ${character.name}`}
                </p>
            </div>
        </div>
    );
};

export default CharacterCard;
