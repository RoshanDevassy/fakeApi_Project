import { useDispatch, useSelector } from "react-redux";
import QuantityButton from "./QuantityButton";

const CartItemCard = () => {
  const { cartProducts, cartLoading, cartErrors } = useSelector(
    (state) => state.fakeApiCartItems
  );

  const dispatch = useDispatch();

  return (
    <>
      <div className="grid gap-x-1.5 gap-y-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center items-center">
        {cartLoading && <p>Loading...</p>}
        {cartErrors && <p>Error : {cartErrors}</p>}
        {cartErrors == false &&
        cartLoading == false &&
        cartProducts.length == 0 ? (
          <p>No Cart Items</p>
        ) : (
          cartProducts.map((obj, index) => (
            <article key={index} className="p-2.5 w-fit ">
              <div className=" m-auto ">
                <img
                  src={
                    obj?.images?.[0] ||
                    `${import.meta.env.VITE_EXPRESS_API}/uploads/${
                      obj?.imageSrc.filename
                    }`
                  }
                  alt={obj.title}
                  className="w-full h-[280px] bg-slate-500"
                />
              </div>
              <div className="font-bold text-center grid gap-y-3">
                <p>{obj.title}</p>
                <QuantityButton objs={obj} />
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
};

export default CartItemCard;
