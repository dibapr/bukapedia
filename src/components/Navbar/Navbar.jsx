import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ModeToggle from "../ModeToggle/ModeToggle";

export const Navbar = () => {
  const token = localStorage.token;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("login");
  };

  return (
    <>
      <div className="navbar sticky top-0 drop-shadow-lg bg-base-100 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content gap-1 mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                {localStorage.token === "admin" ? (
                  <Link to="admin">Product</Link>
                ) : (
                  <Link to="/">Product</Link>
                )}
              </li>
              {localStorage.token === "admin" && (
                <li>
                  <Link to="admin/sales-recap">Sales Recap</Link>
                </li>
              )}
              <li>
                {token ? (
                  <button
                    onClick={logoutHandler}
                    className="btn btn-error text-white">
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-green-500 hover:bg-green-400 text-white">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className="flex gap-[1.13rem]">
            <a className="btn btn-ghost normal-case text-xl">Bukapedia</a>
            <ModeToggle />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu gap-5 menu-horizontal px-1">
            <li>
              {localStorage.token === "admin" ? (
                <Link to="admin">Product</Link>
              ) : (
                <Link to="/">Product</Link>
              )}
            </li>
            {localStorage.token === "admin" && (
              <li>
                <Link to="admin/sales-recap">Sales Recap</Link>
              </li>
            )}
            <li>
              {token ? (
                <button
                  onClick={logoutHandler}
                  className="btn btn-error text-white">
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-500 hover:bg-green-400 text-white">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {token && token !== "admin" && (
            <Link to="/cart" className="btn gap-2">
              <FaShoppingCart />
              Cart
            </Link>
          )}

          {/* {token ? (
            <Link to="/cart" className="btn gap-2">
              <FaShoppingCart />
              Cart
            </Link>
          ) : (token !== "admin" ? <Link to="/cart" className="btn gap-2">
              <FaShoppingCart />
              Cart
            </Link>) :} */}
        </div>
      </div>
      <main className="container px-7 py-10">
        <Outlet />
      </main>
    </>
  );
};
