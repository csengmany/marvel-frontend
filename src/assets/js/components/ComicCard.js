import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Picture from "./Picture";

const ComicCard = ({ comic }) => {
    return (
        <div className="comic-card" onClick={() => {}}>
            <Picture picture={comic} name={comic.title} />
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
