import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteCartProducts } from "../model/CartSlice";

const QuantityButton = ({ objs }) => {
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (count <= 0) {
      toast.info("Quantity cannot be 0 or Delete");
      setCount(1);
    } else if (count > objs.stock) {
      toast.info("Quantity Exceeded Stock Limit!!!");
      setCount(objs.stock);
    } else {
      setTotal((count * objs.price).toFixed(2));
    }
  }, [count]);

  const handleBuy = (obj) => {
    const productBuy = { ...obj, quantity: count, total };

    const buy = confirm(
      `Product Name : ${productBuy.title}\n Quantity : ${productBuy.quantity} \n Price : ${productBuy.total} `
    );
  };

  return (
    <>
      <div className="grid gap-y-3">
        <div className="flex justify-center gap-x-5">
          <p>Quantity :</p>
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className="border rounded-lg px-3 hover:cursor-pointer "
          >
            -
          </button>
          {count}
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="border rounded-lg px-3 hover:cursor-pointer "
          >
            +
          </button>
        </div>
        <div className="">
          <p>Total : {total}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 ">
          <button
            onClick={() => handleBuy(objs)}
            className="border rounded-lg py-2 hover:cursor-pointer "
          >
            Buy
          </button>
          <button
            className="border rounded-lg py-2 hover:cursor-pointer "
            onClick={() => dispatch(deleteCartProducts(objs._id))}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default QuantityButton;