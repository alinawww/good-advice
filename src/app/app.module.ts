import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomAdviceComponent } from './random-advice/random-advice.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GenresSelectionComponent } from './search-movies/genres-selection/genres-selection.component';
import {NouisliderModule} from 'ng2-nouislider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    RandomAdviceComponent,
    SearchMoviesComponent,
    GenresSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NouisliderModule
  ],
  entryComponents: [
    GenresSelectionComponent
  ],
  exports: [
    NouisliderModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
