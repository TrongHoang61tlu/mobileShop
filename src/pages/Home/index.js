import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../shared/components/Pagination";

function Home() {
  const [latestProduct, setLatestProduct] = React.useState([]);
  const [featuredProduct, setfeaturedProduct] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const [pages, setPages] = useState({
    total: 0,
    limit: 6,
    currentPage: page,
  });
  // Sản phẩm nổi bật
  useEffect(() => {
    getProducts({
      params: {
        limit: 6,
        "filter[is_featured]": true,
      },
    }).then(({ data }) => {
      return setfeaturedProduct(data.data.docs);
    });

    //Sản phẩm mới nhất
    getProducts({
      params: {
        limit: 3,
        page: page,
      },
    }).then(({ data }) => {
      setLatestProduct(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });
  }, [page]);
  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {latestProduct.map((value, index) => (
            <ProductItem item={value} />
          ))}
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProduct.map((value, index) => (
            <ProductItem item={value} />
          ))}
        </div>
        <div id="pagination">
          <Pagination pages={pages} />
        </div>
      </div>
      {/*	End Latest Product	*/}
    </>
  );
}

export default Home;
