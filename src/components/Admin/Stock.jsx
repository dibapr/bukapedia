import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  updateQuantityProduct,
} from "../../redux/reducers/productSlice";

const Stock = () => {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.product);

  const [items, setItems] = useState(product);

  const handlerUpdateQuantity = (e, id) => {
    const updatedItems = [...items];

    const objectIndex = updatedItems.findIndex((item) => item.id === id);

    updatedItems[objectIndex] = {
      ...updatedItems[objectIndex],
      quantity: Number(e.target.value),
    };

    setItems(updatedItems);
  };

  const handlerUpdateProduct = () => {
    dispatch(updateQuantityProduct(items));
  };

  // useEffect(() => {
  //   dispatch(getProduct());
  // }, [dispatch]);

  return (
    <div>
      <div className="overflow-auto rounded-lg shadow hidden md:block w-4/5 mx-auto">
        <table className="table-auto w-full">
          <thead className="bg-neutral h-12">
            <tr>
              <th colSpan={2} className="w-20 px-5 py-3 tracking-wide">
                Product
              </th>
              <th className="w-20 px-5 py-3 tracking-wide">Stock</th>
              <th className="w-20 px-5 py-3 tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="h-32 w-32 px-5 bg-white py-3 border-b border-neutral">
                  <img src={item.image} alt={item.title} />
                </td>
                <td className="px-5 py-3 space-y-2 border-b border-neutral">
                  <p className="font-semibold text-base">{item.title}</p>
                  <div className="badge badge-default badge-outline text-xs">
                    {item.category}
                  </div>
                  <p className="text-justify text-sm">{item.description}</p>
                </td>
                <td className="px-5 py-3 border-b border-neutral">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handlerUpdateQuantity(e, item.id)}
                    className="input input-ghost text-center font-bold h-10 text-xl w-32 mx-10 rounded-base"
                  />
                </td>
                <td className="px-5 py-3 border-b border-neutral">
                  <button
                    className="btn btn-accent btn-sm"
                    onClick={handlerUpdateProduct}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden"
        >
          <div className="space-y-2 p-4 rounded-lg shadow-xl">
            <div>
              <img className="w-32 mx-auto" src={item.image} alt={item.title} />
            </div>
            <div>
              <p className="font-semibold text-base text-center">
                {item.title}
              </p>
            </div>
            <div className="badge badge-default badge-outline text-xs">
              {item.category}
            </div>
            <div className="text-sm text-justify">{item.description}</div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handlerUpdateQuantity(e, item.id)}
                className="input input-bordered text-center font-bold text-sm h-8 w-32 mr-2 rounded-base"
              />
              <button
                className="btn btn-info btn-sm"
                onClick={handlerUpdateProduct}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stock;
