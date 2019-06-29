import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import OrderRow from '../OrderRow/OrderRow';
import orderData from '../../helpers/data/orderData';

import './Orders.scss';

export default class Orders extends Component {
  state = {
    orders: [],
  }

  componentDidMount() {
    orderData.getMyOrders(firebase.auth().currentUser.uid)
      .then(orders => this.setState({ orders }))
      .catch(err => console.error('uh-oh, orders', err));
  }

  render() {
    const orderComponents = this.state.orders.map(order => (
      <OrderRow key={order.id} order={order} />
    ));
    return (
      <div className="Orders">
        <h2>Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Name</th>
              <th scope="col">Date</th>
              <th scope="col"># Fish</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orderComponents}
          </tbody>
        </table>
      </div>
    );
  }
}
