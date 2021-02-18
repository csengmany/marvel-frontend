const Pages = ({ maxPage, setPage }) => {
    return (
        <div className="pages">
            <span>Page : </span>
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
        </div>
    );
};

export default Pages;
