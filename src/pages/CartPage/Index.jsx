import { useDispatch, useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  checkOutCart,
  updateQuantityCart,
} from "../../redux/reducers/cartSlice";
import Button from "../../components/Button/Button";
import axios from "axios";
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
    item = {
      ...item,
      quantity: Number(e.target.value),
    };

    dispatch(updateQuantityCart(item));
  };

  const handlerCheckOut = () => {
    let objectQuantity;
    const newArray = [];
    product.map((item) => {
      (objectQuantity = cart.find((cart) => cart.id === item.id)?.quantity),
        item.quantity >= objectQuantity
          ? newArray.push({ id: item.id, quantity: objectQuantity })
          : null;
    });

    console.log(newArray);

    dispatch(updateQuantityProduct(newArray));
    dispatch(checkOutCart(newArray));
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

  return (
    <div className="overflow-x-auto flex justify-center">
      {cart.length === 0 ? (
        <h1 className="text-2xl">Belum ada item yang dipilih</h1>
      ) : (
        <div>
          <div className="">
            <table className="table w-full table-fixed">
              {/* head */}
              <thead>
                <tr>
                  <th className="w-2/5">Product Name</th>
                  <th className="w-32">Price</th>
                  <th>Status</th>
                  <th className="w-40">Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="overflow-hidden">{item.title}</td>
                    <td className="flex-1">{item.price}</td>
                    {item.quantity <=
                    product.find((prod) => prod.id === item.id)?.quantity ? (
                      <td className="text-green-700">Quantity Tersedia</td>
                    ) : (
                      <td className="text-red-700">Quantity Tidak Tersedia</td>
                    )}
                    <td className="flex-1">
                      <input
                        className="border-2 w-16"
                        type="number"
                        style={
                          {
                            // WebkitAppearance: none,
                            // appearance: none,
                            // margin: 0,
                          }
                        }
                        value={item.quantity <= 0 ? "" : item.quantity}
                        onChange={(e) => {
                          updateCart(e, item);
                        }}
                      />
                    </td>
                    {}
                    <td className="flex-1">
                      {item.quantity <= 0
                        ? 0
                        : (item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <label
                      htmlFor="my-modal-6"
                      className="btn text-white btn-success"
                    >
                      Check Out
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            <ModalCheckOut
              item={cart}
              onClick={() => handlerCheckOut()}
              htmlFor={"my-modal-6"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
