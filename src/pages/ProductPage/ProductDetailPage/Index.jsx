import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import SkeletonDetail from "../../../components/Skeleton/SkeletonDetail/SkeletonDetail";
import { useNavigate } from "react-router-dom";

const ProductDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.product);

  // const url = `https://fakestoreapi.com/products`;

  useEffect(() => {
    if (localStorage.token === "admin") {
      return navigate("../../admin");
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:justify-items-start gap-5 justify-items-center">
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        product
          .filter((item) => item.id === parseInt(params.id))
          .map((item) => (
            <ProductDetail
              item={item}
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              price={item.price}
              quantity={item.quantity}
              description={item.description}
              image={item.image}
              loading={isLoading}
            />
          ))
      )}
    </div>
  );
};

export default ProductDetailPage;
