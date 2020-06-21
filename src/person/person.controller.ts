import { Controller, Get, Param, Query } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}
  @Get()
  generatePersons(@Query('count') count: number) {
    return { persons: this.personService.generatePersons(count) };
  }
}
