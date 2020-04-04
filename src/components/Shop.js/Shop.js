import React, { useState, useEffect } from "react";
import "./Shop.css";
import Product from "../Products/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://shielded-ravine-38559.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data from MongoDB", data);
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productkeys = Object.keys(saveCart);
    if (products.length) {
      const previousCart = productkeys.map((existingKey) => {
        const product = products.find((pd) => pd.key === existingKey);
        product.quantity = saveCart[existingKey];
        return product;
      });
      setCart(previousCart);
    }
  }, [products]);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((pr) => (
          <Product
            key={pr.key}
            product={pr}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
