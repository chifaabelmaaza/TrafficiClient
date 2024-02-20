import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';


import { HttpClientModule } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { HomeComponent } from './Pages/home/home.component';
import { BannerComponent } from './component/banner/banner.component';
import { BookTaxiComponent } from './Pages/book-taxi/book-taxi.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { HeaderComponent } from './utils/header/header.component';
import { FooterComponent } from './utils/footer/footer.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { SignupdriverComponent } from './Pages/signupdriver/signupdriver.component';
import { LoginComponent } from './Pages/login/login.component';
import { AlertComponent } from './component/alert/alert.component';
import { BookBusComponent } from './Pages/book-bus/book-bus.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    BannerComponent,
    BookTaxiComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    SignupComponent,
    SignupdriverComponent,
    LoginComponent,
    AlertComponent,
    BookBusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
