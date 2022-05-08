import { WaterJugSolver } from './water-jug-solver';
import { NO_SOLUTION } from '../constants';

describe('Water Jug Solver', () => {
  test('Solves for 3, 5, 4', () => {
    // expect(sum(1, 2)).toBe(3);

    const waterJugSolver = new WaterJugSolver(3, 5, 4);
    const solution = waterJugSolver.solve();

    expect(solution.stringList).toStrictEqual(['0,0', '0,5', '3,2', '0,2', '2,0', '2,5', '3,4']);

  });

  test('Solves for 3, 5, 2', () => {

    const waterJugSolver = new WaterJugSolver(3, 5, 2);
    const solution = waterJugSolver.solve();

    expect(solution.stringList).toStrictEqual(['0,0', '0,5', '3,2']);

  });

  test('Solves for 3, 100, 8, by ending with small jug with 3 and large with 5, making it 8', () => {
    const waterJugSolver = new WaterJugSolver(3, 100, 8);
    const solution = waterJugSolver.solve();

    expect(solution.stringList).toStrictEqual([
      '0,0', '3,0', '0,3', '3,3', '0,6', '3,6',
      '0,9', '3,9', '0,12', '3,12', '0,15', '3,15',
      '0,18', '3,18', '0,21', '3,21', '0,24', '3,24',
      '0,27', '3,27', '0,30', '3,30', '0,33', '3,33',
      '0,36', '3,36', '0,39', '3,39', '0,42', '3,42',
      '0,45', '3,45', '0,48', '3,48', '0,51', '3,51',
      '0,54', '3,54', '0,57', '3,57', '0,60', '3,60',
      '0,63', '3,63', '0,66', '3,66', '0,69', '3,69',
      '0,72', '3,72', '0,75', '3,75', '0,78', '3,78',
      '0,81', '3,81', '0,84', '3,84', '0,87', '3,87',
      '0,90', '3,90', '0,93', '3,93', '0,96', '3,96',
      '0,99', '3,99', '2,100', '2,0', '0,2', '3,2',
      '0,5', '3,5'
    ]);

  });


  test('Fails for 3, 5, 10, reason 10>3+5', () => {

    const waterJugSolver = new WaterJugSolver(3, 5, 10);
    const solution = waterJugSolver.solve();

    expect(solution.stringList).toStrictEqual(NO_SOLUTION);

  });

  test('Fails for 6, 20, 13, reason result can not be odd while jugs are even', () => {

    const waterJugSolver = new WaterJugSolver(6, 20, 13);
    const solution = waterJugSolver.solve();

    expect(solution.stringList).toStrictEqual(NO_SOLUTION);

  });

});
