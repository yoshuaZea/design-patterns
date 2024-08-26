class DocumentContext {
  constructor() {
    this.content = '';
    this.state = new BlankState();
  }

  setState(state) {
    this.state = state;
  }

  write(text) {
    this.state.write(this, text);
  }
}

class BlankState {
  write(documentContext, text) {
    documentContext.content = text;
    documentContext.setState(new WithContentState());
  }
}

class WithContentState {
  write(documentContext, text) {
    documentContext.content += ` ${text}`;
    documentContext.setState(new WithContentState());
  }
}

class ApprovedState {
  write(documentContext, text) {
    console.warn('Document has been approved and you cannot update it');
  }
}

// * Execution
const doc = new DocumentContext();
console.log(doc);

doc.write('cat');
console.log(doc.content);
console.log(doc);

doc.write('dog');
console.log(doc.content);
console.log(doc);

doc.setState(new ApprovedState());
console.log(doc);
doc.write('algo');