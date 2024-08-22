class Form {
  constructor(controls, action) {
    this.controls = controls;
    this.action = action;
  }

  getContent() {
    return `<form method="post" action="${this.action}">
      ${
        this.controls.reduce((acc, control) => {
          return acc + `<div>
            ${this.getLabel(control)}
            ${this.getInput(control)}
          </div>`;
        }, '')
      }
      <button type="submit">Submit</button>
    </form>`;
  }

  getLabel(control) {
    return `<label>${control.text}</label>`;
  }

  getInput(control) {
    return `<input type="${control.type}"
      id="${control.name}"
      name="${control.name}"
    />`;
  }
}

class FormBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.action = '';
    this.controls = [];
  }

  setAction(action) {
    this.action = action;
    return this;
  }

  setText(name, text) {
    this.controls.push({
      name,
      text,
      type: 'text',
    });
    
    return this;
  }

  setEmail(name, text) {
    this.controls.push({
      name,
      text,
      type: 'email',
    });
    
    return this;
  }

  setCheckbox(name, text) {
    this.controls.push({
      name,
      text,
      type: 'checkbox',
    });
    
    return this;
  }

  build() {
    const form = new Form(this.controls, this.action);
    this.reset();
    return form;
  }
}

class FormDirector {
  constructor(formBuilder) {
    this.setBuilder(formBuilder);
  }

  setBuilder(formBuilder) {
    this.formBuilder = formBuilder;
  }

  createHeroForm() {
    this.formBuilder.reset();
    this.formBuilder.setText('name', 'Name')
      .setText('superhero', 'Super hero')
      .setText('publisher', 'Publisher');
  }
}

// * Execution
const formBuilder = new FormBuilder();
const formHero = formBuilder.setAction('/hero')
  .setText('name', 'Name')
  .setText('superhero', 'Super hero')
  .setCheckbox('isHero', 'Is a hero?')
  .build();

const form1 = document.querySelector('#form1');
form1.innerHTML = formHero.getContent();

// * Execution with Director
const formDirector = new FormDirector(formBuilder);
formDirector.createHeroForm();
const form2 = document.querySelector('#form2');
form2.innerHTML = formBuilder.build().getContent();