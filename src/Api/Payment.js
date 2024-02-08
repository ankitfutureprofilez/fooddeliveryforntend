import { Component } from "react";
import Api from './Apis';
class Payment extends Component {

  async Checkout_cart(data) {
    return Api.post(`/stripe/create-checkout-session`, data);
  }

  render() {
    return (
        <></>
    );
  }
}

export default Payment;
