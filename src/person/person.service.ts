import { Injectable, BadRequestException } from '@nestjs/common';
import { Person } from './person.interface';
import { Gender } from './gender.type';
import { LAST_NAMES } from './family-names.const';
import { FIRST_NAMES } from './first-names.const';
import { STREETS } from './streets.const';
import { CITY } from './city.const';

@Injectable()
export class PersonService {
  filteredFirstNames = {};

  public generatePersons(numberOfPersons = 100): any[] {
    if (numberOfPersons > 200) {
      throw new BadRequestException('Max 200');
    }
    const persons = [];
    for (let i = 0; i < numberOfPersons; i++) {
      const gender = this.getRandomGender();
      const birthdate = this.getRandomBirthdate();
      const firstName = this.getRandomFirstName(gender);
      const lastName = this.getRandomLastName();
      const newPerson = {
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        age: this.getAge(birthdate),
        email: this.getRandomEmail(firstName, lastName),
        address: this.getRandomAddress(),
        zip: this.getRandomZipcode(),
        city: this.getRandomCity(),
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
    const allFirstNames = FIRST_NAMES;
    if (!this.filteredFirstNames[gender]) {
      this.filteredFirstNames[gender] = allFirstNames.filter(
        firstName => firstName.gender === gender,
      );
    }
    const selectedNameObject = this.getRandomElementFromArray(
      this.filteredFirstNames[gender],
    );
    const selectedFirstName = selectedNameObject.name;
    return selectedFirstName;
  }

  private getRandomAddress(): string {
    const streetNames = STREETS;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const currentAddress =
      this.getRandomElementFromArray(streetNames) +
      ' ' +
      this.getRandomElementFromArray(numbers);
    return currentAddress;
  }

  private getRandomCity(): string {
    const allCities = CITY;
    return this.getRandomElementFromArray(allCities);
  }

  private getRandomEmail(firstName, lastName): string {
    const providerArray = [
      '@gmail.com',
      '@hotmail.com',
      '@live.com',
      '@outlook.com',
    ];
    const punctuations = ['-', '.', '_'];
    const emailAddress =
      firstName +
      this.getRandomElementFromArray(punctuations) +
      lastName.replace(/\s/g, '') +
      this.getRandomElementFromArray(providerArray);
    return emailAddress;
  }

  private getRandomZipcode(): string {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const alphabetArray = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    const currentZipCode =
      getRandomInt(1000, 1999) +
      ' ' +
      this.getRandomElementFromArray(alphabetArray) +
      this.getRandomElementFromArray(alphabetArray);
    return currentZipCode;
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
