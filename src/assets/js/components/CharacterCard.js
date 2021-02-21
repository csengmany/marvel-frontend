import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasFaBookmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import Picture from "./Picture";
import axios from "axios";

const CharacterCard = ({
    character,
    userToken,
    setDisplayModal,
    setUserToken,
    setUser,
    userId,
    userData,
}) => {
    const history = useHistory();

    const [icon, setIcon] = useState(farFaBookmark);
    //useEffect to set icon of markbook
    useEffect(() => {
        if (userData) {
            if (
                userData.favorite_characters.length > 0 &&
                userData.favorite_characters.includes(character._id)
            ) {
                setIcon(fasFaBookmark);
            } else {
                setIcon(farFaBookmark);
            }
        } else {
            setIcon(farFaBookmark);
        }
    }, [character._id, userData, setIcon]);

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
                setIcon(icon === fasFaBookmark ? farFaBookmark : fasFaBookmark);
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
                        icon={icon}
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
