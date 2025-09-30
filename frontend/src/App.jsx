import { Link, useLocation } from "react-router-dom";
import "./App.css";
import Routing from "./components/Routing";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <header className="sticky top-0 py-5 px-2 min-w-[320px] dark:bg-black dark:text-white bg-white text-black">
        <nav className="flex justify-center flex-wrap items-center gap-10 *:font-bold *:text-2xl h-full">
          <Link
            to={"/products"}
            className={`${
              location.pathname == "/products" ? "border-b-2" : ""
            }`}
          >
            Products
          </Link>
          <Link
            to={"/cart"}
            className={`${location.pathname == "/cart" ? "border-b-2" : ""}`}
          >
            Cart
          </Link>
          <Link
            to={"/addProduct"}
            className={`${location.pathname == "/addProduct" ? "border-b-2" : ""}`}
          >
            AddProduct
          </Link>
        </nav>
      </header>
      <main>
        <Routing />
      </main>
    </>
  );
}

export default App;
