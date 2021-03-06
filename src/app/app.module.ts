import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormElementComponent } from './form-element/form-element.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormPreviewElementComponent } from './form-preview-element/form-preview-element.component';
import { ResultFormComponent } from './result-form/result-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormElementComponent,
    FormGeneratorComponent,
    FormPreviewComponent,
    FormPreviewElementComponent,
    ResultFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
