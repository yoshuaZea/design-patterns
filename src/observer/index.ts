/**
 * * A group of observers suscribed to a Subject to notify when something in the Subject has changed its state
 * * Subject state is part of the class that can change and refresh the observers that are suscribed
 * * It is similar like web sockets works
 * * This design pattern requires these properties: observers as an array and suscribe, unsuscribe, and notify methods.
 */
interface IObserver<T> {
  refresh(value: T): void;
}

interface ISubject<T> {
  observers: IObserver<T>[];
  suscribe(observer: IObserver<T>): void;
  unsuscribe(observer: IObserver<T>): void;
  notify(value: T): void;
}

class Subject<T> implements ISubject<T> {
  public observers: IObserver<T>[];

  constructor() {
    this.observers = [];
  }

  suscribe(observer: IObserver<T>) {
    this.observers.push(observer);
  }

  unsuscribe(observer: IObserver<T>) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(value: T): void {
    this.observers.forEach((observer) => {
      observer.refresh(value);
    });
  }
}

class Observer<T> implements IObserver<T> {
  private fn: (value: T) => void;

  constructor(fn: (value: T) => void) {
    this.fn = fn;
  }

  refresh(value: T): void {
    this.fn(value);
  }
}

// * Process
const subject = new Subject<number>();
const obserer1 = new Observer<number>((n) => {
  console.log('Observer #1 is running', n);
});
const obserer2 = new Observer<number>((n) => {
  console.log('Observer #2 is running', n);
});

subject.suscribe(obserer1);
subject.suscribe(obserer2);
subject.notify(10);
subject.notify(24);

const subjectString = new Subject<string>();
const obsererString1 = new Observer<string>((n) => {
  console.log('Observer #1 is running', n.toLocaleUpperCase());
});
const obsererString2 = new Observer<string>((n) => {
  console.log('Observer #2 is running', n.toLocaleLowerCase());
});

subjectString.suscribe(obsererString1);
subjectString.suscribe(obsererString2);
subjectString.notify('job');
subjectString.notify('ZEA');