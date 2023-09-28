// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const AdminCreateProduct = () => {
//   const [image, setImage] = useState({ preview: "", data: "" });
//   const [status, setStatus] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     formData.append("file", image.data);
//     const response = await fetch("/api/v1/upload", {
//       method: "POST",
//       body: formData,
//     });
//     if (response) setStatus(response.statusText);
//   };

//   const handleFileChange = (e) => {
//     const img = {
//       preview: URL.createObjectURL(e.target.files[0]),
//       data: e.target.files[0],
//     };
//     setImage(img);
//     ("image Save Successfully");
//   };
//   return (
//     <>
//       <div className="App">
//         <h1>Upload to server</h1>
//         {image.preview && <img src={image.preview} width="100" height="100" />}
//         <hr></hr>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <input type="file" name="image" onChange={handleFileChange}></input>
//           <button type="submit">Submit</button>
//         </form>
//         {status && <h4>{status}</h4>}
//       </div>
//     </>
//   );
// };

// export default AdminCreateProduct;

import React, { useState } from "react";
import DrawerSideBar from "./DrawerSideBar";
import { useDispatch, useSelector } from "react-redux";
import { createProductAction } from "../../redux/reducersFun/adminProducts/adminCreateProduct";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

const AdminCreateProduct = () => {
  const [file, setFile] = useState("");
  // ("file", file);
  const drawerWidth = 240;

  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
  });

  // const { error } = useSelector((state) => state.createProductReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Dispatch the action to create the product
  //   dispatch(createProductAction(productData));
  // };

  /// Image Upload ///////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the action to create the product
    // dispatch(createProductAction(productData));
    // ("Product created");

    if (file) {
      const data = new FormData();
      // const fileName = `${Date.now()}${file.name}`;
      Object.keys(productData).forEach((key) => {
        ("key:", key, "data", productData[key]);
        data.append(key, productData[key]);
      });

      data.append("file", file);

      ("formData:", Object.values(data));
      // data.append("name", fileName);
      // data.append("file", file);

      // Dispatch the action to create the product
      dispatch(createProductAction(data));
      ("Product created");

      // try {
      //   await fetch("/api/v1/upload", {
      //     headers: {
      //       // Set the correct Content-Type header for file upload
      //       // "Content-type": "multipart/form-data",
      //     },
      //     method: "POST",
      //     body: data,
      //   });
      //   ("File uploaded successfully");
      // } catch (err) {
      //   ("File upload error", err);
      // }
    }
  };

  return (
    <>
      <DrawerSideBar />
      <Container maxWidth="md" className="">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <div className="bg-white  py-4 text-center">
            <h1 className="text-4xl">Dashboard</h1>
          </div>
          <div className="mt-4">
            <p className="text-lg">Total Amount: $200</p>
          </div>
          <Toolbar />
        </Box>
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Create Product</h1>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label className="text-lg">Name:</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
                className="border rounded-md p-2 bg-white "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Price:</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                required
                className="border rounded-md p-2 bg-white "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Category:</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
                className="border rounded-md p-2 bg-white "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Description:</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                required
                className="border rounded-md p-2 h-32 bg-white "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Stock:</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                required
                className="border rounded-md p-2 bg-white "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Image:</label>
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                name="file"
                value={productData.file}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500  py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 text-white"
            >
              Create Product
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AdminCreateProduct;
