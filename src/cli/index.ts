#!/usr/bin/env node
import { Command, CommanderError } from 'commander';
import { parseIntValue } from '../utils';
import { WaterJugSolver } from '../water-jug-solver';

const chalk = require('chalk');

// COLORS
const yellow = chalk.yellow;
const green = chalk.green;
const error = chalk.bgRed.bold.black;
const bBlue = chalk.bold.blue;

const program = new Command();

program
  .name('water-jug-solver')
  .description('CLI to solve bucket problem')
  // Assert that is a string since we added package.json version for sure.
  .version(<string>process.env.npm_package_version);

const pad = (str: string, length: number, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);

program
  .description('Water Jug Solver')
  .argument('<xGallon>', 'xGallon capacity', parseIntValue)
  .argument('<yGallon>', 'yGallon capacity', parseIntValue)
  .argument('<zGallon>', 'zGallon desired water amount', parseIntValue)
  .action(onAction);


function onAction(xGallon: number, yGallon: number, zGallon: number) {
  const waterJugSolver = new WaterJugSolver(xGallon, yGallon, zGallon);
  const [small, large] = [xGallon, yGallon].sort((a, b) => a - b);
  const solution = waterJugSolver.solve();

  console.log(`Solving for: ${bBlue(zGallon)} gallons with:
  - ${yellow('Small Bucket')}: ${yellow.bold(small)} gal
  - ${green('Large Bucket')}: ${green.bold(large)} gal`);


  if (typeof solution === 'string') {
    console.log(`
${chalk.cyan('Result:')}`);
    console.log(`  - ${chalk.bgGrey.red(solution)}`);
  } else {
    console.log(`
${chalk.cyan('Steps')}:`);
    solution.forEach((jugState, index) => {
      const smallValue = jugState.jugs[0].value;
      const largeValue = jugState.jugs[1].value;

      if (index !== solution.length - 1) {
        console.log(`  ${index + 1}- ${chalk.cyan(jugState.action.padEnd(15))}=> ${yellow('Small')}: ${yellow(smallValue)} ${green('Large')}: ${green(largeValue)}`);
      } else {
        const highlight = chalk.bgGray.bold.blue;
        const smallColor = zGallon === smallValue ? highlight : (zGallon === smallValue + largeValue ? highlight : yellow);
        const largeColor = zGallon === largeValue ? highlight : (zGallon === smallValue + largeValue ? highlight : green);
        console.log(`  ${index + 1}- ${chalk.cyan(jugState.action.padEnd(15))}=> ${yellow('Small')}: ${smallColor(smallValue)} ${green('Large')}: ${largeColor(largeValue)}`);
      }
    });
  }

}


const title = `===${pad('Water Jug Solver', 32)}===\n`;
const end = `===${pad('End', 32)}===`;
console.log(`${chalk.bgMagenta.bold.black(title)}`);
try {
  program.exitOverride().configureOutput({
    outputError: () => {
    }
  });
  program.parse();
} catch (e) {
  if (e instanceof CommanderError) {
    console.log(error(`${e.message}`));
  } else {
    console.log(error(`error: ${(<Error>e).message}`));
  }
}
console.log(`\n${chalk.bgMagenta.bold.black(end)}`);
