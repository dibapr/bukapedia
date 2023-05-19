import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, setCart } from "../../redux/reducers/productSlice";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const dispatch = useDispatch();
  const { product, cart } = useSelector((state) => state.product);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  useEffect(() => {
    console.log(product);
    console.log("Cart: ", cart);
  }, [product, cart]);

  return (
    <div className="container grid grid-col-1 justify-items-center gap-6   xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2">
      {product.map((item, index) => (
        <CardProduct
          key={index}
          title={item.title}
          img={item.image}
          category={item.category}
          description={item.description}
          actionAddToCart={() => {
            // navigate("/login");
            console.log("item: ", item);
            dispatch(setCart(item));
          }}
          actionDetail={() => console.log("Tombol Detail Ditekan")}
        />
      ))}
    </div>
  );
};

export default Product;
