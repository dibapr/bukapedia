import { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import useTitle from "../../hooks/useTitle";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/reducers/cartSlice";
const ProductDetail = ({
  title,
  category,
  price,
  quantity,
  description,
  image,
  item,
}) => {
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem("token");
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useTitle(`${title} | Bukapedia`);
  const [qty, setQty] = useState(1);

  const addToCartHandler = (item) => {
    if (!token) {
      setModal(true);
      return;
    }
    const cartQuantity = cart.find((cart) => cart.id === item.id)?.quantity;
    item = { ...item, quantity: qty };
    qty <= 0 ? setQty(0) : dispatch(setCart(item));

    console.log(item);

    setQty(0);
  };

  return (
    <>
      <div className="m-auto border-2 flex items-center w-[300px] h-[300px] bg-white rounded-xl">
        <img
          src={image}
          className="object-scale-down w-[70%] transition ease-in-out hover:scale-110 mx-auto p-5"
          alt={image}
        />
      </div>
      <div className="lg:justify-self-auto flex flex-col gap-3 justify-self-start">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <span className="badge badge-lg badge-outline">{category}</span>
        <h1 className="text-3xl font-semibold">{`$${price}`}</h1>
        <div>
          <h1 className="text-xl font-medium mb-3">Product Description</h1>
          <p className="text-base">{description}</p>
        </div>
        <div className="border-2 dark:border-slate-600  rounded-lg flex flex-wrap justify-between items-center gap-5 p-5">
          <div className="">
            <h1>Quantity:</h1>
            <input
              className="border p-2 mb-2"
              type="number"
              value={qty < 1 ? "" : qty}
              onChange={(e) =>
                e.target.value <= 0 ? setQty(0) : setQty(Number(e.target.value))
              }
            />
            <h1>Stock: {quantity}</h1>
          </div>
          <div className="">
            <h1>Subtotal:</h1>
            <h1>${qty <= 0 ? 0 : (qty * price).toFixed(2)}</h1>
          </div>
          <button
            onClick={() => addToCartHandler(item)}
            className="btn btn-success gap-2 text-white"
          >
            <BsFillCartPlusFill />
            Add to Cart
          </button>
        </div>
      </div>
      {modal && <Modal modalOpen="modal-open" modalClose={setModal} />}
    </>
  );
};

export default ProductDetail;
