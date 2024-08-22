/**
 * * This patterns is responsible to split constructor in chaining methods
 * * Invoke methods on demand
 * * Create objects without passing all required parameter in the constructor
 * * A Director knows how to build an object (step by step) and avoid repeted code
 */

interface HeroBuilder {
  name: string;
  superhero: string;
  skills: string[];
  publisher: string;
  setName(name: string): HeroBuilder;
  setSuperhero(superhero: string): HeroBuilder;
  addSkill(skill: string): HeroBuilder;
  setPublisher(publisher: string): HeroBuilder;
  build(): Hero;
  reset(): void;
}

class Hero {
  private name: string;
  private superhero: string;
  private skills: string[];
  private publisher: string;

  constructor(name: string, superhero: string, skills: string[], publisher: string) {
    this.name = name;
    this.superhero = superhero;
    this.skills = skills;
    this.publisher = publisher;
  }

  getName(): string {
    return `My name is ${this.name}`;
  }
}

class HeroBuilder implements HeroBuilder {
  name: string;
  superhero: string;
  skills: string[];
  publisher: string;

  constructor() {
    this.name = '';
    this.superhero = '';
    this.skills = [];
    this.publisher = '';
  }

  reset() {
    this.name = '';
    this.superhero = '';
    this.skills = [];
    this.publisher = '';
  }

  setName(name: string): HeroBuilder {
    this.name = name;
    return this; // * By doing this you can chain methods
  }

  setSuperHero(superhero: string): HeroBuilder {
    this.superhero = superhero;
    return this; // * By doing this you can chain methods
  }

  setPublisher(publisher: string): HeroBuilder {
    this.publisher = publisher;
    return this; // * By doing this you can chain methods
  }

  addSkill(skill: string): HeroBuilder {
    this.skills.push(skill);
    return this; // * By doing this you can chain methods
  }

  build(): Hero {
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

class HeroDirector {
  private heroBuilder: HeroBuilder;

  constructor(heroBuilder: HeroBuilder) {
    this.heroBuilder = heroBuilder;
  }

  setHeroBuilder(heroBuilder: HeroBuilder) {
    this.heroBuilder = heroBuilder;
  }

  createHero(name: string, superhero: string) {
    return this.heroBuilder
      .setName(name)
      .setSuperHero(superhero);
  }

}

// * Execution
const heroBuilder = new HeroBuilder();
const superman = heroBuilder.setName('Clark Kent')
  .setSuperHero('Superman')
  .addSkill('Strenght')
  .addSkill('Fly')
  .addSkill('Fast')
  .setPublisher('DC Comics')
  .build();

console.log(superman);

// * Director execution
const director = new HeroDirector(heroBuilder);
director.createHero('Bruce Wayne', 'Batman');
const batman = heroBuilder.build();
console.log(batman)

