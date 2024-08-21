// * Component
class ProductComponent {
  constructor(name) {
    this.name = name;
  }

  getDetail() {
    return `${this.name}`;
  }
}

// * Decorator
class ProductDecorator {
  constructor(productComponent) {
    this.productComponent = productComponent; // * This envolve
  }

  getDetail() {
    return this.productComponent.getDetail();
  }
}

class ComercialInfoProductDecorator extends ProductDecorator {
  constructor(productComponent, tradeName, brand) {
    super(productComponent);
    this.tradeName = tradeName;
    this.brand = brand;
  }

  getDetail() {
    return `${this.tradeName} ${this.brand} ${super.getDetail()}`;
  }
}

class StoreProductDecorator extends ProductDecorator {
  constructor(productComponent, price) {
    super(productComponent);
    this.price = price;
  }

  getDetail() {
    return `$ ${this.price} ${super.getDetail()}`;
  }
}

class HTMLProductDecorator extends ProductDecorator {
  getDetail() {
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

// * Decorator with component
const comercialInfoProduct = new ComercialInfoProductDecorator(productComponent, 'Amstel', 'Michelob');
console.log(comercialInfoProduct.getDetail());

// * Decorator with component
const storeProduct = new StoreProductDecorator(productComponent, 19.90);
console.log(storeProduct.getDetail());

// * Decorator with another decorator
const product = new StoreProductDecorator(comercialInfoProduct, 25.90);
console.log(product.getDetail());

// * Decorator with another decorator
const htmlProduct = new HTMLProductDecorator(product);
document.querySelector('#legend').innerHTML = htmlProduct.getDetail();