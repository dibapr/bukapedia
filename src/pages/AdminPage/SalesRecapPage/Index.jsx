import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { checkOutCart } from "../../../redux/reducers/cartSlice";

const SalesRecapPage = () => {
  useTitle("Sales Recap | Bukapedia");

  const token = localStorage.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return navigate("../../login");
    }
    if (token !== "admin") {
      return navigate("/");
    }
  }, [token, navigate]);

  const { cart } = useSelector((state) => state.cart);
  let total = 0;

  useEffect(() => {
    dispatch(checkOutCart());
  }, [dispatch]);

  if (cart.length >= 1) {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 mx-auto">
        <table className="table-auto w-full">
          <thead className="bg-neutral h-12">
            <tr>
              <th className="w-20 px-5 py-3 tracking-wide">Product</th>
              <th className="w-20 px-5 py-3 tracking-wide">Price</th>
              <th className="w-20 px-5 py-3 tracking-wide">Quantity</th>
              <th className="w-20 px-5 py-3 tracking-wide">Income</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const itemTotal = item.sold * item.price;
              total += itemTotal;
              return (
                <tr key={item.id}>
                  <td className="px-5 py-3 space-y-2 border-b border-neutral">
                    <p className="font-semibold text-base">{item.title}</p>
                    <div className="badge badge-default badge-outline text-xs">
                      {item.category}
                    </div>
                  </td>
                  <td className="px-5 py-3 space-y-2 border-b border-neutral text-center">
                    {item.price}
                  </td>
                  <td className="px-5 py-3 space-y-2 border-b border-neutral text-center">
                    {item.sold}
                  </td>
                  <td className="px-5 py-3 space-y-2 border-b border-neutral text-center">
                    {itemTotal}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-neutral">
            <tr>
              <td
                colSpan={3}
                className="px-5 py-3 space-y-2 border-b border-neutral text-center font-bold"
              >
                Total
              </td>
              <td className="px-5 py-3 space-y-2 border-b border-neutral text-right font-bo">
                ${total.toFixed(1)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <p className="font-bold text-center text-4xl my-52">No Sales</p>
      </div>
    );
  }
};

export default SalesRecapPage;
