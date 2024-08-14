/**
 * * A group of observers suscribed to a subject to notify when something subject has changed its state
 * * Subject state is part of the class that can change and refresh the observers that are suscribed
 */
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

const subject = new Subject();
const observer1 = new Observer((data) => console.log('I am observer #1', data));
const observer2 = new Observer((data) => {
  const div1 = document.querySelector('#div1');
  div1.innerHTML = data;
});
const observer3 = new Observer((data) => {
  const div2 = document.querySelector('#div2');
  div2.innerHTML = data.split('').reverse().join('');
});

// * Notify when there is a change
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

function handleChange() {
  subject.notify(document.querySelector('#myinput')?.value || '');
}