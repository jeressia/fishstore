import React, { Component } from 'react';

import fishData from '../../helpers/data/fishData';
import './Inventory.scss';

export default class Inventory extends Component {
  state = {
    fishes: [],
  }

  componentDidMount() {
    fishData.getFishes()
      .then(fishes => this.setState({ fishes }))
      .catch(err => console.error('uh-oh, fishes', err));
  }

  render() {
    return (
      <div>
        <h3>Inventory</h3>
      </div>
    );
  }
}
