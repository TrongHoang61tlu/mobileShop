import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getProduct,
  getCommentsProduct,
  createCommentsProduct,
} from "../../services/Api";
import { useParams , useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
import moment from "moment/moment";
import { ADD_TO_CART } from "../../shared/constannts/acctiontype";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState(null);
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigae = useNavigate();

  const getComments = (id) => {
    getCommentsProduct(id).then(({ data }) => {
      setComments(data.data.docs);
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    return setInputComment({ ...inputComment, [name]: value });
  };

  const clickSubmitComment = (e) => {
    e.preventDefault();
    createCommentsProduct(id, inputComment, {}).then(({ data }) => {
      if (data.status === "success") {
        setInputComment(null);
      }
      getComments(id);
    });
  };

  const addToCart = (type) =>{
    if(product){
      const {_id, name, image, price} = product;
      dispatch({
        type : ADD_TO_CART,
        payload:{
          _id,
          name,
          image,
          price,
          qty : 1,
        },
      });
    }
    if(type === "buy-now"){
      navigae("/Cart");
    }
  }

  useEffect(() => {
    //products
    getProduct(id).then(({ data }) => {
      setProduct(data.data);
    });

    //comments
    getComments(id);
  }, [id]);

  return (
    <>
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={product?.image && getImageProduct(product.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{product?.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {product?.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product?.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product?.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{product?.price}đ</li>
              {product?.is_stock ? (
                <li className="text text-success" id="status">
                  Còn hàng
                </li>
              ) : (
                <li className="text text-danger" id="status">
                  Hết hàng
                </li>
              )}
            </ul>
            <div id="add-cart">
              <button onClick={() => addToCart("buy-now")} className="btn btn-warning mr-2">Mua ngay</button>

              <button onClick={addToCart} className="btn btn-info">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {product?.name}</h3>
            {product?.details}
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  onChange={onChangeInput}
                  value={inputComment?.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  onChange={onChangeInput}
                  value={inputComment?.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>

                <textarea
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  onChange={onChangeInput}
                  value={inputComment?.content || ""}
                />
              </div>
              <button
                onClick={clickSubmitComment}
                type="submit"
                name="sbm"
                className="btn btn-primary"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        {comments?.length && (
          <div id="comments-list" className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              {comments.map((comment) => {
                const m = moment(comment.createdAt);
                return (
                  <div key={comment._id} className="comment-item">
                    <ul>
                      <li>
                        <b>{comment.name}</b>
                      </li>
                      <li>{m.fromNow()}</li>
                      <li>{comment.content}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/*	End Comments List	*/}
      </div>
    </>
  );
};
export default ProductDetails;
