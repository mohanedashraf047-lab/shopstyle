import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../../firebaseConfig";
import { LogOutUser } from "../Redux/productSlice";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const products = useSelector((state) => state.products.cart);
  const favorites = useSelector((state) => state.products.favorites);
  const userInfo = useSelector((state) => state.products.userInfo);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Update searchTerm from URL query
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(query);
  }, [location.search]);

  // Scroll effect only on home page
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true); // solid background on other pages
    }
  }, [location.pathname]);

  const handleLogOut = () => {
    Swal.fire({
      title: "هل أنت متأكد من تسجيل الخروج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            dispatch(LogOutUser());
            Swal.fire("تم تسجيل الخروج بنجاح", "", "success");
          })
          .catch((error) => {
            Swal.fire("حدث خطأ عند تسجيل الخروج", error.message);
          });
      }
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between h-20 items-center px-4">
        <div>
          <h2
            className={`text-2xl font-bold ${
              scrolled ? "text-gray-600" : "text-white"
            }`}
          >
            ShopStyle
          </h2>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden mdl:flex gap-10 items-center">
          <Link to="/">
            <li
              className={`hover:text-blue-600 transition-colors cursor-pointer ${
                scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              Home
            </li>
          </Link>
          <Link to="/shop">
            <li
              className={`hover:text-blue-600 transition-colors cursor-pointer ${
                scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              Shop
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`hover:text-blue-600 transition-colors cursor-pointer ${
                scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              About
            </li>
          </Link>
          <Link to="/contact">
            <li
              className={`hover:text-blue-600 transition-colors cursor-pointer ${
                scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              Contact
            </li>
          </Link>

          {/* Search */}
          <li className="relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full px-4 py-2 pl-10 pr-4 rounded-lg border focus:outline-none focus:ring-2 placeholder-gray-400 ${
                    scrolled
                      ? "border-gray-400 focus:ring-blue-500 text-gray-700"
                      : "border-white text-white focus:ring-white placeholder-gray-800"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={handleSearch} // search triggers on keyup
                />
                <Search
                  className={`absolute left-3 top-2.5 h-5 w-5 ${
                    scrolled ? "text-gray-400" : "text-gray-800"
                  }`}
                />
              </div>
            </form>
          </li>
        </ul>

        {/* Right side */}
        <div className="hidden mdl:flex gap-6 items-center">
          <Link
            to="/favorites"
            className={`flex gap-1 items-center hover:text-red-500 transition-colors ${
              scrolled ? "text-gray-600" : "text-white"
            }`}
          >
            <Heart />
            <span className="text-sm font-medium">{favorites.length}</span>
          </Link>

          <Link
            to="/cart"
            className={`flex gap-1 items-center hover:text-blue-600 transition-colors ${
              scrolled ? "text-gray-600" : "text-white"
            }`}
          >
            <ShoppingCart />
            <span className="text-sm font-medium">{products.length}</span>
          </Link>

          {userInfo ? (
            <>
              <Link
                to="/userinfo"
                className={`hover:text-blue-600 font-semibold transition ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {userInfo.userName}
              </Link>
              <button
                onClick={handleLogOut}
                className={`hover:text-red-600 transition ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
                title="تسجيل الخروج"
              >
                تسجيل الخروج
              </button>
            </>
          ) : (
            <Link
              to="/sign"
              className={`flex gap-1 items-center hover:text-blue-600 transition-colors ${
                scrolled ? "text-gray-600" : "text-white"
              }`}
            >
              <User />
              <span className="text-sm font-medium">تسجيل الدخول</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`mdl:hidden cursor-pointer ${
            scrolled ? "text-gray-600" : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </div>

        {isMenuOpen && (
          <div className="absolute z-50 top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-10 mdl:hidden">
            <X
              className="absolute top-5 right-5 h-6 w-6 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
            <ul className="flex flex-col gap-10 items-center text-gray-700">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </li>
              </Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Shop
                </li>
              </Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  About
                </li>
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  Contact
                </li>
              </Link>
              {userInfo && (
                <Link
                  to="/user-info"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-blue-600 transition-colors cursor-pointer font-semibold"
                >
                  {userInfo.userName}
                </Link>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
