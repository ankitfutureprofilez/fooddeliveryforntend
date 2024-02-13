import { Component } from "react";
import Api from './Apis';
class Listings extends Component {
  async Signup(data) {
    return Api.post("/user/signup", data);
  }
  async Login(data) {
    return Api.post("/user/login", data);
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


  async resturantdetilas(resId){
    return Api.get(`/restaurant/${resId}`)
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

  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listings;
