#!/usr/bin/env node
import { Command } from 'commander';
import { parseIntValue } from '../utils';
import { WaterJugSolver } from '../water-jug-solver';


const program = new Command();

program
  .name('water-jug-solver')
  .description('CLI to solve bucket problem')
  // Assert that is a string since we added package.json version for sure.
  .version(<string>process.env.npm_package_version);

program
  .description('Water Jug Riddle')
  .argument('<xGallon>', 'xGallon capacity', parseIntValue)
  .argument('<yGallon>', 'yGallon capacity', parseIntValue)
  .argument('<zGallon>', 'zGallon desired water amount', parseIntValue)
  .action((xGallon, yGallon, zGallon, options) => {

    const waterJugSolver = new WaterJugSolver(xGallon, yGallon, zGallon);
    console.log(waterJugSolver.solve());
  });

try {
  program.parse();
} catch (e) {
  if (e instanceof Error) {
    console.log(`error: ${e.message}`);
  }
}

