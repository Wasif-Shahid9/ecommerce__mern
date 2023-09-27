import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../redux/reducersFun/cartReducer/cartReducer";

import { ToastContainer, toast } from "react-toastify";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cartReducer);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 11 || phoneNo.length > 11) {
      toast("Phone Number should be 11 digits Long");

      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    // <div>
    //   <div className="shippingContainer">
    //     <div className="shippingBox">
    //       <h2 className="shippingHeading">Shipping Details</h2>

    //       <form
    //         className="shippingForm"
    //         encType="multipart/form-data"
    //         onSubmit={shippingSubmit}
    //       >
    //         <div>
    //           {/* <HomeIcon /> */}
    //           <input
    //             type="text"
    //             placeholder="Address"
    //             required
    //             value={address}
    //             onChange={(e) => setAddress(e.target.value)}
    //           />
    //         </div>

    //         <div>
    //           {/* <LocationCityIcon /> */}
    //           <input
    //             type="text"
    //             placeholder="City"
    //             required
    //             value={city}
    //             onChange={(e) => setCity(e.target.value)}
    //           />
    //         </div>

    //         <div>
    //           {/* <PinDropIcon /> */}
    //           <input
    //             type="number"
    //             placeholder="Pin Code"
    //             required
    //             value={pinCode}
    //             onChange={(e) => setPinCode(e.target.value)}
    //           />
    //         </div>

    //         <div>
    //           {/* <PhoneIcon /> */}
    //           <input
    //             type="number"
    //             placeholder="Phone Number"
    //             required
    //             value={phoneNo}
    //             onChange={(e) => setPhoneNo(e.target.value)}
    //             size="10"
    //           />
    //         </div>

    //         <div>
    //           {/* <PublicIcon /> */}

    //           <select
    //             required
    //             value={country}
    //             onChange={(e) => setCountry(e.target.value)}
    //           >
    //             <option value="">Country</option>
    //             {Country &&
    //               Country.getAllCountries().map((item) => (
    //                 <option key={item.isoCode} value={item.isoCode}>
    //                   {item.name}
    //                 </option>
    //               ))}
    //           </select>
    //         </div>

    //         {country && (
    //           <div>
    //             {/* <TransferWithinAStationIcon /> */}

    //             <select
    //               required
    //               value={state}
    //               onChange={(e) => setState(e.target.value)}
    //             >
    //               <option value="">State</option>
    //               {State &&
    //                 State.getStatesOfCountry(country).map((item) => (
    //                   <option key={item.isoCode} value={item.isoCode}>
    //                     {item.name}
    //                   </option>
    //                 ))}
    //             </select>
    //           </div>
    //         )}

    //         <input
    //           type="submit"
    //           value="Continue"
    //           className="shippingBtn"
    //           disabled={state ? false : true}
    //         />
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-200 text-gray-700 py-3 px-6">
          <h2 className="text-2xl font-semibold">Shipping Details</h2>
        </div>

        <form
          className="px-6 py-4"
          encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Address"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Pin Code"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Phone Number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              size="10"
            />
          </div>
          <div className="mb-4">
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {country && (
            <div className="mb-4">
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="text-center">
            <input
              type="submit"
              value="Continue"
              className={`w-full px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold cursor-pointer ${
                state ? "hover:bg-blue-600" : "cursor-not-allowed bg-gray-400"
              }`}
              disabled={state ? false : true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
