import { useState, useTransition } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import useTitle from "../../hooks/useTitle";

const ProductDetail = ({
  title,
  category,
  price,
  quantity,
  description,
  image,
}) => {
  useTitle(`${title} | Bukapedia`);
  const [qty, setQty] = useState(1);

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
              onChange={(e) => setQty(e.target.value)}
            />
            <h1>Stock: {quantity}</h1>
          </div>
          <div className="">
            <h1>Subtotal:</h1>
            <h1>{`$${qty * price.toFixed(2)}`}</h1>
          </div>
          <button className="btn btn-success gap-2 text-white">
            <BsFillCartPlusFill />
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
