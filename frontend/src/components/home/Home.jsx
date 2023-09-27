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
const Home = () => {
  /// selector me hmesha store me jo name ho ga combine reducer me wo ay ga
  // or destructurring me jo reducer function me name ho ga wo ay ga
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );
  // const notify = () => toast("Wow so easy!");

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast(error.message);
    }
    dispatch(getproductAction());
  }, [dispatch]);

  // Search

  return (
    <>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      </div>
      {/* <HelmetCom title="WSEcommerce" /> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <HelmetCom title="WSEcommerce" />
          <div className="home">
            <div className=" slider "></div>
            {/* GetProducts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {products &&
                products.map((data) => (
                  <div key={data._id} className="card bg-base-100 shadow-xl">
                    <Link to={`productDetail/${data._id}`}>
                      <figure>
                        <img
                          src="https://fakeimg.pl/250x300/"
                          alt={`Product: ${data.name}`}
                        />
                      </figure>
                    </Link>
                    <div className="card-body">
                      <h2 className="card-title">{data.name}</h2>
                      <h5 className="card-title">{`$ ${data.price}`}</h5>
                      <h5 className="card-title">{data.rating}</h5>
                      <h5 className="card-title">{`$${data.price}`}</h5>
                      <p>{data.description}</p>
                      <Rating
                        name="simple-controlled"
                        value={data.rating}
                        readOnly="true"
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      Total Reviews:
                      <span>
                        {data.reviews < 1
                          ? "No  Reviews "
                          : data.reviews.length}
                      </span>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
