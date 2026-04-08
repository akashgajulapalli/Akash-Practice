import { useEffect, useState } from "react";

const Pagination = () => {
  const [allData, setAllData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const itemsPerPage = 6;
  const noOfPages = Math.round(allData?.length / itemsPerPage);
  console.log(noOfPages);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setAllData(data?.products);
    };
    fetchData();
  }, []);

  const changePageNo = (target) => {
    if (target !== pageNo) {
      setPageNo(target);
    }
  };

  const handleArrowClick = (target) => {
    if (target >= 1 && target <= noOfPages && target !== pageNo) {
      setPageNo(target);
    }
  };

  return (
    <section className="pagination-head">
      <div className="all-products">
        {allData
          ?.slice(pageNo * itemsPerPage - itemsPerPage, pageNo * itemsPerPage)
          ?.map((item, index) => (
            <div className="single-product" key={index}>
              <div className="pg-img-container">
                <img src={item?.thumbnail} />
              </div>
              <div className="pg-content-container">
                <p className="title">{item.title}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="pg-pagenation-head">
        {noOfPages > 0 && (
          <>
            <button
              className="arrow"
              onClick={() => handleArrowClick(pageNo - 1)}
            >
              {"<"}
            </button>
            {[...Array(noOfPages)]?.map((_, i) => (
              <button
                className={pageNo === i + 1 ? "active" : ""}
                key={i + 1}
                onClick={() => changePageNo(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="arrow"
              onClick={() => handleArrowClick(pageNo + 1)}
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Pagination;
