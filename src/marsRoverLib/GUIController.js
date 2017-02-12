import Controller from './Controller';

export default class GUIController extends Controller {
  constructor () {
    super();
  }

  executeInstructions (instruction, eachStepCallback) {
    const me = this;
    const instructions = this.instructionSplitAndTrim(instruction);

    const plateauInstructions = instructions.plateauInstructions;
    this.setPlateauFromInstruction(plateauInstructions);

    instructions.roverInstructions.forEach(roverInstruction => {
      this.setRoverFromInstruction(roverInstruction);
      eachStepCallback(me.roverInfos, me.plateau);
    });


    const queues = this.roverInfos.map(roverInfo => {
      return function () {
        return me.moveRoverFromInstructions(roverInfo.rover, roverInfo.moveRoverInstruction, me.canMoveStrategy, eachStepCallback);
      }
    });

    function runSerial (queues) {
      let result = Promise.resolve();
      queues.forEach(queue => {
        result = result.then(() => queue());
      });
      return result;
    }

    return runSerial(queues);
  }

  moveRoverFromInstructions (rover, moveRoverInstructions, canMoveStrategy, eachStepCallback) {
    const me = this;
    let i = 0;

    return new Promise((resolve, reject) => {
      function next () {
        if (i >= moveRoverInstructions.length) {
          return resolve();
        }
        me.moveRoverFromInstruction(rover, moveRoverInstructions[i], canMoveStrategy);
        eachStepCallback(me.roverInfos, me.plateau);
        setTimeout(() => {
          i++;
          next();
        }, 1000);
      }

      next();
    });
  }
}
