# Water Jug Solver
## Package to solve water jug problem and cli to execute it.

### Install
```shell
npm i @jcirizar/water-jug-solver
```

### Usage

#### CLI with node installed
Note: NPX will ask for confirmation to install the package, hit Enter or 'y'
```shell
npx @jcirizar/water-jug-solver 3 5 4
```

#### CLI with docker
Note: NPX will ask for confirmation to install the package, hit Enter or 'y'
```shell
docker run -it --rm node:alpine npx @jcirizar/water-jug-solver 3 5 4
```

#### In your code
```ts
import { WaterJugSolver } from '@jcirizar/water-jug-solver';

const solver = new WaterJugSolver(5, 3, 4);
console.log(solver.solve());
```
