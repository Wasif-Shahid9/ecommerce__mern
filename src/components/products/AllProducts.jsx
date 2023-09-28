import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "../../redux/reducersFun/searchReducer";
import { getproductAction } from "../../redux/reducersFun/productReducer";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
// import Pagination from "./Pagination";
import { Pagination, Rating } from "@mui/material";
import { Link } from "react-router-dom";
const AllProducts = ({ req }) => {
  const HOST = "  http://localhost:4000";
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
      <h1 className="text-3xl font-semibold mb-6 text-center">All Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  h-[80%]">
          {products &&
            products.map((data) => {
              (HOST + data.image);
              return (
                <>
                  <div
                    key={data._id}
                    className="card bg-white shadow-lg rounded-lg  produt__card"
                  >
                    {/* <Link to={`productDetail/${data._id}`}> */}
                    <figure className="overflow-hidden">
                      <img
                        src={HOST + data.image}
                        alt={`Product: ${data.name}`}
                        className="w-full h-auto"
                      />
                    </figure>
                    {/* </Link> */}
                    <div className="card-body p-4 border-none">
                      <h2 className="text-lg font-semibold">{data.name}</h2>
                      <h5 className="text-sm font-medium">${data.price}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">
                          {/* Assuming data.rating is a number */}
                          Rating: {data.rating}
                        </span>
                        <span className="text-gray-400">
                          {/* Assuming data.reviews is an array */}
                          Total Reviews: {data.reviews.length}
                        </span>
                      </div>
                      <p className="mt-2 text-sm">{data.description}</p>
                      <div className="mt-4">
                        <Rating
                          name="simple-controlled"
                          value={data.rating}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </>
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
