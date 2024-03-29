import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import "./index.css";
import "./styles/add.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home";
//import Menu from "./page/Menu";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Newproduct from "./page/NewProduct";
import Signup from "./page/Signup";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import Success from "./page/Success";
import Cancel from "./page/Cancel";
import RestaurantRegistration from "./page/RestaurantRegistration";
import ProductAll from "./Product/ProductAll";
import Restaurantdetails from "./page/Restaurantdetails";
import PrivateRoute from "./private/PrivateRoute";
import PrivateLayout from "./private/PrivateLayout";
import Location from "./Location/Location";
import Orderhistory from "./payment/Orderhistory";
import OrderDetilas from "./payment/OrderDetilas";
import MapComponent from "./Location/MapComponent";
import MapContainer from "./tracking/MapContainer";
import Dashboard from "./components/Restaurant/Dashboard";
import Error404 from './Error404/Error404';
import HomeSlider from "./components/HomeSlider";
import ForgotPassword from "./page/ForgotPassword";
import ResetPassword from "./page/ResetPassword";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={ <App /> }>
      <Route index element={   <Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword/:token" element={<ResetPassword />} />
      <Route path="/home" element={<HomeSlider />} />

      <Route path="newproduct" element={
        
        <PrivateRoute> <Newproduct />  </PrivateRoute>
      } />
      <Route path="signup" element={<Signup />} />
      {/* <Route path="checklocation" element={<CheckLocation />} /> */}
      <Route path="cart" element={<Cart />} />
      <Route path="success/:order_id" element={<Success />} />
      <Route path="cancel/:order_id" element={<Cancel />} />
      <Route path="products" element={<ProductAll />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="restaurant-register" element={ <RestaurantRegistration />} />
      <Route path="location" element={  <Location />} />
      <Route path="map" element={  <MapContainer />} />
      <Route path="MapComponent" element={ <MapComponent /> } />
      <Route path="/order_history" element={<Orderhistory />} />
      <Route path="/order_history/:order_id" element={<OrderDetilas />} />
      <Route path="/restaurants" element={ <PrivateRoute>  <Restaurantdetails /></PrivateRoute> } />
      <Route path="*" element={ <Error404 /> } />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} >
    <PrivateLayout>
      <RouterProvider router={router} />
    </PrivateLayout>
  </Provider>
);

reportWebVitals();
