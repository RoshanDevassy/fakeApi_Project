import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getFakeApiProducts } from "../model/ProductsSlice";
import ProductCard from "../components/ProductCard";
import { getCartProducts } from "../model/CartSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFakeApiProducts());
    dispatch(getCartProducts());
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="min-w-[320px]">
        <h1 className="font-bold text-2xl text-center py-5 ">Products</h1>
        <ProductCard />
      </div>
    </>
  );
};

export default ProductsPage;
