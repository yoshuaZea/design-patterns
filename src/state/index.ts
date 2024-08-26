/**
 * * State pattern allows to have a "state" and based on its value has a different behavior
 * * It must have an interface so that all states have same signature
 */

interface IState {
  add(ticket: Ticket, quantity: number): void;
  next(ticket: Ticket): number | null;
}

class Ticket {
  private state: IState;
  quantity: number;
  readonly limit: number;
  private number: number;

  constructor(limit: number) {
    this.limit = limit;
    this.quantity = 0;
    this.number = 0;
    this.state = new EmptyState();
  }

  get getNumber(): number {
    return this.number++;
  }

  get getState() {
    return this.state;
  }

  set setState(state: IState) {
    this.state = state;
  }

  next(): number | null {
    return this.state.next(this);
  }

  add(quantity: number): void {
    return this.state.add(this, quantity);
  }
}

class EmptyState implements IState {
  add(ticket: Ticket, quantity: number): void {
    if (quantity < ticket.limit) {
      ticket.quantity = quantity;
      ticket.setState = new WithDataState();
    } else if (quantity === ticket.limit) {
      ticket.quantity = quantity;
      ticket.setState = new FullState();
    }
  }

  next(ticket: Ticket): number | null {
    return null;
  }
}

class WithDataState implements IState {
  add(ticket: Ticket, quantity: number): void {
    if ((ticket.quantity + quantity) < ticket.limit) {
      ticket.quantity += quantity;
    } else if ((ticket.quantity + quantity) === ticket.limit) {
      ticket.quantity += quantity;
      ticket.setState = new FullState();
    }
  }

  next(ticket: Ticket): number | null {
    ticket.quantity--;

    if (ticket.quantity <= 0) {
      ticket.setState = new EmptyState();
    }

    return ticket.getNumber;
  }
}

class FullState implements IState {
  add(ticket: Ticket, quantity: number): void {
    console.log(`Ticket is full quantity: (${ticket.quantity}) limit: (${ticket.limit})`);
  }

  next(ticket: Ticket): number | null {
    ticket.quantity--;

    if (ticket.quantity <= 0) {
      ticket.setState = new EmptyState();
    } else {
      ticket.setState = new WithDataState();
    }

    return ticket.getNumber;
  }
}

// * Execution
const ticket = new Ticket(5);
console.log(ticket.getState);
console.log(ticket.next());

ticket.add(6) // It is not allowed
console.log(ticket);
console.log(ticket.next());

ticket.add(4) // One is remaining 
console.log(ticket);
console.log(ticket.next());
console.log(ticket.next());
console.log(ticket);

ticket.add(3); // 
console.log(ticket);
ticket.add(1);

