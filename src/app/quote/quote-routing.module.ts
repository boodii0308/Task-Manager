import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes/quotes.component';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './quotes/add/add.component';
import { DetailsComponent } from './quotes/details/details.component';
import { UpdateComponent } from './quotes/update/update.component';

const QuoteRoutes:Routes=[
  
  {path:'add', component: AddComponent},
  {path:'update/:id', component: UpdateComponent},
  {path:'details/:id', component: DetailsComponent},
  {path:'', component: QuotesComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(QuoteRoutes)
  ],
  exports:[RouterModule]
})
export class QuoteRoutingModule { }
