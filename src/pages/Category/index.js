import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCategory, getProductCategories } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../shared/components/Pagination";

const Category = () => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const id = params.id;
  const page = searchParams.get("page") || 1;

  const [pages, setPages] = useState({
    total: 0,
    limit: 12,
    currentPage: page,
  });

  useEffect(() => {
    // Get Category
    getCategory(id, {}).then(({ data }) => {
      return setCategory(data.data);
    });
    // Get Total Product
    getProductCategories(id, {}).then(({ data }) => {
      return setTotalProduct(data.data.items.total);
    });
    // Get Products By Category ID
    getProductCategories(id, {
      params: {
        name: id,
        limit: 12,
        page: page,
      },
    }).then(({ data }) => {
      setProducts(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });
  }, [id, page]);

  return (
    <>
      <div>
        <div className="products">
          <h3>
            {category?.name} (hiện có {totalProduct} sản phẩm)
          </h3>
          <div className="product-list card-deck">
            {products?.map((product) => {
              return <ProductItem item={product} />;
            })}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <Pagination pages={pages} />
        </div>
      </div>
    </>
  );
};
export default Category;
