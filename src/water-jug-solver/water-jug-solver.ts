import { NO_SOLUTION } from '../constants';
import { dangerousDeepClone, isEven, isOdd } from '../utils';


interface Jug {
  value: number;
  readonly capacity: number;
  readonly name: 'small' | 'large';
}

type JugState = [Jug, Jug];


export class WaterJugSolver {
  queue: JugState[] = [];
  tree = new Map();
  pathList: Array<string[]> = [];

  constructor(readonly xGallon: number, readonly yGallon: number, readonly zGallon: number) {
    const [small, large] = [this.xGallon, this.yGallon].sort((a, b) => a - b);
    const start: JugState = [
      { value: 0, capacity: small, name: 'small' },
      { value: 0, capacity: large, name: 'large' }
    ];
    this.queue.push(start);
    this.addNode(this.getUniqueStringOutOfState(start));
    this.pathList.push([this.getUniqueStringOutOfState(start)]);
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
    return dangerousDeepClone(state).map((jug: Jug) => {
      if (jug.name === target) {
        jug.value = 0;
      }
      return jug;
    });
  }

  fillJug(state: JugState, target: Jug['name']): JugState {
    return dangerousDeepClone(state).map((jug: Jug) => {
      if (jug.name === target) {
        jug.value = jug.capacity;
      }
      return jug;
    });
  }

  transfer(state: JugState, target: Jug['name']): JugState {
    const [small, large] = dangerousDeepClone(state);
    let from, to;
    if (small.name === target) {
      from = small;
      to = large;
    } else {
      from = large;
      to = small;
    }

    const toAvailability = to.capacity - to.value;

    to.value = Math.min(to.value + from.value, to.capacity);
    from.value = Math.max(from.value - toAvailability, 0);

    return [small, large];
  }

  getUniqueStringOutOfState(state: JugState) {
    return `${state[0].value},${state[1].value}`;
  }

  buildPathForState(parent: JugState, child: JugState) {

    const parentString = this.getUniqueStringOutOfState(parent);
    const childString = this.getUniqueStringOutOfState(child);
    const found = this.pathList.find((path) => {
      const lastIndex = path.at(-1);
      return lastIndex === parentString;
    });

    if (found) {
      found.push(childString);
    } else {

      const foundSecondFromLast = this.pathList.find((path) => {
        const lastIndex = path.at(-2);
        return lastIndex === parentString;
      });
      if (foundSecondFromLast) {
        this.pathList.push([...foundSecondFromLast.slice(0, -1), childString]);
      } else {
        this.pathList.push([parentString, childString]);
      }
    }
  }

  // Basically if any of the jugs is equal to the desired amount or the combination of both problem is solved.
  stateHasGoal(state: JugState): boolean {
    const small = state[0].value;
    const large = state[1].value;
    return [small, large].includes(this.zGallon)
      || small + large === this.zGallon;

  }


  solve() {
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

        const parentNode = this.getUniqueStringOutOfState(current);
        const node = this.getUniqueStringOutOfState(state);

        const seen = this.tree.has(node);

        if (!seen) {
          this.addEdge(parentNode, node);
          this.buildPathForState(current, state);
          if (this.stateHasGoal(state)) {
            return this.pathList.find((path) => path.at(-1) === node);
          }
          this.queue.push(state);
        }

      }
    }
    return NO_SOLUTION;
  }

}
