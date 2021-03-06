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
    server,
}) => {
    const history = useHistory();
    const [icon, setIcon] = useState(farFaBookmark);
    //useEffect to set icon of markbook
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userToken && userData) {
                    const found = userData.favorite_characters.find(
                        (element) => element._id === character._id
                    );
                    if (userData.favorite_characters.length > 0 && found) {
                        setIcon(fasFaBookmark);
                    } else {
                        setIcon(farFaBookmark);
                    }
                } else {
                    setIcon(farFaBookmark);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [character._id, userData, setIcon, userToken]);

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

                await axios.post(
                    `${server}/user/favorite/character`,
                    formData,
                    {
                        headers: {
                            authorization: `Bearer ${userToken}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

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
            <div
                className="card-img"
                onClick={() => handleClick(character._id)}
            >
                <Picture picture={character} name={character.name} />
            </div>

            <div className="card-txt">
                <p className="title" onClick={() => handleClick(character._id)}>
                    {character.name}
                </p>

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
                {character.comics ? (
                    character.comics.length > 0 && (
                        <FontAwesomeIcon icon={faBookOpen} />
                    )
                ) : (
                    <></>
                )}
                <p>{character.description}</p>
            </div>
        </div>
    );
};

export default CharacterCard;
