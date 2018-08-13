import { TestBed, inject } from '@angular/core/testing';

import { FormPreviewElementService } from './form-preview-element.service';

describe('FormPreviewElementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormPreviewElementService]
    });
  });

  it('should be created', inject([FormPreviewElementService], (service: FormPreviewElementService) => {
    expect(service).toBeTruthy();
  }));
});
