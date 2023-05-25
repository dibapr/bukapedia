import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductByFilter } from "../../redux/reducers/productSlice";
import CardProduct from "../../components/CardProduct/CardProduct";
import { useNavigate } from "react-router-dom";
import Skeletons from "../../components/Skeleton/SkeletonItem/SkeletonItem";
import useTitle from "../../hooks/useTitle";
import FilterProduct from "../../components/FilterProduct/FilterProduct";
import Modal from "../../components/Modal/Modal";
import Search from "../../components/Search/Search";
import { setCart } from "../../redux/reducers/cartSlice";
import { getCategories } from "../../redux/reducers/categoriesSlice";

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
  const [search, setSearch] = useState();

  const filterHandler = (filter) => {
    if (!filter) {
      setFilter("");
      return;
    }
    setFilter(`category/${filter}`);
    setSearch("");
  };

  const addToCart = (item) => {
    const objectIndex = product.findIndex((prod) => prod.id === item.id);
    const cartQuantity = cart.find(
      (cart) => cart.id === product[objectIndex].id
    )?.quantity;

    item = {
      ...item,
      quantity: 1,
    };
    dispatch(setCart(item));
  };

  const url = `https://fakestoreapi.com/products/${filter}`;

  useEffect(() => {
    dispatch(getProductByFilter(url));
  }, [dispatch, url]);

  useEffect(() => {
    if (localStorage.token === "admin") {
      return navigate("admin");
    }
  }, []);

  const keywordSearchHandler = (keyword) => {
    setSearch(keyword);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex w-full items-center lg:justify-between justify-center flex-wrap gap-3 ">
          <Search keywordOnChange={keywordSearchHandler} />
          <FilterProduct filterOnChange={filterHandler} />
        </div>
        <div className="grid grid-col-1 justify-items-center gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {isLoading
            ? [...Array(8).keys()].map((i) => {
                return <Skeletons key={i} />;
              })
            : search
            ? filterProduct
                .filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => (
                  <CardProduct
                    key={index}
                    title={item.title}
                    img={item.image}
                    price={item.price}
                    category={item.category}
                    description={item.description}
                    quantity={item.quantity}
                    actionAddToCart={() => {
                      if (!token) {
                        setModal(true);
                        return;
                      }
                      addToCart(item);
                    }}
                    actionDetail={() => navigate(`product/${item.id}`)}
                  />
                ))
            : filterProduct.map((item, index) => (
                <CardProduct
                  key={index}
                  title={item.title}
                  img={item.image}
                  price={item.price}
                  category={item.category}
                  description={item.description}
                  quantity={item.quantity}
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
          {}
          {/* {isLoading
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
                  quantity={item.quantity}
                  actionAddToCart={() => {
                    if (!token) {
                      setModal(true);
                      return;
                    }
                    addToCart(item);
                  }}
                  actionDetail={() => navigate(`product/${item.id}`)}
                />
              ))} */}
        </div>
      </div>
      {modal && <Modal modalOpen="modal-open" modalClose={setModal} />}
    </>
  );
};

export default ProductPage;
