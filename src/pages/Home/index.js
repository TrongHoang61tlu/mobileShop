import React, { useEffect } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";

function Home() {
    const [latestProduct, setLatestProduct] = React.useState([])
    const [featuredProduct, setfeaturedProduct] = React.useState([])
  // Sản phẩm nổi bật
  useEffect(() => {
    getProducts({
        params : {
            limit : 6,
            "filter[is_featured]" : true,
        }
    }).then(({data}) =>{
        return setfeaturedProduct(data.data.docs)
    });


    //Sản phẩm mới nhất
    getProducts({
        params : {
            limit : 6,
        }
    }).then(({data}) => {
        console.log(data.data.docs)
       return setLatestProduct(data.data.docs);
    });
  },[] );
  return (
    <>
      {/*	Feature Product	*/}
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
        {
                latestProduct.map((value, index) =>
                    <ProductItem item ={value} />
                )
            }
        </div>
        
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
            {
                latestProduct.map((value, index) =>
                    <ProductItem item ={value} />
                )
            }
        </div>
        
      </div>
      {/*	End Latest Product	*/}
    </>
  );
}

export default Home;
