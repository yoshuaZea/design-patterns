class Hero {
  constructor(name, superhero, skills, publisher) {
    this.name = name;
    this.superhero = superhero;
    this.skills = skills;
    this.publisher = publisher;
  }

  getName() {
    return `My name is ${this.name}`;
  }
}

class HeroBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.name = '';
    this.superhero = '';
    this.skills = [];
    this.publisher = '';
  }

  setName(name) {
    this.name = name;
    return this; // * By doing this you can chain methods
  }

  setSuperHero(superhero) {
    this.superhero = superhero;
    return this; // * By doing this you can chain methods
  }

  setPublisher(publisher) {
    this.publisher = publisher;
    return this; // * By doing this you can chain methods
  }

  addSkills(skill) {
    this.skills.push(skill);
    return this; // * By doing this you can chain methods
  }

  build() {
    const hero = new Hero(
      this.name,
      this.superhero,
      this.skills,
      this.publisher,
    );

    this.reset();

    return hero;
  }
}

// * Execution
const heroBuilder = new HeroBuilder();
const flash = heroBuilder.setName('Barry Allen')
  .setSuperHero('Flash')
  .addSkills('Run super fast')
  .addSkills('Travel in time')
  .setPublisher('DC Comics')
  .build();

console.log(flash);

const ironMan = heroBuilder.setName('Tony Stark')
  .setSuperHero('Iron man')
  .setPublisher('Marvel Comics')
  .build();

console.log(ironMan);



