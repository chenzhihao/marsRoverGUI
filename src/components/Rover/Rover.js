import React, {
  Component,
  PropTypes,
} from 'react';
import robotSvg from '../../assets/robot.svg';

import cx from 'classname';
import style from './Rover.scss';

import {WIDTH, HEIGHT} from '../Grid/Grid';

const ROBOT_WIDTH = 30;
const ROBOT_HEIGHT = 30;

class Rover extends Component {
  render () {
    return (
      <div className={cx(style.rover, style[this.props.rover.orientation])}
           style={{
             left: WIDTH * (this.props.rover.xCoordinate / this.props.plateauXCoordinate) - ROBOT_WIDTH / 2,
             bottom: HEIGHT * (this.props.rover.yCoordinate / this.props.plateauYCoordinate) - ROBOT_HEIGHT / 2,
           }}
      >
        <img src={robotSvg}
             width={ROBOT_WIDTH}
             height={ROBOT_HEIGHT}
        />
      </div>
    );
  }
}

Rover.propTypes = {
  rover: PropTypes.shape({
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    orientation: PropTypes.string.isRequired,
  }).isRequired,
  plateauXCoordinate: PropTypes.number.isRequired,
  plateauYCoordinate: PropTypes.number.isRequired,
};
Rover.defaultProps = {
  plateauXCoordinate: 1,
  plateauYCoordinate: 1,
};

export default Rover;
