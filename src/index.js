import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme.css";
import "./styles/add.css";
import "./index.css";
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
import CheckLocation from "./page/CheckLocation";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={
        <App /> }>
      <Route index element={   <Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={
        <PrivateRoute> <Newproduct />  </PrivateRoute>
      } />
      <Route path="signup" element={<Signup />} />
      <Route path="checklocation" element={<CheckLocation />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
      <Route path="products" element={<ProductAll />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="restaurant-register" element={ <RestaurantRegistration />} />
      <Route path="location" element={  <Location />} />
      <Route path="map" element={  <MapContainer />} />
      <Route path="MapComponent" element={ <MapComponent /> } />
      <Route path="/order_history" element={<Orderhistory />} />
      <Route path="/order_history/:order_id" element={<OrderDetilas />} />
      <Route path="/restaurants" element={ <PrivateRoute>  <Restaurantdetails /></PrivateRoute> } />
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
