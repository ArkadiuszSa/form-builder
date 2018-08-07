import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPreviewElementComponent } from './form-preview-element.component';

describe('FormPreviewElementComponent', () => {
  let component: FormPreviewElementComponent;
  let fixture: ComponentFixture<FormPreviewElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPreviewElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPreviewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
