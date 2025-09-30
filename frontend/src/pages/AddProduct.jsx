import { useDispatch } from "react-redux";
import { addToFakeApiProducts } from "../model/ProductsSlice";

export default function AddProduct() {
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);

      dispatch(addToFakeApiProducts(formData));
    } catch (error) {}
  };

  return (
    <>
      <section className="min-w-[320px]">
        <h1 className="text-center">Add Product</h1>
        <form
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
          className="grid justify-center gap-y-5"
        >
          <label htmlFor="name">Title :</label>
          <input type="text" className="dark:border" id="name" name="title" minLength={1} required />

          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="price"
            className="dark:border"
            name="price"
            minLength={1} required
          />

          <label htmlFor="stock">Stock :</label>
          <input
            type="number"
            className="dark:border"
            id="stock"
            name="stock"
            minLength={1} required
          />

          <label htmlFor="upload">Upload Pic :</label>
          <input
            type="file"
            className="dark:border"
            id="upload"
            name="image"
            accept=".jpg"
            minLength={1} required
          />

          <button type="submit" className="border">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
