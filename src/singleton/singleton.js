console.log('Singleton as design pattern');

// * One instance of a class

class Singleton {

  constructor() {
    // * Evaluate if exists an instace 
    if (Singleton.instance) {
      return Singleton.instace;
    }

    Singleton.instace = this;
  }
}

