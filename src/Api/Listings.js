import { Component } from "react";
import Api from './Apis';
class Listings extends Component {
  async Signup(data) {
    return Api.post("/user/signup", data);
  }
  async Login(data) {
    return Api.post("/user/login", data);
  }

  async ForgotPassword(data) {
    return Api.post("/user/forgotPassword", data);
  }

  async ResetPassword(data) {
    return Api.post("/user/resetpassword", data);
  }

  async Prodctadd(data) {
    return Api.post("/product/uploadProduct", data);
  }

  async contact(data) {
    return Api.post("/product/contact", data);
  }

  async resturantadd(data){
    return Api.post("/restaurant/add",data)
  }

  async productlist(){
    return Api.get("/product/productlist")
  }

// Rest.
  async resturantdetilas(){
    return Api.get(`/restaurant`)
  }

  async resturantget(){
    return Api.get("/restaurant/get")
  }

  async userproductget(userId){
    return Api.get(`/product/my-products/${userId}`)
  }
  async privaterouter() {
    return Api.get("/user");
  }

  async paymentmethod (){
    return Api.get("/stripe/myorders")
  }


  async adminorder() {
    return Api.get('/stripe/allorder')
  }
  async orderdetials(order_id) {
    return Api.get(`/stripe/order/${order_id}`)
  }

  async ordertracking(type,order_id, form){
    return Api.post(`/restaurant/update-status/${order_id}/${type}`, form)
  }

  async newproduct(){
    return Api.get("/product/newproduct")
  }


  render() {
    return (
        <></>
    );
  }
}

export default Listings;
