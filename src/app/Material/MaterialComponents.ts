import { MatButtonModule,MatSelectModule, MatCheckboxModule,MatOptionModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatOptionModule,MatSelectModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatOptionModule,MatSelectModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule],
})
export class MyOwnCustomMaterialModule { }