// * HOF
function add(a: number, b:number): number {
  return a + b;
}

const result = add(10, 20);
console.log(result)

function operation(fn: Function, a: number, b: number) {
  console.log('Do something...');
  console.log(fn(a, b));
}

operation(add, 30, 40);

// * ARROW FUNCTION
const minus = (a: number, b: number) => a - b;
console.log(minus(100, 10));

// * FOREACH - INMUTABLE
const names: string[] = ['Job', 'Yoshua', 'Lore', 'Meli'];
names.forEach((name) => console.log(name));
names.forEach((name) => console.log(name.toUpperCase()));
console.log(names); // ? It does not change its values after running a foreach
names.sort();
console.log(names);

// * MAP
const namesUpper = names.map((name) => name.toLocaleUpperCase());
console.log({ namesUpper });

// * REDUCE
const numbers: number[] = [1, 2, 3, 4, 5];
const total = numbers.reduce((acc, number) => acc *= number, 1);
console.log({ total });

// * POO
class Drink {
  constructor(
    public name: string,
  ) {}

  public info(): string {
    return `The drink is a ${this.name}`;
  }
}

const beer = new Drink('beer');
console.log(beer.info());

// function Drink2(this: any, name: string) {
//   this.name = name;
//   this.info = function() {
//     return `The drink is a ${name}`; 
//   }
// }

// const whiskey = Drink2('whiskey');
// console.log(whiskey);

// * INHERITANCE
class Alcohol extends Drink implements Product {
  
  constructor(
    public name: string,
    public alcoholLevel: number,
    public price: number,
  ) {
    super(name);
    this.alcoholLevel = alcoholLevel;
  }

  public info(): string {
    return `This is a alcoholic drink called ${this.name} with ${this.alcoholLevel}%`;
  }

  public getPrice(): string {
    return `$ ${this.price}`;
  }
}

const whiskey = new Alcohol('whiskey', 40, 399);
console.log(whiskey.info());
console.log(whiskey.getPrice());

interface Product {
  price: number;
  getPrice(): string;
}

const products: Product[] = [
  new Alcohol('Cognan', 70, 1200),
  new Alcohol('Beer', 15.5, 4.5),
  new Alcohol('Whiskey', 40, 699),
];

console.log({ products });