const Limit = ({ data, setPage, limit, setLimit, setMaxPage, maxPage }) => {
    console.log("limit", limit);
    console.log("count", data.count);
    console.log("maxPage", maxPage);
    return (
        <div>
            <form className="limit">
                Number of results :&nbsp;
                <select
                    name="limit"
                    id=""
                    defaultValue="10"
                    onChange={(event) => {
                        setPage(1);
                        setLimit(event.target.value);
                    }}
                >
                    <option value="10">10</option>
                    {data.count > 10 && <option value="20">20</option>}
                    {data.count > 20 && <option value="50">50</option>}
                    {data.count > 50 && <option value="100">100</option>}
                </select>
            </form>
        </div>
    );
};

export default Limit;
