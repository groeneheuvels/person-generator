import { PersonService } from './person.service';

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
});
