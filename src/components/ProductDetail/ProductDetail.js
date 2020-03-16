import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productkey } = useParams();
  return (
    <div>
      <h1>This is the detail information of your product- {productkey}</h1>
    </div>
  );
};

export default ProductDetail;
