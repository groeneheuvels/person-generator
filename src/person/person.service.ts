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
      const newPerson = { lastName: this.getRandomLastName() };
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
    return 'female';
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

  private getRandomBirthdate(): Date {
    return;
  }

  private getAge(birthdate: Date): number {
    return;
  }
}
