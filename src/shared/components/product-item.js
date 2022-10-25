import React from "react";
import { getImageProduct } from "../ultils";

const ProductItem = ({item}) => {
  return (
    <div className="product-item card text-center">
      <a href="picture">
        <img src={getImageProduct(item.image)} />
      </a>
      <h4>
        <a href="name">{item.name}</a>
      </h4>
      <p>
        Giá Bán: <span>{item.price}</span>
      </p>
    </div>
  );
};

export default ProductItem;
