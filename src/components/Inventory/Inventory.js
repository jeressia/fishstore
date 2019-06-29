import React, { Component } from 'react';


import AllFish from '../Fish/Fish';
import './Inventory.scss';

export default class Inventory extends Component {

  render() {
    const fishComponents = this.props.fishes.map(fish => (
      <AllFish key={fish.id} fish={fish}/>
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
