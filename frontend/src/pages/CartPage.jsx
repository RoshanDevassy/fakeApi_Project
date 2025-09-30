import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartProducts } from "../model/CartSlice";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className=" transition-all min-w-[320px]">
        <h1 className="font-bold text-2xl text-center py-5">Cart Items</h1>
        <CartItemCard />
      </div>
    </>
  );
};

export default CartPage;
