import React, { useEffect } from "react";
import { getproductAction } from "../../redux/reducersFun/productReducer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";
import Loader from "../loader/Loader";
import Search from "../../pages/Search";
const Home = () => {
  /// selector me hmesha store me jo name ho ga combine reducer me wo ay ga
  // or destructurring me jo reducer function me name ho ga wo ay ga
  const { products, loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproductAction());
  }, [dispatch]);

  // Search

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <div className=" slider "></div>
          {/* GetProducts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {products &&
              products.map((data) => (
                <Link to={`productDetail/${data._id}`}>
                  <div key={data._id} className="card bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src="https://fakeimg.pl/250x300/"
                        alt={`Product: ${data.name}`}
                      />
                    </figure>

                    <div className="card-body">
                      <h2 className="card-title">{data.name}</h2>
                      <h5 className="card-title">{data.price}</h5>
                      <h5 className="card-title">{data.rating}</h5>
                      <h5 className="card-title">{`$${data.price}`}</h5>
                      <p>{data.description}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
