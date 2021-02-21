import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Picture from "./Picture";
import axios from "axios";

const ComicCard = ({ comic, userToken, userId, setDisplayModal }) => {
    const handleFavoriteClick = async () => {
        if (userToken) {
            try {
                const formData = new FormData();
                formData.append("id", userId);
                formData.append("comicId", comic._id);
                console.log("userId", userId);
                const response = await axios.post(
                    `https://cathy-marvel-backend.herokuapp.com/user/favorite/comic`,
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
        <div className="comic-card">
            <Picture picture={comic} name={comic.title} />
            <div className="card-txt-wrapper">
                <div className="card-txt">
                    <div>
                        <span>{comic.title}</span>
                        <FontAwesomeIcon
                            icon={faBookmark}
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
