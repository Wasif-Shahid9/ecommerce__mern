import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productDetailAction } from "../../redux/reducersFun/productDetailReducer";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id", id);
  /// Yh productDetail me wo name ata ha jo hm store me combinereducer me dyte hn
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  console.log(loading);
  console.log("product", product);
  useEffect(() => {
    dispatch(productDetailAction(id));
  }, [dispatch, id]);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            <h1>{product.name}</h1>
            <h1>{product.description}</h1>
            <h1>{product.price}</h1>
            <h1>{product.rating}</h1>
            <h1>{product.category}</h1>
            <h1>{product.reviews}</h1>
            <img src={product.image} alt="" />

            {/* Render other product details */}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
