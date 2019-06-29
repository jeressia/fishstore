import React, { Component } from 'react';
import propTypes from 'prop-types';

import format from '../../helpers/format';
import fishShape from '../../helpers/propz/fishShapes';

import './Fish.scss';

export class Fish extends Component {
  static propTypes = {
    fish: fishShape.fishShape,
    addFishToOrder: propTypes.func.isRequired,
  }

  addClickEvent = (e) => {
    const { fish, addFishToOrder } = this.props;
    e.preventDefault();
    addFishToOrder(fish.id);
  }

  render() {
    const { fish } = this.props;
    const isAvailable = fish.status === 'available';
    // eslint-disable-next-line
    const image = require(`${fish.image}`);
    return (
      <li className="Fish">
        <img src={image} alt={fish.name} />
        <h3 className="name">
          {fish.name}
          <span className="price">{format.formatPrice(fish.price)}</span>
        </h3>
        <p>{fish.desc}</p>
        <button
          disabled={!isAvailable}
          onClick={this.addClickEvent}
        >
          {isAvailable ? 'Add To Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
