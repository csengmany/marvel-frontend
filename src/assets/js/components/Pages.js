import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pages = ({ maxPage, setPage, page }) => {
    return (
        <div className="pages">
            {page > 1 && (
                <div>
                    <FontAwesomeIcon icon="caret-left" />
                    <button
                        className="btn-txt"
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    >
                        PREV
                    </button>
                </div>
            )}
            {new Array(maxPage).fill(1).map((item, index) => {
                return index + 1 === page ? (
                    <button
                        key={index}
                        disabled="true"
                        style={{ fontWeight: "bold", color: "black" }}
                    >
                        {index + 1}
                    </button>
                ) : (
                    (index + 1 === 1 ||
                        index + 1 === maxPage ||
                        index + 1 === page + 1 ||
                        index + 1 === page + 2 ||
                        index + 1 === page - 1) && (
                        <>
                            {page > 3 && index + 1 === page - 1 ? (
                                <>
                                    <span>...</span>
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setPage(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                </>
                            ) : index + 1 === page + 2 &&
                              index + 1 <= maxPage - 2 ? (
                                <>
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setPage(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                    <span>...</span>
                                </>
                            ) : (
                                <>
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setPage(index + 1);
                                        }}
                                    >
                                        {index + 1}
                                    </button>
                                </>
                            )}
                        </>
                    )
                );
            })}

            {page < maxPage && (
                <div>
                    <button
                        className="btn-txt"
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    >
                        NEXT
                    </button>
                    <FontAwesomeIcon icon="caret-right" />
                </div>
            )}
        </div>
    );
};

export default Pages;
