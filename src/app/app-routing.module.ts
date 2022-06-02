import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
 
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'quote', loadChildren:()=> import('./quote/quote.module').then(x=>x.QuoteModule), canActivate:[AuthGuard]},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'*', redirectTo:'/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
