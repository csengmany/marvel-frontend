import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as farFaBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as fasFaBookmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Picture from "./Picture";
import axios from "axios";

const ComicCard = ({
    comic,
    userToken,
    userId,
    setDisplayModal,
    userData,
    server,
}) => {
    const [icon, setIcon] = useState(farFaBookmark);

    //useEffect to set icon of markbook
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userToken && userData) {
                    const found = userData.favorite_comics.find(
                        (element) => element._id === comic._id
                    );
                    if (userData.favorite_comics.length > 0 && found) {
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
    }, [comic._id, userData, setIcon, userToken, comic]);

    const handleFavoriteClick = async () => {
        if (userToken) {
            try {
                const formData = new FormData();
                formData.append("id", userId);
                formData.append("comicId", comic._id);
                formData.append("path", comic.thumbnail.path);
                formData.append("extension", comic.thumbnail.extension);
                formData.append("title", comic.title);
                formData.append("description", comic.description);

                await axios.post(`${server}/user/favorite/comic`, formData, {
                    headers: {
                        authorization: `Bearer ${userToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                setIcon(icon === fasFaBookmark ? farFaBookmark : fasFaBookmark);
            } catch (error) {
                console.log(error.response);
            }
        } else {
            setDisplayModal("flex");
        }
    };
    return (
        <div className="comic-card">
            <Picture picture={comic} name={comic.title} />
            <div className="card-txt-wrapper">
                <div className="card-txt">
                    <div>
                        <span className="title">{comic.title}</span>
                        <FontAwesomeIcon
                            icon={icon}
                            className="bookmark"
                            onClick={handleFavoriteClick}
                        />
                    </div>
                    <p>{comic.description ? comic.description : ""}</p>
                </div>
            </div>
        </div>
    );
};
export default ComicCard;
