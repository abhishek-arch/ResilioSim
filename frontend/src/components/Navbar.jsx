import { motion, AnimatePresence } from "framer-motion";
import "../Css/Navbar.css";
import hamburger from "../assets/images/hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Navbar = ({ isopen, setisopen }) => {
  const mouseclick = () => {
    setisopen(!isopen);
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handlelibrary = () => {
    if (!token) {
      toast("please login first", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const navItems = [
    { src: "#", na: "SOS" },
    { src: "/usersignup", na: "Signup" },
    { src: "/userlogin", na: "Login" },
    { src: "#", na: "Contact" },
  ];

  return (
    <div className="flex items-center justify-between p-4">
      {/* Logo */}
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
          R
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
          ResilioSim
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="lg:flex hidden space-x-8 items-center justify-center">
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.7 + index * 0.2,
            }}
            className={`relative text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group flex items-center justify-center ${
              item.na === "SOS" ? "bg-red-600 w-fit p-2 rounded-md" : ""
            }`}
          >
            <Link to={item.src}>{item.na}</Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
          </motion.div>
        ))}
      </nav>

      {/* Hamburger (Mobile) */}
      <div className="lg:hidden flex items-center">
        <button onClick={mouseclick}>
          <img src={hamburger} alt="menu" className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isopen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-2/3 h-full bg-gray-900 text-white shadow-lg p-6 z-50"
          >
            <button
              onClick={mouseclick}
              className="absolute top-4 right-4 text-2xl font-bold"
            >
              ✕
            </button>
            <ul className="space-y-6 mt-12">
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.src}
                    onClick={mouseclick}
                    className={`block text-lg font-medium ${
                      item.na === "SOS"
                        ? "bg-red-600 px-3 py-2 rounded-md"
                        : "hover:text-violet-400"
                    }`}
                  >
                    {item.na}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
