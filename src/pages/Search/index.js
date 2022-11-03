import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";

import ProductItem from "../../shared/components/product-item";

const Search = () => {
  const [product, setProduc] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get("keyword");

  useEffect(()=>{
    getProducts({
      params :{
        name : keyword
      }

    }).then(({data})=>{
      return setProduc(data.data.docs)
    });
  }, [keyword]);
  return (
    <>
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {
            product?.map((product,index)=> {
              return (
                <ProductItem key={index} item = {product} />
              )
            })
          }
        </div>
      </div>
    </>
  );
};
export default Search;
