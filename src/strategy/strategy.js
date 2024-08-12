/**
 * * Strategy patterns is compose by a context, strategies and interface
 * * Run logic such as calculations or actions
 * * Allows to scale up your application without using complex solutions
 */
class SaleContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(amount) {
    return this.strategy.calculate(amount);
  }
}

class RegularSalesStrategy {
  constructor(tax) {
    this.tax = tax;
  }

  calculate(amount) {
    return amount + (amount * this.tax);
  }
}

class DiscountSaleStrategy {
  constructor(tax, discount) {
    this.tax = tax;
    this.discount = discount;
  }

  calculate(amount) {
    return amount + (amount * this.tax) - this.discount;
  }
}

class ForeignSaleStrategy {
  calculate(amount) {
    return amount * this.getDollarPrice();
  }

  getDollarPrice() {
    return 20;
  }
}

const regularSale = new RegularSalesStrategy(0.16);
const discountSale = new DiscountSaleStrategy(0.16, 15);
const foreignSale = new ForeignSaleStrategy();

// * With regular sale strategy
const sale = new SaleContext(regularSale);
console.log(sale.calculate(100));

// * With discount sale strategy
sale.setStrategy(discountSale);
console.log(sale.calculate(100));

// * With foreign sale strategy
sale.setStrategy(foreignSale);
console.log(sale.calculate(100));



// ------------------------------------------------- EXAMPLE
const cats = [
  {
    name: 'Ramón',
    color: 'brown',
    image: 'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
  },
  {
    name: 'Wichita',
    color: 'black & white',
    image: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=1280&h=853',
  },
  {
    name: 'Macli',
    color: 'orange',
    image: 'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
  },
];

class InfoContext {
  constructor(strategy, data, element) {
    this.setStrategy(strategy);
    this.data = data;
    this.element = element;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  show() {
    this.strategy.show(this.data, this.element);
  }
}

class ListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((acc, cat) => {
      return acc += `
        <div>
          <h2>${cat.name}</h2>
        </div>
        <hr />
      `;
    }, '');
  }
}

class DetailedListStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((acc, cat) => {
      return acc += `
        <div>
          <h2>${cat.name}</h2>
          <p>Color: ${cat.color}</P>
        </div>
        <hr />
      `;
    }, '');
  }
}

class WithImageStrategy {
  show(data, element) {
    element.innerHTML = data.reduce((acc, cat) => {
      return acc += `
        <div>
          <h2>${cat.name}</h2>
          <p>Color: ${cat.color}</P>
          <img src="${cat.image}"  alt="${cat.name}" width="15%" />
        </div>
        <hr />
      `;
    }, '');
  }
}

const strategies = [
  new ListStrategy(),
  new DetailedListStrategy(),
  new WithImageStrategy(),
]

// List
const info = new InfoContext(new ListStrategy(), cats, document.querySelector('#content'));
info.show();

const selectCats = document.querySelector('#cats-select');
selectCats.addEventListener('change', (event) => {
  const option = event.target.value;

  info.setStrategy(strategies[option]);
  info.show();
});