import circle from "../../images/explore-no-img.jpg";
const Picture = ({ picture }) => {
    return (
        <div className="picture">
            <img
                src={
                    picture.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
                    picture.thumbnail.path ===
                        "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
                        ? circle
                        : picture.thumbnail.path +
                          "." +
                          picture.thumbnail.extension
                }
                alt="ironman"
            />
        </div>
    );
};

export default Picture;
