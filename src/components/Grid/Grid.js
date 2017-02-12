import React, {
  Component,
  PropTypes,
} from 'react';

import marsSurface from '../../assets/marsSurface.jpg';
import cornerPng from '../../assets/corner.png';

export const WIDTH = 500;
export const HEIGHT = 500;

class Grid extends Component {
  constructor (props, context) {
    super(props, context);
  }

  drawGrid (color, stepX, stepY) {
    if (!this.canvas) {
      return;
    }
    let context = this.canvas.getContext('2d');

    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (let i = stepX + 0.5; i < context.canvas.width; i += stepX) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, context.canvas.height);
      context.stroke();
    }
    for (let i = stepY + 0.5; i < context.canvas.height; i += stepY) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
    }
  }

  componentDidMount () {
    this.drawGrid('rgba(255, 255, 255, 0.5)', WIDTH / this.props.plateauXCoordinate, HEIGHT / this.props.plateauYCoordinate);
  }

  componentDidUpdate () {
    this.drawGrid('rgba(255, 255, 255, 0.5)', WIDTH / this.props.plateauXCoordinate, HEIGHT / this.props.plateauYCoordinate);
  }

  render () {
    return (
      <div style={{position: 'relative'}}>
        <img
          style={{
            position: 'absolute',
            top: -20,
            left: -20,
          }}
          src={cornerPng}
          alt="corner"/>
        <canvas
          style={{
            background: `url(${marsSurface})`,
            backgroundSize: '100% 100%',
            borderRadius: '6px',
            boxShadow: '0 2px 18px 2px #39211D',
          }}
          ref={(canvas) => {
            this.canvas = canvas;
          }}
          width={WIDTH}
          height={HEIGHT}>
        </canvas>
        <img
          style={{
            position: 'absolute',
            bottom: -15,
            right: -18,
            transform: 'rotate(-180deg)',
          }}
          src={cornerPng}
          alt="corner"/>
      </div>
    );
  }
}

Grid.propTypes = {
  plateauXCoordinate: PropTypes.number.isRequired,
  plateauYCoordinate: PropTypes.number.isRequired,
};

export default Grid;
