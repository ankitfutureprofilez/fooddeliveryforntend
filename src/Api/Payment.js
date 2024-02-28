import { Component } from "react";
import Api from './Apis';
class Payment extends Component {

  async Checkout_cart(data) {
    return Api.post(`/stripe/create-checkout-session`, data);
  }

  async payment_success( id ) {
    return Api.get(`/stripe/order-success/${id}`);
  }

  async payment_cancel( id ) {
    return Api.get(`/stripe/order-cancel/${id}`);
  }

  render() {
    return (
        <></>
    );
  }
}

export default Payment;
