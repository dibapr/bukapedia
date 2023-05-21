import { BsFillCartPlusFill } from "react-icons/bs";
import { BiInfoCircle } from "react-icons/bi";

const CardProduct = ({
  img,
  title,
  category,
  price,
  description,
  actionAddToCart,
  actionDetail,
}) => {
  return (
    <div className="card w-72 bg-base-100 border dark:border-slate-600">
      <figure className="bg-white border-b-2 py-4">
        <img className="object-contain w-full h-[12rem]" src={img} alt={img} />
      </figure>
      <div className="card-body flex flex-col gap-5">
        <h2 className="card-title line-clamp-1">{title}</h2>
        <p className="line-clamp-3">{description}</p>
        <div className="flex items-center">
          <p className="font-semibold">{`$${price}`}</p>
          <div className="badge badge-outline p-3 self-end">{category}</div>
        </div>
        <div className="card-actions">
          <div className="flex flex-wrap gap-2 justify-evenly">
            <button
              className="btn btn-info gap-2 w-full text-white"
              onClick={actionDetail}>
              <BiInfoCircle />
              Detail
            </button>
            <button
              className="btn btn-success gap-2 w-full text-white"
              onClick={actionAddToCart}>
              <BsFillCartPlusFill />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
