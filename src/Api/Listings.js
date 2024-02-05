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

  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listings;
