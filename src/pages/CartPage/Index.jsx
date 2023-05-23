import { useDispatch, useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";

import { useEffect, useState } from "react";
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
  const { cart } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const updateCart = (e, item) => {
    const available =
      product.find((prod) => prod.id === item.id)?.quantity >= e.target.value;
    console.log(cart);
    console.log(available);

    item = {
      ...item,
      quantity: Number(e.target.value),
      available: available,
    };
    console.log(item);
    dispatch(updateQuantityCart(item));
    console.log(cart);
  };

  const handlerCheckOut = () => {
    dispatch(updateQuantityProduct(cart));
    dispatch(checkOutCart());
  };
  useEffect(() => {
    console.log(cart);
    // console.log(product);
  }, [cart]);

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
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Stok</th>
                  <th>Status</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="overflow-hidden">{item.title}</td>
                    <td className="flex-1">{item.price}</td>
                    <td className="flex-1">
                      {product.find((prod) => prod.id === item.id)?.quantity}
                    </td>
                    <td>
                      {item.available === true ? "Item tersedia" : "Item Habis"}
                    </td>
                    <td className="flex-1">
                      <input
                        className="border-2"
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
