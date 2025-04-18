import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/signUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Context from './context/main';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './features/user/userSlice';
import AdminPanel from './pages/AdminPanel';
import AllUsers from './pages/AllUsers';
import Products from './pages/Products';
import Loader from './components/Loader';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetails';
import CartProduct from './pages/CartProduct';
import Search from './pages/Search';

function App() {
  const [countCart, setCountCart] = useState(0);

  //Redux functionality to set state by diapatch()
  const dispatch = useDispatch();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const userInfo = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user-details`, { withCredentials: true });

      if (response.data.success) {
        dispatch(setUserDetails(response.data.data));

      }

    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } 

  };

  const countCartProduct = async()=>{
    const response = await axios.get(`${backendUrl}/cart/countCartProduct`,{withCredentials: true});

    setCountCart(response.data.data);
  }

  useEffect(() => {
    userInfo();
    countCartProduct();
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{
        userInfo, // user detail fetch
        countCart,
        countCartProduct
      }}>

        <BrowserRouter>
          <ToastContainer position="top-center" />
          <Header />
          <main className='min-h-[calc(100vh-136px)] pt-16'>

            {
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                  <Route path='/signup' element={<SignUp />}></Route>
                  <Route path='/admin-panel' element={<AdminPanel />}>
                    <Route path='all-users' element={<AllUsers />}></Route>
                    <Route path='all-products' element={<Products />}></Route>
                  </Route>
                  <Route path='/product-category/:category' element={<Categories />}></Route>
                  <Route path='/product-details/:id' element={<ProductDetails />}></Route>
                  <Route path='/cart-products' element={<CartProduct />}></Route>
                  <Route path='/search' element={<Search />}></Route>
                </Routes>
              
            }

          </main>
          <Footer />

        </BrowserRouter>
      </Context.Provider>
    </div>
  )
}

export default App
