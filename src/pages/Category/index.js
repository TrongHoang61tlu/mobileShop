import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCategory, getProductCategories } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";

const Category = () => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);

  const params = useParams();
  const id = params.id;

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
    getProductCategories(id, {}).then(({ data }) => {
      console.log(data);
      return setProducts(data.data.docs);
    });
  }, [id]);

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
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Trang trước
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Trang sau
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Category;
