import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";

import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const [product, setProduc] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || 1;

  const [pages, setPages] = useState({
    total: 0,
    limit: 12,
    currentPage: page,
  });

  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        limit: 12,
        page: page,
      },
    }).then(({ data }) => {
      setProduc(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });
  }, [keyword, page]);
  return (
    <>
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với sản phẩm <span>{keyword}</span>
        </div>
        <div className="product-list card-deck">
          {product?.map((product, index) => {
            return <ProductItem key={index} item={product} />;
          })}
        </div>
      </div>
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>
  );
};
export default Search;
