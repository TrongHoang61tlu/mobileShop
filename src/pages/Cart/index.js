
import { useSelector } from "react-redux";
import {getImageProduct} from "../../shared/ultils/";
import { useDispatch } from "react-redux";
import { DELETE_ITEM_CART, UPDATE_CART } from "../../shared/constannts/acctiontype";
const Cart = () => {
  const carts = useSelector(({Cart}) => {
      return Cart.items
  });
  const disPatch  = useDispatch();
  const onUpdateInput =(e, id) =>{
    const qty = e.target.value;
    if(qty <= 0 ){
      // eslint-disable-next-line no-restricted-globals
      const isConfim = confirm("Bạn có muốn xóa sản phẩm khỏi giỏ hàng không ?")
      return isConfim
      ? disPatch({
        type : DELETE_ITEM_CART,
        payload :{
          id,
        }
      })
      : disPatch({
        type : UPDATE_CART,
        payload : {
          id,
          qty: 1,
        }
      })
    }
    disPatch({
      type :UPDATE_CART,
      payload : {
        id,
        qty,
      }
    })
  };

  const onDeleteInput = (e,id) => {
    disPatch({
      type : DELETE_ITEM_CART,
      payload: {
        id,
      }
    })
  };
  return (
    
    <>
      <div>
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {
              carts?.map((item, index) => 
                <div className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)}/>
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <input
                  onChange={(e) => onUpdateInput(e, item._id)}
                  type="number"
                  id="quantity"
                  className="form-control form-blue quantity"
                  value={item.qty}
                 
                />
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency:'VND'}).format(item.qty * item.price)}</b>
                <button onClick={(e) => onDeleteInput(e, item._id)} className="btn btn-warning">Xóa</button>
              </div>
            </div>
            )
            }
            
            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              </div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency:'VND'}).format(carts?.reduce((total, item) => total + item.qty * item.price, 0 ))}</b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="mail"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="add"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
