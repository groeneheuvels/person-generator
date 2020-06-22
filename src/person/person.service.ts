import { Injectable, BadRequestException } from '@nestjs/common';
import { Person } from './person.interface';
import { Gender } from './gender.type';
import { LAST_NAMES } from './family-names.const';

@Injectable()
export class PersonService {
  public generatePersons(numberOfPersons = 5): any[] {
    if (numberOfPersons > 200) {
      throw new BadRequestException('Max 200');
    }
    const persons = [];
    for (let i = 0; i < numberOfPersons; i++) {
      const gender = this.getRandomGender();
      const birthdate = this.getRandomBirthdate();
      const newPerson = {
        firstName: this.getRandomFirstName(gender),
        lastName: this.getRandomLastName(),
        birthdate: birthdate,
        age: this.getAge(birthdate),
        gender: gender,
      };

      persons.push(newPerson);
    }
    console.log('persons:', persons);
    return persons;
  }

  private getRandomElementFromArray(array: any[]) {
    const element = array[Math.floor(Math.random() * array.length)];
    return element;
  }

  private getRandomGender(): Gender {
    const genders: Gender[] = ['female', 'male'];
    return this.getRandomElementFromArray(genders);
  }

  private getRandomLastName(): string {
    const allNames = LAST_NAMES;
    return this.getRandomElementFromArray(allNames);
  }

  private getRandomFirstName(gender: Gender): string {
    return;
  }

  private getRandomAddress(): string {
    return;
  }

  private randomDate(date1: Date, date2: Date) {
    function randomValueBetween(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    return new Date(randomValueBetween(date2.getTime(), date1.getTime()));
  }

  private getRandomBirthdate(): Date {
    const now = new Date();
    const hundredYearsAgo = new Date(now.getFullYear() - 100, now.getMonth());
    return this.randomDate(now, hundredYearsAgo);
  }

  private getAge(birthdate: Date): number {
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
