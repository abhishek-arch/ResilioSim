import { motion, AnimatePresence } from "framer-motion";

import '../Css/Navbar.css'
import hamburger from '../assets/images/hamburger.svg'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";

 
const Navbar = ({isopen , setisopen}) => {

  const mouseclick = () => {
    setisopen(!isopen)
      
  } ;

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
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
    else {
        navigate("/Autorob-Club/library")
      }
    }
      
      
   

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
 <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
           R
          </div>


          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            ResilioSim
          </span>

      </div>
      
      <nav className="lg:flex hidden space-x-8">
          {[{src:"#",na:"Home"}, {src:"#",na:"SOS"}, {src:"/usersignup",na:"Signup"}, {src:"/userlogin",na:"Login"}, {src:"#",na:"Contact"}].map(
            (item, index) => (
              <motion.a
             


                key={index}


                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.7 + index * 0.2,
                
                }}



                className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  font-medium transition-colors duration-300 group"
                href="#"
              >
               <Link to={item.src}>{item.na}</Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            )
          )}
        </nav>
    </div>
  )
}

export default Navbar
