import { useDispatch, useSelector } from "react-redux";
import { getCartProducts, postCartProducts } from "../model/CartSlice";
import { toast } from "react-toastify";

const ProductCard = () => {
  const { products } = useSelector((state) => state.fakeApiProducts);
  const { cartProducts } = useSelector((state) => state.fakeApiCartItems);

  const dispatch = useDispatch();

  const handleAddtoCart = (obj) => {
    const finds = cartProducts.find((val) => val._id == obj._id);
    if (finds) {
      toast.info("Product already in Cart");
    } else {
      dispatch(postCartProducts(obj));
    }
  };

  return (
    <>
      <div className="grid gap-x-1.5 gap-y-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center items-center pb-10">
        {products.map((obj, index) => (
          <article key={index} className="p-2.5 w-fit">
            <div className=" m-auto">
              <img
                src={
                  Boolean(obj?.images?.[0])
                    ? obj.images[0]
                    : `http://localhost:6600/uploads/${obj.imageSrc.filename}`
                }
                alt={obj.title}
                className="w-full h-[280px] object-cover bg-slate-500"
              />
            </div>
            <div className=" flex flex-col gap-y-1.5">
              <p className="text-wrap font-bold text-center">{obj.title}</p>
              <div className="flex justify-around">
                <p>Price : ${obj.price}</p>
                <p>Stock : {obj.stock}</p>
              </div>
              <button
                className="border-1 p-1.5 rounded-lg"
                onClick={() => handleAddtoCart(obj)}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
