/**
 * * Add functionality to an object or class
 * * Wrapping functionality with another one (multiple decorator)
 * * Resolve the problem with heritance in classes
 * * Decorator are endless, you can wrap whichever between them
 * * Open & Closed Principle Solid
 */

interface Component {
  getDetail(): string;
}

class ProductComponent implements Component {

  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public getDetail(): string {
    return `${this.name}`;
  }
}

// * To wrap a component
abstract class ProductDecorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  getDetail(): string {
    return this.component.getDetail();
  }
}

// * Decorator 1
class ComercialInfoProductDecorator extends ProductDecorator {
  private tradeName: string;
  private brand: string;

  constructor(component: Component, tradeName: string, brand: string) {
    super(component);
    this.tradeName = tradeName;
    this.brand = brand;
  }

  getDetail(): string {
    return `${this.tradeName} ${this.brand} ${super.getDetail()}`;
  }
}

// * Decorator 2
class StoreProductDecorator extends ProductDecorator {
  private price: number;
  constructor(component: Component, price: number) {
    super(component);
    this.price = price;
  }

  getDetail(): string {
    return `${super.getDetail()} ${this.price}`;
  }
}

// * Decorator 3
class HTMLProductDecorator extends ProductDecorator {
  getDetail(): string {
    return `
      <h1>Product details</h1>
      <p>
        ${super.getDetail()}
      </p>
    `; 
  }
}

// * Execution
const productComponent = new ProductComponent('Beer');
console.log(productComponent.getDetail());
// ? Beer

// * Decorator 1
const comercialInfoProduct = new ComercialInfoProductDecorator(productComponent, 'Amstel', 'Michelob');
console.log(comercialInfoProduct.getDetail());
// ? Amstel Michelob Beer

// * Decorator 2
const storeProduct = new StoreProductDecorator(productComponent, 18.50);
console.log(storeProduct.getDetail());

// * Wrap Decorator 2 with Decorator 1
const wrappedDecorator = new StoreProductDecorator(comercialInfoProduct, 12.50);
console.log(wrappedDecorator.getDetail());

// * Wrap Decorator 3 with Decorator 2 with decorator 1
console.log(new HTMLProductDecorator(wrappedDecorator).getDetail());
