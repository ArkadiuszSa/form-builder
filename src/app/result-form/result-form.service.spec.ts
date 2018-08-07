import { TestBed, inject } from '@angular/core/testing';

import { ResultFormService } from './result-form.service';

describe('ResultFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultFormService]
    });
  });

  it('should be created', inject([ResultFormService], (service: ResultFormService) => {
    expect(service).toBeTruthy();
  }));
});
