#!/usr/bin/env node
import { Command } from 'commander';
import { parseIntValue } from '../utils';
import { WaterJugSolver } from '../water-jug-solver';

const chalk = require('chalk');


const program = new Command();

program
  .name('water-jug-solver')
  .description('CLI to solve bucket problem')
  // Assert that is a string since we added package.json version for sure.
  .version(<string>process.env.npm_package_version);

const pad = (str: string, length: number, char = ' ') =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);

program
  .description('Water Jug Riddle')
  .argument('<xGallon>', 'xGallon capacity', parseIntValue)
  .argument('<yGallon>', 'yGallon capacity', parseIntValue)
  .argument('<zGallon>', 'zGallon desired water amount', parseIntValue)
  .action((xGallon, yGallon, zGallon, options) => {

    const waterJugSolver = new WaterJugSolver(xGallon, yGallon, zGallon);
    const [small, large] = [xGallon, yGallon].sort((a, b) => a - b);
    const solution = waterJugSolver.solve();

    const title = `===${pad('Water Jug Solver', 32)}===`;
    const end = `===${pad('End', 32)}===`;

    console.log(`${chalk.bgMagenta.bold.black(title)}
    
Solving for: ${chalk.bold.blue(zGallon)} gallons with:
  - ${chalk.yellow('Small Bucket')}: ${chalk.bold.yellow(small)} gal
  - ${chalk.green('Large Bucket')}: ${chalk.bold.green(large)} gal`);


    if (typeof solution === 'string') {
      console.log(`
${chalk.cyan('Result:')}`);
      console.log(`  - ${chalk.bgGrey.red(solution)}`);
    } else {
      console.log(`
${chalk.cyan('Steps:')}`);
      solution.forEach((jugState, index) => {
        if(index !== solution.length - 1) {
          console.log(`  ${index + 1}- ${chalk.cyan(jugState.action.padEnd(15))}=> ${chalk.yellow('Small')}: ${chalk.yellow.bold(jugState.jugs[0].value)} ${chalk.green('Large')}: ${chalk.green.bold(jugState.jugs[1].value)}`);
        } else {
          console.log(`  ${index + 1}- ${chalk.cyan(jugState.action.padEnd(15))}=> ${chalk.yellow('Small')}: ${chalk.yellow.bold(jugState.jugs[0].value)} ${chalk.green('Large')}: ${chalk.green.bold(jugState.jugs[1].value)}`);
        }
      });
    }

    console.log(`\n${chalk.bgMagenta.bold.black(end)}`);
  });

try {
  program.parse();
} catch (e) {
  if (e instanceof Error) {
    console.log(`error: ${e.message}`);
  }
}

