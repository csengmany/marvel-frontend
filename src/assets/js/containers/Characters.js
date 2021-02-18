import Card from "../components/Card";
const Characters = ({ data, maxPage, setPage }) => {
    return (
        <>
            <div className="characters">
                {data.results.map((character) => {
                    return <Card character={character} key={character._id} />;
                })}
            </div>
            <span className="home-page">Page : </span>
            {new Array(maxPage).fill(1).map((item, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            setPage(index + 1);
                        }}
                    >
                        {index + 1}
                    </button>
                );
            })}
        </>
    );
};

export default Characters;
