
/**
 * * Strategy patterns is compose by a context, strategies and interface
 * * Run logic such as calculations or actions
 * * Allows to scale up your application without using complex solutions
 */

// * 1. Create your interface
interface Strategy {
  login(user: string, password: string): boolean;
}

// * 2. Create your context 
class LoginContext {
  constructor(
    private strategy: Strategy,
  ) {};

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  login(user: string, password: string): boolean {
    return this.strategy.login(user, password);
  }
}

// * 3. Strategies
class LoginDBStrategy implements Strategy {
  login(user: string, password: string): boolean {
    if (user === 'jobzea' && password === '123123') {
      console.log('User authenticated by DB');
      return true;
    }
    console.log('User authenticated by DB');
    return false;
  }
}

// * 3. Strategies
class LoginServiceStrategy implements Strategy {
  login(user: string, password: string): boolean {
    if (user === 'jobzea' && password === '123123') {
      console.log('User authenticated');
      return true;
    }
    console.log('User not authenticated');
    return false;
  }
}

const auth = new LoginContext(new LoginDBStrategy());
auth.login('jobzea', '123123');

auth.setStrategy(new LoginServiceStrategy());
auth.login('admin', '123123');