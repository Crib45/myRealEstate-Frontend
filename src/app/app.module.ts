import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/navigation/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { RegistrationComponent } from './components/user-management/registration/registration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './components/user-management/login/login.component';
import { TelephoneInputComponent } from './components/user-management/telephone-input/telephone-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileEditComponent } from './components/user-management/profile-edit/profile-edit.component';
import { AuthHeadersInterceptor } from './services/auth-headers.interceptor';
import { SanitizerPipe } from './pipes/sanitizer.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { CategoryComponent } from './components/category/category.component';
import { UserAdvertsComponent } from './components/user-adverts/user-adverts.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    RegistrationComponent,
    LoginComponent,
    TelephoneInputComponent,
    HomeComponent,
    ProfileEditComponent,
    SanitizerPipe,
    CategoryComponent,
    UserAdvertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
    useClass: AuthHeadersInterceptor,
    multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
