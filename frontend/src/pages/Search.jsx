import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchAction } from "../redux/reducersFun/searchReducer";

const Search = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/allproducts/${keyword}`);
    } else {
      console.log("No Products Found");
      alert("No products Found");
    }
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="Search Products"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </form>
    </div>
  );
};

export default Search;
