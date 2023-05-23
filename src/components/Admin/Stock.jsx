import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getProduct } from "../../redux/reducers/productSlice";
import { updateQuantityProduct } from "../../redux/reducers/productSlice";
import { useState } from "react";

const Stock = () => {
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);
    const [updatedStocks, setUpdatedStocks] = useState({});
  
    const handleStockChange = (id, newQuantity) => {
      setUpdatedStocks(prevStocks => ({
        ...prevStocks,
        [id]: newQuantity,
      }));
    };
  
  const handleUpdateStock = (id, quantity) => {
    const updatedProducts = [{ id, quantity }];
    dispatch(updateQuantityProduct(updatedProducts));
    alert(`Stock has been updated`);

  };
  
  
  
    const url = `https://fakestoreapi.com/products/`;
  
    useEffect(() => {
      dispatch(getProduct(url));
    }, [dispatch, url]);
  


return(
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
        {product.map((item) => (
        <tr key={item.id}>
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
                onChange={(e) =>
                    handleStockChange(item.id, e.target.value)
                }
                id="quantity"
                type="number"
                value={updatedStocks[item.id] !== undefined ? updatedStocks[item.id] : item.quantity}
                className="input input-ghost text-center font-bold h-10 text-xl w-32 mx-10 rounded-base"
            />
            </td>
            <td className="px-5 py-3 border-b border-neutral">
            <button
                onClick={() =>
                handleUpdateStock(item.id, updatedStocks[item.id])
                }
                className="btn btn-accent btn-sm"
            >
                Update
            </button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>

{/* mobile */}
{product.map((item) => (
    <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
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
                        onChange={(e) => handleStockChange(item.id, e.target.value)
                        }
                        value={updatedStocks[item.id] !== undefined ? updatedStocks[item.id] : item.quantity}
                        className="input input-bordered text-center font-bold text-sm h-8 w-32 mr-2 rounded-base"/>
                        <button onClick={() => handleUpdateStock(item.id, updatedStocks[item.id])} className="btn btn-accent btn-sm">
                            Update
                            </button>
                            </div>
                            </div>
                            </div>
                            ))}
                        </div>
);
}

export default Stock;