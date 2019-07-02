import React, { Component } from 'react';
import propTypes from 'prop-types';

import AllFish from '../Fish/Fish';
import './Inventory.scss';
import fishShapes from '../../helpers/propz/fishShapes';

export default class Inventory extends Component {
  static propTypes = {
    fishes: propTypes.arrayOf(fishShapes.fishShape),
    addFishToOrder: propTypes.func.isRequired,
  }

  render() {
    const fishComponents = this.props.fishes.map(fish => (
      <AllFish key={fish.id} fish={fish} addFishToOrder={this.props.addFishToOrder}/>
    ));

    return (
      <div>
        <h2>Inventory</h2>
        <ul className="fishes">
        { fishComponents }
        </ul>
      </div>
    );
  }
}
