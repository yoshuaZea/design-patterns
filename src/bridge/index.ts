/**
 * * This patterns splits up the Abstraction (how it should work) and Implementor (the way it works for different purposes)
 * * Interface Abstraction is the mechanism and the Implementor is how it works
 * * Like an universal remote control, the abstraction is the buttons and interface and the Implementor is the actions for the same command on different brands
 */

interface IListImplementor {
  elements: number[];
  add(number: number): void;
  getElements(): number[];
}

interface DataAbstraction {
  implementor: IListImplementor;
  add(number: number): void;
  get(): number[];
  operation(fn: (n: number) => number): number[];
}

class OrderedList implements IListImplementor {
  elements: number[] = [];

  public add(number: number): void {
    this.elements.push(number);
    this.elements.sort();
  }
  
  public getElements(): number[] {
    return this.elements;
  }
}

class UniqueList implements IListImplementor {
  elements: number[] = [];

  public add(number: number): void {
    if (!this.elements.includes(number)) {
      this.elements.push(number);
    }
  }
  
  public getElements(): number[] {
    return this.elements;
  }
}

class DataRefinedAbstraction implements DataAbstraction {
  constructor(
    public implementor: IListImplementor,
  ) {}

  public add(number: number): void {
    this.implementor.add(number);
  }

  public get(): number[] {
    return this.implementor.getElements();
  }

  public operation(fn: (n: number) => number): number[] {
    return this.implementor.getElements().map(fn);
  }
}

// * Execution
const uniqueData = new DataRefinedAbstraction(new UniqueList());
const orderedData = new DataRefinedAbstraction(new OrderedList());

uniqueData.add(3);
uniqueData.add(3);
uniqueData.add(3);
uniqueData.add(1);
uniqueData.add(1);
uniqueData.add(2);
uniqueData.add(4);
uniqueData.add(4);
console.log(uniqueData.get());

orderedData.add(3);
orderedData.add(3);
orderedData.add(1);
orderedData.add(1);
orderedData.add(2);
orderedData.add(4);
orderedData.add(4);
console.log(orderedData.get());

const uniqueItems = uniqueData.operation((e: number) => e * 2);
console.log(uniqueItems)