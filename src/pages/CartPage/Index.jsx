import { useDispatch, useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  checkOutCart,
  updateQuantityCart,
} from "../../redux/reducers/cartSlice";
import { updateQuantityProduct } from "../../redux/reducers/productSlice";
import ModalCheckOut from "../../components/ModalCheckOut/ModalCheckOut";

const CartPage = () => {
  useTitle("Cart | Bukapedia");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.token;

  const { cart } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.product);

  const updateCart = (e, item) => {
    const available =
      product.find((prod) => prod.id === item.id)?.quantity >= e.target.value;

    item = {
      ...item,
      quantity: Number(e.target.value),
      available: available,
    };
    dispatch(updateQuantityCart(item));
  };

  const handlerCheckOut = () => {
    dispatch(updateQuantityProduct(cart));
    dispatch(checkOutCart());
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (token === "admin") {
      return navigate("../admin");
    }
  }, [token]);

  const totalPrice = cart
    .map((item) => {
      const total = item.quantity * item.price;
      return total;
    })
    .reduce((prev, current) => prev + current, 0);

  return (
    <>
      {cart.length === 0 ? (
        <h1 className="text-2xl text-center">You have no item yet.</h1>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table w-full table-auto table-normal table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="w-2/5">Product Name</th>
                <th className="w-32">Price</th>
                <th>Status</th>
                <th className="w-40">Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => {
                let total = item.price * item.quantity;
                return (
                  <tr key={index}>
                    <td className="overflow-hidden">{item.title}</td>
                    <td className="flex-1">{`$${item.price}`}</td>
                    {item.available === true ? (
                      <td className="text-green-700">Quantity Tersedia</td>
                    ) : (
                      <td className="text-red-700">Quantity Tidak Tersedia</td>
                    )}
                    <td className="flex-1">
                      <input
                        className="border dark:border-slate-600 outline-none p-1 w-16"
                        type="number"
                        value={item.quantity <= 0 ? "" : item.quantity}
                        onChange={(e) => {
                          updateCart(e, item);
                        }}
                      />
                    </td>
                    <td className="flex-1">
                      {item.quantity <= 0 ? 0 : `$${total.toFixed(2)}`}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <label
                    htmlFor="my-modal-6"
                    className="btn text-white btn-success">
                    Check Out
                  </label>
                </td>
                <td className="font-semibold">TOTAL</td>
                <td className="font-semibold">{`$${totalPrice.toFixed(2)}`}</td>
              </tr>
            </tbody>
          </table>
          <ModalCheckOut
            item={cart}
            onClick={() => handlerCheckOut()}
            htmlFor={"my-modal-6"}
          />
        </div>
      )}
    </>
  );
};

export default CartPage;
