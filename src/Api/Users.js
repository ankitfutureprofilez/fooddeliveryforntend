import { Component } from "react";
import Api from './Apis';
class Users extends Component {

  async search(search) {
    return Api.post(`/user/search`, search);
  }

  render() {
    return (
        <></>
    );
  }
}

export default Users;
