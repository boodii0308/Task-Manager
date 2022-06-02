import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes/quotes.component';
import { AddComponent } from './quotes/add/add.component';
import { DetailsComponent } from './quotes/details/details.component';
import { UpdateComponent } from './quotes/update/update.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { QuoteRoutingModule } from './quote-routing.module';
import { MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { QuoteService } from '../service/quote.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';

import { QuotePipe } from '../helper/quote.pipe';
import { TokenInterceptorService } from '../service/token-interceptor.service';


@NgModule({
  declarations: [
    QuotesComponent,
    UpdateComponent,
    AddComponent,
    DetailsComponent,
    QuotePipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    QuoteRoutingModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports:[QuotesComponent,
    UpdateComponent,
    AddComponent,
    DetailsComponent,
    ],
  providers: [QuoteService, {provide: HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true}],
})
export class QuoteModule { }
