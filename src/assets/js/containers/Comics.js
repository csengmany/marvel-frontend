import axios from "axios";
import { useEffect, useState } from "react";
import ComicCard from "../components/ComicCard";
import Limit from "../components/Limit";
import Loader from "../components/Loader";
import Pages from "../components/Pages";

const Comics = ({
    search,
    limit,
    setLimit,
    userToken,
    userId,
    setDisplayModal,
    userData,
    server,
}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        //axios request
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${server}/comics?title=${search}&skip=${
                        (page - 1) * limit
                    }&limit=${limit}`
                );

                setData(response.data);
                if (data.count) {
                    setMaxPage(Math.ceil(response.data.count / limit));
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [setIsLoading, search, page, setPage, data.count, limit, server]);

    return isLoading ? (
        <Loader />
    ) : (
        <div className="comics-container">
            <h1>COMICS LIST</h1>
            <div className="comics">
                {data.results.length > 0 ? (
                    data.results.map((comic, index) => {
                        return (
                            <ComicCard
                                key={index}
                                comic={comic}
                                userToken={userToken}
                                userId={userId}
                                setDisplayModal={setDisplayModal}
                                userData={userData}
                                server={server}
                            />
                        );
                    })
                ) : (
                    <span className="no-result">No results</span>
                )}
            </div>
            <div className="pages-limit">
                <Pages maxPage={maxPage} setPage={setPage} page={page} />

                {data.count > 0 && (
                    <Limit data={data} setPage={setPage} setLimit={setLimit} />
                )}
            </div>
        </div>
    );
};

export default Comics;
