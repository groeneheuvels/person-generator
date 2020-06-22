import { PersonService } from './person.service';
import { LAST_NAMES } from './family-names.const';

describe('PersonService', () => {
  let personService: PersonService;

  beforeEach(async () => {
    personService = new PersonService();
  });

  it('should be defined', () => {
    expect(personService).toBeDefined();
  });

  it('should return an array', () => {
    expect(Array.isArray(personService.generatePersons(1))).toBe(true);
  });

  it('should return the correct number of persons', () => {
    expect(personService.generatePersons(100).length).toBe(100);
  });

  it('should return persons with a last name', () => {
    expect(
      LAST_NAMES.indexOf(personService.generatePersons()[0].lastName),
    ).toBeGreaterThan(-1);
  });
});
