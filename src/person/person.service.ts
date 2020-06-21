import { Injectable, BadRequestException } from '@nestjs/common';
import { Person } from './person.interface';
import { Gender } from './gender.type';

@Injectable()
export class PersonService {
  public generatePersons(numberOfPersons = 1): Person[] {
    if (numberOfPersons > 200) {
      throw new BadRequestException('Max 200');
    }
    const persons: Person[] = [];
    return persons;
  }

  private getRandomElementFromArray(array: any[]) {
    return;
  }

  private getRandomGender(): Gender {
    return 'female';
  }

  private getRandomLastName(): string {
    return;
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
