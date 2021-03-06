import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fishData from '../../helpers/data/fishData';
import orderData from '../../helpers/data/orderData';

import Inventory from '../Inventory/Inventory';
import NewOrder from '../NewOrder/NewOrder';
import Orders from '../Orders/Orders';

import './Home.scss';

class Home extends React.Component {
  state = {
    orders: [],
    fishes: [],
    fishOrder: {},
    orderEditing: {},
  }

  getOrders = () => {
    orderData.getMyOrders(firebase.auth().currentUser.uid)
      .then(orders => this.setState({ orders }))
      .catch(err => console.error('uh-oh, orders', err));
  }

  componentDidMount() {
    fishData.getFishes()
      .then(fishes => this.setState({ fishes }))
      .catch(err => console.error('uh-oh, fishes', err));

    this.getOrders();
  }

  addFishToOrder = (fishId) => {
    const fishOrderCopy = { ...this.state.fishOrder };
    fishOrderCopy[fishId] = fishOrderCopy[fishId] + 1 || 1;
    this.setState({ fishOrder: fishOrderCopy });
  }

  removeFromOrder = (key) => {
    const fishOrderCopy = { ...this.state.fishOrder };
    delete fishOrderCopy[key];
    this.setState({ fishOrder: fishOrderCopy });
  };

  deleteOrder = (orderId) => {
    orderData.deleteOrder(orderId)
      .then(() => this.getOrders())
      .catch(err => console.error('not deleted', err));
  }

makeNew = (orderName) => {
  const newOrder = { fishes: { ...this.state.fishOrder }, name: orderName };
  newOrder.dateTime = Date.now();
  newOrder.uid = firebase.auth().currentUser.uid;
  orderData.postOrder(newOrder)
    .then(() => {
      this.setState({ fishOrder: {} });
      this.getOrders();
    })
    .catch(err => console.error('error in post order', err));
}

  updateExisting = (orderName) => {
    const updateOrder = { ...this.state.orderEditing };
    const orderId = updateOrder.id;
    updateOrder.fishes = this.state.fishOrder;
    updateOrder.name = orderName;
    delete updateOrder.id;
    orderData.putOrder(orderId, updateOrder)
      .then(() => {
        this.setState({ fishOrder: {}, orderEditing: {} });
        this.getOrders();
      })
      .catch();
    console.error('editing');
    console.error('orderId', orderId);

  }

  saveNewOrder = (orderName) => {
    if (Object.keys(this.state.orderEditing).length > 0) {
      this.updateExisting(orderName);
    } else {
      this.makeNew(orderName);
    }
  };

  selectOrderToEdit = (orderId) => {
    const selectedOrder = this.state.orders.find(x => x.id === orderId);
    this.setState({ fishOrder: selectedOrder.fishes, orderEditing: selectedOrder });
    console.error(selectedOrder);
  };

  render() {
    const {
      fishes,
      orders,
      fishOrder,
      orderEditing,
    } = this.state;

    return (
        <div className="Home">
          <div className="row">
            <div className="col">
              <Inventory fishes={fishes} addFishToOrder={this.addFishToOrder}/>
            </div>
            <div className="col">
              <NewOrder
              fishes={fishes}
              fishOrder={ fishOrder }
              removeFromOrder ={this.removeFromOrder}
              saveNewOrder = {this.saveNewOrder}
              orderEditing={orderEditing} />
            </div>
            <div className="col">
                  <Orders
                  orders={orders}
                  deleteOrder={this.deleteOrder}
                  selectOrderToEdit={this.selectOrderToEdit}/>
                </div>
              </div>
            </div>
    );
  }
}

export default Home;
