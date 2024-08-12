console.log('SINGLETON AS DESIGN PATTERN');

/**
 * * One instance of a class that avoids to have multiple instances and 
 * * Recommendable to use it when you want to have persistence in data or an object
 * * https://refactoring.guru/es/design-patterns/singleton/typescript/example#example-0
 */
class Singleton {

  // private static instance: Singleton;
  static #instance: Singleton;
  public random: number;

  constructor() {
    this.random = Math.random();

    // * Evaluate if exists an instace 
    if (Singleton.#instance) {
      return Singleton.#instance;
    }

    Singleton.#instance = this;
  }

  public get instance(): Singleton {
    if (!Singleton.#instance) {
      console.log('Instance not exists');
      Singleton.#instance = new Singleton();
    }
    console.log('Instance already exists');
    return Singleton.#instance;
  }
}

const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log(singleton1.random);
console.log(singleton2.random);
console.log(singleton1.instance);
console.log(singleton2.instance);

console.log(singleton1 === singleton2);

// * Second form to avoid to use "new" to instance a class
class Singleton2 {

  private static instance: Singleton;
  public random: number;

  private constructor() {
    this.random = Math.random();
  }

  public static getInstance(): Singleton {
    if (!this.instance) {
      console.log('Instance not exists');
      this.instance = new Singleton();
    }
    console.log('Instance already exists');
    return this.instance;
  }
}

// const singleton2s = new Singleton2();
const singleton2Form1 = Singleton2.getInstance();
const singleton2Form2 = Singleton2.getInstance();

console.log(singleton2Form1.random);
console.log(singleton2Form2.random);
console.log(singleton2Form1 === singleton2Form2);

