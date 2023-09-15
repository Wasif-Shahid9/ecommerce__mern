import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "../../redux/reducersFun/searchReducer";
import { getproductAction } from "../../redux/reducersFun/productReducer";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Pagination from "react-js-pagination";
const AllProducts = ({ req }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { products, loading, error, resultPerPage } = useSelector(
    (state) => state.products
  );
  console.log("resultPerPage", resultPerPage);
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
  };
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getproductAction(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

  /// dispatch me hmesha action function ka name dena hota
  /// or useSelector me hmesha store me jo name ha wo dena

  const productsCount = 10;
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {products &&
            products.map((data) => {
              return (
                <div key={data.id}>
                  <h1> {data.name} </h1>
                  <p> {data.description} </p>
                </div>
              );
            })}
        </div>
      )}
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        nextPageText="Next"
        prevPageText="Prev"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      />
    </div>
  );
};

export default AllProducts;
