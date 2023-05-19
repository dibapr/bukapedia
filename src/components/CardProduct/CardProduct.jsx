const CardProduct = ({
  img,
  title,
  category,
  description,
  actionAddToCart,
  actionDetail,
}) => {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <img className="object-contain w-full h-[12rem]" src={img} alt={img} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="h-24 overflow-y-scroll overflow-x-hidden">
          {description}
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
        </div>
        <div className="flex flex-row justify-around">
          <button className="btn btn-primary" onClick={actionDetail}>
            Detail
          </button>
          <button
            className="btn btn-primary bg-green-600"
            onClick={actionAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
