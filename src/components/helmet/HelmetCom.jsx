import React from "react";
import Helmet from "react-helmet";

const HelmetCom = ({ title }) => {
  return (
    <>
      <Helmet>
      <title>{title}</title>
      </Helmet>
    </>
  );
};

export default HelmetCom;
