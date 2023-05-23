import { useDispatch, useSelector } from "react-redux";
import useTitle from "../../hooks/useTitle";
import { updateQuantityCart } from "../../redux/reducers/productSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartPage = () => {
  useTitle("Cart | Bukapedia");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.token;

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

  const { cart } = useSelector((state) => state.product);

  return (
    <div className="overflow-x-auto flex justify-center">
      {cart.length === 0 ? (
        <h1 className="text-2xl">Belum ada item yang dipilih</h1>
      ) : (
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    className="border-2"
                    type="number"
                    value={item.quantity === 0 ? "" : item.quantity}
                    onChange={(e) => {
                      console.log(e.target.value);
                      item = { ...item, quantity: e.target.value };
                      dispatch(updateQuantityCart(item));
                    }}
                  />
                </td>
                {}
                <td>{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage;
