import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertViewComponent } from './components/advert-view/advert-view.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { UserAdvertsComponent } from './components/user-adverts/user-adverts.component';
import { LoginComponent } from './components/user-management/login/login.component';
import { ProfileEditComponent } from './components/user-management/profile-edit/profile-edit.component';
import { RegistrationComponent } from './components/user-management/registration/registration.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: 'category/:title', component: CategoryComponent },
  { path: 'my-adverts', component: UserAdvertsComponent },
  { path: 'advert/:id', component: AdvertViewComponent },
  { path: '**',   redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
