class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((e) => {
      e.refresh(data);
    });
  }
}

class Observer {
  constructor(fn) {
    this.fn = fn;
  }

  refresh(data) {
    this.fn(data);
  }
}

class ItemsSubject extends Subject {
  constructor() {
    super();
    this.data = [];
  }

  add(item) {
    this.data.push(item);
    this.notify(this.data);
  }

  remove(removeItem) {
    this.data.filter((item) => item !== removeItem);
  }
}

class HTMLElementObserver {
  constructor(element) {
    this.element = element;
  }

  refresh(data) {
    this.element.innerHTML = data.reduce((acc, element) => acc += `<p>${element}</p>`, '');
  }
}

const items = new ItemsSubject();
const divObserver1 = new HTMLElementObserver(document.querySelector('#div1'));
const divObserver2 = new HTMLElementObserver(document.querySelector('#div2'));
const observer1 = new Observer((data) => {
  const div3 = document.querySelector('#div3');
  div3.innerHTML = data.length;
});

items.subscribe(divObserver1);
items.subscribe(divObserver2);
items.subscribe(observer1);

function add() {
  const name = document.querySelector('#name')?.value || '';
  items.add(name);
}