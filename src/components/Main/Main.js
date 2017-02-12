import React, {Component} from 'react';

import Grid from '../Grid/Grid';
import Rover from '../Rover/Rover';
import backgroundJpg from '../../assets/bg.jpg';

import GUIController from '../../marsRoverLib/GUIController';

import '../../common/global.scss';

import cx from 'classname';
import style from './Main.scss';

class Main extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      roverInfos: [],
      controllerInput: '',
      controllerOutput: '',
      canExecute: true,
      plateau: {xCoordinate: 1, yCoordinate: 1},
    };
  }

  reset () {
    this.setState({
      roverInfos: [],
      controllerOutput: '',
      plateau: {xCoordinate: 1, yCoordinate: 1}
    });
  }

  render () {
    return (
      <div className={cx(style.main)}
           style={{background: `#120E0D url(${backgroundJpg}) center center`}}
      >
        <div className={cx(style.gridWrapper)}>
          <div className={cx(style.controllerOutput)}>
            <span>OUTPUT:</span>
            <pre>
              {this.state.controllerOutput}
            </pre>
          </div>
          <Grid plateauXCoordinate={this.state.plateau.xCoordinate}
                plateauYCoordinate={this.state.plateau.yCoordinate}
          />
          {
            this.state.roverInfos.map((roverInfo, index) => {
                return (
                  <Rover rover={roverInfo.rover}
                         key={index}
                         plateauXCoordinate={this.state.plateau.xCoordinate}
                         plateauYCoordinate={this.state.plateau.yCoordinate}
                  />);
              }
            )
          }
        </div>
        <div className={cx(style.controllerInputWrapper)}>
          <div className={cx(style.controllerInputPadding)}>
            <textarea className={cx(style.controllerInput)}
                      value={this.state.controllerInput}
                      placeholder="Input your instruction here please."
                      onChange={e => {
                        this.setState({controllerInput: e.target.value})
                      }}
            />
          </div>
          <div>
            <button disabled={!this.state.canExecute}
                    className={cx(style.btn)}
                    onClick={
                      e => {
                        this.executeInstruction(this.state.controllerInput);
                      }
                    }> {this.state.canExecute ? 'Execute' : 'Executing'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  executeInstruction (instruction) {
    const me = this;
    const controller = new GUIController();
    this.reset();
    this.setState({canExecute: false});

    try {
      controller.executeInstructions(instruction, function eachStepCallback (roverInfos, plateau) {
        me.setState({roverInfos, plateau});
      }).then(res => {
        const controllerOutput = controller.printRoversLocation();
        me.setState({controllerOutput, canExecute: true});
      });
    } catch (err) {
      this.setState({controllerOutput: err.toString(), canExecute: true});
    }
  }
}

export default Main;

