import { NO_SOLUTION, STATE } from '../constants';
import { dangerousDeepClone, isEven, isOdd } from '../utils';
import { Jug, JugState } from './interfaces';

export class WaterJugSolver {
  queue: JugState[] = [];
  tree = new Map();
  pathList: JugState[][] = [];

  constructor(readonly xGallon: number, readonly yGallon: number, readonly zGallon: number) {
    const [small, large] = [this.xGallon, this.yGallon].sort((a, b) => a - b);
    const start: JugState = {
      action: STATE.INITIAL,
      simple: '0,0',
      jugs:
        [
          { value: 0, capacity: small, name: 'small' },
          { value: 0, capacity: large, name: 'large' }
        ]
    };
    this.queue.push(start);
    this.addNode(this.getUniqueStringOutOfState(start));
    this.pathList.push([start]);
  }

  addNode(value: string) {
    if (!this.tree.has(value)) {
      this.tree.set(value, []);
    }
  }

  addEdge(left: string, right: string) {
    this.addNode(left);
    this.addNode(right);
    this.tree.get(left).push(right);
  }

  emptyJug(state: JugState, target: Jug['name']): JugState {
    const newState = dangerousDeepClone(state);
    newState.action = target === 'small' ? STATE.EMPTY_SMALL : STATE.EMPTY_LARGE;
    newState.jugs = newState.jugs.map((jug: Jug) => {
      if (jug.name === target) {
        jug.value = 0;
      }
      return jug;
    }) as JugState['jugs'];

    newState.simple = this.getUniqueStringOutOfState(newState);
    return newState;
  }

  fillJug(state: JugState, target: Jug['name']): JugState {
    const newState = dangerousDeepClone(state);
    newState.action = target === 'small' ? STATE.FILL_SMALL : STATE.FILL_LARGE;
    newState.jugs = newState.jugs.map((jug: Jug) => {
      if (jug.name === target) {
        jug.value = jug.capacity;
      }
      return jug;
    }) as JugState['jugs'];

    newState.simple = this.getUniqueStringOutOfState(newState);
    return newState;
  }

  transfer(state: JugState, target: Jug['name']): JugState {
    const newState = dangerousDeepClone(state);
    newState.action = target === 'small' ? STATE.TRANSFER_SMALL : STATE.TRANSFER_LARGE;

    const [small, large] = newState.jugs;

    let [from, to] = target === 'small' ? [small, large] : [large, small];

    const toAvailability = to.capacity - to.value;
    to.value = Math.min(to.value + from.value, to.capacity);
    from.value = Math.max(from.value - toAvailability, 0);

    newState.simple = this.getUniqueStringOutOfState(newState);
    return newState;
  }

  getUniqueStringOutOfState(state: JugState) {
    return `${state.jugs[0].value},${state.jugs[1].value}`;
  }

  buildPathForState(parent: JugState, child: JugState) {

    const found = this.pathList.find((states) => {
      const lastIndex = states.at(-1);
      return (<JugState>lastIndex).simple === parent.simple;
    });

    if (found) {
      found.push(child);
    } else {
      const foundSecondFromLast = this.pathList.find((states) => {
        const secondFromLast = states.at(-2);
        return (<JugState>secondFromLast).simple === parent.simple;
      });

      if (foundSecondFromLast) {
        this.pathList.push(
          [...foundSecondFromLast.slice(0, -1), child],
        );
      } else {
        this.pathList.push([parent, child]);
      }
    }
  }

  // Basically if any of the jugs is equal to the desired amount or the combination of both problem is solved.
  stateHasGoal(state: JugState): boolean {
    const small = state.jugs[0].value;
    const large = state.jugs[1].value;
    return [small, large].includes(this.zGallon)
      || small + large === this.zGallon;

  }


  solve(): JugState[] | typeof NO_SOLUTION {
    // ZGallon can't be more water than the combined jugs.
    if (this.xGallon + this.yGallon < this.zGallon) {
      return NO_SOLUTION;
    }

    // If ZGallon is odd and jugs are even, is impossible.
    if (isEven(this.xGallon) && isEven(this.yGallon) && isOdd(this.zGallon)) {
      return NO_SOLUTION;
    }


    while (this.queue.length) {
      const current = <JugState>this.queue.shift();

      const nextStates = [
        this.fillJug(current, 'small'),
        this.fillJug(current, 'large'),
        this.emptyJug(current, 'small'),
        this.emptyJug(current, 'large'),
        this.transfer(current, 'small'),
        this.transfer(current, 'large')
      ];


      for (let state of nextStates) {

        const seen = this.tree.has(state.simple);

        if (!seen) {
          this.addEdge(current.simple, state.simple);
          this.buildPathForState(current, state);
          this.queue.push(state);
        }
        if (this.stateHasGoal(state)) {
          return this.pathList.find((path) => path.at(-1)?.simple === state.simple) as JugState[];
        }

      }
    }
    return NO_SOLUTION;
  }
}
