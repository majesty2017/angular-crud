/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AngularCrudService } from './angular-crud.service';

describe('Service: AngularCrud', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularCrudService]
    });
  });

  it('should ...', inject([AngularCrudService], (service: AngularCrudService) => {
    expect(service).toBeTruthy();
  }));
});
