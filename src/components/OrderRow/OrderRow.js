import React, { Component } from 'react';

export default class OrderRow extends Component {
  render() {
    const { order } = this.props;
    return (
      <tr>
        <th>{order.id}</th>
        <td>{order.dateTime}</td>
        <td>5</td>
        <td><button className="btn btn-danger">x</button></td>
      </tr>
    );
  }
}
