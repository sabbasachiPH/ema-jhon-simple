import React from "react";
import { useParams } from "react-router-dom";
import Product from "../Products/Product";
import { useState } from "react";
import { useEffect } from "react";

const ProductDetail = () => {
  const { productkey } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4200/product/" + productkey)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      });
  }, [productkey]);
  return (
    <div>
      <h1>This is the detail information of your product</h1>
      {product && <Product showAddToCart={false} product={product}></Product>}
    </div>
  );
};

export default ProductDetail;
