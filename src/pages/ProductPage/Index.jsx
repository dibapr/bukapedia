import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProductByFilter,
} from "../../redux/reducers/productSlice";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useNavigate } from "react-router-dom";
import Skeletons from "../../components/Skeleton/SkeletonItem/SkeletonItem";
import useTitle from "../../hooks/useTitle";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import Modal from "../../components/Modal/Modal";
import { setCart } from "../../redux/reducers/cartSlice";

const ProductPage = () => {
  useTitle("Product | Bukapedia");
  const dispatch = useDispatch();
  const { product, filterProduct, isLoading } = useSelector(
    (state) => state.product
  );
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);

  const filterHandler = (filt) => {
    if (!filter) {
      setFilter("");
      return;
    }
    setFilter(`category/${filter}`);
  };

  const addToCart = (item) => {
    const objectIndex = product.findIndex((prod) => prod.id === item.id);
    const available =
      cart.find((cart) => cart.id === product[objectIndex].id)?.quantity <=
      product[objectIndex].quantity;

    console.log(available);
    item = {
      ...item,
      quantity: 1,
      available: available,
    };
    dispatch(setCart(item));
  };

  const url = `https://fakestoreapi.com/products/${filt}`;

  useEffect(() => {
    dispatch(getProductByFilter(url));
  }, [dispatch, url]);

  useEffect(() => {
    if (localStorage.token === "admin") {
      return navigate("admin");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <FilterProduct filterOnChange={filterHandler} />
        <div className="grid grid-col-1 justify-items-center gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {isLoading
            ? [...Array(8).keys()].map((i) => {
                return <Skeletons key={i} />;
              })
            : filterProduct.map((item, index) => (
                <CardProduct
                  key={index}
                  title={item.title}
                  img={item.image}
                  price={item.price}
                  category={item.category}
                  description={item.description}
                  actionAddToCart={() => {
                    if (!token) {
                      setModal(true);
                      return;
                    }
                    addToCart(item);
                  }}
                  actionDetail={() => navigate(`product/${item.id}`)}
                />
              ))}
        </div>
      </div>
      {modal && <Modal modalOpen="modal-open" modalClose={setModal} />}
    </>
  );
};

export default ProductPage;
