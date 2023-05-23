import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, setCart } from "../../redux/reducers/productSlice";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useNavigate } from "react-router-dom";
import Skeletons from "../../components/Skeleton/SkeletonItem/SkeletonItem";
import useTitle from "../../hooks/useTitle";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import Modal from "../../components/Modal/Modal";

const ProductPage = () => {
  useTitle("Product | Bukapedia");
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);

  const filterHandler = (filter) => {
    if (!filter) {
      setFilter("");
      return;
    }
    setFilter(`category/${filter}`);
  };

  const url = `https://fakestoreapi.com/products/${filter}`;

  useEffect(() => {
    dispatch(getProduct(url));
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
            : product.map((item, index) => (
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
                    item = { ...item, quantity: 1 };
                    dispatch(setCart(item));
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
