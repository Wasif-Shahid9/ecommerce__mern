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
    }
    if (!keyword) {
      ("products notfound");
    }
  };

  return (
    <div class="container">
      <div className="mx-auto mt-5">
        <form action="" className="flex items-center" onSubmit={handleSearch}>
          <div className="rounded-lg flex items-center ">
            <input
              type="search"
              placeholder="Search Products"
              onChange={(e) => setKeyword(e.target.value)}
              className="p-3 rounded-l-lg outline-none w-[100%] "
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
