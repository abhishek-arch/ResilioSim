import { motion} from "framer-motion";
import autoroblogo from '../assets/images/autoroblogo.png'
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
    <div className="w-full">
      <div
      
      className='bg-gray-800 border-black flex items-center justify-between w-full'>


        <motion.img 
        

          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25,
            delay: 0.3,
            duration: 1.2,
          }}
        
        
        className='logo w-lg ' srcSet={autoroblogo} alt="" />



        <ul className='flex navbar justify-end gap-4 p-2 items-center  cursor-pointer  '>


        <li><motion.a

         initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.7 ,
                
                }}


        
        href="#" className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  font-medium transition-colors duration-300 group">
          
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
        
        </li>



        <motion.li
        
         initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.9 ,
                
                }}

        
        >
          
          
          
          <Link

         
        
        
        
        onClick={handlelibrary} className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  font-medium transition-colors duration-300 group">SOS
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
        </Link></motion.li>
       
        <motion.li
        
         initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 1.1 ,
                
                }}

        ><Link
          

        
        to="/usersignup" className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  font-medium transition-colors duration-300 group">Sign In
        
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
        </Link></motion.li>
        <motion.li
        
         initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 1.3 ,
                
                }}

        
        ><Link
         
        
        to="/userlogin" className="relative text-gray-800 dark:text-gray-200 hover:violet-600 dark:hover:text-violet-400  font-medium transition-colors duration-300 group">Login
        
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
        
        </Link></motion.li>
        </ul> 
        <div  className="hamburger border-2 mr-4 " ><img  className='invert' src={hamburger} alt="" onClick={mouseclick}   /></div>
      </div>
    </div>
  )
}

export default Navbar
