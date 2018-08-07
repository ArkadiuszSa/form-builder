import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormGeneratorComponent } from './form-generator/form-generator.component'
import { FormPreviewComponent } from './form-preview/form-preview.component'
import { ResultFormComponent } from './result-form/result-form.component'
const routes: Routes = [
  {
    path:'',
    component: FormGeneratorComponent
  },
  {
    path: 'preview',
    component: FormPreviewComponent
  },
  {
    path: 'result',
    component: ResultFormComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
