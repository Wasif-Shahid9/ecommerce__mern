import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "../../redux/reducersFun/searchReducer";
import { getproductAction } from "../../redux/reducersFun/productReducer";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Pagination from "./Pagination";
const AllProducts = ({ req }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { products, loading, error, resultPerPage } = useSelector(
    (state) => state.products
  );

  const handlePageChange = (newPage) => {
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
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">All Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products &&
            products.map((data) => (
              <div key={data.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{data.name}</h2>
                <p className="text-gray-500">{data.description}</p>
              </div>
            ))}
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
