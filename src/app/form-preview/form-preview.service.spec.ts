import { TestBed, inject } from '@angular/core/testing';

import { FormPreviewService } from './form-preview.service';

describe('FormPreviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormPreviewService]
    });
  });

  it('should be created', inject([FormPreviewService], (service: FormPreviewService) => {
    expect(service).toBeTruthy();
  }));
});
