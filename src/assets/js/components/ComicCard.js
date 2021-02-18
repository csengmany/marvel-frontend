import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import circle from "../../images/explore-no-img.jpg";

const ComicCard = ({ comic }) => {
    return (
        <div className="comic-card" onClick={() => {}}>
            <img
                src={
                    comic.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                    comic.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                        ? circle
                        : comic.thumbnail.path + "." + comic.thumbnail.extension
                }
                alt="ironman"
            />

            <div className="card-txt-wrapper">
                <div className="card-txt">
                    <div>
                        <span>{comic.title}</span>
                        <FontAwesomeIcon
                            icon={faBookmark}
                            className="bookmark"
                        />
                    </div>

                    <p>{comic.description ? comic.description : ""}</p>
                </div>
            </div>
        </div>
    );
};
export default ComicCard;
