class WeekDays {

  static instance: any;

  public daysEs = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  public daysEn = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  constructor(
    public lang: string,
  ) {
    if (WeekDays.instance) {
      return WeekDays.instance;
    }

    WeekDays.instance = this;
  }

  public getDays() {
    return this.lang === 'es' ? this.daysEs : this.daysEn;
  }
}

const weekDays1 = new WeekDays('es');
// * It does not matter whether you pass the argument required because it already exists an instance
const weekDays2 = new WeekDays('en'); 

console.log(weekDays1.getDays());
console.log(weekDays2.getDays());
console.log(weekDays1 === weekDays2);