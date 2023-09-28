import React, { useEffect } from "react";
import { getproductAction } from "../../redux/reducersFun/productReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";
import Loader from "../loader/Loader";
import Search from "../../pages/Search";
import HelmetCom from "../../components/helmet/HelmetCom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderSlider from "./HeaderSlider";

const Home = () => {
  // const HOST = "localhost:4000"
  const HOST = "  http://localhost:4000";

  /// selector me hmesha store me jo name ho ga combine reducer me wo ay ga
  // or destructurring me jo reducer function me name ho ga wo ay ga
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  // ("Homeproducts", products.image);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast(error.message);
    }
    dispatch(getproductAction());
  }, [dispatch, toast]);

  // Search

  return (
    <>
      <HelmetCom title="WSEcommerce" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <HelmetCom title="WSEcommerce" />git push -u origin master

          <HeaderSlider />
          <div className="home  lg:w-[85%] m-auto  mt-[20px] mx-30px">
            <div className="slider text-center text-3xl my-[50px] font-bold	">
              Top Products{" "}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  h-[80%]">
              {products &&
                products.map((data, i) => {
                  return (
                    <>
                      <div
                        key={i}
                        className="card bg-white shadow-lg rounded-lg  produt__card"
                      >
                        <Link to={`productDetail/${data._id}`}>
                          <figure className="overflow-hidden">
                            <img
                              src={HOST + data.image}
                              alt={`Product: ${data.name}`}
                              className="w-full h-auto"
                            />
                          </figure>
                        </Link>
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
          </div>
        </>
      )}
    </>
  );
};

export default Home;
