import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import {
    faBookmark as fasFaBookmark,
    faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

import Picture from "./Picture";
import axios from "axios";

const CharacterCard = ({
    character,
    userToken,
    setDisplayModal,
    userId,
    userData,
}) => {
    const history = useHistory();

    const [icon, setIcon] = useState(farFaBookmark);
    //useEffect to set icon of markbook
    useEffect(() => {
        if (userToken && userData) {
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

    // function to go to character's list of comics
    const handleClick = (id) => {
        return history.push(`/comics/${id}`);
    };
    // function to add character in favorites
    const handleFavoriteClick = async () => {
        // if authenticated user : can add to favorites
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
            // not authenticated user : open modal to sign in
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
                        icon={userToken ? icon : farFaBookmark}
                        className="bookmark"
                        onClick={handleFavoriteClick}
                    />
                </div>

                <div
                    className="description"
                    onClick={() => handleClick(character._id)}
                >
                    {character.comics.length > 0 && (
                        <FontAwesomeIcon icon={faBookOpen} />
                    )}
                    <p>{character.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
