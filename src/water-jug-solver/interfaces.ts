export interface Jug {
  value: number;
  readonly capacity: number;
  readonly name: 'small' | 'large';
}

export interface JugState {
  action: string;
  simple: string;
  jugs: [Jug, Jug];
}
